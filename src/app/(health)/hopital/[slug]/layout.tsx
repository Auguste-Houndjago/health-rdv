
import UserHeader from '@/components/user/UserHeader';
import { getHopitalBySlug } from '@/services/hopitaux';
import { getUserInfo } from '@/services/users';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default async function OrganizationLayout({ children, params }: LayoutProps) {

  const user = await getUserInfo({cache: false})
  if (!user) {
    redirect('/login');
  }

  const hopital = await getHopitalBySlug(params.slug)

  // if (userInfo.slug !== params.slug) {
  //   redirect(`/${userInfo.slug}`);
  // }

  return (
    <div>
        <UserHeader 
          avatarUrl={user?.avatar_url} 
          name={user?.nom|| user?.email?.split('@')[0]}
          hopital={hopital}
        />
                 
      {children}

    </div>
  );
}