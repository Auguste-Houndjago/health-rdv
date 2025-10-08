import { ModeToggle } from "../layout/ModeToggle";
import AvatarUser from "./AvatarUser";


export interface User {
  name?: string | undefined;
  avatarUrl?: string | null;
}
export default function UserHeader({name,avatarUrl}: User) {
  return (
    <div className="z-50">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm md:max-w-full">
<span>
  {name}
</span>
          <div className="flex flex-row items-center justify-center gap-x-4">

            <ModeToggle />
            <AvatarUser name={name || undefined} avatarUrl={avatarUrl|| null}/>
          </div>
        </div>
      </nav>
    </div>
  );
}
