"use server"


import { resend } from '@/lib/resend';
import { 
  NotificationType, 
  RendezVousNotificationData, 
  NotificationResult 
} from './types';
import {
  getPatientCreatedTemplate,
  getMedecinCreatedTemplate,
  getPatientConfirmedTemplate,
  getCancelledTemplate
} from './templates';
import { EMAIL_CONFIG } from './config';

const FROM_EMAIL = EMAIL_CONFIG.FROM.EMAIL;
const FROM_NAME = EMAIL_CONFIG.FROM.NAME;




// Tu peux envoyer un email texte brut...
export async function sendPlainEmail(to: string, subject: string, message: string) {
  try {
    console.log('\n📤 === ENVOI EMAIL TEXTE BRUT ===');
    console.log('📧 Destinataire:', to);
    console.log('📝 Sujet:', subject);
    console.log('📄 Message:', message.substring(0, 100) + (message.length > 100 ? '...' : ''));
    console.log('🔑 From: Attendancy <onboarding@resend.dev>');

    const response = await resend.emails.send({
      from: "Attendancy <onboarding@resend.dev>",
      to,
      subject,
      text: message,
    });

    console.log('✅ Email texte envoyé avec succès !');
    console.log('🆔 Response:', JSON.stringify(response, null, 2));
    console.log('================================\n');

    return { success: true, data: response };
  } catch (error) {
    console.error('\n❌ Erreur envoi email texte:', error);
    console.error('📧 Destinataire concerné:', to);
    console.error('================================\n');
    return { success: false, error };
  }
}








/**
 * Service principal d'envoi d'emails
 */
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<NotificationResult> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY non configurée, email non envoyé');
      console.warn('📧 Détails email (non envoyé):', {
        destinataire: to,
        sujet: subject,
        longueurHtml: html.length,
        longueurText: text.length
      });
      return {
        success: false,
        error: 'Service d\'email non configuré'
      };
    }

    // En mode TEST, rediriger tous les emails vers l'email de test
    const finalTo = EMAIL_CONFIG.TEST_MODE ? EMAIL_CONFIG.TEST_EMAIL : to;
    
    if (EMAIL_CONFIG.TEST_MODE && to !== finalTo) {
      console.log('🧪 MODE TEST : Email redirigé');
      console.log(`   Original: ${to}`);
      console.log(`   → Test: ${finalTo}`);
    }

    console.log('\n📤 === ENVOI EMAIL ===');
    console.log('📧 Destinataire:', finalTo, EMAIL_CONFIG.TEST_MODE ? '(MODE TEST)' : '');
    console.log('📝 Sujet:', subject);
    console.log('📊 Taille HTML:', html.length, 'caractères');
    console.log('📊 Taille Texte:', text.length, 'caractères');
    console.log('🔑 From:', `${FROM_NAME} <${FROM_EMAIL}>`);

    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [finalTo],
      subject: EMAIL_CONFIG.TEST_MODE ? `[TEST] ${subject}` : subject,
      html,
      text
    });

    if (error) {
      console.error('❌ Erreur Resend:', error);
      console.error('📧 Email non envoyé à:', to);
      return {
        success: false,
        error: error.message || 'Erreur lors de l\'envoi de l\'email'
      };
    }

    console.log('✅ Email envoyé avec succès !');
    console.log('🆔 Message ID:', data?.id);
    console.log('📧 Envoyé à:', to);
    console.log('⏰ Date:', new Date().toLocaleString('fr-FR'));
    console.log('===================\n');

    return {
      success: true,
      messageId: data?.id
    };

  } catch (error) {
    console.error('❌ Erreur critique lors de l\'envoi de l\'email:', error);
    console.error('📧 Destinataire concerné:', to);
    return {
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email'
    };
  }
}

/**
 * Envoie une notification pour un rendez-vous créé
 */
export async function sendRendezVousCreatedNotification(
  data: RendezVousNotificationData
): Promise<{ patient: NotificationResult; medecin: NotificationResult }> {
  console.log('\n🎯 ======================================');
  console.log('📧 NOTIFICATION: CRÉATION DE RENDEZ-VOUS');
  console.log('======================================');
  console.log('📋 Détails du RDV:');
  console.log('  🆔 ID:', data.id);
  console.log('  📅 Date:', data.date instanceof Date ? data.date.toLocaleDateString('fr-FR') : data.date);
  console.log('  🕐 Heure:', data.heure || 'N/A');
  console.log('  ⏱️  Durée:', data.duree, 'minutes');
  console.log('  📝 Motif:', data.motif);
  console.log('\n👤 Patient:');
  console.log('  📧 Email:', data.patient.email);
  console.log('  👨‍⚕️ Nom:', `${data.patient.prenom} ${data.patient.nom}`);
  console.log('  📱 Téléphone:', data.patient.telephone || 'N/A');
  console.log('\n👨‍⚕️ Médecin:');
  console.log('  📧 Email:', data.medecin.email);
  console.log('  👨‍⚕️ Nom:', `Dr. ${data.medecin.prenom} ${data.medecin.nom}`);
  console.log('  🩺 Spécialité:', data.medecin.specialite || 'N/A');
  if (data.hopital) {
    console.log('\n🏥 Hôpital:');
    console.log('  🏢 Nom:', data.hopital.nom);
    console.log('  📍 Adresse:', data.hopital.adresse || 'N/A');
  }
  console.log('======================================\n');

  // Email au patient
  console.log('📤 [1/2] Envoi email au PATIENT...');
  const patientTemplate = getPatientCreatedTemplate(data);
  const patientResult = await sendEmail(
    data.patient.email,
    patientTemplate.subject,
    patientTemplate.html,
    patientTemplate.text
  );

  // Email au médecin
  console.log('📤 [2/2] Envoi email au MÉDECIN...');
  const medecinTemplate = getMedecinCreatedTemplate(data);
  const medecinResult = await sendEmail(
    data.medecin.email,
    medecinTemplate.subject,
    medecinTemplate.html,
    medecinTemplate.text
  );

  // Résumé final
  console.log('\n📊 === RÉSUMÉ ENVOI NOTIFICATIONS ===');
  console.log('👤 Patient:', patientResult.success ? '✅ Envoyé' : '❌ Échec');
  if (patientResult.success) {
    console.log('   🆔 Message ID:', patientResult.messageId);
  } else {
    console.log('   ⚠️  Erreur:', patientResult.error);
  }
  console.log('👨‍⚕️ Médecin:', medecinResult.success ? '✅ Envoyé' : '❌ Échec');
  if (medecinResult.success) {
    console.log('   🆔 Message ID:', medecinResult.messageId);
  } else {
    console.log('   ⚠️  Erreur:', medecinResult.error);
  }
  console.log('=====================================\n');

  return {
    patient: patientResult,
    medecin: medecinResult
  };
}

/**
 * Envoie une notification pour un rendez-vous confirmé
 */
export async function sendRendezVousConfirmedNotification(
  data: RendezVousNotificationData
): Promise<NotificationResult> {
  console.log('\n🎯 ======================================');
  console.log('✅ NOTIFICATION: CONFIRMATION DE RDV');
  console.log('======================================');
  console.log('📋 Détails du RDV:');
  console.log('  🆔 ID:', data.id);
  console.log('  📅 Date:', data.date instanceof Date ? data.date.toLocaleDateString('fr-FR') : data.date);
  console.log('  🕐 Heure:', data.heure || 'N/A');
  console.log('  👨‍⚕️ Médecin:', `Dr. ${data.medecin.prenom} ${data.medecin.nom}`);
  console.log('\n👤 Destinataire (Patient):');
  console.log('  📧 Email:', data.patient.email);
  console.log('  👤 Nom:', `${data.patient.prenom} ${data.patient.nom}`);
  console.log('======================================\n');

  console.log('📤 Envoi email de CONFIRMATION au patient...');
  const template = getPatientConfirmedTemplate(data);
  const result = await sendEmail(
    data.patient.email,
    template.subject,
    template.html,
    template.text
  );

  console.log('\n📊 === RÉSUMÉ CONFIRMATION ===');
  console.log('Statut:', result.success ? '✅ Envoyé' : '❌ Échec');
  if (result.success) {
    console.log('🆔 Message ID:', result.messageId);
  } else {
    console.log('⚠️  Erreur:', result.error);
  }
  console.log('==============================\n');

  return result;
}

/**
 * Envoie une notification pour un rendez-vous annulé
 */
export async function sendRendezVousCancelledNotification(
  data: RendezVousNotificationData
): Promise<{ patient: NotificationResult; medecin: NotificationResult }> {
  console.log('\n🎯 ======================================');
  console.log('❌ NOTIFICATION: ANNULATION DE RDV');
  console.log('======================================');
  console.log('📋 Détails du RDV annulé:');
  console.log('  🆔 ID:', data.id);
  console.log('  📅 Date:', data.date instanceof Date ? data.date.toLocaleDateString('fr-FR') : data.date);
  console.log('  🕐 Heure:', data.heure || 'N/A');
  console.log('  📝 Motif original:', data.motif);
  console.log('\n👤 Patient:');
  console.log('  📧 Email:', data.patient.email);
  console.log('  👤 Nom:', `${data.patient.prenom} ${data.patient.nom}`);
  console.log('\n👨‍⚕️ Médecin:');
  console.log('  📧 Email:', data.medecin.email);
  console.log('  👨‍⚕️ Nom:', `Dr. ${data.medecin.prenom} ${data.medecin.nom}`);
  console.log('======================================\n');

  // Email au patient
  console.log('📤 [1/2] Envoi email d\'ANNULATION au PATIENT...');
  const patientTemplate = getCancelledTemplate(data, 'PATIENT');
  const patientResult = await sendEmail(
    data.patient.email,
    patientTemplate.subject,
    patientTemplate.html,
    patientTemplate.text
  );

  // Email au médecin
  console.log('📤 [2/2] Envoi email d\'ANNULATION au MÉDECIN...');
  const medecinTemplate = getCancelledTemplate(data, 'MEDECIN');
  const medecinResult = await sendEmail(
    data.medecin.email,
    medecinTemplate.subject,
    medecinTemplate.html,
    medecinTemplate.text
  );

  // Résumé final
  console.log('\n📊 === RÉSUMÉ ANNULATION ===');
  console.log('👤 Patient:', patientResult.success ? '✅ Envoyé' : '❌ Échec');
  if (patientResult.success) {
    console.log('   🆔 Message ID:', patientResult.messageId);
  } else {
    console.log('   ⚠️  Erreur:', patientResult.error);
  }
  console.log('👨‍⚕️ Médecin:', medecinResult.success ? '✅ Envoyé' : '❌ Échec');
  if (medecinResult.success) {
    console.log('   🆔 Message ID:', medecinResult.messageId);
  } else {
    console.log('   ⚠️  Erreur:', medecinResult.error);
  }
  console.log('============================\n');

  return {
    patient: patientResult,
    medecin: medecinResult
  };
}

/**
 * Envoie une notification de rappel de rendez-vous (24h avant)
 */
export async function sendRendezVousReminderNotification(
  data: RendezVousNotificationData
): Promise<NotificationResult> {
  console.log('\n🎯 ======================================');
  console.log('⏰ NOTIFICATION: RAPPEL DE RDV');
  console.log('======================================');
  console.log('📋 Détails du RDV:');
  console.log('  🆔 ID:', data.id);
  console.log('  📅 Date:', data.date instanceof Date ? data.date.toLocaleDateString('fr-FR') : data.date);
  console.log('  🕐 Heure:', data.heure || 'N/A');
  console.log('  👨‍⚕️ Médecin:', `Dr. ${data.medecin.prenom} ${data.medecin.nom}`);
  console.log('\n👤 Destinataire (Patient):');
  console.log('  📧 Email:', data.patient.email);
  console.log('  👤 Nom:', `${data.patient.prenom} ${data.patient.nom}`);
  console.log('======================================\n');

  console.log('📤 Envoi email de RAPPEL au patient...');

  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const result = await sendEmail(
    data.patient.email,
    `Rappel : Rendez-vous demain avec Dr. ${data.medecin.nom}`,
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #F59E0B; }
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
    `,
    `
Bonjour ${data.patient.prenom} ${data.patient.nom},

Nous vous rappelons que vous avez un rendez-vous demain :

Date : ${dateFormatted}
Heure : ${data.heure || ''}
Médecin : Dr. ${data.medecin.prenom} ${data.medecin.nom}
${data.hopital ? `Lieu : ${data.hopital.nom}` : ''}

N'oubliez pas d'arriver 15 minutes avant l'heure prévue.
    `
  );

  console.log('\n📊 === RÉSUMÉ RAPPEL ===');
  console.log('Statut:', result.success ? '✅ Envoyé' : '❌ Échec');
  if (result.success) {
    console.log('🆔 Message ID:', result.messageId);
  } else {
    console.log('⚠️  Erreur:', result.error);
  }
  console.log('========================\n');

  return result;
}

