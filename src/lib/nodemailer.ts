import nodemailer from 'nodemailer';

/**
 * Configuration du transporteur Nodemailer
 * 
 * Supporte plusieurs fournisseurs :
 * - Gmail
 * - Outlook/Hotmail
 * - Yahoo
 * - SendGrid
 * - Mailtrap (pour les tests)
 * - SMTP personnalisé
 */

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true pour le port 465, false pour les autres
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Vérifier la connexion au démarrage (optionnel)
if (process.env.NODE_ENV !== 'production') {
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Erreur de connexion SMTP:', error);
    } else {
      console.log('✅ Serveur SMTP prêt à envoyer des emails');
    }
  });
}

export default transporter;

