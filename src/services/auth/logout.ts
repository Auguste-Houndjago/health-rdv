// 'use server'
// import { removeUser } from "@/services/users/lru-cache"
// import { logoutAction } from "@/services/auth/authActions"
// import { getUserInfo } from "../users"

// export async function handleLogout() {
//   const user = await getUserInfo()
//   if (user?.id) {
//     removeUser(user.id)   // ← supprime du cache
//   }

//   await logoutAction()    // supprime session Supabase
// }
