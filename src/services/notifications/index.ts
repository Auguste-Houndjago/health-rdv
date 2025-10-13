// Point d'entrée centralisé pour le service de notifications

export {
  sendRendezVousCreatedNotification,
  sendRendezVousConfirmedNotification,
  sendRendezVousCancelledNotification,
  sendRendezVousReminderNotification,
  sendPlainEmail,
  sendDemandeHopitalCreatedNotification,
  sendDemandeHopitalApprouveeNotification,
  sendDemandeHopitalRefuseeNotification
} from './email';

export type {
  NotificationType,
  NotificationRecipient,
  RendezVousNotificationData,
  NotificationResult,
  DemandeHopitalNotificationData
} from './types';

