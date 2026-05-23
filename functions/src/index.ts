import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Definer hemmeligheter fra GCP Secret Manager som vil bli forespurt under deploy
const smtpUser = defineSecret("SMTP_USER");
const smtpPassword = defineSecret("SMTP_PASSWORD");

// Ikke-sensitive parametere kan leses fra miljøvariabler (fra .env-filen)
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true"; // true for port 465, false for 587
const emailTo = process.env.EMAIL_TO || "post@kampsporteidsvoll.no";

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

    console.log(`Mottok ny melding (${event.params.messageId}) fra ${email}. Sender e-postvarsling...`);

    // Sjekk at vi har hemmelighetene tilgjengelig før vi fortsetter
    const userVal = smtpUser.value();
    const passVal = smtpPassword.value();

    if (!userVal || !passVal) {
      console.error("Mangler SMTP_USER eller SMTP_PASSWORD. E-post kan ikke sendes.");
      return;
    }

    // Opprett en transporter for Nodemailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: userVal,
        pass: passVal,
      },
    });

    const mailOptions = {
      from: `"${name} via Nettsiden" <${userVal}>`,
      to: emailTo,
      replyTo: email,
      subject: `[Kontaktskjema] ${subject}`,
      text: `Du har mottatt en ny melding fra kontaktskjemaet på nettsiden.\n\nNavn: ${name}\nE-post: ${email}\nEmne: ${subject}\n\nMelding:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333333;">
          <h2 style="color: #d32f2f; border-bottom: 2px solid #f5f5f5; padding-bottom: 10px; margin-top: 0;">
            Ny melding fra kontaktskjemaet
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; border-bottom: 1px solid #f5f5f5;">Navn:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">E-post:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">
                <a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">Emne:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">${subject}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #d32f2f; margin-bottom: 25px;">
            <h4 style="margin: 0 0 10px 0; color: #555555;">Melding:</h4>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #888888; text-align: center; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
            Dette er en automatisk generert e-post fra nettsiden til Eidsvoll Kampsportklubb.<br />
            Når du svarer på denne e-posten, svarer du direkte til innsenderen på <strong>${email}</strong>.
          </p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("E-post sendt suksessfullt. MessageId:", info.messageId);
    } catch (error) {
      console.error("Feil ved sending av e-post via Nodemailer:", error);
      throw error;
    }
  }
);
