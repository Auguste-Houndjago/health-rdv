"use server";

import transporter from "@/lib/nodemailer";
import { 
  RendezVousNotificationData, 
  NotificationResult,
  DemandeHopitalNotificationData
} from './types';
import {
  getPatientCreatedTemplate,
  getMedecinCreatedTemplate,
  getPatientConfirmedTemplate,
  getCancelledTemplate,
  getAdminDemandeCreatedTemplate,
  getMedecinDemandeApprouveeTemplate,
  getMedecinDemandeRefuseeTemplate
} from './templates';
import { EMAIL_CONFIG } from './config';

const FROM_EMAIL = EMAIL_CONFIG.FROM.EMAIL;
const FROM_NAME = EMAIL_CONFIG.FROM.NAME;

// --- Fonction d'envoi d'email texte simple ---
export async function sendPlainEmail(to: string, subject: string, message: string) {
  try {
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject,
      text: message,
    });

    return { success: true, data: info };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Fonction principale d'envoi email HTML + texte ---
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<NotificationResult> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return { success: false, error: 'Service d\'email non configuré' };
    }

    const finalTo = EMAIL_CONFIG.TEST_MODE ? EMAIL_CONFIG.TEST_EMAIL : to;

    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: finalTo,
      subject: EMAIL_CONFIG.TEST_MODE ? `[TEST] ${subject}` : subject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    return { success: false, error: error.message || 'Erreur lors de l\'envoi de l\'email' };
  }
}

// --- Notifications RDV ---

export async function sendRendezVousCreatedNotification(
  data: RendezVousNotificationData
): Promise<{ patient: NotificationResult; medecin: NotificationResult }> {

  const patientTemplate = getPatientCreatedTemplate(data);
  const patientResult = await sendEmail(
    data.patient.email,
    patientTemplate.subject,
    patientTemplate.html,
    patientTemplate.text
  );

  const medecinTemplate = getMedecinCreatedTemplate(data);
  const medecinResult = await sendEmail(
    data.medecin.email,
    medecinTemplate.subject,
    medecinTemplate.html,
    medecinTemplate.text
  );

  return { patient: patientResult, medecin: medecinResult };
}

export async function sendRendezVousConfirmedNotification(
  data: RendezVousNotificationData
): Promise<NotificationResult> {
  const template = getPatientConfirmedTemplate(data);
  return await sendEmail(
    data.patient.email,
    template.subject,
    template.html,
    template.text
  );
}

export async function sendRendezVousCancelledNotification(
  data: RendezVousNotificationData
): Promise<{ patient: NotificationResult; medecin: NotificationResult }> {

  const patientTemplate = getCancelledTemplate(data, 'PATIENT');
  const medecinTemplate = getCancelledTemplate(data, 'MEDECIN');

  const patientResult = await sendEmail(
    data.patient.email,
    patientTemplate.subject,
    patientTemplate.html,
    patientTemplate.text
  );

  const medecinResult = await sendEmail(
    data.medecin.email,
    medecinTemplate.subject,
    medecinTemplate.html,
    medecinTemplate.text
  );

  return { patient: patientResult, medecin: medecinResult };
}

export async function sendRendezVousReminderNotification(
  data: RendezVousNotificationData
): Promise<NotificationResult> {

  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Rappel de Rendez-vous</h1>
          </div>
          <div class="content">
            <p>Bonjour ${data.patient.prenom} ${data.patient.nom},</p>
            <p>Nous vous rappelons que vous avez un rendez-vous demain :</p>
            <div class="card">
              <p><strong>📅 Date :</strong> ${dateFormatted}</p>
              <p><strong>🕐 Heure :</strong> ${data.heure || ''}</p>
              <p><strong>👨‍⚕️ Médecin :</strong> Dr. ${data.medecin.prenom} ${data.medecin.nom}</p>
              ${data.hopital ? `<p><strong>🏥 Lieu :</strong> ${data.hopital.nom}</p>` : ''}
            </div>
            <p>N'oubliez pas d'arriver 15 minutes avant l'heure prévue.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Bonjour ${data.patient.prenom} ${data.patient.nom},

Nous vous rappelons que vous avez un rendez-vous demain :

Date : ${dateFormatted}
Heure : ${data.heure || ''}
Médecin : Dr. ${data.medecin.prenom} ${data.medecin.nom}
${data.hopital ? `Lieu : ${data.hopital.nom}` : ''}

N'oubliez pas d'arriver 15 minutes avant l'heure prévue.
  `;

  return await sendEmail(
    data.patient.email,
    `Rappel : Rendez-vous demain avec Dr. ${data.medecin.nom}`,
    html,
    text
  );
}

// --- Notifications Demandes Hôpital ---

/**
 * Envoie une notification à l'admin quand un médecin fait une demande
 */
export async function sendDemandeHopitalCreatedNotification(
  data: DemandeHopitalNotificationData,
  adminEmail: string
): Promise<NotificationResult> {
  const template = getAdminDemandeCreatedTemplate(data);
  return await sendEmail(
    adminEmail,
    template.subject,
    template.html,
    template.text
  );
}

/**
 * Envoie une notification au médecin quand sa demande est approuvée
 */
export async function sendDemandeHopitalApprouveeNotification(
  data: DemandeHopitalNotificationData
): Promise<NotificationResult> {
  const template = getMedecinDemandeApprouveeTemplate(data);
  return await sendEmail(
    data.medecin.email,
    template.subject,
    template.html,
    template.text
  );
}

/**
 * Envoie une notification au médecin quand sa demande est refusée
 */
export async function sendDemandeHopitalRefuseeNotification(
  data: DemandeHopitalNotificationData
): Promise<NotificationResult> {
  const template = getMedecinDemandeRefuseeTemplate(data);
  return await sendEmail(
    data.medecin.email,
    template.subject,
    template.html,
    template.text
  );
}
