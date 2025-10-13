"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RendezVousActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'change' | 'cancel'
  existingDate: string
  existingHour: string
  newDate?: string
  newHour?: string
  onConfirm: () => void
  loading?: boolean
}

export function RendezVousActionDialog({
  open,
  onOpenChange,
  type,
  existingDate,
  existingHour,
  newDate,
  newHour,
  onConfirm,
  loading = false
}: RendezVousActionDialogProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (type === 'change') {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Modifier votre rendez-vous ?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>Vous avez déjà un rendez-vous prévu :</p>
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">📅 {formatDate(existingDate)}</p>
                <p className="font-medium">🕐 {existingHour}</p>
              </div>
              
              {newDate && newHour && (
                <>
                  <p className="font-semibold">Nouveau rendez-vous :</p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="font-medium text-blue-900">📅 {formatDate(newDate)}</p>
                    <p className="font-medium text-blue-900">🕐 {newHour}</p>
                  </div>
                </>
              )}
              
              <p className="text-sm">Voulez-vous modifier votre rendez-vous ?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirm}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Modification...' : 'Modifier le rendez-vous'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Annuler votre rendez-vous ?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>Votre rendez-vous confirmé :</p>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium">📅 {formatDate(existingDate)}</p>
              <p className="font-medium">🕐 {existingHour}</p>
            </div>
            <p className="text-sm text-red-600">Cette action est irréversible. Voulez-vous vraiment annuler ce rendez-vous ?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Non, garder</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Annulation...' : 'Oui, annuler'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

