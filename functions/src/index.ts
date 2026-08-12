import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Definer hemmeligheter fra GCP Secret Manager som vil bli forespurt under deploy
const smtpUser = defineSecret("SMTP_USER");
const smtpPassword = defineSecret("SMTP_PASSWORD");

// Ikke-sensitive parametere leses fra miljøvariabler
const smtpHost = process.env.SMTP_HOST || "smtp.resend.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true"; // true for port 465, false for 587
const emailTo = process.env.EMAIL_TO || "kontakt@kampsporteidsvoll.no";
const senderEmail = process.env.SENDER_EMAIL || "noreply@kampsporteidsvoll.no";

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
    const { name, email, subject, message } = data;

    console.log(`Mottok ny melding (${event.params.messageId}) fra ${email}. Sender e-postvarsling og bekreftelse...`);

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

    // 1. E-post til klubben (Administrasjonen)
    const mailOptionsAdmin = {
      from: `"${name} via Nettsiden" <${senderEmail}>`,
      to: emailTo,
      replyTo: email,
      subject: `[Kontaktskjema] ${subject || "Ny henvendelse"}`,
      text: `Du har mottatt en ny melding fra kontaktskjemaet på nettsiden.\n\nNavn: ${name}\nE-post: ${email}\nEmne: ${subject}\n\nMelding:\n${message}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9;">
            <h2 style="color: #dc2626; font-size: 22px; font-weight: 800; text-transform: uppercase; margin: 0; tracking: -0.025em;">
              Eidsvoll Kampsportklubb
            </h2>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Ny melding fra kontaktskjemaet</p>
          </div>

          <div style="padding: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 120px; border-bottom: 1px solid #f1f5f9; color: #475569;">Navn:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">E-post:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Emne:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${subject || "Ingen emne angitt"}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; padding: 18px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #475569; font-size: 12px; text-transform: uppercase; tracking: 0.05em;">Melding:</h4>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #0f172a;">${message}</p>
            </div>
          </div>

          <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            Når du svarer på denne e-posten, svarer du direkte til <strong>${email}</strong>.
          </div>
        </div>
      `,
    };

    // 2. Automatisk bekreftelses-epost til avsenderen (Kunden)
    const mailOptionsUser = {
      from: `"Eidsvoll Kampsportklubb" <${senderEmail}>`,
      to: email,
      subject: `Takk for din henvendelse – Eidsvoll Kampsportklubb`,
      text: `Hei ${name}!\n\nTakk for at du tok kontakt med oss i Eidsvoll Kampsportklubb.\n\nVi har mottatt meldingen din angående "${subject || "din henvendelse"}" og vil svare deg så fort som mulig.\n\nSammendrag av din melding:\n${message}\n\nMed vennlig hilsen,\nEidsvoll Kampsportklubb\nTrondheimsvegen 71B, 2072 Dal\nhttps://kampsporteidsvoll.no`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a; background-color: #ffffff;">
          
          <!-- Header Banner -->
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #f1f5f9;">
            <h1 style="color: #dc2626; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 6px 0;">
              Eidsvoll Kampsportklubb
            </h1>
            <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">
              Takk for din henvendelse
            </span>
          </div>

          <!-- Content Body -->
          <div style="padding: 28px 0; font-size: 16px; line-height: 1.6; color: #334155;">
            <p style="margin-top: 0; font-size: 18px; font-weight: 700; color: #0f172a;">
              Hei ${name}! 👋
            </p>
            <p>
              Takk for at du tok kontakt med oss i <strong>Eidsvoll Kampsportklubb</strong>. 
              Vi har mottatt meldingen din og vil gå igjennom den og gi deg et svar så raskt vi overhodet kan.
            </p>

            <!-- Box with user message summary -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; uppercase; tracking: 0.05em; color: #64748b;">
                DIN MELDING:
              </p>
              ${subject ? `<p style="margin: 0 0 10px 0; font-weight: 700; color: #0f172a;">Emne: ${subject}</p>` : ''}
              <p style="margin: 0; font-style: italic; color: #475569; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">
                "${message}"
              </p>
            </div>

            <p style="font-size: 15px;">
              I mellomtiden er du alltid velkommen til å sjekke ut treningstidene våre eller les mer om våre partier på nettsiden.
            </p>

            <!-- Action buttons / quick links -->
            <div style="text-align: center; margin: 28px 0 12px 0;">
              <a href="https://kampsporteidsvoll.no/timeplan" style="display: inline-block; background-color: #dc2626; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                Se Timeplan & Treningstider
              </a>
            </div>
          </div>

          <!-- Footer / Signature -->
          <div style="border-top: 1px solid #f1f5f9; padding-top: 24px; font-size: 14px; color: #64748b;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">Med vennlig hilsen,</p>
            <p style="margin: 0 0 16px 0; font-weight: 800; color: #dc2626; text-transform: uppercase;">Eidsvoll Kampsportklubb</p>
            
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
      // Send begge e-postene i parallell
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
