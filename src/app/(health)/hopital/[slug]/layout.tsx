import UserHeader from '@/components/user/UserHeader';
import { getHopitalBySlug } from '@/services/hopitaux';
import { getUserInfo } from '@/services/users';
import { redirect } from 'next/navigation';


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
     return redirect('/login');
    }

    return (
      <div className="min-h-screen  h-full">
        <div>
          <UserHeader 
            avatarUrl={user?.avatar_url} 
            name={user?.nom || user?.email?.split('@')[0] || null }
            hopital={hopital}
            role={user?.role}
            email={user?.email}
          />
        </div>
                   
        {children}
      </div>
    );

  } catch (error) {
    // Erreur globale non gérée
    console.error('Erreur critique dans le layout hopital:', error);
    
    return (
      redirect('/login')
    );
  }
}