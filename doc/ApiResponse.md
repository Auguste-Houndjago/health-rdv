
[voir api.ts](/src/config/api.ts)
[exemple ](/doc/test/user_response.ts)

## usage 
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import type { ApiResponse, User } from '@/types/api';
import { ERRORS, STATUS } from '@/config/status';

// Succès avec typage fort
export async function GET() {
  const users: User[] = [
    { id: "1", email: "user@example.com", name: "John Doe" }
  ];
  
  return NextResponse.json<ApiResponse<User[]>>(
    { data: users },
    { status: STATUS.OK }
  );
}

// Erreur simple
export async function POST() {
  return NextResponse.json<ApiResponse>(
    { error: ERRORS.AUTH },
    { status: STATUS.UNAUTHORIZED }
  );
}


// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';
import { ERRORS, STATUS } from '@/config/status';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json<ApiResponse>(
        { error: ERRORS.BAD_REQUEST },
        { status: STATUS.BAD_REQUEST }
      );
    }
    
    // Logique de connexion...
    const userData = { id: "1", email: body.email, name: "User" };
    
    return NextResponse.json<ApiResponse<{ user: any; token: string }>>(
      { data: { user: userData, token: "jwt-token" } },
      { status: STATUS.OK }
    );
    
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { error: ERRORS.SERVER },
      { status: STATUS.SERVER_ERROR }
    );
  }
}