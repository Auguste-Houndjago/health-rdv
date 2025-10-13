// Configuration centralisée pour le service de notifications

/**
 * Configuration des emails
 */
export const EMAIL_CONFIG = {
  FROM: {
    EMAIL: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'noreply@health.com',
    NAME: 'Plateforme Santé'
  },
  
  // Activer/désactiver l'envoi réel d'emails (utile pour dev/test)
  ENABLED: process.env.NODE_ENV === 'production' || process.env.ENABLE_EMAILS === 'true',
  
  // Mode debug pour voir les logs détaillés
  DEBUG: process.env.DEBUG_EMAILS === 'true',
  
  // Mode TEST : Rediriger tous les emails vers cette adresse en développement
  TEST_MODE: process.env.NODE_ENV !== 'production',
  TEST_EMAIL: process.env.SMTP_TEST_EMAIL || 'piratestuart@gmail.com'
} as const;

/**
 * Couleurs pour les différents types de notifications
 */
export const NOTIFICATION_COLORS = {
  CREATED: '#3B82F6',      // Bleu
  CONFIRMED: '#10B981',    // Vert
  CANCELLED: '#EF4444',    // Rouge
  REMINDER: '#F59E0B',     // Orange
  UPDATED: '#8B5CF6'       // Violet
} as const;

/**
 * Délais pour les rappels
 */
export const REMINDER_DELAYS = {
  BEFORE_24H: 24 * 60 * 60 * 1000,  // 24 heures en ms
  BEFORE_2H: 2 * 60 * 60 * 1000      // 2 heures en ms
} as const;

/**
 * Messages d'erreur standardisés
 */
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Service d\'email non configuré',
  SEND_FAILED: 'Erreur lors de l\'envoi de l\'email',
  INVALID_DATA: 'Données de notification invalides'
} as const;

/**
 * Vérifier que la configuration est valide
 */
export function validateEmailConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!process.env.SMTP_USER) {
    errors.push('SMTP_USER manquante dans les variables d\'environnement');
  }
  
  if (!process.env.SMTP_PASSWORD) {
    errors.push('SMTP_PASSWORD manquante dans les variables d\'environnement');
  }
  
  if (!EMAIL_CONFIG.FROM.EMAIL.includes('@')) {
    errors.push('SMTP_FROM_EMAIL invalide (doit contenir @)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

