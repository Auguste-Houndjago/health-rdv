
export type ApiResponse<T = any> = 
  | { data: T }
  | { error: string };


// config/errors.ts
export const ERRORS = {
  AUTH: "Not authenticated, please login first.",
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: "Resource not found.",
  BAD_REQUEST: "Bad request.",
  SERVER: "Internal server error.",
} as const;

// Pour le typage fort des erreurs
export type ErrorKey = keyof typeof ERRORS;


// config/status.ts
export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;