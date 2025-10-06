import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserInfo = {
  name?: string | undefined;
  avatarUrl?: string | null;
  className?: string;
};

export default function AvatarUser({ name, avatarUrl, className }: UserInfo) {
  const fallback = "U";

  return (
    <div
      className={`relative group  cursor-pointer transition-all rounded-full border-2  ${className}`}
    >
      {/* Avatar */}
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={avatarUrl || "/avatar.png"}
          alt={name || "User"}
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      {/* Badge online */}
      <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>

      
    </div>
  );
}
