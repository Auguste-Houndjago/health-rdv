// Templates d'emails pour les notifications

import { RendezVousNotificationData, DemandeHopitalNotificationData } from './types';

/**
 * Formate la date en français
 */
function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formate l'heure
 */
function formatTime(date: Date | string, heure?: string): string {
  if (heure) return heure;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Template pour la création d'un rendez-vous (Patient)
 */
export function getPatientCreatedTemplate(data: RendezVousNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateFormatted = formatDate(data.date);
  const timeFormatted = formatTime(data.date, data.heure);

  return {
    subject: `Confirmation de votre rendez-vous - ${dateFormatted}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3B82F6; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { font-weight: bold; width: 120px; }
            .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Rendez-vous Confirmé</h1>
            </div>
            <div class="content">
              <p>Bonjour ${data.patient.prenom} ${data.patient.nom},</p>
              <p>Votre rendez-vous a été confirmé avec succès.</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #3B82F6;">Détails du Rendez-vous</h2>
                <div class="info-row">
                  <span class="info-label">📅 Date :</span>
                  <span>${dateFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">🕐 Heure :</span>
                  <span>${timeFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">⏱️ Durée :</span>
                  <span>${data.duree} minutes</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📋 Motif :</span>
                  <span>${data.motif}</span>
                </div>
              </div>

              <div class="card">
                <h2 style="margin-top: 0; color: #3B82F6;">Votre Médecin</h2>
                <div class="info-row">
                  <span class="info-label">👨‍⚕️ Médecin :</span>
                  <span>Dr. ${data.medecin.prenom} ${data.medecin.nom}</span>
                </div>
                ${data.medecin.specialite ? `
                <div class="info-row">
                  <span class="info-label">🩺 Spécialité :</span>
                  <span>${data.medecin.specialite}</span>
                </div>
                ` : ''}
                ${data.hopital ? `
                <div class="info-row">
                  <span class="info-label">🏥 Hôpital :</span>
                  <span>${data.hopital.nom}</span>
                </div>
                ${data.hopital.adresse ? `
                <div class="info-row">
                  <span class="info-label">📍 Adresse :</span>
                  <span>${data.hopital.adresse}</span>
                </div>
                ` : ''}
                ` : ''}
              </div>

              <div style="background: #FEF3C7; padding: 15px; border-radius: 6px; border-left: 4px solid #F59E0B;">
                <p style="margin: 0;"><strong>⚠️ Informations importantes :</strong></p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Arrivez 15 minutes avant l'heure prévue</li>
                  <li>Apportez votre carte vitale et pièce d'identité</li>
                  <li>Vous recevrez un rappel 24h avant la consultation</li>
                </ul>
              </div>

              <div class="footer">
                <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre.</p>
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour ${data.patient.prenom} ${data.patient.nom},

Votre rendez-vous a été confirmé avec succès.

DÉTAILS DU RENDEZ-VOUS
----------------------
Date : ${dateFormatted}
Heure : ${timeFormatted}
Durée : ${data.duree} minutes
Motif : ${data.motif}

VOTRE MÉDECIN
-------------
Médecin : Dr. ${data.medecin.prenom} ${data.medecin.nom}
${data.medecin.specialite ? `Spécialité : ${data.medecin.specialite}` : ''}
${data.hopital ? `Hôpital : ${data.hopital.nom}` : ''}
${data.hopital?.adresse ? `Adresse : ${data.hopital.adresse}` : ''}

INFORMATIONS IMPORTANTES
------------------------
- Arrivez 15 minutes avant l'heure prévue
- Apportez votre carte vitale et pièce d'identité
- Vous recevrez un rappel 24h avant la consultation

Cet email a été envoyé automatiquement.
    `
  };
}

/**
 * Template pour la création d'un rendez-vous (Médecin)
 */
export function getMedecinCreatedTemplate(data: RendezVousNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateFormatted = formatDate(data.date);
  const timeFormatted = formatTime(data.date, data.heure);

  return {
    subject: `Nouveau rendez-vous - ${data.patient.prenom} ${data.patient.nom}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10B981; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { font-weight: bold; width: 120px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Nouveau Rendez-vous</h1>
            </div>
            <div class="content">
              <p>Bonjour Dr. ${data.medecin.prenom} ${data.medecin.nom},</p>
              <p>Un nouveau rendez-vous a été programmé dans votre planning.</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #10B981;">Patient</h2>
                <div class="info-row">
                  <span class="info-label">👤 Nom :</span>
                  <span>${data.patient.prenom} ${data.patient.nom}</span>
                </div>
                ${data.patient.telephone ? `
                <div class="info-row">
                  <span class="info-label">📞 Téléphone :</span>
                  <span>${data.patient.telephone}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">📧 Email :</span>
                  <span>${data.patient.email}</span>
                </div>
              </div>

              <div class="card">
                <h2 style="margin-top: 0; color: #10B981;">Consultation</h2>
                <div class="info-row">
                  <span class="info-label">📅 Date :</span>
                  <span>${dateFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">🕐 Heure :</span>
                  <span>${timeFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">⏱️ Durée :</span>
                  <span>${data.duree} minutes</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📋 Motif :</span>
                  <span>${data.motif}</span>
                </div>
              </div>

              <div class="footer">
                <p>Connectez-vous à votre espace médecin pour voir tous les détails.</p>
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour Dr. ${data.medecin.prenom} ${data.medecin.nom},

Un nouveau rendez-vous a été programmé dans votre planning.

PATIENT
-------
Nom : ${data.patient.prenom} ${data.patient.nom}
${data.patient.telephone ? `Téléphone : ${data.patient.telephone}` : ''}
Email : ${data.patient.email}

CONSULTATION
------------
Date : ${dateFormatted}
Heure : ${timeFormatted}
Durée : ${data.duree} minutes
Motif : ${data.motif}

Connectez-vous à votre espace médecin pour voir tous les détails.
    `
  };
}

/**
 * Template pour la confirmation d'un rendez-vous (Patient)
 */
export function getPatientConfirmedTemplate(data: RendezVousNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateFormatted = formatDate(data.date);
  const timeFormatted = formatTime(data.date, data.heure);

  return {
    subject: `Rendez-vous confirmé par le médecin - ${dateFormatted}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10B981; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { font-weight: bold; width: 120px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Rendez-vous Confirmé</h1>
            </div>
            <div class="content">
              <p>Bonjour ${data.patient.prenom} ${data.patient.nom},</p>
              <p>Bonne nouvelle ! Votre rendez-vous a été confirmé par le médecin.</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #10B981;">Rendez-vous</h2>
                <div class="info-row">
                  <span class="info-label">📅 Date :</span>
                  <span>${dateFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">🕐 Heure :</span>
                  <span>${timeFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">👨‍⚕️ Médecin :</span>
                  <span>Dr. ${data.medecin.prenom} ${data.medecin.nom}</span>
                </div>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour ${data.patient.prenom} ${data.patient.nom},

Bonne nouvelle ! Votre rendez-vous a été confirmé par le médecin.

Date : ${dateFormatted}
Heure : ${timeFormatted}
Médecin : Dr. ${data.medecin.prenom} ${data.medecin.nom}
    `
  };
}

/**
 * Template pour l'annulation d'un rendez-vous
 */
export function getCancelledTemplate(data: RendezVousNotificationData, recipient: 'PATIENT' | 'MEDECIN'): {
  subject: string;
  html: string;
  text: string;
} {
  const dateFormatted = formatDate(data.date);
  const timeFormatted = formatTime(data.date, data.heure);
  const recipientName = recipient === 'PATIENT' 
    ? `${data.patient.prenom} ${data.patient.nom}`
    : `Dr. ${data.medecin.prenom} ${data.medecin.nom}`;

  return {
    subject: `Rendez-vous annulé - ${dateFormatted}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #EF4444; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { font-weight: bold; width: 120px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Rendez-vous Annulé</h1>
            </div>
            <div class="content">
              <p>Bonjour ${recipientName},</p>
              <p>Nous vous informons que le rendez-vous suivant a été annulé.</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #EF4444;">Détails</h2>
                <div class="info-row">
                  <span class="info-label">📅 Date :</span>
                  <span>${dateFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">🕐 Heure :</span>
                  <span>${timeFormatted}</span>
                </div>
                ${recipient === 'PATIENT' ? `
                <div class="info-row">
                  <span class="info-label">👨‍⚕️ Médecin :</span>
                  <span>Dr. ${data.medecin.prenom} ${data.medecin.nom}</span>
                </div>
                ` : `
                <div class="info-row">
                  <span class="info-label">👤 Patient :</span>
                  <span>${data.patient.prenom} ${data.patient.nom}</span>
                </div>
                `}
              </div>

              ${recipient === 'PATIENT' ? `
              <p>Vous pouvez reprendre un nouveau rendez-vous sur notre plateforme.</p>
              ` : ''}

              <div class="footer">
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour ${recipientName},

Nous vous informons que le rendez-vous suivant a été annulé.

Date : ${dateFormatted}
Heure : ${timeFormatted}
${recipient === 'PATIENT' ? `Médecin : Dr. ${data.medecin.prenom} ${data.medecin.nom}` : `Patient : ${data.patient.prenom} ${data.patient.nom}`}

${ recipient === 'PATIENT' ? 'Vous pouvez reprendre un nouveau rendez-vous sur notre plateforme.' : ''}
    `
  };
}

/**
 * Template pour nouvelle demande d'hôpital (Admin)
 */
export function getAdminDemandeCreatedTemplate(data: DemandeHopitalNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateFormatted = formatDate(data.dateDemande);

  return {
    subject: `Nouvelle demande d'affiliation - Dr. ${data.medecin.nom}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3B82F6; }
            .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
            .info-label { font-weight: 600; color: #6b7280; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
            .badge-pending { background: #FEF3C7; color: #92400E; }
            .button { display: inline-block; padding: 12px 24px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏥 Nouvelle Demande d'Affiliation</h1>
            </div>
            <div class="content">
              <p>Bonjour,</p>
              <p>Un médecin a soumis une nouvelle demande d'affiliation à un hôpital.</p>

              <div class="card">
                <h3>👨‍⚕️ Informations du Médecin</h3>
                <div class="info-row">
                  <span class="info-label">Nom complet :</span>
                  <span>${data.medecin.titre || 'Dr.'} ${data.medecin.prenom} ${data.medecin.nom}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📧 Email :</span>
                  <span>${data.medecin.email}</span>
                </div>
                ${data.medecin.telephone ? `
                <div class="info-row">
                  <span class="info-label">📱 Téléphone :</span>
                  <span>${data.medecin.telephone}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">🆔 N° Licence :</span>
                  <span>${data.medecin.numLicence}</span>
                </div>
                ${data.medecin.specialite ? `
                <div class="info-row">
                  <span class="info-label">🩺 Spécialité :</span>
                  <span>${data.medecin.specialite}</span>
                </div>
                ` : ''}
                ${data.medecin.anneeExperience ? `
                <div class="info-row">
                  <span class="info-label">📅 Expérience :</span>
                  <span>${data.medecin.anneeExperience} ans</span>
                </div>
                ` : ''}
              </div>

              <div class="card">
                <h3>🏥 Hôpital Demandé</h3>
                <div class="info-row">
                  <span class="info-label">Nom :</span>
                  <span>${data.hopital.nom}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📍 Adresse :</span>
                  <span>${data.hopital.adresse}</span>
                </div>
              </div>

              ${data.message ? `
              <div class="card">
                <h3>💬 Message du Médecin</h3>
                <p style="color: #6b7280; font-style: italic;">${data.message}</p>
              </div>
              ` : ''}

              <div class="card">
                <div class="info-row">
                  <span class="info-label">📅 Date de la demande :</span>
                  <span>${dateFormatted}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Statut :</span>
                  <span><span class="badge badge-pending">⏳ En attente</span></span>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <p style="margin-bottom: 15px; font-weight: 600;">Veuillez traiter cette demande :</p>
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/demandes" class="button">
                  📋 Voir les Demandes
                </a>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour,

Un médecin a soumis une nouvelle demande d'affiliation à un hôpital.

=== MÉDECIN ===
Nom : ${data.medecin.titre || 'Dr.'} ${data.medecin.prenom} ${data.medecin.nom}
Email : ${data.medecin.email}
${data.medecin.telephone ? `Téléphone : ${data.medecin.telephone}` : ''}
N° Licence : ${data.medecin.numLicence}
${data.medecin.specialite ? `Spécialité : ${data.medecin.specialite}` : ''}
${data.medecin.anneeExperience ? `Expérience : ${data.medecin.anneeExperience} ans` : ''}

=== HÔPITAL DEMANDÉ ===
Nom : ${data.hopital.nom}
Adresse : ${data.hopital.adresse}

${data.message ? `=== MESSAGE DU MÉDECIN ===\n${data.message}\n` : ''}
=== DÉTAILS ===
Date de la demande : ${dateFormatted}
Statut : En attente

Veuillez vous connecter à la plateforme pour traiter cette demande :
${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/demandes
    `
  };
}

/**
 * Template pour demande approuvée (Médecin)
 */
export function getMedecinDemandeApprouveeTemplate(data: DemandeHopitalNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `✅ Votre demande a été approuvée - ${data.hopital.nom}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10B981; }
            .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #10B981; color: white; text-decoration: none; border-radius: 6px; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Demande Approuvée</h1>
            </div>
            <div class="content">
              <div class="success-icon">🎉</div>
              <p>Bonjour Dr. ${data.medecin.nom},</p>
              <p>Félicitations ! Votre demande d'affiliation a été approuvée.</p>

              <div class="card">
                <h3>🏥 ${data.hopital.nom}</h3>
                <p><strong>📍 Adresse :</strong> ${data.hopital.adresse}</p>
                ${data.reponse ? `<p><strong>💬 Réponse de l'administration :</strong></p><p style="color: #6b7280; font-style: italic;">${data.reponse}</p>` : ''}
              </div>

              <p>Vous pouvez maintenant :</p>
              <ul>
                <li>✅ Gérer vos disponibilités pour cet hôpital</li>
                <li>✅ Recevoir des demandes de rendez-vous</li>
                <li>✅ Consulter vos statistiques</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/medecin/disponibilites" class="button">
                  📅 Gérer mes Disponibilités
                </a>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour Dr. ${data.medecin.nom},

Félicitations ! Votre demande d'affiliation a été approuvée.

=== HÔPITAL ===
${data.hopital.nom}
Adresse : ${data.hopital.adresse}

${data.reponse ? `=== RÉPONSE DE L'ADMINISTRATION ===\n${data.reponse}\n` : ''}
Vous pouvez maintenant :
- Gérer vos disponibilités pour cet hôpital
- Recevoir des demandes de rendez-vous
- Consulter vos statistiques

Connectez-vous à la plateforme :
${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/medecin/disponibilites
    `
  };
}

/**
 * Template pour demande refusée (Médecin)
 */
export function getMedecinDemandeRefuseeTemplate(data: DemandeHopitalNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `❌ Votre demande n'a pas été approuvée - ${data.hopital.nom}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #EF4444; }
            .button { display: inline-block; padding: 12px 24px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Demande Non Approuvée</h1>
            </div>
            <div class="content">
              <p>Bonjour Dr. ${data.medecin.nom},</p>
              <p>Nous vous informons que votre demande d'affiliation n'a pas été approuvée.</p>

              <div class="card">
                <h3>🏥 ${data.hopital.nom}</h3>
                <p><strong>📍 Adresse :</strong> ${data.hopital.adresse}</p>
                ${data.reponse ? `<p><strong>💬 Raison du refus :</strong></p><p style="color: #6b7280; font-style: italic;">${data.reponse}</p>` : ''}
              </div>

              <p>Vous pouvez :</p>
              <ul>
                <li>📧 Contacter l'administration pour plus d'informations</li>
                <li>🔄 Soumettre une nouvelle demande ultérieurement</li>
                <li>🏥 Postuler à d'autres hôpitaux</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/medecin/hopitaux" class="button">
                  🏥 Voir les Hôpitaux
                </a>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Plateforme Santé</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Bonjour Dr. ${data.medecin.nom},

Nous vous informons que votre demande d'affiliation n'a pas été approuvée.

=== HÔPITAL ===
${data.hopital.nom}
Adresse : ${data.hopital.adresse}

${data.reponse ? `=== RAISON DU REFUS ===\n${data.reponse}\n` : ''}
Vous pouvez :
- Contacter l'administration pour plus d'informations
- Soumettre une nouvelle demande ultérieurement
- Postuler à d'autres hôpitaux

Connectez-vous à la plateforme :
${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/medecin/hopitaux
    `
  };
}

