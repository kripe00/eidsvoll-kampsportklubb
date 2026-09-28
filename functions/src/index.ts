import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import OpenAI from "openai";

admin.initializeApp();

// Definer hemmeligheter fra GCP Secret Manager
const smtpUser = defineSecret("SMTP_USER");
const smtpPassword = defineSecret("SMTP_PASSWORD");
const openaiApiKey = defineSecret("OPENAI_API_KEY");


// Miljøvariabler
const smtpHost = process.env.SMTP_HOST || "smtp.resend.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true";
const emailTo = process.env.EMAIL_TO || "kontakt@kampsporteidsvoll.no";
const senderEmail = process.env.SENDER_EMAIL || "noreply@kampsporteidsvoll.no";

// Sikkerhetsfunksjon for HTML entity sanitering (forhindrer HTML/Email template injection)
const escapeHtml = (unsafe?: string): string => {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Hjelpefunksjon for norsk datoformatering
const formatNorwegianDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return escapeHtml(dateStr);
  return d.toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
};

export const sendContactEmail = onDocumentCreated(
  {
    document: "messages/{messageId}",
    secrets: [smtpUser, smtpPassword],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("Ingen data tilknyttet hendelsen.");
      return;
    }

    const data = snapshot.data();

    // 1. Anti-bot honeypot sjekk
    if (data.website && String(data.website).trim() !== "") {
      console.warn(`Spam-forsøk oppdaget via honeypot-felt fra ${data.email || "ukjent"}. Ignorerer melding.`);
      return;
    }

    const { name, email, phone, subject, message, isProveuke, startDate, endDate, category } = data;

    // 2. Sanitiser all brukerstyrt input for å forhindre HTML-injeksjon i e-post
    const safeName = escapeHtml(name || "Ukjent avsender");
    const safeEmail = escapeHtml(email || "");
    const safePhone = escapeHtml(phone || "");
    const safeSubject = escapeHtml(subject || "Ingen emne angitt");
    const safeMessage = escapeHtml(message || "");
    const safeCategory = escapeHtml(category || "Voksen/Ungdom");

    console.log(`Mottok ny henvendelse (${event.params.messageId}) fra ${email}. Sender e-post...`);

    const userVal = smtpUser.value();
    const passVal = smtpPassword.value();

    if (!userVal || !passVal) {
      console.error("Mangler SMTP_USER eller SMTP_PASSWORD. E-post kan ikke sendes.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: userVal,
        pass: passVal,
      },
    });

    const isTrialWeek = isProveuke === true || !!startDate;
    const formattedStartDate = formatNorwegianDate(startDate);
    const formattedEndDate = formatNorwegianDate(endDate);

    // 1. E-post til klubben (Administrasjonen)
    const mailOptionsAdmin = {
      from: `"${safeName} via Nettsiden" <${senderEmail}>`,
      to: emailTo,
      replyTo: email,
      subject: isTrialWeek
        ? `[GRATIS PRØVEPERIODE 14 DAGER] ${name} (${category || "Prøveperiode"})`
        : `[Kontaktskjema] ${subject || "Ny henvendelse"}`,
      text: isTrialWeek
        ? `Ny påmelding til gratis prøveperiode (14 dager / 2 uker)!\n\nNavn: ${name}\nE-post: ${email}\nTelefon: ${phone || "Ikke oppgitt"}\nKategori: ${category || "Ikke oppgitt"}\nStartdato: ${formattedStartDate}\nSluttdato prøveperiode: ${formattedEndDate}\n\nMelding:\n${message}`
        : `Du har mottatt en ny melding fra kontaktskjemaet på nettsiden.\n\nNavn: ${name}\nE-post: ${email}\nEmne: ${subject}\n\nMelding:\n${message}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9;">
            <h2 style="color: #0f172a; font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 0; tracking: -0.025em;">
              Eidsvoll Kampsportklubb
            </h2>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">
              ${isTrialWeek ? "Ny påmelding til gratis prøveperiode (14 dager)" : "Ny melding fra kontaktskjemaet"}
            </p>
          </div>

          <div style="padding: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #f1f5f9; color: #475569;">Navn:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">E-post:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                </td>
              </tr>
              ${safePhone ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Telefon:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${safePhone}</td>
              </tr>` : ""}
              ${isTrialWeek ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Aldersgruppe:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${safeCategory}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Startdato:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #2563eb;">${formattedStartDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Sluttdato (14 dager):</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0f172a;">${formattedEndDate}</td>
              </tr>` : `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Emne:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safeSubject}</td>
              </tr>`}
            </table>

            <div style="background-color: #f8fafc; padding: 18px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #475569; font-size: 12px; text-transform: uppercase; tracking: 0.05em;">Melding/Tilleggsinformasjon:</h4>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #0f172a;">${safeMessage}</p>
            </div>
          </div>

          <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            Når du svarer på denne e-posten, svarer du direkte til <strong>${safeEmail}</strong>.
          </div>
        </div>
      `,
    };

    // 2. Automatisk bekreftelses-epost til avsenderen (Kunden)
    const mailOptionsUser = {
      from: `"Eidsvoll Kampsportklubb" <${senderEmail}>`,
      replyTo: emailTo,
      to: email,
      subject: isTrialWeek
        ? `Bekreftelse på 2 ukers gratis prøveperiode – Eidsvoll Kampsportklubb`
        : `Takk for din henvendelse – Eidsvoll Kampsportklubb`,
      text: isTrialWeek
        ? `Hei ${name}!\n\nTakk for din påmelding til gratis prøveperiode (2 uker / 14 dager) hos Eidsvoll Kampsportklubb.\n\nDin prøveperiode starter ${formattedStartDate} og varer til og med ${formattedEndDate} (14 dager).\n\nDu har fri tilgang til å prøve alle våre sporter (BJJ, Muay Thai, Crosstrening og Yoga) i prøveperioden.\n\nAdresse: Trondheimsvegen 71B, 2072 Dal\nTimeplan: https://kampsporteidsvoll.no/timeplan\n\nMed vennlig hilsen,\nEidsvoll Kampsportklubb`
        : `Hei ${name}!\n\nTakk for at du tok kontakt med oss i Eidsvoll Kampsportklubb.\n\nVi har mottatt meldingen din og vil svare deg så fort som mulig.\n\nMed vennlig hilsen,\nEidsvoll Kampsportklubb`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a; background-color: #ffffff;">
          
          <!-- Header Banner -->
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #f1f5f9;">
            <h1 style="color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 8px 0;">
              Eidsvoll Kampsportklubb
            </h1>
            <span style="display: inline-block; background-color: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid #dbeafe;">
              ${isTrialWeek ? "Gratis Prøveperiode (14 Dager) Registrert" : "Takk for din henvendelse"}
            </span>
          </div>

          <!-- Content Body -->
          <div style="padding: 28px 0; font-size: 15px; line-height: 1.6; color: #334155;">
            <p style="margin-top: 0; font-size: 17px; font-weight: 700; color: #0f172a;">
              Hei ${safeName},
            </p>
            <p>
              ${isTrialWeek
                ? "Velkommen til 2 ukers gratis prøveperiode hos oss i <strong>Eidsvoll Kampsportklubb</strong>! Vi har registrert din påmelding og gleder oss til å se deg på matta."
                : "Takk for at du tok kontakt med oss i <strong>Eidsvoll Kampsportklubb</strong>. Vi har mottatt meldingen din og vil gi deg et svar så raskt vi kan."}
            </p>

            ${isTrialWeek ? `
            <!-- Trial Week Details Box -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">
                DETALJER FOR DIN PRØVEPERIODE (14 DAGER / 2 UKER):
              </p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Startdato:</td>
                  <td style="padding: 6px 0; color: #2563eb; font-weight: 700;">${formattedStartDate}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Sluttdato:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${formattedEndDate}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Inkludert:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">Fri tilgang i 14 dager til BJJ, Muay Thai, Crosstrening og Yoga</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #1e40af;">Hva trenger du å ta med?</p>
              <p style="margin: 0; font-size: 13px; color: #1e3a8a; line-height: 1.5;">
                Rent, vanlig treningstøy uten glidelåser (f.eks. t-skjorte og shorts/treningsbukse) samt en vannflaske. Vi trener barfot på mattene!
              </p>
            </div>
            ` : `
            <!-- Standard message box -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">
                Din melding:
              </p>
              ${subject ? `<p style="margin: 0 0 8px 0; font-weight: 700; color: #0f172a;">Emne: ${safeSubject}</p>` : ""}
              <p style="margin: 0; font-style: italic; color: #334155; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">
                "${safeMessage}"
              </p>
            </div>
            `}

            <p style="font-size: 14px; color: #64748b;">
              Sjekk ut treningstidene våre på nettsiden for å finne øktene som passer best for deg.
            </p>

            <!-- Action button -->
            <div style="text-align: center; margin: 28px 0 12px 0;">
              <a href="https://kampsporteidsvoll.no/timeplan" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">
                Se timeplan & treningstider
              </a>
            </div>
          </div>

          <!-- Footer / Signature -->
          <div style="border-top: 1px solid #f1f5f9; padding-top: 24px; font-size: 13px; color: #64748b;">
            <p style="margin: 0 0 2px 0; font-weight: 700; color: #0f172a;">Med vennlig hilsen,</p>
            <p style="margin: 0 0 16px 0; font-weight: 800; color: #0f172a; text-transform: uppercase;">Eidsvoll Kampsportklubb</p>
            
            <table style="width: 100%; font-size: 13px; color: #64748b; line-height: 1.5;">
              <tr>
                <td style="padding-bottom: 4px;">📍 <strong>Adresse:</strong> Trondheimsvegen 71B, 2072 Dal</td>
              </tr>
              <tr>
                <td style="padding-bottom: 4px;">✉️ <strong>E-post:</strong> kontakt@kampsporteidsvoll.no</td>
              </tr>
              <tr>
                <td>🌐 <strong>Nettside:</strong> <a href="https://kampsporteidsvoll.no" style="color: #2563eb; text-decoration: none;">kampsporteidsvoll.no</a></td>
              </tr>
            </table>
          </div>

        </div>
      `,
    };

    try {
      await Promise.all([
        transporter.sendMail(mailOptionsAdmin),
        transporter.sendMail(mailOptionsUser),
      ]);
      console.log(`Begge e-poster (varsling + bekreftelse til ${email}) sendt suksessfullt.`);
    } catch (error) {
      console.error("Feil ved sending av e-post via Nodemailer:", error);
      throw error;
    }
  }
);

/**
 * 3. Daglig scheduled oppgave som sjekker om prøveperioden er over (etter 14 dager)
 * Kjører hver dag kl 09:00 (Norsk tid) og sender oppfølgingsepost med innmeldingslenke.
 * Håndterer også legacy-registreringer (som mangler explicit endDate eller followupSent-felt).
 */
export const sendTrialWeekFollowup = onSchedule(
  {
    schedule: "every day 09:00",
    timeZone: "Europe/Oslo",
    secrets: [smtpUser, smtpPassword],
  },
  async () => {
    console.log("Kjører daglig sjekk for fullførte prøveperioder (inkludert legacy)...");

    const userVal = smtpUser.value();
    const passVal = smtpPassword.value();

    if (!userVal || !passVal) {
      console.error("Mangler SMTP_USER eller SMTP_PASSWORD. Oppfølgingse-post kan ikke sendes.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: userVal,
        pass: passVal,
      },
    });

    const nowInOslo = new Date();
    // Dagens dato i format YYYY-MM-DD
    const todayStr = nowInOslo.toISOString().split("T")[0];

    const db = admin.firestore();

    try {
      // Hent prøveukepåmeldinger med en sikker øvre batchgrense (maks 250 per kjøring for å unngå memory exhaustion)
      const snapshot = await db
        .collection("messages")
        .where("isProveuke", "==", true)
        .limit(250)
        .get();

      if (snapshot.empty) {
        console.log("Ingen prøveperioder funnet i databasen.");
        return;
      }

      let count = 0;

      for (const doc of snapshot.docs) {
        const data = doc.data();

        // Hopp over dersom oppfølging allerede er sendt
        if (data.followupSent === true) {
          continue;
        }

        const { name, email, endDate, startDate, createdAt } = data;

        if (!email) continue;

        let targetEndDateStr = endDate;

        // For legacy-påmeldinger som mangler explicit endDate:
        if (!targetEndDateStr) {
          let baseDate: Date | null = null;

          if (startDate) {
            baseDate = new Date(startDate + "T00:00:00");
          } else if (createdAt) {
            baseDate = typeof createdAt.toDate === "function" ? createdAt.toDate() : new Date(createdAt);
          }

          if (baseDate && !isNaN(baseDate.getTime())) {
            // Beregn 14 dager frem fra registrering/startdato
            const calculatedEnd = new Date(baseDate.getTime() + 14 * 24 * 60 * 60 * 1000);
            targetEndDateStr = calculatedEnd.toISOString().split("T")[0];
          }
        }

        // Dersom sluttdatoen er beregnet/angitt og nådd (dvs. targetEndDateStr <= todayStr)
        if (targetEndDateStr && targetEndDateStr <= todayStr) {
          const safeName = escapeHtml(name || "medlem");
          console.log(`Sender oppfølgingse-post til ${email} for fullført prøveperiode (Sluttdato: ${targetEndDateStr})...`);

          const mailOptionsFollowup = {
            from: `"Eidsvoll Kampsportklubb" <${senderEmail}>`,
            replyTo: emailTo,
            to: email,
            subject: `Håper du likte de 2 prøveukene dine hos Eidsvoll Kampsportklubb! 🥋`,
            text: `Hei ${name}!\n\nVi håper du har hatt 2 flotte prøveuker hos oss i Eidsvoll Kampsportklubb!\n\nØnsker du å fortsette treningen og bli fast medlem? Du kan enkelt melde deg inn via Boost Medlemssystem.\n\nBli medlem: https://portal.boostsystem.no/rambukk/member\n\nMed vennlig hilsen,\nEidsvoll Kampsportklubb\nkontakt@kampsporteidsvoll.no`,
            html: `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a; background-color: #ffffff;">
                
                <!-- Header Banner -->
                <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #f1f5f9;">
                  <h1 style="color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 8px 0;">
                    Eidsvoll Kampsportklubb
                  </h1>
                  <span style="display: inline-block; background-color: #ecfdf5; color: #059669; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid #a7f3d0;">
                    Prøveperiode Fullført (2 uker) 🥋
                  </span>
                </div>

                <!-- Content Body -->
                <div style="padding: 28px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                  <p style="margin-top: 0; font-size: 18px; font-weight: 800; color: #0f172a;">
                    Hei ${safeName}! 👋
                  </p>
                  <p>
                    Din 14-dagers prøveperiode hos Eidsvoll Kampsportklubb er nå omme. Vi håper du har hatt det gøy, lært noe nytt og fått kjenne på det gode miljøet på matta hos oss!
                  </p>
                  <p>
                    Ønsker du å fortsette treningen og bli en fast del av klubben? Du kan enkelt melde deg inn som fast medlem på under et minutt.
                  </p>

                  <!-- Call to Action Box -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 20px; margin: 28px 0; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #0f172a;">
                      Bli medlem i Eidsvoll Kampsportklubb
                    </h3>
                    <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                      Klikk på knappen under for å melde deg inn direkte via Boost.
                    </p>

                    <a href="https://portal.boostsystem.no/rambukk/member" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 800; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.06em; shadow: 0 4px 6px rgba(37,99,235,0.2);">
                      Bli medlem i Eidsvoll Kampsportklubb
                    </a>
                  </div>

                  <p style="font-size: 14px; color: #64748b;">
                    Har du noen spørsmål angående kontingent, utstyr eller partier? Det er bare å svare direkte på denne e-posten!
                  </p>
                </div>

                <!-- Footer / Signature -->
                <div style="border-top: 1px solid #f1f5f9; padding-top: 24px; font-size: 13px; color: #64748b;">
                  <p style="margin: 0 0 2px 0; font-weight: 700; color: #0f172a;">Med vennlig hilsen,</p>
                  <p style="margin: 0 0 16px 0; font-weight: 800; color: #0f172a; text-transform: uppercase;">Eidsvoll Kampsportklubb</p>
                  
                  <table style="width: 100%; font-size: 13px; color: #64748b; line-height: 1.5;">
                    <tr>
                      <td style="padding-bottom: 4px;">📍 <strong>Adresse:</strong> Trondheimsvegen 71B, 2072 Dal</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 4px;">✉️ <strong>E-post:</strong> kontakt@kampsporteidsvoll.no</td>
                    </tr>
                    <tr>
                      <td>🌐 <strong>Nettside:</strong> <a href="https://kampsporteidsvoll.no" style="color: #2563eb; text-decoration: none;">kampsporteidsvoll.no</a></td>
                    </tr>
                  </table>
                </div>

              </div>
            `,
          };

          await transporter.sendMail(mailOptionsFollowup);

          // Marker at oppfølgingsepost er sendt
          await doc.ref.update({
            followupSent: true,
            followupSentAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          count++;
        }
      }

      console.log(`Fullførte daglig oppfølgingssjekk. Sendte ${count} oppfølgingse-poster.`);
    } catch (err) {
      console.error("Feil under kjøring av sendTrialWeekFollowup:", err);
    }
  }
);

/**
 * 4. AI Klubb-assistent (Chatbot) for Eidsvoll Kampsportklubb
 * Drevet av OpenAI gpt-4o-mini med grounded system-prompt og sliding window rate-limiting.
 */
const ipRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, limit = 10, windowMs = 30 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = (ipRateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);

  if (timestamps.length >= limit) {
    ipRateLimitMap.set(ip, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  ipRateLimitMap.set(ip, timestamps);

  if (ipRateLimitMap.size > 1000) {
    for (const [key, list] of ipRateLimitMap.entries()) {
      const active = list.filter((ts) => now - ts < windowMs);
      if (active.length === 0) {
        ipRateLimitMap.delete(key);
      } else {
        ipRateLimitMap.set(key, active);
      }
    }
  }

  return { allowed: true, remaining: limit - timestamps.length };
}

const CLUB_SYSTEM_PROMPT = `Du er Eidsvoll Kampsportklubbs offisielle digitale assistent på nettsiden (kampsporteidsvoll.no).
Din oppgave er å være en imøtekommende, vennlig, sporty og ryddig veileder for både nye nysgjerrige besøkende, foreldre og eksisterende medlemmer.

### RETNINGSLINJER FOR SVAR:
1. Svar alltid på et naturlig, hyggelig og lettfattelig norsk (dersom brukeren stiller spørsmål på engelsk, polsk eller ukrainsk, svarer du høflig på det språket).
2. Vær kortfattet, presis og hjelpsom. Unngå lange avhandlinger – hold svaret til 1–3 korte avsnitt eller en punktliste.
3. Hold deg STRENGT til klubbens fakta under. Ikke dikt opp priser, tider eller regler som ikke står her.
4. Sikkerhetsgrense: Hvis brukeren spør om ting utenfor kampsport og klubbens tilbud (f.eks. oppskrifter, programmering, politikk, leksehjelp eller generelle samtaleemner), svarer du høflig:
   "Jeg er Eidsvoll Kampsportklubbs assistent og kan bare hjelpe med spørsmål om klubben, treningene og medlemskap hos oss! 👋"
5. Hvis noen har spørsmål du ikke vet svaret på, oppfordre dem til å sende en e-post til kontakt@kampsporteidsvoll.no eller ringe 976 10 229.

### KLUBBENS FAKTA & IDENTITET:
- Navn: Eidsvoll Kampsportklubb (EKK)
- Røtter & Historie: Har røtter fra Rambukk Sport AS (etablert 2013 på Råholt). Eidsvoll Kampsportklubb ble stiftet i 2023 som et ideelt, demokratisk idrettslag, og samlet fra 2026 all drift, aktivitet og medlemsadministrasjon i nye lokaler på Dal.
- Lokasjon: Trondheimsvegen 71B, 2072 Dal.
  (Lokalene har to store kampsportsaler med faste matter – Sal 1 og Sal 2 – samt en egen CT/Yoga-sal).
- Tilknytning: Ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF) og Norges Kampsportforbund (NKF).
- Checkmat Affiliate: EKK er en stolt offisiell Checkmat-klubb, direkte tilknyttet grunnlegger Leo Vieira og Checkmats globale hovedkvarter. Alle BJJ-beltegraderinger er internasjonalt godkjente, og medlemmer kan trene på Checkmat-akademier i hele verden når de er ute og reiser.
- Kontakt: E-post: kontakt@kampsporteidsvoll.no | Telefon: 976 10 229 | Org.nr: 932716461.

### TRENERE & NØKKELPERSONER:
- Styreleder: Kristian Sollie Pedersen
- Nestleder & Hovedtrener BJJ: Christer Alfheim (opptatt av teknisk presisjon, idrettsglede og trygghet).
- Barnetrenere BJJ: Alexandra Husum Strøm og Pernille Støen (spesialisert på trygghet, mestring, motorikk og treningsglede for barn).
- Politiattestansvarlig: Helene Løken (alle trenere fremviser godkjent politiattest i henhold til NIFs regler).

### DISIPLINER & TILBUD:
1. Brasiliansk Jiu-Jitsu (BJJ):
   - Bakkekamp med fokus på teknikk, posisjonskontroll, fellinger og submissions (låser/kvelninger).
   - Trening med drakt (Gi) og uten drakt (No-Gi).
   - Partier: Barnepartier (Barn 1: 6–9 år, Barn 2: 10–13 år), Nybegynner (Basic), Viderekomne (Advanced), Dagtrening, Sparring og Konkurransetrening for barn.
2. Muay Thai (Thaiboksing):
   - Tradisjonell stående kampsport med slag, spark, knær og albuer. Effektiv kondisjon, styrke og selvforsvar.
   - Partier: Felles barneparti (fra ca. 8–10 år) og felles ungdom/voksen.
3. Crosstrening:
   - Funksjonell sirkel- og styrketrening for å bygge utholdenhet, styrke og forebygge skader. Har egne Kickstart-økter.
4. Yoga:
   - Yinsaya yoga og tradisjonell yoga for restitusjon, bevegelighet og mental ro.
5. Åpen matte (Søndager kl. 12:00–14:00):
   - Fri egentrening og sparring for alle medlemmer på tvers av partier.

### GRATIS PRØVEPERIODE (14 DAGER / 2 UKER):
- Alle nye får 14 dagers helt gratis og uforpliktende prøveperiode!
- Prøveperioden gir fri tilgang til å prøve alle klubbens tilbud (BJJ, Muay Thai, Crosstrening og Yoga) i to uker.
- Påmelding: Trykk på "Prøv gratis"-knappen på nettsiden eller fyll ut prøveuke-skjemaet.

### FØRSTE TRENING – HVA TRENGER MAN?
- Utstyr: Rent, vanlig treningstøy uten glidelåser eller harde knapper (f.eks. t-skjorte og shorts eller treningsbukse).
- Fottøy: Ingen sko! Vi trener barbent på mattene av hygieniske hensyn og for å ta vare på mattene.
- Drikkeflaske: Husk å ta med vannflaske!
- Egen gi eller boksehansker? Ikke nødvendig for første trening/prøveperiode. Klubben har låneutstyr (som boksehansker). Egen gi/hansker kjøper du først når du skal trene fast.

### TIMEPLAN (TRENINGSTIDER):
- Mandag:
  * 17:30 - 18:30: Crosstrening (CT/Yoga sal)
  * 17:30 - 18:30: BJJ Barn 1 (6–9 år) (Sal 1)
  * 17:30 - 18:30: BJJ Barn 2 (10–13 år) (Sal 2)
  * 18:30 - 19:30: Yoga - Yinsaya (CT/Yoga sal)
  * 18:30 - 19:45: BJJ Voksne / Ungdom (Sal 1)
  * 18:30 - 20:00: BJJ Advanced (Sal 2)
- Tirsdag:
  * 17:30 - 18:30: Crosstrening (CT/Yoga sal)
  * 17:30 - 18:30: Muay Thai Barn (Sal 1)
  * 18:00 - 19:30: BJJ No-Gi (Sal 2)
  * 18:30 - 19:45: Muay Thai (Sal 1)
- Onsdag:
  * 17:30 - 18:30: Crosstrening (CT/Yoga sal)
  * 17:30 - 18:30: BJJ Barn 1 (6–9 år) (Sal 2)
  * 17:30 - 18:30: BJJ Barn 2 (10–13 år) (Sal 1)
  * 18:30 - 19:45: BJJ Basic (Sal 1)
  * 18:30 - 20:00: BJJ Advanced (Sal 2)
- Torsdag:
  * 17:30 - 18:30: Crosstrening (CT/Yoga sal)
  * 17:30 - 18:30: Muay Thai Barn (Sal 1)
  * 18:00 - 19:30: BJJ No-Gi (Sal 2)
  * 18:30 - 19:45: Muay Thai (Sal 1)
- Fredag:
  * 11:00 - 12:30: BJJ Dagtrening (Sal 1)
  * 17:30 - 18:30: Crosstrening (CT/Yoga sal)
  * 17:30 - 18:30: BJJ Sparring (Sal 2)
  * 17:30 - 18:45: BJJ Barn Konkurransetrening (Sal 2)
  * fra 18:30: Yoga (CT/Yoga sal)
- Lørdag: Treningsfri / egentrening / dugnader
- Søndag: 12:00 - 14:00: Åpen matte (Hele bruket)

### MEDLEMSKAP, PRISER & DE TO SYSTEMENE:
For å trene fast etter prøveperioden må utøvere registrere seg i to systemer:
1. Steg 1: Boost (Månedlig treningsavgift)
   - Selve treningsabonnementet for å delta på treninger.
   - Lenke: portal.boostsystem.no/rambukk/member
   - Signeres med BankID (for AvtaleGiro). Foresatte må signere med BankID for barn og ungdom under 18 år.
2. Steg 2: MinIdrett (Årlig medlemskontingent til NIF)
   - Årlig klubbmedlemskap i idrettslaget. Dekker utøverens skadeforsikring på matta og gir rett til å konkurrere i regi av forbundet.
   - Lenke: www.minidrett.no/medlemskap/988726
*Viktig presisering:* Har du kun betalt i MinIdrett, har du formelt medlemskap og forsikring, men IKKE betalt for månedstreningen. Man må registrere seg i begge systemene for å trene fast.

### PRISLISTE (MÅNEDLIGE TRENINGSAVGIFTER I BOOST):
1. Barn (6–13 år) – BJJ Kids & Thai Kids:
   - Pris: kr 539,- per måned (6 mnd binding).
   - Inkluderer fri tilgang til BÅDE BJJ og Muay Thai for barn.
   - Signeres av foresatte med BankID (AvtaleGiro).
   - Merk: Dersom barnet ikke har eget mobilnummer, kontakt klubben på kontakt@kampsporteidsvoll.no (eller kontakt@rambukken.no) for manuell registrering.
2. Totalmedlemskap Ungdom (14–19 år):
   - Gir fri tilgang til ALLE våre gruppetimer (BJJ, Muay Thai, Crosstrening, Yoga).
   - 12 mnd binding: kr 649,- per måned.
   - 6 mnd binding: kr 749,- per måned.
   - Foresatte må ha BankID tilgjengelig for signering av AvtaleGiro for ungdom under 18 år.
3. Totalmedlemskap Voksen (20+ år):
   - Gir fri tilgang til ALLE våre gruppetimer (BJJ, Muay Thai, Crosstrening, Yoga).
   - 12 mnd binding: kr 749,- per måned.
   - 6 mnd binding: kr 849,- per måned.
   - Ingen binding (løpende): kr 949,- per måned.
   - Signeres med BankID for AvtaleGiro.
4. Crosstrening / Yoga (14 års aldersgrense):
   - Pris: kr 399,- per måned (6 mnd binding).
   - Gir tilgang til både Crosstrening og Yoga.
   - Signeres med BankID for AvtaleGiro ved innmelding.
5. Familiepris Crosstrening / Yoga:
   - Pris: kr 249,- per måned (med binding).
   - Spesialpris for foreldre som har barn som trener hos oss (minimum ett barn må være aktivt medlem).
6. Drop-in:
   - Pris: kr 150,- (engangsbetaling, uten binding).
   - Full tilgang samme dato som innmelding. Betales enkelt med Vipps ved oppmøte/innmelding.`;

export const chatWithClubBot = onRequest(
  {
    secrets: [openaiApiKey],
    cors: true,
  },
  async (req, res) => {
    // 1. Støtt preflight OPTIONS forespørsler
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Kun POST-forespørsler støttes." });
      return;
    }

    // 2. Klient-IP og Sesjon for presis Rate Limiting (Maks 10 meldinger per 30 min per sesjon/IP)
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown-ip";

    const sessionId =
      typeof req.body?.sessionId === "string"
        ? req.body.sessionId.trim().slice(0, 64)
        : null;

    const rateKey = sessionId ? `${clientIp}_${sessionId}` : clientIp;

    const rateCheck = checkRateLimit(rateKey, 10, 30 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        error: "Du har sendt for mange meldinger den siste halvtimen. Vennligst vent litt eller ta kontakt med oss på kontakt@kampsporteidsvoll.no dersom det haster!",
      });
      return;
    }

    // 3. Valider input
    const { message, history } = req.body || {};
    if (!message || typeof message !== "string" || message.trim() === "") {
      res.status(400).json({ error: "Melding kan ikke være tom." });
      return;
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 500) {
      res.status(400).json({ error: "Meldingen er for lang (maks 500 tegn)." });
      return;
    }

    // Sanitiser og begrens historikk (maks 4 siste meldinger)
    const validRoles = new Set(["user", "assistant"]);
    const sanitizedHistory: Array<{ role: "user" | "assistant"; content: string }> = [];

    if (Array.isArray(history)) {
      const recent = history.slice(-4);
      for (const item of recent) {
        if (item && validRoles.has(item.role) && typeof item.content === "string") {
          sanitizedHistory.push({
            role: item.role as "user" | "assistant",
            content: item.content.slice(0, 500),
          });
        }
      }
    }

    // 4. Hent API-nøkkel
    const apiKey = openaiApiKey.value() || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Mangler OPENAI_API_KEY. Sjekk Secret Manager eller .env.");
      res.status(500).json({ error: "AI-tjenesten er midlertidig utilgjengelig. Prøv igjen senere." });
      return;
    }

    try {
      const openai = new OpenAI({ apiKey });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: CLUB_SYSTEM_PROMPT },
          ...sanitizedHistory,
          { role: "user", content: trimmedMessage },
        ],
        max_tokens: 400,
        temperature: 0.3,
      });

      const reply = completion.choices[0]?.message?.content?.trim() || "Beklager, jeg kunne ikke generere et svar akkurat nå.";

      res.status(200).json({
        reply,
        remainingRequests: rateCheck.remaining,
      });
    } catch (err: any) {
      console.error("Feil ved kall til OpenAI API:", err?.message || err);
      res.status(500).json({
        error: "Beklager, noe gikk galt under kommunikasjonen med AI-tjenesten. Prøv igjen om litt!",
      });
    }
  }
);

