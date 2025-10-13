import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OptionModalProps {
  /** Le texte du bouton qui ouvre la modale */
  triggerLabel: string;
  /** Le titre affiché dans la modale */
  title: string;
  /** La description principale de la modale (contenu textuel ou JSX) */
  description?: React.ReactNode;
  /** Le label du bouton de fermeture */
  closeLabel?: string;
  /** Contenu personnalisé à afficher dans la modale */
  children?: React.ReactNode;
  /** Action facultative exécutée à la fermeture */
  onClose?: () => void;
}

export default function OptionModal({
  triggerLabel,
  title,
  description,
  closeLabel = "Fermer",
  children,
  onClose,
}: OptionModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents text-left">
          <DialogTitle className="border-b px-6 py-4 text-base font-semibold">
            {title}
          </DialogTitle>

          <div className="overflow-y-auto">
            {description && (
              <DialogDescription asChild>
                <div className="px-6 py-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </div>
              </DialogDescription>
            )}

            {children && <div className="px-6 py-4">{children}</div>}

            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" onClick={onClose}>
                  {closeLabel}
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
