import Link from "next/link";
import { ModeToggle } from "../layout/ModeToggle";
import AvatarUser from "./AvatarUser";
import { getNavigationByRole, UserRole } from "./navigation";

export interface HopitalHeaderProps {
  id?: string;
  nom?: string | undefined;
  slug?: string;
}
export interface User {
  name?: string | undefined;
  avatarUrl?: string | null;
  role?: string | null;
  hopital?: HopitalHeaderProps;
}
export default function UserHeader({name,avatarUrl,hopital,role}: User) {

  const links = getNavigationByRole(role as UserRole || 'GUEST');  
  return (
    <div className="z-50 px-4 border-b border-b-foreground/10 md:px-16">
      <nav className="flex h-16 w-full justify-center ">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm md:max-w-full">

<span>
  <h1 className="text-2xl dark:text-outline-white hidden md:inline font-semibold">
  {hopital?.nom}
  </h1>
    
</span>

<div className=" flex-row hidden md:flex items-center justify-center gap-x-4">
  {links?.map((link) => (
    <Link key={link.href} href={link.href} className="hover:text-primary text-semibold">
      {link.label}
    </Link>
  ))}
</div>

<div className="flex flex-row md:hidden items-center justify-center gap-x-4">
  {links?.slice(0, 3).map((link) => (
    <Link key={link.href} href={link.href} className="hover:text-primary text-semibold">
      {link.label}
    </Link>
  ))}
</div>


          <div className="flex flex-row items-center justify-center gap-x-4">

            <ModeToggle />
            <span className="text-lg font-semibold">
  {name|| "--"}
</span>

            <AvatarUser name={name || undefined} avatarUrl={avatarUrl|| null}/>
          </div>
        </div>
      </nav>
    </div>
  );
}
