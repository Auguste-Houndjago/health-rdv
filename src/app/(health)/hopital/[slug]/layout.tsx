import UserHeader from '@/components/user/UserHeader';
import { getHopitalBySlug } from '@/services/hopitaux';
import { getUserInfo } from '@/services/users';
import { redirect } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}


export default async function OrganizationLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  try {
    // Validation du slug
    if (!slug) {
      redirect('/');
    }

    // Récupération sécurisée des informations utilisateur
    let user;
    try {
      user = await getUserInfo({ cache: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      redirect('/login');
    }

    if (!user) {
      redirect('/login');
    }

    // Récupération sécurisée de l'hôpital
    let hopital;
    try {
      hopital = await getHopitalBySlug({slug});
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'hôpital (${params.slug}):`, error);
      // L'hôpital peut être null, on continue quand même
      hopital = null;
    }

    // Si l'hôpital n'existe pas, afficher une erreur
    if (!hopital) {
      return (
        <div className="min-h-screen h-full flex items-center justify-center p-6">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Hôpital introuvable</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>L'hôpital avec l'identifiant "{params.slug}" n'existe pas ou n'est plus disponible.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="min-h-screen h-full">
        <div>
          <UserHeader 
            avatarUrl={user?.avatar_url} 
            name={user?.nom || user?.email?.split('@')[0] || 'Utilisateur'}
            hopital={hopital}
          />
        </div>
                   
        {children}
      </div>
    );

  } catch (error) {
    // Erreur globale non gérée
    console.error('Erreur critique dans le layout hopital:', error);
    
    return (
      <div className="min-h-screen h-full flex items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur serveur</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>Une erreur inattendue s'est produite lors du chargement de la page.</p>
            <p className="text-sm text-muted-foreground">
              Veuillez réessayer ultérieurement ou contacter le support si le problème persiste.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}