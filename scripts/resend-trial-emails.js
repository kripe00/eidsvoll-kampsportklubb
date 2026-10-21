const fs = require("fs");
const path = require("path");
const nodemailer = require(path.join(__dirname, "../functions/node_modules/nodemailer"));

// Sikkerhetsfunksjon for HTML entity sanitering
const escapeHtml = (unsafe) => {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatNorwegianDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return escapeHtml(dateStr);
  return d.toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
};

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  const configPath = path.join(process.env.HOME, ".config/configstore/firebase-tools.json");
  const conf = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const token = conf.tokens.access_token;

  // 1. Fetch SMTP secret
  const secRes = await fetch("https://secretmanager.googleapis.com/v1/projects/eidsvoll-kampsportklubb/secrets/SMTP_PASSWORD/versions/latest:access", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const secData = await secRes.json();
  const pass = Buffer.from(secData.payload.data, "base64").toString("utf8");

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: { user: "resend", pass: pass }
  });

  // 2. Fetch latest messages from Firestore
  const url = "https://firestore.googleapis.com/v1/projects/eidsvoll-kampsportklubb/databases/(default)/documents:runQuery";
  const qRes = await fetch(url, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "messages" }],
        orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
        limit: 40
      }
    })
  });
  const qData = await qRes.json();
  const allDocs = qData.filter(d => d.document).map(d => {
    const doc = d.document;
    const f = doc.fields || {};
    return {
      id: doc.name.split("/").pop(),
      name: f.name?.stringValue || "",
      email: f.email?.stringValue || "",
      phone: f.phone?.stringValue || "",
      category: f.category?.stringValue || "Voksen / Ungdom",
      discipline: f.discipline?.stringValue || "Ikke spesifisert",
      startDate: f.startDate?.stringValue || "",
      endDate: f.endDate?.stringValue || "",
      isProveuke: f.isProveuke?.booleanValue || false,
      createdAt: f.createdAt?.timestampValue || doc.createTime
    };
  });

  // Filter out tests and non-proveuke, keep only since Oct 12
  const recent = allDocs.filter(d => 
    d.isProveuke && 
    !d.name.toLowerCase().includes("test") &&
    new Date(d.createdAt) >= new Date("2026-10-12T00:00:00Z")
  );

  // Deduplicate by email (send only to newest entry if someone signed up twice)
  const seenEmails = new Set();
  const targets = [];
  for (const item of recent) {
    const emailNorm = item.email.toLowerCase().trim();
    if (!seenEmails.has(emailNorm)) {
      seenEmails.add(emailNorm);
      targets.push(item);
    }
  }

  console.log(`Fant ${targets.length} unike personer som har meldt seg på prøveuke siden 12. oktober:\n`);
  targets.forEach((t, i) => {
    console.log(`${i + 1}. ${t.name} (${t.email}) - Påmeldt: ${t.createdAt.slice(0, 10)} - Gren: ${t.discipline}`);
  });

  if (isDryRun) {
    console.log("\n[DRY RUN] Kjører uten å sende e-poster. Kjør uten --dry-run for å sende.");
    return;
  }

  console.log("\nSender bekreftelses-eposter nå...\n");

  for (const person of targets) {
    const safeName = escapeHtml(person.name);
    const formattedStartDate = formatNorwegianDate(person.startDate);
    const formattedEndDate = formatNorwegianDate(person.endDate);

    const mailOptions = {
      from: `"Eidsvoll Kampsportklubb" <noreply@kampsporteidsvoll.no>`,
      replyTo: "kontakt@kampsporteidsvoll.no",
      to: person.email,
      subject: `Bekreftelse på 2 ukers gratis prøveperiode – Eidsvoll Kampsportklubb`,
      text: `Hei ${person.name}!\n\nTakk for din påmelding til gratis prøveperiode (2 uker / 14 dager) hos Eidsvoll Kampsportklubb.\n\nDin prøveperiode starter ${formattedStartDate} og varer til og med ${formattedEndDate} (14 dager).\n\nDu har fri tilgang til å prøve alle våre sporter (BJJ, Muay Thai, Crosstrening og Yoga) i prøveperioden.\n\nVIKTIG – BLI MED I SPOND:\nVi bruker appen Spond for å informere om økter, samt kommunisere med og mellom medlemmer. Vi ønsker at du blir med der og melder deg på øktene du ønsker å prøve. Legg samtidig inn en kommentar «på prøveuke» så instruktør kan se at de har med nye og ta godt imot deg.\n\nÅpne lenken for å melde deg inn: https://spond.com/invite/WJACA\n\nAdresse: Trondheimsvegen 71B, 2072 Dal (Inngang og gratis parkering på baksiden av bygget)\nTimeplan: https://kampsporteidsvoll.no/timeplan\n\nMed vennlig hilsen,\nEidsvoll Kampsportklubb`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #f1f5f9;">
            <h1 style="color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 8px 0;">
              Eidsvoll Kampsportklubb
            </h1>
            <span style="display: inline-block; background-color: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid #dbeafe;">
              Gratis Prøveperiode (14 Dager) Registrert
            </span>
          </div>

          <div style="padding: 28px 0; font-size: 15px; line-height: 1.6; color: #334155;">
            <p style="margin-top: 0; font-size: 17px; font-weight: 700; color: #0f172a;">
              Hei ${safeName},
            </p>
            <p>
              Velkommen til 2 ukers gratis prøveperiode hos oss i <strong>Eidsvoll Kampsportklubb</strong>! Vi har registrert din påmelding og gleder oss til å se deg på matta.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">
                DETALJER FOR DIN PRØVEPERIODE (14 DAGER / 2 UKER):
              </p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Gren / Parti:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${escapeHtml(person.discipline)} (${escapeHtml(person.category)})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Startdato:</td>
                  <td style="padding: 6px 0; color: #2563eb; font-weight: 700;">${formattedStartDate || "Omgående"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Sluttdato:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${formattedEndDate || "14 dager etter oppstart"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Inkludert:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">Fri tilgang i 14 dager til BJJ, Muay Thai, Crosstrening og Yoga</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #16a34a;">
              <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #166534;">
                📲 Viktig: Bli med i Spond for økter og påmelding
              </p>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #14532d; line-height: 1.6;">
                Vi bruker appen <strong>Spond</strong> for å informere om økter, samt kommunisere med og mellom medlemmer. Vi ønsker at du blir med der og melder deg på øktene du ønsker å prøve. Legg samtidig inn en kommentar <strong>«på prøveuke»</strong> så instruktør kan se at de har med nye og ta godt imot deg.
              </p>
              <div style="margin: 16px 0 12px 0;">
                <a href="https://spond.com/invite/WJACA" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Åpne lenken for å melde deg inn i Spond &rarr;
                </a>
              </div>
              <p style="margin: 0; font-size: 12px; color: #15803d;">
                Direktelenke: <a href="https://spond.com/invite/WJACA" style="color: #15803d; text-decoration: underline;">https://spond.com/invite/WJACA</a>
              </p>
            </div>

            <div style="background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #1e40af;">Hva trenger du å ta med?</p>
              <p style="margin: 0; font-size: 13px; color: #1e3a8a; line-height: 1.5;">
                Rent, vanlig treningstøy uten glidelåser (f.eks. t-skjorte og shorts/treningsbukse) samt en vannflaske. Vi trener barfot på mattene!
              </p>
            </div>
          </div>

          <div style="border-top: 1px solid #f1f5f9; padding-top: 24px; font-size: 13px; color: #64748b;">
            <p style="margin: 0 0 2px 0; font-weight: 700; color: #0f172a;">Med vennlig hilsen,</p>
            <p style="margin: 0 0 16px 0; font-weight: 800; color: #0f172a; text-transform: uppercase;">Eidsvoll Kampsportklubb</p>
            <table style="width: 100%; font-size: 13px; color: #64748b; line-height: 1.5;">
              <tr>
                <td style="padding-bottom: 4px;">📍 <strong>Adresse:</strong> Trondheimsvegen 71B, 2072 Dal (Inngang og parkering på baksiden)</td>
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
      `
    };

    try {
      const res = await transporter.sendMail(mailOptions);
      console.log(`✅ Sendt til ${person.name} (${person.email}): ${res.response}`);
    } catch (err) {
      console.error(`❌ Feil ved sending til ${person.email}:`, err.message);
    }
  }
  console.log("\nFerdig!");
}

main().catch(console.error);
