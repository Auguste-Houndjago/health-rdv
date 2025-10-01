import { Functions, Role, UserInfo } from "@/types/user";
import { getUserInfo } from "../users/userInfo";


// ==========================================
// autorisation
// ==========================================

// types pour plus de clarté
export type AuthorizationResult = { success: true } | { success: false; error: string };


/**
 * Vérifie si l'utilisateur a le rôle ou la function requise pour effectuer une action
 * @param user UserInfo à vérifier
 * @param requiredRole Optionnel, rôle requis
 * @param requiredFunction Optionnel, fonction requise
 * 
 * @example
 * // Vérifie juste le rôle
 * await getAuthorization(user, "ADMIN");
 *  
 * @example
 * // Vérifie juste la fonction
 * await getAuthorization(user, undefined, "PRINCIPAL");
 *
 * @example
 * // Vérifie rôle ET fonction
 * await getAuthorization(user, "TEACHER", "COORDINATOR");
 * 
 * //result
 * const result = await getAuthorization(user, 'TEACHER');
 * console.log(result); // { success: true } // ou { success: false, error: 'Rôle insuffisant : TEACHER' }
 */
export async function getAuthorization(
  user: UserInfo,
  requiredRole?: Role,
  requiredFunction?: Functions
): Promise<AuthorizationResult> {
  const userRole = user.role;
  const userFunction = user.function;

  if (!userRole) {
    return { success: false, error: "Utilisateur non authentifié" };
  }

  // SUPER_ADMIN passe toujours
  if (userFunction === "SUPER_ADMIN") {
    return { success: true };
  }

  // Vérification du rôle
  if (requiredRole) {
    const allowedRolesMap: Record<Role, Role[]> = {
      ADMIN: ["ADMIN"],
      TEACHER: ["ADMIN", "TEACHER"],
      STUDENT: ["STUDENT", "ADMIN"],
      PARENT: ["PARENT", "ADMIN"],
      GUEST: ["GUEST", "ADMIN"]
    };

    if (!allowedRolesMap[requiredRole]?.includes(userRole)) {
      return { success: false, error: `Rôle ${userRole} insuffisant pour : ${requiredRole}` };
    }
  }

  // Vérification de la fonction
  if (requiredFunction && userFunction !== requiredFunction) {
    return { success: false, error: `Fonction ${userFunction} insuffisante pour : ${requiredFunction} ` };
  }

  return { success: true };
}

/**
 * Vérifie si l'utilisateur a une permission spécifique dans son organisation
 * @param user L'utilisateur connecté
 * @param permission Nom de la permission à vérifier
 */
export async function userHasPermission(user: UserInfo, permission: string): Promise<boolean> {
  if (!user.organization?.permissions) return false;
  return user.organization.permissions.includes(permission);
}

/**
 * Vérifie à la fois rôle et permission
 * @param user L'utilisateur
 * @param requiredRole Rôle minimum requis
 * @param permission Permission à vérifier (optionnel)
 */
export async function authorize(user: UserInfo, requiredRole: Role, permission?: string): Promise<AuthorizationResult> {
  const roleCheck = await getAuthorization(user, requiredRole);
  if (!roleCheck.success) return roleCheck;

  if (permission && !userHasPermission(user, permission)) {
    return { success: false, error: "Vous n'avez pas la permission requise pour cette action" };
  }

  return { success: true };
}

// Fonction pour vérifier si l'utilisateur a un rôle spécifique
export async function userHasRole(role: Role): Promise<boolean> {
  const userInfo = await getUserInfo();
  return userInfo?.role === role;
}



// // Fonction pour vérifier si l'utilisateur a une permission spécifique
//   export async function userHasPermission(permission: string): Promise<boolean> {
//     const userInfo = await getUserInfo();
//     return userInfo?.organization?.permissions?.includes(permission) || false;
//   }