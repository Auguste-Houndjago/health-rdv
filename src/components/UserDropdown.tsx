"use client";

import {
  ChevronDownIcon,
  Layers2Icon,
  BookOpenIcon,
  UserPenIcon,
  Bell,
  StethoscopeIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarUser from "./user/AvatarUser";
import Link from "next/link";
import LogOutForm from "./auth/LogOutForm";

export default function UserDropdown({
  name,
  avatarUrl,
  email,
  role,
}: {
  name?: string;
  avatarUrl?: string;
  email?: string;
  role?: string | null; // ✅ Peut être null ou undefined
}) {
  // ✅ Normalisation du rôle
  const safeRole = role?.toLowerCase() ?? null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <AvatarUser name={name || undefined} avatarUrl={avatarUrl || null} />
          <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64">
        {/* --- En-tête --- */}
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name || "Utilisateur"}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email || "non renseigné"}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* --- Liens spécifiques au rôle --- */}
        <DropdownMenuGroup>
          {safeRole === "patient" ? (
            <>
              <DropdownMenuItem>
                <Link href="/patient" className="flex items-center gap-2">
                  <User size={16} className="opacity-60" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/patient/appointments" className="flex items-center gap-2">
                  <Layers2Icon size={16} className="opacity-60" />
                  <span>Rendez-vous</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/patient/documents" className="flex items-center gap-2">
                  <BookOpenIcon size={16} className="opacity-60" />
                  <span>Documents</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : safeRole === "medecin" ? (
            <>
              <DropdownMenuItem>
                <Link href="/medecin" className="flex items-center gap-2">
                  <StethoscopeIcon size={16} className="opacity-60" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/medecin/patients" className="flex items-center gap-2">
                  <User size={16} className="opacity-60" />
                  <span>Mes patients</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/medecin/hopitaux" className="flex items-center gap-2">
                  <Layers2Icon size={16} className="opacity-60" />
                  <span>Hôpitaux</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/medecin/specialites" className="flex items-center gap-2">
                  <StethoscopeIcon size={16} className="opacity-60" />
                  <span>Spécialités</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/medecin/documents" className="flex items-center gap-2">
                  <BookOpenIcon size={16} className="opacity-60" />
                  <span>Documents</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem disabled>
              <span className="text-muted-foreground italic">
                Aucun rôle défini
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* --- Liens communs (si role défini) --- */}
        {safeRole && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/${safeRole}/notifications`} className="flex items-center gap-2">
                  <Bell size={16} className="opacity-60" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={`/${safeRole}/profile`} className="flex items-center gap-2">
                  <UserPenIcon size={16} className="opacity-60" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        {/* --- Déconnexion --- */}
        <DropdownMenuItem>
          <LogOutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
