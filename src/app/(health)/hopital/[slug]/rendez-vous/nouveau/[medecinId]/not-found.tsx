import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import NoiseOverlay from "@/components/design/NoiseOverlay"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Alert variant="default" className="max-w-md">
        <NoiseOverlay intensity={18} blendMode="difference" />
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Médecin introuvable</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>Le médecin que vous recherchez n'existe pas ou n'est plus disponible.</p>
          <Button asChild variant="outline" className="w-full">
            <Link href="../">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste des médecins
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}

