// actions/user.ts
'use server';
import { ERRORS } from '@/config/api';
import type { ApiResponse} from '@/types/api';


// ✅ Retour simple sans statut (partial)
export async function getUser(): Promise<ApiResponse<{ id: string; name: string }>> {
  try {
    const user = { id: "1", name: "John" };
    return { data: user }; // ← Pas besoin de status !
  } catch {
    return { error: ERRORS.SERVER }; // ← Pas besoin de status !
  }
}

// ✅ Avec statut pour plus de contexte
export async function createUser(): Promise<ApiResponse<{ id: string }, 201|500>> {
  try {
    const newUser = { id: "2" };
    return { data: newUser, status: 201 }; // ← Autocomplétion sur le statut !
  } catch {
    // return { error: ERRORS.BAD_REQUEST, status: 400 }; // Type '400' is not assignable to type '201|500'.ts(2322)
    return { error: ERRORS.BAD_REQUEST, status: 500 };
  }
}

// ✅ Typage très précis
// export async function updateUser(): Promise<
//   | ApiSuccess<{ user: any }, 200> 
//   | ApiError<typeof ERRORS.AUTH, 401>
//   | ApiError<typeof ERRORS.NOT_FOUND, 404>
// > {
//   if (!authenticated) {
//     return { error: ERRORS.AUTH, status: 401 }; // ← Typage très strict !
//   }
  
//   return { data: { user: {} }, status: 200 };
// }