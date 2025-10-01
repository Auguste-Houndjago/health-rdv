import { getUserInfo } from "./userInfo";


export async function checkSuperAdmin() {
  const user = await getUserInfo();
  if (!user) return false;

  return (
    user.email === process.env.SUPER_ADMIN_EMAIL ||
    user.function === "SUPER_ADMIN"
  );
}

