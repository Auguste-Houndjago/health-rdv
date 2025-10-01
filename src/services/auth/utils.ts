import { getUserInfo } from "../users";

export async function getOrganization() {
  const user = await getUserInfo()


  if (!user) return null;

  return {
    orgName: user?.hopital?.nom || null,
    orgId: user?.hopital?.id || null,
    role: user?.role || null,
  };
}



export async function getOrgId() {
  const user = await getUserInfo()

  if (!user) return null;

  return user?.hopital?.id || null;
}


export async function isSuperAdmin() {
  const user = await getUserInfo()

  if (!user) return null;

  return (
    user.email === process.env.SUPER_ADMIN_EMAIL ||
    user.function === "SUPER_ADMIN"
  );
}

