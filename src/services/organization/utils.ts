import { getUserInfo } from "@/services/users";

export async function getOrganization() {
  const user = await getUserInfo()

  if (!user) return null;

  return {
    orgName: user?.organization?.name || null,
    orgId: user?.organization?.id || null,
    role: user?.role || null,
  };
}


export async function getOrgId() {
    const user = await getUserInfo()
    if (!user) throw new Error("Not authenticated");
    return user.organization.id ;
  }
  