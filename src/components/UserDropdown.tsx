import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
  Bell,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AvatarUser from "./user/AvatarUser"
import Link from "next/link"
import LogOutForm from "./auth/LogOutForm"

export default function UserDropdown({name,avatarUrl,email}: {name?: string, avatarUrl?: string, email?: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
        <AvatarUser name={name || undefined} avatarUrl={avatarUrl|| null}/>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/appointments">
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/patient/appointments">
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>rendez-vous</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/patient/documents"> 
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>documents</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/patient/notifications"> 
            <Bell size={16} className="opacity-60" aria-hidden="true" />
            <span>notifications</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/patient/profile">
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutForm/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
