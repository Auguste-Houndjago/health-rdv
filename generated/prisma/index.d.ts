
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Utilisateur
 * =========================
 * 📌 Utilisateur global
 * =========================
 */
export type Utilisateur = $Result.DefaultSelection<Prisma.$UtilisateurPayload>
/**
 * Model Administrateur
 * =========================
 * 📌 Administrateur
 * =========================
 */
export type Administrateur = $Result.DefaultSelection<Prisma.$AdministrateurPayload>
/**
 * Model Patient
 * =========================
 * 📌 Patient
 * =========================
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Medecin
 * =========================
 * 📌 Medecin
 * =========================
 */
export type Medecin = $Result.DefaultSelection<Prisma.$MedecinPayload>
/**
 * Model Document
 * =========================
 * 📌 Document
 * =========================
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model RendezVous
 * =========================
 * 📌 RendezVous
 * =========================
 */
export type RendezVous = $Result.DefaultSelection<Prisma.$RendezVousPayload>
/**
 * Model Hopital
 * =========================
 * 📌 Hopital
 * =========================
 */
export type Hopital = $Result.DefaultSelection<Prisma.$HopitalPayload>
/**
 * Model MedecinHopital
 * 
 */
export type MedecinHopital = $Result.DefaultSelection<Prisma.$MedecinHopitalPayload>
/**
 * Model Specialite
 * =========================
 * 📌 Specialite
 * =========================
 */
export type Specialite = $Result.DefaultSelection<Prisma.$SpecialitePayload>
/**
 * Model Recommandation
 * =========================
 * 📌 Recommandation
 * =========================
 */
export type Recommandation = $Result.DefaultSelection<Prisma.$RecommandationPayload>
/**
 * Model UtilisateurHopital
 * =========================
 * 📌 UtilisateurHopital
 * =========================
 */
export type UtilisateurHopital = $Result.DefaultSelection<Prisma.$UtilisateurHopitalPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  patient: 'patient',
  medecin: 'medecin',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const FonctionAdmin: {
  gestionnaire: 'gestionnaire',
  super_admin: 'super_admin'
};

export type FonctionAdmin = (typeof FonctionAdmin)[keyof typeof FonctionAdmin]


export const Sexe: {
  Homme: 'Homme',
  Femme: 'Femme',
  Autre: 'Autre'
};

export type Sexe = (typeof Sexe)[keyof typeof Sexe]


export const GroupeSanguin: {
  A_POSITIF: 'A_POSITIF',
  A_NEGATIF: 'A_NEGATIF',
  B_POSITIF: 'B_POSITIF',
  B_NEGATIF: 'B_NEGATIF',
  AB_POSITIF: 'AB_POSITIF',
  AB_NEGATIF: 'AB_NEGATIF',
  O_POSITIF: 'O_POSITIF',
  O_NEGATIF: 'O_NEGATIF',
  INCONNU: 'INCONNU'
};

export type GroupeSanguin = (typeof GroupeSanguin)[keyof typeof GroupeSanguin]


export const StatutRendezVous: {
  CONFIRME: 'CONFIRME',
  ANNULE: 'ANNULE',
  EN_ATTENTE: 'EN_ATTENTE',
  TERMINE: 'TERMINE'
};

export type StatutRendezVous = (typeof StatutRendezVous)[keyof typeof StatutRendezVous]


export const StatusUtilisateur: {
  ACTIF: 'ACTIF',
  INACTIF: 'INACTIF'
};

export type StatusUtilisateur = (typeof StatusUtilisateur)[keyof typeof StatusUtilisateur]


export const StatutApproval: {
  EN_ATTENTE: 'EN_ATTENTE',
  APPROUVE: 'APPROUVE',
  REJETE: 'REJETE'
};

export type StatutApproval = (typeof StatutApproval)[keyof typeof StatutApproval]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type FonctionAdmin = $Enums.FonctionAdmin

export const FonctionAdmin: typeof $Enums.FonctionAdmin

export type Sexe = $Enums.Sexe

export const Sexe: typeof $Enums.Sexe

export type GroupeSanguin = $Enums.GroupeSanguin

export const GroupeSanguin: typeof $Enums.GroupeSanguin

export type StatutRendezVous = $Enums.StatutRendezVous

export const StatutRendezVous: typeof $Enums.StatutRendezVous

export type StatusUtilisateur = $Enums.StatusUtilisateur

export const StatusUtilisateur: typeof $Enums.StatusUtilisateur

export type StatutApproval = $Enums.StatutApproval

export const StatutApproval: typeof $Enums.StatutApproval

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Utilisateurs
 * const utilisateurs = await prisma.utilisateur.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Utilisateurs
   * const utilisateurs = await prisma.utilisateur.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.utilisateur`: Exposes CRUD operations for the **Utilisateur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Utilisateurs
    * const utilisateurs = await prisma.utilisateur.findMany()
    * ```
    */
  get utilisateur(): Prisma.UtilisateurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.administrateur`: Exposes CRUD operations for the **Administrateur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Administrateurs
    * const administrateurs = await prisma.administrateur.findMany()
    * ```
    */
  get administrateur(): Prisma.AdministrateurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medecin`: Exposes CRUD operations for the **Medecin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medecins
    * const medecins = await prisma.medecin.findMany()
    * ```
    */
  get medecin(): Prisma.MedecinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rendezVous`: Exposes CRUD operations for the **RendezVous** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RendezVous
    * const rendezVous = await prisma.rendezVous.findMany()
    * ```
    */
  get rendezVous(): Prisma.RendezVousDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hopital`: Exposes CRUD operations for the **Hopital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hopitals
    * const hopitals = await prisma.hopital.findMany()
    * ```
    */
  get hopital(): Prisma.HopitalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medecinHopital`: Exposes CRUD operations for the **MedecinHopital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedecinHopitals
    * const medecinHopitals = await prisma.medecinHopital.findMany()
    * ```
    */
  get medecinHopital(): Prisma.MedecinHopitalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.specialite`: Exposes CRUD operations for the **Specialite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Specialites
    * const specialites = await prisma.specialite.findMany()
    * ```
    */
  get specialite(): Prisma.SpecialiteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recommandation`: Exposes CRUD operations for the **Recommandation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recommandations
    * const recommandations = await prisma.recommandation.findMany()
    * ```
    */
  get recommandation(): Prisma.RecommandationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.utilisateurHopital`: Exposes CRUD operations for the **UtilisateurHopital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UtilisateurHopitals
    * const utilisateurHopitals = await prisma.utilisateurHopital.findMany()
    * ```
    */
  get utilisateurHopital(): Prisma.UtilisateurHopitalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Utilisateur: 'Utilisateur',
    Administrateur: 'Administrateur',
    Patient: 'Patient',
    Medecin: 'Medecin',
    Document: 'Document',
    RendezVous: 'RendezVous',
    Hopital: 'Hopital',
    MedecinHopital: 'MedecinHopital',
    Specialite: 'Specialite',
    Recommandation: 'Recommandation',
    UtilisateurHopital: 'UtilisateurHopital'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "utilisateur" | "administrateur" | "patient" | "medecin" | "document" | "rendezVous" | "hopital" | "medecinHopital" | "specialite" | "recommandation" | "utilisateurHopital"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Utilisateur: {
        payload: Prisma.$UtilisateurPayload<ExtArgs>
        fields: Prisma.UtilisateurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UtilisateurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UtilisateurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          findFirst: {
            args: Prisma.UtilisateurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UtilisateurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          findMany: {
            args: Prisma.UtilisateurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          create: {
            args: Prisma.UtilisateurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          createMany: {
            args: Prisma.UtilisateurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UtilisateurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          delete: {
            args: Prisma.UtilisateurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          update: {
            args: Prisma.UtilisateurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          deleteMany: {
            args: Prisma.UtilisateurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UtilisateurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UtilisateurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          upsert: {
            args: Prisma.UtilisateurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          aggregate: {
            args: Prisma.UtilisateurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilisateur>
          }
          groupBy: {
            args: Prisma.UtilisateurGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurGroupByOutputType>[]
          }
          count: {
            args: Prisma.UtilisateurCountArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurCountAggregateOutputType> | number
          }
        }
      }
      Administrateur: {
        payload: Prisma.$AdministrateurPayload<ExtArgs>
        fields: Prisma.AdministrateurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdministrateurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdministrateurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          findFirst: {
            args: Prisma.AdministrateurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdministrateurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          findMany: {
            args: Prisma.AdministrateurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>[]
          }
          create: {
            args: Prisma.AdministrateurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          createMany: {
            args: Prisma.AdministrateurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdministrateurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>[]
          }
          delete: {
            args: Prisma.AdministrateurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          update: {
            args: Prisma.AdministrateurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          deleteMany: {
            args: Prisma.AdministrateurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdministrateurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdministrateurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>[]
          }
          upsert: {
            args: Prisma.AdministrateurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdministrateurPayload>
          }
          aggregate: {
            args: Prisma.AdministrateurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdministrateur>
          }
          groupBy: {
            args: Prisma.AdministrateurGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdministrateurGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdministrateurCountArgs<ExtArgs>
            result: $Utils.Optional<AdministrateurCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Medecin: {
        payload: Prisma.$MedecinPayload<ExtArgs>
        fields: Prisma.MedecinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedecinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedecinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          findFirst: {
            args: Prisma.MedecinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedecinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          findMany: {
            args: Prisma.MedecinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>[]
          }
          create: {
            args: Prisma.MedecinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          createMany: {
            args: Prisma.MedecinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedecinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>[]
          }
          delete: {
            args: Prisma.MedecinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          update: {
            args: Prisma.MedecinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          deleteMany: {
            args: Prisma.MedecinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedecinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedecinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>[]
          }
          upsert: {
            args: Prisma.MedecinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinPayload>
          }
          aggregate: {
            args: Prisma.MedecinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedecin>
          }
          groupBy: {
            args: Prisma.MedecinGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedecinGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedecinCountArgs<ExtArgs>
            result: $Utils.Optional<MedecinCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      RendezVous: {
        payload: Prisma.$RendezVousPayload<ExtArgs>
        fields: Prisma.RendezVousFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RendezVousFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RendezVousFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findFirst: {
            args: Prisma.RendezVousFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RendezVousFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findMany: {
            args: Prisma.RendezVousFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          create: {
            args: Prisma.RendezVousCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          createMany: {
            args: Prisma.RendezVousCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RendezVousCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          delete: {
            args: Prisma.RendezVousDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          update: {
            args: Prisma.RendezVousUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          deleteMany: {
            args: Prisma.RendezVousDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RendezVousUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RendezVousUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          upsert: {
            args: Prisma.RendezVousUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          aggregate: {
            args: Prisma.RendezVousAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRendezVous>
          }
          groupBy: {
            args: Prisma.RendezVousGroupByArgs<ExtArgs>
            result: $Utils.Optional<RendezVousGroupByOutputType>[]
          }
          count: {
            args: Prisma.RendezVousCountArgs<ExtArgs>
            result: $Utils.Optional<RendezVousCountAggregateOutputType> | number
          }
        }
      }
      Hopital: {
        payload: Prisma.$HopitalPayload<ExtArgs>
        fields: Prisma.HopitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HopitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HopitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          findFirst: {
            args: Prisma.HopitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HopitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          findMany: {
            args: Prisma.HopitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>[]
          }
          create: {
            args: Prisma.HopitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          createMany: {
            args: Prisma.HopitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HopitalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>[]
          }
          delete: {
            args: Prisma.HopitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          update: {
            args: Prisma.HopitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          deleteMany: {
            args: Prisma.HopitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HopitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HopitalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>[]
          }
          upsert: {
            args: Prisma.HopitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HopitalPayload>
          }
          aggregate: {
            args: Prisma.HopitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHopital>
          }
          groupBy: {
            args: Prisma.HopitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<HopitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.HopitalCountArgs<ExtArgs>
            result: $Utils.Optional<HopitalCountAggregateOutputType> | number
          }
        }
      }
      MedecinHopital: {
        payload: Prisma.$MedecinHopitalPayload<ExtArgs>
        fields: Prisma.MedecinHopitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedecinHopitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedecinHopitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          findFirst: {
            args: Prisma.MedecinHopitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedecinHopitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          findMany: {
            args: Prisma.MedecinHopitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>[]
          }
          create: {
            args: Prisma.MedecinHopitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          createMany: {
            args: Prisma.MedecinHopitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedecinHopitalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>[]
          }
          delete: {
            args: Prisma.MedecinHopitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          update: {
            args: Prisma.MedecinHopitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          deleteMany: {
            args: Prisma.MedecinHopitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedecinHopitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedecinHopitalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>[]
          }
          upsert: {
            args: Prisma.MedecinHopitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedecinHopitalPayload>
          }
          aggregate: {
            args: Prisma.MedecinHopitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedecinHopital>
          }
          groupBy: {
            args: Prisma.MedecinHopitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedecinHopitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedecinHopitalCountArgs<ExtArgs>
            result: $Utils.Optional<MedecinHopitalCountAggregateOutputType> | number
          }
        }
      }
      Specialite: {
        payload: Prisma.$SpecialitePayload<ExtArgs>
        fields: Prisma.SpecialiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpecialiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpecialiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          findFirst: {
            args: Prisma.SpecialiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpecialiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          findMany: {
            args: Prisma.SpecialiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>[]
          }
          create: {
            args: Prisma.SpecialiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          createMany: {
            args: Prisma.SpecialiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpecialiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>[]
          }
          delete: {
            args: Prisma.SpecialiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          update: {
            args: Prisma.SpecialiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          deleteMany: {
            args: Prisma.SpecialiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpecialiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpecialiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>[]
          }
          upsert: {
            args: Prisma.SpecialiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialitePayload>
          }
          aggregate: {
            args: Prisma.SpecialiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpecialite>
          }
          groupBy: {
            args: Prisma.SpecialiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpecialiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpecialiteCountArgs<ExtArgs>
            result: $Utils.Optional<SpecialiteCountAggregateOutputType> | number
          }
        }
      }
      Recommandation: {
        payload: Prisma.$RecommandationPayload<ExtArgs>
        fields: Prisma.RecommandationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecommandationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecommandationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          findFirst: {
            args: Prisma.RecommandationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecommandationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          findMany: {
            args: Prisma.RecommandationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>[]
          }
          create: {
            args: Prisma.RecommandationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          createMany: {
            args: Prisma.RecommandationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecommandationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>[]
          }
          delete: {
            args: Prisma.RecommandationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          update: {
            args: Prisma.RecommandationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          deleteMany: {
            args: Prisma.RecommandationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecommandationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecommandationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>[]
          }
          upsert: {
            args: Prisma.RecommandationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommandationPayload>
          }
          aggregate: {
            args: Prisma.RecommandationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecommandation>
          }
          groupBy: {
            args: Prisma.RecommandationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecommandationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecommandationCountArgs<ExtArgs>
            result: $Utils.Optional<RecommandationCountAggregateOutputType> | number
          }
        }
      }
      UtilisateurHopital: {
        payload: Prisma.$UtilisateurHopitalPayload<ExtArgs>
        fields: Prisma.UtilisateurHopitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UtilisateurHopitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UtilisateurHopitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          findFirst: {
            args: Prisma.UtilisateurHopitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UtilisateurHopitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          findMany: {
            args: Prisma.UtilisateurHopitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>[]
          }
          create: {
            args: Prisma.UtilisateurHopitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          createMany: {
            args: Prisma.UtilisateurHopitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UtilisateurHopitalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>[]
          }
          delete: {
            args: Prisma.UtilisateurHopitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          update: {
            args: Prisma.UtilisateurHopitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          deleteMany: {
            args: Prisma.UtilisateurHopitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UtilisateurHopitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UtilisateurHopitalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>[]
          }
          upsert: {
            args: Prisma.UtilisateurHopitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurHopitalPayload>
          }
          aggregate: {
            args: Prisma.UtilisateurHopitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilisateurHopital>
          }
          groupBy: {
            args: Prisma.UtilisateurHopitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurHopitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.UtilisateurHopitalCountArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurHopitalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    utilisateur?: UtilisateurOmit
    administrateur?: AdministrateurOmit
    patient?: PatientOmit
    medecin?: MedecinOmit
    document?: DocumentOmit
    rendezVous?: RendezVousOmit
    hopital?: HopitalOmit
    medecinHopital?: MedecinHopitalOmit
    specialite?: SpecialiteOmit
    recommandation?: RecommandationOmit
    utilisateurHopital?: UtilisateurHopitalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UtilisateurCountOutputType
   */

  export type UtilisateurCountOutputType = {
    rendezVous: number
    utilisateurHopitals: number
  }

  export type UtilisateurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rendezVous?: boolean | UtilisateurCountOutputTypeCountRendezVousArgs
    utilisateurHopitals?: boolean | UtilisateurCountOutputTypeCountUtilisateurHopitalsArgs
  }

  // Custom InputTypes
  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurCountOutputType
     */
    select?: UtilisateurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeCountUtilisateurHopitalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilisateurHopitalWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    documents: number
    rendezVous: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | PatientCountOutputTypeCountDocumentsArgs
    rendezVous?: boolean | PatientCountOutputTypeCountRendezVousArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }


  /**
   * Count Type MedecinCountOutputType
   */

  export type MedecinCountOutputType = {
    recommandations: number
    rendezVous: number
    hopitaux: number
  }

  export type MedecinCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recommandations?: boolean | MedecinCountOutputTypeCountRecommandationsArgs
    rendezVous?: boolean | MedecinCountOutputTypeCountRendezVousArgs
    hopitaux?: boolean | MedecinCountOutputTypeCountHopitauxArgs
  }

  // Custom InputTypes
  /**
   * MedecinCountOutputType without action
   */
  export type MedecinCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinCountOutputType
     */
    select?: MedecinCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedecinCountOutputType without action
   */
  export type MedecinCountOutputTypeCountRecommandationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommandationWhereInput
  }

  /**
   * MedecinCountOutputType without action
   */
  export type MedecinCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * MedecinCountOutputType without action
   */
  export type MedecinCountOutputTypeCountHopitauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedecinHopitalWhereInput
  }


  /**
   * Count Type HopitalCountOutputType
   */

  export type HopitalCountOutputType = {
    utilisateurHopitals: number
    rendevous: number
    medecin: number
    specialites: number
  }

  export type HopitalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateurHopitals?: boolean | HopitalCountOutputTypeCountUtilisateurHopitalsArgs
    rendevous?: boolean | HopitalCountOutputTypeCountRendevousArgs
    medecin?: boolean | HopitalCountOutputTypeCountMedecinArgs
    specialites?: boolean | HopitalCountOutputTypeCountSpecialitesArgs
  }

  // Custom InputTypes
  /**
   * HopitalCountOutputType without action
   */
  export type HopitalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HopitalCountOutputType
     */
    select?: HopitalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HopitalCountOutputType without action
   */
  export type HopitalCountOutputTypeCountUtilisateurHopitalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilisateurHopitalWhereInput
  }

  /**
   * HopitalCountOutputType without action
   */
  export type HopitalCountOutputTypeCountRendevousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * HopitalCountOutputType without action
   */
  export type HopitalCountOutputTypeCountMedecinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedecinHopitalWhereInput
  }

  /**
   * HopitalCountOutputType without action
   */
  export type HopitalCountOutputTypeCountSpecialitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecialiteWhereInput
  }


  /**
   * Count Type SpecialiteCountOutputType
   */

  export type SpecialiteCountOutputType = {
    medecins: number
    hopitaux: number
  }

  export type SpecialiteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecins?: boolean | SpecialiteCountOutputTypeCountMedecinsArgs
    hopitaux?: boolean | SpecialiteCountOutputTypeCountHopitauxArgs
  }

  // Custom InputTypes
  /**
   * SpecialiteCountOutputType without action
   */
  export type SpecialiteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpecialiteCountOutputType
     */
    select?: SpecialiteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpecialiteCountOutputType without action
   */
  export type SpecialiteCountOutputTypeCountMedecinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedecinWhereInput
  }

  /**
   * SpecialiteCountOutputType without action
   */
  export type SpecialiteCountOutputTypeCountHopitauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HopitalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Utilisateur
   */

  export type AggregateUtilisateur = {
    _count: UtilisateurCountAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  export type UtilisateurMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    dateCreation: Date | null
    status: $Enums.StatusUtilisateur | null
  }

  export type UtilisateurMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    dateCreation: Date | null
    status: $Enums.StatusUtilisateur | null
  }

  export type UtilisateurCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    telephone: number
    dateCreation: number
    status: number
    _all: number
  }


  export type UtilisateurMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    dateCreation?: true
    status?: true
  }

  export type UtilisateurMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    dateCreation?: true
    status?: true
  }

  export type UtilisateurCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    dateCreation?: true
    status?: true
    _all?: true
  }

  export type UtilisateurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilisateur to aggregate.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Utilisateurs
    **/
    _count?: true | UtilisateurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilisateurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilisateurMaxAggregateInputType
  }

  export type GetUtilisateurAggregateType<T extends UtilisateurAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilisateur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilisateur[P]>
      : GetScalarType<T[P], AggregateUtilisateur[P]>
  }




  export type UtilisateurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilisateurWhereInput
    orderBy?: UtilisateurOrderByWithAggregationInput | UtilisateurOrderByWithAggregationInput[]
    by: UtilisateurScalarFieldEnum[] | UtilisateurScalarFieldEnum
    having?: UtilisateurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilisateurCountAggregateInputType | true
    _min?: UtilisateurMinAggregateInputType
    _max?: UtilisateurMaxAggregateInputType
  }

  export type UtilisateurGroupByOutputType = {
    id: string
    nom: string
    prenom: string | null
    email: string
    telephone: string | null
    dateCreation: Date
    status: $Enums.StatusUtilisateur
    _count: UtilisateurCountAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  type GetUtilisateurGroupByPayload<T extends UtilisateurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilisateurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilisateurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
            : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
        }
      >
    >


  export type UtilisateurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    dateCreation?: boolean
    status?: boolean
    administrateur?: boolean | Utilisateur$administrateurArgs<ExtArgs>
    medecin?: boolean | Utilisateur$medecinArgs<ExtArgs>
    patient?: boolean | Utilisateur$patientArgs<ExtArgs>
    rendezVous?: boolean | Utilisateur$rendezVousArgs<ExtArgs>
    utilisateurHopitals?: boolean | Utilisateur$utilisateurHopitalsArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    dateCreation?: boolean
    status?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    dateCreation?: boolean
    status?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    dateCreation?: boolean
    status?: boolean
  }

  export type UtilisateurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "telephone" | "dateCreation" | "status", ExtArgs["result"]["utilisateur"]>
  export type UtilisateurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    administrateur?: boolean | Utilisateur$administrateurArgs<ExtArgs>
    medecin?: boolean | Utilisateur$medecinArgs<ExtArgs>
    patient?: boolean | Utilisateur$patientArgs<ExtArgs>
    rendezVous?: boolean | Utilisateur$rendezVousArgs<ExtArgs>
    utilisateurHopitals?: boolean | Utilisateur$utilisateurHopitalsArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UtilisateurIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UtilisateurIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UtilisateurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Utilisateur"
    objects: {
      administrateur: Prisma.$AdministrateurPayload<ExtArgs> | null
      medecin: Prisma.$MedecinPayload<ExtArgs> | null
      patient: Prisma.$PatientPayload<ExtArgs> | null
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
      utilisateurHopitals: Prisma.$UtilisateurHopitalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string | null
      email: string
      telephone: string | null
      dateCreation: Date
      status: $Enums.StatusUtilisateur
    }, ExtArgs["result"]["utilisateur"]>
    composites: {}
  }

  type UtilisateurGetPayload<S extends boolean | null | undefined | UtilisateurDefaultArgs> = $Result.GetResult<Prisma.$UtilisateurPayload, S>

  type UtilisateurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UtilisateurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilisateurCountAggregateInputType | true
    }

  export interface UtilisateurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Utilisateur'], meta: { name: 'Utilisateur' } }
    /**
     * Find zero or one Utilisateur that matches the filter.
     * @param {UtilisateurFindUniqueArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtilisateurFindUniqueArgs>(args: SelectSubset<T, UtilisateurFindUniqueArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Utilisateur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtilisateurFindUniqueOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtilisateurFindUniqueOrThrowArgs>(args: SelectSubset<T, UtilisateurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindFirstArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtilisateurFindFirstArgs>(args?: SelectSubset<T, UtilisateurFindFirstArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindFirstOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtilisateurFindFirstOrThrowArgs>(args?: SelectSubset<T, UtilisateurFindFirstOrThrowArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Utilisateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany()
     * 
     * // Get first 10 Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const utilisateurWithIdOnly = await prisma.utilisateur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UtilisateurFindManyArgs>(args?: SelectSubset<T, UtilisateurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Utilisateur.
     * @param {UtilisateurCreateArgs} args - Arguments to create a Utilisateur.
     * @example
     * // Create one Utilisateur
     * const Utilisateur = await prisma.utilisateur.create({
     *   data: {
     *     // ... data to create a Utilisateur
     *   }
     * })
     * 
     */
    create<T extends UtilisateurCreateArgs>(args: SelectSubset<T, UtilisateurCreateArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Utilisateurs.
     * @param {UtilisateurCreateManyArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UtilisateurCreateManyArgs>(args?: SelectSubset<T, UtilisateurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Utilisateurs and returns the data saved in the database.
     * @param {UtilisateurCreateManyAndReturnArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Utilisateurs and only return the `id`
     * const utilisateurWithIdOnly = await prisma.utilisateur.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UtilisateurCreateManyAndReturnArgs>(args?: SelectSubset<T, UtilisateurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Utilisateur.
     * @param {UtilisateurDeleteArgs} args - Arguments to delete one Utilisateur.
     * @example
     * // Delete one Utilisateur
     * const Utilisateur = await prisma.utilisateur.delete({
     *   where: {
     *     // ... filter to delete one Utilisateur
     *   }
     * })
     * 
     */
    delete<T extends UtilisateurDeleteArgs>(args: SelectSubset<T, UtilisateurDeleteArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Utilisateur.
     * @param {UtilisateurUpdateArgs} args - Arguments to update one Utilisateur.
     * @example
     * // Update one Utilisateur
     * const utilisateur = await prisma.utilisateur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UtilisateurUpdateArgs>(args: SelectSubset<T, UtilisateurUpdateArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Utilisateurs.
     * @param {UtilisateurDeleteManyArgs} args - Arguments to filter Utilisateurs to delete.
     * @example
     * // Delete a few Utilisateurs
     * const { count } = await prisma.utilisateur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UtilisateurDeleteManyArgs>(args?: SelectSubset<T, UtilisateurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UtilisateurUpdateManyArgs>(args: SelectSubset<T, UtilisateurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs and returns the data updated in the database.
     * @param {UtilisateurUpdateManyAndReturnArgs} args - Arguments to update many Utilisateurs.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Utilisateurs and only return the `id`
     * const utilisateurWithIdOnly = await prisma.utilisateur.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UtilisateurUpdateManyAndReturnArgs>(args: SelectSubset<T, UtilisateurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Utilisateur.
     * @param {UtilisateurUpsertArgs} args - Arguments to update or create a Utilisateur.
     * @example
     * // Update or create a Utilisateur
     * const utilisateur = await prisma.utilisateur.upsert({
     *   create: {
     *     // ... data to create a Utilisateur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Utilisateur we want to update
     *   }
     * })
     */
    upsert<T extends UtilisateurUpsertArgs>(args: SelectSubset<T, UtilisateurUpsertArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurCountArgs} args - Arguments to filter Utilisateurs to count.
     * @example
     * // Count the number of Utilisateurs
     * const count = await prisma.utilisateur.count({
     *   where: {
     *     // ... the filter for the Utilisateurs we want to count
     *   }
     * })
    **/
    count<T extends UtilisateurCountArgs>(
      args?: Subset<T, UtilisateurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilisateurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtilisateurAggregateArgs>(args: Subset<T, UtilisateurAggregateArgs>): Prisma.PrismaPromise<GetUtilisateurAggregateType<T>>

    /**
     * Group by Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UtilisateurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UtilisateurGroupByArgs['orderBy'] }
        : { orderBy?: UtilisateurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UtilisateurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilisateurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Utilisateur model
   */
  readonly fields: UtilisateurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Utilisateur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UtilisateurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    administrateur<T extends Utilisateur$administrateurArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$administrateurArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    medecin<T extends Utilisateur$medecinArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$medecinArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patient<T extends Utilisateur$patientArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rendezVous<T extends Utilisateur$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    utilisateurHopitals<T extends Utilisateur$utilisateurHopitalsArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$utilisateurHopitalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Utilisateur model
   */
  interface UtilisateurFieldRefs {
    readonly id: FieldRef<"Utilisateur", 'String'>
    readonly nom: FieldRef<"Utilisateur", 'String'>
    readonly prenom: FieldRef<"Utilisateur", 'String'>
    readonly email: FieldRef<"Utilisateur", 'String'>
    readonly telephone: FieldRef<"Utilisateur", 'String'>
    readonly dateCreation: FieldRef<"Utilisateur", 'DateTime'>
    readonly status: FieldRef<"Utilisateur", 'StatusUtilisateur'>
  }
    

  // Custom InputTypes
  /**
   * Utilisateur findUnique
   */
  export type UtilisateurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur findUniqueOrThrow
   */
  export type UtilisateurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur findFirst
   */
  export type UtilisateurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur findFirstOrThrow
   */
  export type UtilisateurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur findMany
   */
  export type UtilisateurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateurs to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur create
   */
  export type UtilisateurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The data needed to create a Utilisateur.
     */
    data: XOR<UtilisateurCreateInput, UtilisateurUncheckedCreateInput>
  }

  /**
   * Utilisateur createMany
   */
  export type UtilisateurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Utilisateurs.
     */
    data: UtilisateurCreateManyInput | UtilisateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Utilisateur createManyAndReturn
   */
  export type UtilisateurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * The data used to create many Utilisateurs.
     */
    data: UtilisateurCreateManyInput | UtilisateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Utilisateur update
   */
  export type UtilisateurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The data needed to update a Utilisateur.
     */
    data: XOR<UtilisateurUpdateInput, UtilisateurUncheckedUpdateInput>
    /**
     * Choose, which Utilisateur to update.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur updateMany
   */
  export type UtilisateurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Utilisateurs.
     */
    data: XOR<UtilisateurUpdateManyMutationInput, UtilisateurUncheckedUpdateManyInput>
    /**
     * Filter which Utilisateurs to update
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to update.
     */
    limit?: number
  }

  /**
   * Utilisateur updateManyAndReturn
   */
  export type UtilisateurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * The data used to update Utilisateurs.
     */
    data: XOR<UtilisateurUpdateManyMutationInput, UtilisateurUncheckedUpdateManyInput>
    /**
     * Filter which Utilisateurs to update
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to update.
     */
    limit?: number
  }

  /**
   * Utilisateur upsert
   */
  export type UtilisateurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The filter to search for the Utilisateur to update in case it exists.
     */
    where: UtilisateurWhereUniqueInput
    /**
     * In case the Utilisateur found by the `where` argument doesn't exist, create a new Utilisateur with this data.
     */
    create: XOR<UtilisateurCreateInput, UtilisateurUncheckedCreateInput>
    /**
     * In case the Utilisateur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UtilisateurUpdateInput, UtilisateurUncheckedUpdateInput>
  }

  /**
   * Utilisateur delete
   */
  export type UtilisateurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter which Utilisateur to delete.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur deleteMany
   */
  export type UtilisateurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilisateurs to delete
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to delete.
     */
    limit?: number
  }

  /**
   * Utilisateur.administrateur
   */
  export type Utilisateur$administrateurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    where?: AdministrateurWhereInput
  }

  /**
   * Utilisateur.medecin
   */
  export type Utilisateur$medecinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    where?: MedecinWhereInput
  }

  /**
   * Utilisateur.patient
   */
  export type Utilisateur$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * Utilisateur.rendezVous
   */
  export type Utilisateur$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * Utilisateur.utilisateurHopitals
   */
  export type Utilisateur$utilisateurHopitalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    where?: UtilisateurHopitalWhereInput
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    cursor?: UtilisateurHopitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UtilisateurHopitalScalarFieldEnum | UtilisateurHopitalScalarFieldEnum[]
  }

  /**
   * Utilisateur without action
   */
  export type UtilisateurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
  }


  /**
   * Model Administrateur
   */

  export type AggregateAdministrateur = {
    _count: AdministrateurCountAggregateOutputType | null
    _min: AdministrateurMinAggregateOutputType | null
    _max: AdministrateurMaxAggregateOutputType | null
  }

  export type AdministrateurMinAggregateOutputType = {
    id: string | null
    fonction: $Enums.FonctionAdmin | null
    userId: string | null
  }

  export type AdministrateurMaxAggregateOutputType = {
    id: string | null
    fonction: $Enums.FonctionAdmin | null
    userId: string | null
  }

  export type AdministrateurCountAggregateOutputType = {
    id: number
    fonction: number
    userId: number
    _all: number
  }


  export type AdministrateurMinAggregateInputType = {
    id?: true
    fonction?: true
    userId?: true
  }

  export type AdministrateurMaxAggregateInputType = {
    id?: true
    fonction?: true
    userId?: true
  }

  export type AdministrateurCountAggregateInputType = {
    id?: true
    fonction?: true
    userId?: true
    _all?: true
  }

  export type AdministrateurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Administrateur to aggregate.
     */
    where?: AdministrateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Administrateurs to fetch.
     */
    orderBy?: AdministrateurOrderByWithRelationInput | AdministrateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdministrateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Administrateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Administrateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Administrateurs
    **/
    _count?: true | AdministrateurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdministrateurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdministrateurMaxAggregateInputType
  }

  export type GetAdministrateurAggregateType<T extends AdministrateurAggregateArgs> = {
        [P in keyof T & keyof AggregateAdministrateur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdministrateur[P]>
      : GetScalarType<T[P], AggregateAdministrateur[P]>
  }




  export type AdministrateurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdministrateurWhereInput
    orderBy?: AdministrateurOrderByWithAggregationInput | AdministrateurOrderByWithAggregationInput[]
    by: AdministrateurScalarFieldEnum[] | AdministrateurScalarFieldEnum
    having?: AdministrateurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdministrateurCountAggregateInputType | true
    _min?: AdministrateurMinAggregateInputType
    _max?: AdministrateurMaxAggregateInputType
  }

  export type AdministrateurGroupByOutputType = {
    id: string
    fonction: $Enums.FonctionAdmin
    userId: string
    _count: AdministrateurCountAggregateOutputType | null
    _min: AdministrateurMinAggregateOutputType | null
    _max: AdministrateurMaxAggregateOutputType | null
  }

  type GetAdministrateurGroupByPayload<T extends AdministrateurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdministrateurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdministrateurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdministrateurGroupByOutputType[P]>
            : GetScalarType<T[P], AdministrateurGroupByOutputType[P]>
        }
      >
    >


  export type AdministrateurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fonction?: boolean
    userId?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["administrateur"]>

  export type AdministrateurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fonction?: boolean
    userId?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["administrateur"]>

  export type AdministrateurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fonction?: boolean
    userId?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["administrateur"]>

  export type AdministrateurSelectScalar = {
    id?: boolean
    fonction?: boolean
    userId?: boolean
  }

  export type AdministrateurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fonction" | "userId", ExtArgs["result"]["administrateur"]>
  export type AdministrateurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type AdministrateurIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type AdministrateurIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }

  export type $AdministrateurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Administrateur"
    objects: {
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fonction: $Enums.FonctionAdmin
      userId: string
    }, ExtArgs["result"]["administrateur"]>
    composites: {}
  }

  type AdministrateurGetPayload<S extends boolean | null | undefined | AdministrateurDefaultArgs> = $Result.GetResult<Prisma.$AdministrateurPayload, S>

  type AdministrateurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdministrateurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdministrateurCountAggregateInputType | true
    }

  export interface AdministrateurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Administrateur'], meta: { name: 'Administrateur' } }
    /**
     * Find zero or one Administrateur that matches the filter.
     * @param {AdministrateurFindUniqueArgs} args - Arguments to find a Administrateur
     * @example
     * // Get one Administrateur
     * const administrateur = await prisma.administrateur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdministrateurFindUniqueArgs>(args: SelectSubset<T, AdministrateurFindUniqueArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Administrateur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdministrateurFindUniqueOrThrowArgs} args - Arguments to find a Administrateur
     * @example
     * // Get one Administrateur
     * const administrateur = await prisma.administrateur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdministrateurFindUniqueOrThrowArgs>(args: SelectSubset<T, AdministrateurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Administrateur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurFindFirstArgs} args - Arguments to find a Administrateur
     * @example
     * // Get one Administrateur
     * const administrateur = await prisma.administrateur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdministrateurFindFirstArgs>(args?: SelectSubset<T, AdministrateurFindFirstArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Administrateur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurFindFirstOrThrowArgs} args - Arguments to find a Administrateur
     * @example
     * // Get one Administrateur
     * const administrateur = await prisma.administrateur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdministrateurFindFirstOrThrowArgs>(args?: SelectSubset<T, AdministrateurFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Administrateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Administrateurs
     * const administrateurs = await prisma.administrateur.findMany()
     * 
     * // Get first 10 Administrateurs
     * const administrateurs = await prisma.administrateur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const administrateurWithIdOnly = await prisma.administrateur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdministrateurFindManyArgs>(args?: SelectSubset<T, AdministrateurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Administrateur.
     * @param {AdministrateurCreateArgs} args - Arguments to create a Administrateur.
     * @example
     * // Create one Administrateur
     * const Administrateur = await prisma.administrateur.create({
     *   data: {
     *     // ... data to create a Administrateur
     *   }
     * })
     * 
     */
    create<T extends AdministrateurCreateArgs>(args: SelectSubset<T, AdministrateurCreateArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Administrateurs.
     * @param {AdministrateurCreateManyArgs} args - Arguments to create many Administrateurs.
     * @example
     * // Create many Administrateurs
     * const administrateur = await prisma.administrateur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdministrateurCreateManyArgs>(args?: SelectSubset<T, AdministrateurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Administrateurs and returns the data saved in the database.
     * @param {AdministrateurCreateManyAndReturnArgs} args - Arguments to create many Administrateurs.
     * @example
     * // Create many Administrateurs
     * const administrateur = await prisma.administrateur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Administrateurs and only return the `id`
     * const administrateurWithIdOnly = await prisma.administrateur.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdministrateurCreateManyAndReturnArgs>(args?: SelectSubset<T, AdministrateurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Administrateur.
     * @param {AdministrateurDeleteArgs} args - Arguments to delete one Administrateur.
     * @example
     * // Delete one Administrateur
     * const Administrateur = await prisma.administrateur.delete({
     *   where: {
     *     // ... filter to delete one Administrateur
     *   }
     * })
     * 
     */
    delete<T extends AdministrateurDeleteArgs>(args: SelectSubset<T, AdministrateurDeleteArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Administrateur.
     * @param {AdministrateurUpdateArgs} args - Arguments to update one Administrateur.
     * @example
     * // Update one Administrateur
     * const administrateur = await prisma.administrateur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdministrateurUpdateArgs>(args: SelectSubset<T, AdministrateurUpdateArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Administrateurs.
     * @param {AdministrateurDeleteManyArgs} args - Arguments to filter Administrateurs to delete.
     * @example
     * // Delete a few Administrateurs
     * const { count } = await prisma.administrateur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdministrateurDeleteManyArgs>(args?: SelectSubset<T, AdministrateurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Administrateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Administrateurs
     * const administrateur = await prisma.administrateur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdministrateurUpdateManyArgs>(args: SelectSubset<T, AdministrateurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Administrateurs and returns the data updated in the database.
     * @param {AdministrateurUpdateManyAndReturnArgs} args - Arguments to update many Administrateurs.
     * @example
     * // Update many Administrateurs
     * const administrateur = await prisma.administrateur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Administrateurs and only return the `id`
     * const administrateurWithIdOnly = await prisma.administrateur.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdministrateurUpdateManyAndReturnArgs>(args: SelectSubset<T, AdministrateurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Administrateur.
     * @param {AdministrateurUpsertArgs} args - Arguments to update or create a Administrateur.
     * @example
     * // Update or create a Administrateur
     * const administrateur = await prisma.administrateur.upsert({
     *   create: {
     *     // ... data to create a Administrateur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Administrateur we want to update
     *   }
     * })
     */
    upsert<T extends AdministrateurUpsertArgs>(args: SelectSubset<T, AdministrateurUpsertArgs<ExtArgs>>): Prisma__AdministrateurClient<$Result.GetResult<Prisma.$AdministrateurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Administrateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurCountArgs} args - Arguments to filter Administrateurs to count.
     * @example
     * // Count the number of Administrateurs
     * const count = await prisma.administrateur.count({
     *   where: {
     *     // ... the filter for the Administrateurs we want to count
     *   }
     * })
    **/
    count<T extends AdministrateurCountArgs>(
      args?: Subset<T, AdministrateurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdministrateurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Administrateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdministrateurAggregateArgs>(args: Subset<T, AdministrateurAggregateArgs>): Prisma.PrismaPromise<GetAdministrateurAggregateType<T>>

    /**
     * Group by Administrateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdministrateurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdministrateurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdministrateurGroupByArgs['orderBy'] }
        : { orderBy?: AdministrateurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdministrateurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdministrateurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Administrateur model
   */
  readonly fields: AdministrateurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Administrateur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdministrateurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Administrateur model
   */
  interface AdministrateurFieldRefs {
    readonly id: FieldRef<"Administrateur", 'String'>
    readonly fonction: FieldRef<"Administrateur", 'FonctionAdmin'>
    readonly userId: FieldRef<"Administrateur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Administrateur findUnique
   */
  export type AdministrateurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter, which Administrateur to fetch.
     */
    where: AdministrateurWhereUniqueInput
  }

  /**
   * Administrateur findUniqueOrThrow
   */
  export type AdministrateurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter, which Administrateur to fetch.
     */
    where: AdministrateurWhereUniqueInput
  }

  /**
   * Administrateur findFirst
   */
  export type AdministrateurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter, which Administrateur to fetch.
     */
    where?: AdministrateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Administrateurs to fetch.
     */
    orderBy?: AdministrateurOrderByWithRelationInput | AdministrateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Administrateurs.
     */
    cursor?: AdministrateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Administrateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Administrateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Administrateurs.
     */
    distinct?: AdministrateurScalarFieldEnum | AdministrateurScalarFieldEnum[]
  }

  /**
   * Administrateur findFirstOrThrow
   */
  export type AdministrateurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter, which Administrateur to fetch.
     */
    where?: AdministrateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Administrateurs to fetch.
     */
    orderBy?: AdministrateurOrderByWithRelationInput | AdministrateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Administrateurs.
     */
    cursor?: AdministrateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Administrateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Administrateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Administrateurs.
     */
    distinct?: AdministrateurScalarFieldEnum | AdministrateurScalarFieldEnum[]
  }

  /**
   * Administrateur findMany
   */
  export type AdministrateurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter, which Administrateurs to fetch.
     */
    where?: AdministrateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Administrateurs to fetch.
     */
    orderBy?: AdministrateurOrderByWithRelationInput | AdministrateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Administrateurs.
     */
    cursor?: AdministrateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Administrateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Administrateurs.
     */
    skip?: number
    distinct?: AdministrateurScalarFieldEnum | AdministrateurScalarFieldEnum[]
  }

  /**
   * Administrateur create
   */
  export type AdministrateurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * The data needed to create a Administrateur.
     */
    data: XOR<AdministrateurCreateInput, AdministrateurUncheckedCreateInput>
  }

  /**
   * Administrateur createMany
   */
  export type AdministrateurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Administrateurs.
     */
    data: AdministrateurCreateManyInput | AdministrateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Administrateur createManyAndReturn
   */
  export type AdministrateurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * The data used to create many Administrateurs.
     */
    data: AdministrateurCreateManyInput | AdministrateurCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Administrateur update
   */
  export type AdministrateurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * The data needed to update a Administrateur.
     */
    data: XOR<AdministrateurUpdateInput, AdministrateurUncheckedUpdateInput>
    /**
     * Choose, which Administrateur to update.
     */
    where: AdministrateurWhereUniqueInput
  }

  /**
   * Administrateur updateMany
   */
  export type AdministrateurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Administrateurs.
     */
    data: XOR<AdministrateurUpdateManyMutationInput, AdministrateurUncheckedUpdateManyInput>
    /**
     * Filter which Administrateurs to update
     */
    where?: AdministrateurWhereInput
    /**
     * Limit how many Administrateurs to update.
     */
    limit?: number
  }

  /**
   * Administrateur updateManyAndReturn
   */
  export type AdministrateurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * The data used to update Administrateurs.
     */
    data: XOR<AdministrateurUpdateManyMutationInput, AdministrateurUncheckedUpdateManyInput>
    /**
     * Filter which Administrateurs to update
     */
    where?: AdministrateurWhereInput
    /**
     * Limit how many Administrateurs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Administrateur upsert
   */
  export type AdministrateurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * The filter to search for the Administrateur to update in case it exists.
     */
    where: AdministrateurWhereUniqueInput
    /**
     * In case the Administrateur found by the `where` argument doesn't exist, create a new Administrateur with this data.
     */
    create: XOR<AdministrateurCreateInput, AdministrateurUncheckedCreateInput>
    /**
     * In case the Administrateur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdministrateurUpdateInput, AdministrateurUncheckedUpdateInput>
  }

  /**
   * Administrateur delete
   */
  export type AdministrateurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
    /**
     * Filter which Administrateur to delete.
     */
    where: AdministrateurWhereUniqueInput
  }

  /**
   * Administrateur deleteMany
   */
  export type AdministrateurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Administrateurs to delete
     */
    where?: AdministrateurWhereInput
    /**
     * Limit how many Administrateurs to delete.
     */
    limit?: number
  }

  /**
   * Administrateur without action
   */
  export type AdministrateurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Administrateur
     */
    select?: AdministrateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Administrateur
     */
    omit?: AdministrateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdministrateurInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    poids: number | null
    taille: number | null
  }

  export type PatientSumAggregateOutputType = {
    poids: number | null
    taille: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    dateNaissance: Date | null
    adresse: string | null
    groupeSanguin: $Enums.GroupeSanguin | null
    poids: number | null
    taille: number | null
    sexe: $Enums.Sexe | null
    userId: string | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    dateNaissance: Date | null
    adresse: string | null
    groupeSanguin: $Enums.GroupeSanguin | null
    poids: number | null
    taille: number | null
    sexe: $Enums.Sexe | null
    userId: string | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    dateNaissance: number
    adresse: number
    groupeSanguin: number
    poids: number
    taille: number
    sexe: number
    userId: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    poids?: true
    taille?: true
  }

  export type PatientSumAggregateInputType = {
    poids?: true
    taille?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    dateNaissance?: true
    adresse?: true
    groupeSanguin?: true
    poids?: true
    taille?: true
    sexe?: true
    userId?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    dateNaissance?: true
    adresse?: true
    groupeSanguin?: true
    poids?: true
    taille?: true
    sexe?: true
    userId?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    dateNaissance?: true
    adresse?: true
    groupeSanguin?: true
    poids?: true
    taille?: true
    sexe?: true
    userId?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    dateNaissance: Date
    adresse: string | null
    groupeSanguin: $Enums.GroupeSanguin
    poids: number | null
    taille: number | null
    sexe: $Enums.Sexe
    userId: string
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateNaissance?: boolean
    adresse?: boolean
    groupeSanguin?: boolean
    poids?: boolean
    taille?: boolean
    sexe?: boolean
    userId?: boolean
    documents?: boolean | Patient$documentsArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    rendezVous?: boolean | Patient$rendezVousArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateNaissance?: boolean
    adresse?: boolean
    groupeSanguin?: boolean
    poids?: boolean
    taille?: boolean
    sexe?: boolean
    userId?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateNaissance?: boolean
    adresse?: boolean
    groupeSanguin?: boolean
    poids?: boolean
    taille?: boolean
    sexe?: boolean
    userId?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    dateNaissance?: boolean
    adresse?: boolean
    groupeSanguin?: boolean
    poids?: boolean
    taille?: boolean
    sexe?: boolean
    userId?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dateNaissance" | "adresse" | "groupeSanguin" | "poids" | "taille" | "sexe" | "userId", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | Patient$documentsArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    rendezVous?: boolean | Patient$rendezVousArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dateNaissance: Date
      adresse: string | null
      groupeSanguin: $Enums.GroupeSanguin
      poids: number | null
      taille: number | null
      sexe: $Enums.Sexe
      userId: string
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends Patient$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rendezVous<T extends Patient$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, Patient$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly dateNaissance: FieldRef<"Patient", 'DateTime'>
    readonly adresse: FieldRef<"Patient", 'String'>
    readonly groupeSanguin: FieldRef<"Patient", 'GroupeSanguin'>
    readonly poids: FieldRef<"Patient", 'Float'>
    readonly taille: FieldRef<"Patient", 'Float'>
    readonly sexe: FieldRef<"Patient", 'Sexe'>
    readonly userId: FieldRef<"Patient", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.documents
   */
  export type Patient$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Patient.rendezVous
   */
  export type Patient$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Medecin
   */

  export type AggregateMedecin = {
    _count: MedecinCountAggregateOutputType | null
    _avg: MedecinAvgAggregateOutputType | null
    _sum: MedecinSumAggregateOutputType | null
    _min: MedecinMinAggregateOutputType | null
    _max: MedecinMaxAggregateOutputType | null
  }

  export type MedecinAvgAggregateOutputType = {
    anneeExperience: number | null
  }

  export type MedecinSumAggregateOutputType = {
    anneeExperience: number | null
  }

  export type MedecinMinAggregateOutputType = {
    id: string | null
    specialiteId: string | null
    numLicence: string | null
    anneeExperience: number | null
    titre: string | null
    userId: string | null
    isDisponible: boolean | null
    statut: $Enums.StatutApproval | null
  }

  export type MedecinMaxAggregateOutputType = {
    id: string | null
    specialiteId: string | null
    numLicence: string | null
    anneeExperience: number | null
    titre: string | null
    userId: string | null
    isDisponible: boolean | null
    statut: $Enums.StatutApproval | null
  }

  export type MedecinCountAggregateOutputType = {
    id: number
    specialiteId: number
    numLicence: number
    anneeExperience: number
    titre: number
    userId: number
    isDisponible: number
    statut: number
    _all: number
  }


  export type MedecinAvgAggregateInputType = {
    anneeExperience?: true
  }

  export type MedecinSumAggregateInputType = {
    anneeExperience?: true
  }

  export type MedecinMinAggregateInputType = {
    id?: true
    specialiteId?: true
    numLicence?: true
    anneeExperience?: true
    titre?: true
    userId?: true
    isDisponible?: true
    statut?: true
  }

  export type MedecinMaxAggregateInputType = {
    id?: true
    specialiteId?: true
    numLicence?: true
    anneeExperience?: true
    titre?: true
    userId?: true
    isDisponible?: true
    statut?: true
  }

  export type MedecinCountAggregateInputType = {
    id?: true
    specialiteId?: true
    numLicence?: true
    anneeExperience?: true
    titre?: true
    userId?: true
    isDisponible?: true
    statut?: true
    _all?: true
  }

  export type MedecinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medecin to aggregate.
     */
    where?: MedecinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medecins to fetch.
     */
    orderBy?: MedecinOrderByWithRelationInput | MedecinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedecinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medecins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medecins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Medecins
    **/
    _count?: true | MedecinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedecinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedecinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedecinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedecinMaxAggregateInputType
  }

  export type GetMedecinAggregateType<T extends MedecinAggregateArgs> = {
        [P in keyof T & keyof AggregateMedecin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedecin[P]>
      : GetScalarType<T[P], AggregateMedecin[P]>
  }




  export type MedecinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedecinWhereInput
    orderBy?: MedecinOrderByWithAggregationInput | MedecinOrderByWithAggregationInput[]
    by: MedecinScalarFieldEnum[] | MedecinScalarFieldEnum
    having?: MedecinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedecinCountAggregateInputType | true
    _avg?: MedecinAvgAggregateInputType
    _sum?: MedecinSumAggregateInputType
    _min?: MedecinMinAggregateInputType
    _max?: MedecinMaxAggregateInputType
  }

  export type MedecinGroupByOutputType = {
    id: string
    specialiteId: string
    numLicence: string
    anneeExperience: number | null
    titre: string
    userId: string
    isDisponible: boolean
    statut: $Enums.StatutApproval
    _count: MedecinCountAggregateOutputType | null
    _avg: MedecinAvgAggregateOutputType | null
    _sum: MedecinSumAggregateOutputType | null
    _min: MedecinMinAggregateOutputType | null
    _max: MedecinMaxAggregateOutputType | null
  }

  type GetMedecinGroupByPayload<T extends MedecinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedecinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedecinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedecinGroupByOutputType[P]>
            : GetScalarType<T[P], MedecinGroupByOutputType[P]>
        }
      >
    >


  export type MedecinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    specialiteId?: boolean
    numLicence?: boolean
    anneeExperience?: boolean
    titre?: boolean
    userId?: boolean
    isDisponible?: boolean
    statut?: boolean
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    recommandations?: boolean | Medecin$recommandationsArgs<ExtArgs>
    rendezVous?: boolean | Medecin$rendezVousArgs<ExtArgs>
    hopitaux?: boolean | Medecin$hopitauxArgs<ExtArgs>
    _count?: boolean | MedecinCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecin"]>

  export type MedecinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    specialiteId?: boolean
    numLicence?: boolean
    anneeExperience?: boolean
    titre?: boolean
    userId?: boolean
    isDisponible?: boolean
    statut?: boolean
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecin"]>

  export type MedecinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    specialiteId?: boolean
    numLicence?: boolean
    anneeExperience?: boolean
    titre?: boolean
    userId?: boolean
    isDisponible?: boolean
    statut?: boolean
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecin"]>

  export type MedecinSelectScalar = {
    id?: boolean
    specialiteId?: boolean
    numLicence?: boolean
    anneeExperience?: boolean
    titre?: boolean
    userId?: boolean
    isDisponible?: boolean
    statut?: boolean
  }

  export type MedecinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "specialiteId" | "numLicence" | "anneeExperience" | "titre" | "userId" | "isDisponible" | "statut", ExtArgs["result"]["medecin"]>
  export type MedecinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    recommandations?: boolean | Medecin$recommandationsArgs<ExtArgs>
    rendezVous?: boolean | Medecin$rendezVousArgs<ExtArgs>
    hopitaux?: boolean | Medecin$hopitauxArgs<ExtArgs>
    _count?: boolean | MedecinCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedecinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type MedecinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    specialite?: boolean | SpecialiteDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }

  export type $MedecinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Medecin"
    objects: {
      specialite: Prisma.$SpecialitePayload<ExtArgs>
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
      recommandations: Prisma.$RecommandationPayload<ExtArgs>[]
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
      hopitaux: Prisma.$MedecinHopitalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      specialiteId: string
      numLicence: string
      anneeExperience: number | null
      titre: string
      userId: string
      isDisponible: boolean
      statut: $Enums.StatutApproval
    }, ExtArgs["result"]["medecin"]>
    composites: {}
  }

  type MedecinGetPayload<S extends boolean | null | undefined | MedecinDefaultArgs> = $Result.GetResult<Prisma.$MedecinPayload, S>

  type MedecinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedecinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedecinCountAggregateInputType | true
    }

  export interface MedecinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Medecin'], meta: { name: 'Medecin' } }
    /**
     * Find zero or one Medecin that matches the filter.
     * @param {MedecinFindUniqueArgs} args - Arguments to find a Medecin
     * @example
     * // Get one Medecin
     * const medecin = await prisma.medecin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedecinFindUniqueArgs>(args: SelectSubset<T, MedecinFindUniqueArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medecin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedecinFindUniqueOrThrowArgs} args - Arguments to find a Medecin
     * @example
     * // Get one Medecin
     * const medecin = await prisma.medecin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedecinFindUniqueOrThrowArgs>(args: SelectSubset<T, MedecinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medecin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinFindFirstArgs} args - Arguments to find a Medecin
     * @example
     * // Get one Medecin
     * const medecin = await prisma.medecin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedecinFindFirstArgs>(args?: SelectSubset<T, MedecinFindFirstArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medecin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinFindFirstOrThrowArgs} args - Arguments to find a Medecin
     * @example
     * // Get one Medecin
     * const medecin = await prisma.medecin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedecinFindFirstOrThrowArgs>(args?: SelectSubset<T, MedecinFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medecins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medecins
     * const medecins = await prisma.medecin.findMany()
     * 
     * // Get first 10 Medecins
     * const medecins = await prisma.medecin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medecinWithIdOnly = await prisma.medecin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedecinFindManyArgs>(args?: SelectSubset<T, MedecinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medecin.
     * @param {MedecinCreateArgs} args - Arguments to create a Medecin.
     * @example
     * // Create one Medecin
     * const Medecin = await prisma.medecin.create({
     *   data: {
     *     // ... data to create a Medecin
     *   }
     * })
     * 
     */
    create<T extends MedecinCreateArgs>(args: SelectSubset<T, MedecinCreateArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medecins.
     * @param {MedecinCreateManyArgs} args - Arguments to create many Medecins.
     * @example
     * // Create many Medecins
     * const medecin = await prisma.medecin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedecinCreateManyArgs>(args?: SelectSubset<T, MedecinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Medecins and returns the data saved in the database.
     * @param {MedecinCreateManyAndReturnArgs} args - Arguments to create many Medecins.
     * @example
     * // Create many Medecins
     * const medecin = await prisma.medecin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Medecins and only return the `id`
     * const medecinWithIdOnly = await prisma.medecin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedecinCreateManyAndReturnArgs>(args?: SelectSubset<T, MedecinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Medecin.
     * @param {MedecinDeleteArgs} args - Arguments to delete one Medecin.
     * @example
     * // Delete one Medecin
     * const Medecin = await prisma.medecin.delete({
     *   where: {
     *     // ... filter to delete one Medecin
     *   }
     * })
     * 
     */
    delete<T extends MedecinDeleteArgs>(args: SelectSubset<T, MedecinDeleteArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medecin.
     * @param {MedecinUpdateArgs} args - Arguments to update one Medecin.
     * @example
     * // Update one Medecin
     * const medecin = await prisma.medecin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedecinUpdateArgs>(args: SelectSubset<T, MedecinUpdateArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medecins.
     * @param {MedecinDeleteManyArgs} args - Arguments to filter Medecins to delete.
     * @example
     * // Delete a few Medecins
     * const { count } = await prisma.medecin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedecinDeleteManyArgs>(args?: SelectSubset<T, MedecinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medecins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medecins
     * const medecin = await prisma.medecin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedecinUpdateManyArgs>(args: SelectSubset<T, MedecinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medecins and returns the data updated in the database.
     * @param {MedecinUpdateManyAndReturnArgs} args - Arguments to update many Medecins.
     * @example
     * // Update many Medecins
     * const medecin = await prisma.medecin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Medecins and only return the `id`
     * const medecinWithIdOnly = await prisma.medecin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedecinUpdateManyAndReturnArgs>(args: SelectSubset<T, MedecinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Medecin.
     * @param {MedecinUpsertArgs} args - Arguments to update or create a Medecin.
     * @example
     * // Update or create a Medecin
     * const medecin = await prisma.medecin.upsert({
     *   create: {
     *     // ... data to create a Medecin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medecin we want to update
     *   }
     * })
     */
    upsert<T extends MedecinUpsertArgs>(args: SelectSubset<T, MedecinUpsertArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medecins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinCountArgs} args - Arguments to filter Medecins to count.
     * @example
     * // Count the number of Medecins
     * const count = await prisma.medecin.count({
     *   where: {
     *     // ... the filter for the Medecins we want to count
     *   }
     * })
    **/
    count<T extends MedecinCountArgs>(
      args?: Subset<T, MedecinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedecinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medecin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedecinAggregateArgs>(args: Subset<T, MedecinAggregateArgs>): Prisma.PrismaPromise<GetMedecinAggregateType<T>>

    /**
     * Group by Medecin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedecinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedecinGroupByArgs['orderBy'] }
        : { orderBy?: MedecinGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedecinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedecinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Medecin model
   */
  readonly fields: MedecinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Medecin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedecinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    specialite<T extends SpecialiteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpecialiteDefaultArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recommandations<T extends Medecin$recommandationsArgs<ExtArgs> = {}>(args?: Subset<T, Medecin$recommandationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rendezVous<T extends Medecin$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, Medecin$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hopitaux<T extends Medecin$hopitauxArgs<ExtArgs> = {}>(args?: Subset<T, Medecin$hopitauxArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Medecin model
   */
  interface MedecinFieldRefs {
    readonly id: FieldRef<"Medecin", 'String'>
    readonly specialiteId: FieldRef<"Medecin", 'String'>
    readonly numLicence: FieldRef<"Medecin", 'String'>
    readonly anneeExperience: FieldRef<"Medecin", 'Int'>
    readonly titre: FieldRef<"Medecin", 'String'>
    readonly userId: FieldRef<"Medecin", 'String'>
    readonly isDisponible: FieldRef<"Medecin", 'Boolean'>
    readonly statut: FieldRef<"Medecin", 'StatutApproval'>
  }
    

  // Custom InputTypes
  /**
   * Medecin findUnique
   */
  export type MedecinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter, which Medecin to fetch.
     */
    where: MedecinWhereUniqueInput
  }

  /**
   * Medecin findUniqueOrThrow
   */
  export type MedecinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter, which Medecin to fetch.
     */
    where: MedecinWhereUniqueInput
  }

  /**
   * Medecin findFirst
   */
  export type MedecinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter, which Medecin to fetch.
     */
    where?: MedecinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medecins to fetch.
     */
    orderBy?: MedecinOrderByWithRelationInput | MedecinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medecins.
     */
    cursor?: MedecinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medecins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medecins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medecins.
     */
    distinct?: MedecinScalarFieldEnum | MedecinScalarFieldEnum[]
  }

  /**
   * Medecin findFirstOrThrow
   */
  export type MedecinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter, which Medecin to fetch.
     */
    where?: MedecinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medecins to fetch.
     */
    orderBy?: MedecinOrderByWithRelationInput | MedecinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medecins.
     */
    cursor?: MedecinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medecins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medecins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medecins.
     */
    distinct?: MedecinScalarFieldEnum | MedecinScalarFieldEnum[]
  }

  /**
   * Medecin findMany
   */
  export type MedecinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter, which Medecins to fetch.
     */
    where?: MedecinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medecins to fetch.
     */
    orderBy?: MedecinOrderByWithRelationInput | MedecinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Medecins.
     */
    cursor?: MedecinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medecins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medecins.
     */
    skip?: number
    distinct?: MedecinScalarFieldEnum | MedecinScalarFieldEnum[]
  }

  /**
   * Medecin create
   */
  export type MedecinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * The data needed to create a Medecin.
     */
    data: XOR<MedecinCreateInput, MedecinUncheckedCreateInput>
  }

  /**
   * Medecin createMany
   */
  export type MedecinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Medecins.
     */
    data: MedecinCreateManyInput | MedecinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Medecin createManyAndReturn
   */
  export type MedecinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * The data used to create many Medecins.
     */
    data: MedecinCreateManyInput | MedecinCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Medecin update
   */
  export type MedecinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * The data needed to update a Medecin.
     */
    data: XOR<MedecinUpdateInput, MedecinUncheckedUpdateInput>
    /**
     * Choose, which Medecin to update.
     */
    where: MedecinWhereUniqueInput
  }

  /**
   * Medecin updateMany
   */
  export type MedecinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Medecins.
     */
    data: XOR<MedecinUpdateManyMutationInput, MedecinUncheckedUpdateManyInput>
    /**
     * Filter which Medecins to update
     */
    where?: MedecinWhereInput
    /**
     * Limit how many Medecins to update.
     */
    limit?: number
  }

  /**
   * Medecin updateManyAndReturn
   */
  export type MedecinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * The data used to update Medecins.
     */
    data: XOR<MedecinUpdateManyMutationInput, MedecinUncheckedUpdateManyInput>
    /**
     * Filter which Medecins to update
     */
    where?: MedecinWhereInput
    /**
     * Limit how many Medecins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Medecin upsert
   */
  export type MedecinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * The filter to search for the Medecin to update in case it exists.
     */
    where: MedecinWhereUniqueInput
    /**
     * In case the Medecin found by the `where` argument doesn't exist, create a new Medecin with this data.
     */
    create: XOR<MedecinCreateInput, MedecinUncheckedCreateInput>
    /**
     * In case the Medecin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedecinUpdateInput, MedecinUncheckedUpdateInput>
  }

  /**
   * Medecin delete
   */
  export type MedecinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    /**
     * Filter which Medecin to delete.
     */
    where: MedecinWhereUniqueInput
  }

  /**
   * Medecin deleteMany
   */
  export type MedecinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medecins to delete
     */
    where?: MedecinWhereInput
    /**
     * Limit how many Medecins to delete.
     */
    limit?: number
  }

  /**
   * Medecin.recommandations
   */
  export type Medecin$recommandationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    where?: RecommandationWhereInput
    orderBy?: RecommandationOrderByWithRelationInput | RecommandationOrderByWithRelationInput[]
    cursor?: RecommandationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommandationScalarFieldEnum | RecommandationScalarFieldEnum[]
  }

  /**
   * Medecin.rendezVous
   */
  export type Medecin$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * Medecin.hopitaux
   */
  export type Medecin$hopitauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    where?: MedecinHopitalWhereInput
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    cursor?: MedecinHopitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedecinHopitalScalarFieldEnum | MedecinHopitalScalarFieldEnum[]
  }

  /**
   * Medecin without action
   */
  export type MedecinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    titre: string | null
    description: string | null
    dateCreation: Date | null
    patientId: string | null
    url: string | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    titre: string | null
    description: string | null
    dateCreation: Date | null
    patientId: string | null
    url: string | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    titre: number
    description: number
    dateCreation: number
    patientId: number
    url: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    dateCreation?: true
    patientId?: true
    url?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    dateCreation?: true
    patientId?: true
    url?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    dateCreation?: true
    patientId?: true
    url?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    titre: string
    description: string | null
    dateCreation: Date
    patientId: string | null
    url: string
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    dateCreation?: boolean
    patientId?: boolean
    url?: boolean
    patient?: boolean | Document$patientArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    dateCreation?: boolean
    patientId?: boolean
    url?: boolean
    patient?: boolean | Document$patientArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    dateCreation?: boolean
    patientId?: boolean
    url?: boolean
    patient?: boolean | Document$patientArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    titre?: boolean
    description?: boolean
    dateCreation?: boolean
    patientId?: boolean
    url?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titre" | "description" | "dateCreation" | "patientId" | "url", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Document$patientArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Document$patientArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Document$patientArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titre: string
      description: string | null
      dateCreation: Date
      patientId: string | null
      url: string
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends Document$patientArgs<ExtArgs> = {}>(args?: Subset<T, Document$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly titre: FieldRef<"Document", 'String'>
    readonly description: FieldRef<"Document", 'String'>
    readonly dateCreation: FieldRef<"Document", 'DateTime'>
    readonly patientId: FieldRef<"Document", 'String'>
    readonly url: FieldRef<"Document", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.patient
   */
  export type Document$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model RendezVous
   */

  export type AggregateRendezVous = {
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  export type RendezVousAvgAggregateOutputType = {
    duree: number | null
  }

  export type RendezVousSumAggregateOutputType = {
    duree: number | null
  }

  export type RendezVousMinAggregateOutputType = {
    id: string | null
    date: Date | null
    duree: number | null
    statut: $Enums.StatutRendezVous | null
    motif: string | null
    hopitalId: string | null
    utilisateurId: string | null
    medecinId: string | null
    patientId: string | null
  }

  export type RendezVousMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    duree: number | null
    statut: $Enums.StatutRendezVous | null
    motif: string | null
    hopitalId: string | null
    utilisateurId: string | null
    medecinId: string | null
    patientId: string | null
  }

  export type RendezVousCountAggregateOutputType = {
    id: number
    date: number
    duree: number
    statut: number
    motif: number
    hopitalId: number
    utilisateurId: number
    medecinId: number
    patientId: number
    _all: number
  }


  export type RendezVousAvgAggregateInputType = {
    duree?: true
  }

  export type RendezVousSumAggregateInputType = {
    duree?: true
  }

  export type RendezVousMinAggregateInputType = {
    id?: true
    date?: true
    duree?: true
    statut?: true
    motif?: true
    hopitalId?: true
    utilisateurId?: true
    medecinId?: true
    patientId?: true
  }

  export type RendezVousMaxAggregateInputType = {
    id?: true
    date?: true
    duree?: true
    statut?: true
    motif?: true
    hopitalId?: true
    utilisateurId?: true
    medecinId?: true
    patientId?: true
  }

  export type RendezVousCountAggregateInputType = {
    id?: true
    date?: true
    duree?: true
    statut?: true
    motif?: true
    hopitalId?: true
    utilisateurId?: true
    medecinId?: true
    patientId?: true
    _all?: true
  }

  export type RendezVousAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to aggregate.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RendezVous
    **/
    _count?: true | RendezVousCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RendezVousAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RendezVousSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RendezVousMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RendezVousMaxAggregateInputType
  }

  export type GetRendezVousAggregateType<T extends RendezVousAggregateArgs> = {
        [P in keyof T & keyof AggregateRendezVous]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRendezVous[P]>
      : GetScalarType<T[P], AggregateRendezVous[P]>
  }




  export type RendezVousGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithAggregationInput | RendezVousOrderByWithAggregationInput[]
    by: RendezVousScalarFieldEnum[] | RendezVousScalarFieldEnum
    having?: RendezVousScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RendezVousCountAggregateInputType | true
    _avg?: RendezVousAvgAggregateInputType
    _sum?: RendezVousSumAggregateInputType
    _min?: RendezVousMinAggregateInputType
    _max?: RendezVousMaxAggregateInputType
  }

  export type RendezVousGroupByOutputType = {
    id: string
    date: Date
    duree: number
    statut: $Enums.StatutRendezVous
    motif: string | null
    hopitalId: string
    utilisateurId: string
    medecinId: string
    patientId: string
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  type GetRendezVousGroupByPayload<T extends RendezVousGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RendezVousGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RendezVousGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
            : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
        }
      >
    >


  export type RendezVousSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duree?: boolean
    statut?: boolean
    motif?: boolean
    hopitalId?: boolean
    utilisateurId?: boolean
    medecinId?: boolean
    patientId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duree?: boolean
    statut?: boolean
    motif?: boolean
    hopitalId?: boolean
    utilisateurId?: boolean
    medecinId?: boolean
    patientId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duree?: boolean
    statut?: boolean
    motif?: boolean
    hopitalId?: boolean
    utilisateurId?: boolean
    medecinId?: boolean
    patientId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectScalar = {
    id?: boolean
    date?: boolean
    duree?: boolean
    statut?: boolean
    motif?: boolean
    hopitalId?: boolean
    utilisateurId?: boolean
    medecinId?: boolean
    patientId?: boolean
  }

  export type RendezVousOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "duree" | "statut" | "motif" | "hopitalId" | "utilisateurId" | "medecinId" | "patientId", ExtArgs["result"]["rendezVous"]>
  export type RendezVousInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }

  export type $RendezVousPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RendezVous"
    objects: {
      medecin: Prisma.$MedecinPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
      hopital: Prisma.$HopitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      duree: number
      statut: $Enums.StatutRendezVous
      motif: string | null
      hopitalId: string
      utilisateurId: string
      medecinId: string
      patientId: string
    }, ExtArgs["result"]["rendezVous"]>
    composites: {}
  }

  type RendezVousGetPayload<S extends boolean | null | undefined | RendezVousDefaultArgs> = $Result.GetResult<Prisma.$RendezVousPayload, S>

  type RendezVousCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RendezVousFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RendezVousCountAggregateInputType | true
    }

  export interface RendezVousDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RendezVous'], meta: { name: 'RendezVous' } }
    /**
     * Find zero or one RendezVous that matches the filter.
     * @param {RendezVousFindUniqueArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RendezVousFindUniqueArgs>(args: SelectSubset<T, RendezVousFindUniqueArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RendezVous that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RendezVousFindUniqueOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RendezVousFindUniqueOrThrowArgs>(args: SelectSubset<T, RendezVousFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RendezVousFindFirstArgs>(args?: SelectSubset<T, RendezVousFindFirstArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RendezVousFindFirstOrThrowArgs>(args?: SelectSubset<T, RendezVousFindFirstOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RendezVous
     * const rendezVous = await prisma.rendezVous.findMany()
     * 
     * // Get first 10 RendezVous
     * const rendezVous = await prisma.rendezVous.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RendezVousFindManyArgs>(args?: SelectSubset<T, RendezVousFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RendezVous.
     * @param {RendezVousCreateArgs} args - Arguments to create a RendezVous.
     * @example
     * // Create one RendezVous
     * const RendezVous = await prisma.rendezVous.create({
     *   data: {
     *     // ... data to create a RendezVous
     *   }
     * })
     * 
     */
    create<T extends RendezVousCreateArgs>(args: SelectSubset<T, RendezVousCreateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RendezVous.
     * @param {RendezVousCreateManyArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RendezVousCreateManyArgs>(args?: SelectSubset<T, RendezVousCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RendezVous and returns the data saved in the database.
     * @param {RendezVousCreateManyAndReturnArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RendezVousCreateManyAndReturnArgs>(args?: SelectSubset<T, RendezVousCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RendezVous.
     * @param {RendezVousDeleteArgs} args - Arguments to delete one RendezVous.
     * @example
     * // Delete one RendezVous
     * const RendezVous = await prisma.rendezVous.delete({
     *   where: {
     *     // ... filter to delete one RendezVous
     *   }
     * })
     * 
     */
    delete<T extends RendezVousDeleteArgs>(args: SelectSubset<T, RendezVousDeleteArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RendezVous.
     * @param {RendezVousUpdateArgs} args - Arguments to update one RendezVous.
     * @example
     * // Update one RendezVous
     * const rendezVous = await prisma.rendezVous.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RendezVousUpdateArgs>(args: SelectSubset<T, RendezVousUpdateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RendezVous.
     * @param {RendezVousDeleteManyArgs} args - Arguments to filter RendezVous to delete.
     * @example
     * // Delete a few RendezVous
     * const { count } = await prisma.rendezVous.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RendezVousDeleteManyArgs>(args?: SelectSubset<T, RendezVousDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RendezVousUpdateManyArgs>(args: SelectSubset<T, RendezVousUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous and returns the data updated in the database.
     * @param {RendezVousUpdateManyAndReturnArgs} args - Arguments to update many RendezVous.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RendezVousUpdateManyAndReturnArgs>(args: SelectSubset<T, RendezVousUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RendezVous.
     * @param {RendezVousUpsertArgs} args - Arguments to update or create a RendezVous.
     * @example
     * // Update or create a RendezVous
     * const rendezVous = await prisma.rendezVous.upsert({
     *   create: {
     *     // ... data to create a RendezVous
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RendezVous we want to update
     *   }
     * })
     */
    upsert<T extends RendezVousUpsertArgs>(args: SelectSubset<T, RendezVousUpsertArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousCountArgs} args - Arguments to filter RendezVous to count.
     * @example
     * // Count the number of RendezVous
     * const count = await prisma.rendezVous.count({
     *   where: {
     *     // ... the filter for the RendezVous we want to count
     *   }
     * })
    **/
    count<T extends RendezVousCountArgs>(
      args?: Subset<T, RendezVousCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RendezVousCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RendezVousAggregateArgs>(args: Subset<T, RendezVousAggregateArgs>): Prisma.PrismaPromise<GetRendezVousAggregateType<T>>

    /**
     * Group by RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RendezVousGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RendezVousGroupByArgs['orderBy'] }
        : { orderBy?: RendezVousGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RendezVousGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRendezVousGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RendezVous model
   */
  readonly fields: RendezVousFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RendezVous.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RendezVousClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medecin<T extends MedecinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedecinDefaultArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hopital<T extends HopitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HopitalDefaultArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RendezVous model
   */
  interface RendezVousFieldRefs {
    readonly id: FieldRef<"RendezVous", 'String'>
    readonly date: FieldRef<"RendezVous", 'DateTime'>
    readonly duree: FieldRef<"RendezVous", 'Int'>
    readonly statut: FieldRef<"RendezVous", 'StatutRendezVous'>
    readonly motif: FieldRef<"RendezVous", 'String'>
    readonly hopitalId: FieldRef<"RendezVous", 'String'>
    readonly utilisateurId: FieldRef<"RendezVous", 'String'>
    readonly medecinId: FieldRef<"RendezVous", 'String'>
    readonly patientId: FieldRef<"RendezVous", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RendezVous findUnique
   */
  export type RendezVousFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findUniqueOrThrow
   */
  export type RendezVousFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findFirst
   */
  export type RendezVousFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findFirstOrThrow
   */
  export type RendezVousFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findMany
   */
  export type RendezVousFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous create
   */
  export type RendezVousCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to create a RendezVous.
     */
    data: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
  }

  /**
   * RendezVous createMany
   */
  export type RendezVousCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RendezVous createManyAndReturn
   */
  export type RendezVousCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous update
   */
  export type RendezVousUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to update a RendezVous.
     */
    data: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
    /**
     * Choose, which RendezVous to update.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous updateMany
   */
  export type RendezVousUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
  }

  /**
   * RendezVous updateManyAndReturn
   */
  export type RendezVousUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous upsert
   */
  export type RendezVousUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The filter to search for the RendezVous to update in case it exists.
     */
    where: RendezVousWhereUniqueInput
    /**
     * In case the RendezVous found by the `where` argument doesn't exist, create a new RendezVous with this data.
     */
    create: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
    /**
     * In case the RendezVous was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
  }

  /**
   * RendezVous delete
   */
  export type RendezVousDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter which RendezVous to delete.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous deleteMany
   */
  export type RendezVousDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to delete
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to delete.
     */
    limit?: number
  }

  /**
   * RendezVous without action
   */
  export type RendezVousDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
  }


  /**
   * Model Hopital
   */

  export type AggregateHopital = {
    _count: HopitalCountAggregateOutputType | null
    _min: HopitalMinAggregateOutputType | null
    _max: HopitalMaxAggregateOutputType | null
  }

  export type HopitalMinAggregateOutputType = {
    id: string | null
    nom: string | null
    adresse: string | null
    description: string | null
    contact: string | null
    localisation: string | null
    slug: string | null
    fuseauHoraire: string | null
  }

  export type HopitalMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    adresse: string | null
    description: string | null
    contact: string | null
    localisation: string | null
    slug: string | null
    fuseauHoraire: string | null
  }

  export type HopitalCountAggregateOutputType = {
    id: number
    nom: number
    adresse: number
    description: number
    contact: number
    localisation: number
    slug: number
    fuseauHoraire: number
    _all: number
  }


  export type HopitalMinAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    description?: true
    contact?: true
    localisation?: true
    slug?: true
    fuseauHoraire?: true
  }

  export type HopitalMaxAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    description?: true
    contact?: true
    localisation?: true
    slug?: true
    fuseauHoraire?: true
  }

  export type HopitalCountAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    description?: true
    contact?: true
    localisation?: true
    slug?: true
    fuseauHoraire?: true
    _all?: true
  }

  export type HopitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hopital to aggregate.
     */
    where?: HopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hopitals to fetch.
     */
    orderBy?: HopitalOrderByWithRelationInput | HopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hopitals
    **/
    _count?: true | HopitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HopitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HopitalMaxAggregateInputType
  }

  export type GetHopitalAggregateType<T extends HopitalAggregateArgs> = {
        [P in keyof T & keyof AggregateHopital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHopital[P]>
      : GetScalarType<T[P], AggregateHopital[P]>
  }




  export type HopitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HopitalWhereInput
    orderBy?: HopitalOrderByWithAggregationInput | HopitalOrderByWithAggregationInput[]
    by: HopitalScalarFieldEnum[] | HopitalScalarFieldEnum
    having?: HopitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HopitalCountAggregateInputType | true
    _min?: HopitalMinAggregateInputType
    _max?: HopitalMaxAggregateInputType
  }

  export type HopitalGroupByOutputType = {
    id: string
    nom: string
    adresse: string
    description: string | null
    contact: string
    localisation: string | null
    slug: string | null
    fuseauHoraire: string
    _count: HopitalCountAggregateOutputType | null
    _min: HopitalMinAggregateOutputType | null
    _max: HopitalMaxAggregateOutputType | null
  }

  type GetHopitalGroupByPayload<T extends HopitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HopitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HopitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HopitalGroupByOutputType[P]>
            : GetScalarType<T[P], HopitalGroupByOutputType[P]>
        }
      >
    >


  export type HopitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    description?: boolean
    contact?: boolean
    localisation?: boolean
    slug?: boolean
    fuseauHoraire?: boolean
    utilisateurHopitals?: boolean | Hopital$utilisateurHopitalsArgs<ExtArgs>
    rendevous?: boolean | Hopital$rendevousArgs<ExtArgs>
    medecin?: boolean | Hopital$medecinArgs<ExtArgs>
    specialites?: boolean | Hopital$specialitesArgs<ExtArgs>
    _count?: boolean | HopitalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hopital"]>

  export type HopitalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    description?: boolean
    contact?: boolean
    localisation?: boolean
    slug?: boolean
    fuseauHoraire?: boolean
  }, ExtArgs["result"]["hopital"]>

  export type HopitalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    description?: boolean
    contact?: boolean
    localisation?: boolean
    slug?: boolean
    fuseauHoraire?: boolean
  }, ExtArgs["result"]["hopital"]>

  export type HopitalSelectScalar = {
    id?: boolean
    nom?: boolean
    adresse?: boolean
    description?: boolean
    contact?: boolean
    localisation?: boolean
    slug?: boolean
    fuseauHoraire?: boolean
  }

  export type HopitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "adresse" | "description" | "contact" | "localisation" | "slug" | "fuseauHoraire", ExtArgs["result"]["hopital"]>
  export type HopitalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateurHopitals?: boolean | Hopital$utilisateurHopitalsArgs<ExtArgs>
    rendevous?: boolean | Hopital$rendevousArgs<ExtArgs>
    medecin?: boolean | Hopital$medecinArgs<ExtArgs>
    specialites?: boolean | Hopital$specialitesArgs<ExtArgs>
    _count?: boolean | HopitalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HopitalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HopitalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HopitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hopital"
    objects: {
      utilisateurHopitals: Prisma.$UtilisateurHopitalPayload<ExtArgs>[]
      rendevous: Prisma.$RendezVousPayload<ExtArgs>[]
      medecin: Prisma.$MedecinHopitalPayload<ExtArgs>[]
      specialites: Prisma.$SpecialitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      adresse: string
      description: string | null
      contact: string
      localisation: string | null
      slug: string | null
      fuseauHoraire: string
    }, ExtArgs["result"]["hopital"]>
    composites: {}
  }

  type HopitalGetPayload<S extends boolean | null | undefined | HopitalDefaultArgs> = $Result.GetResult<Prisma.$HopitalPayload, S>

  type HopitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HopitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HopitalCountAggregateInputType | true
    }

  export interface HopitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hopital'], meta: { name: 'Hopital' } }
    /**
     * Find zero or one Hopital that matches the filter.
     * @param {HopitalFindUniqueArgs} args - Arguments to find a Hopital
     * @example
     * // Get one Hopital
     * const hopital = await prisma.hopital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HopitalFindUniqueArgs>(args: SelectSubset<T, HopitalFindUniqueArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hopital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HopitalFindUniqueOrThrowArgs} args - Arguments to find a Hopital
     * @example
     * // Get one Hopital
     * const hopital = await prisma.hopital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HopitalFindUniqueOrThrowArgs>(args: SelectSubset<T, HopitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hopital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalFindFirstArgs} args - Arguments to find a Hopital
     * @example
     * // Get one Hopital
     * const hopital = await prisma.hopital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HopitalFindFirstArgs>(args?: SelectSubset<T, HopitalFindFirstArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hopital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalFindFirstOrThrowArgs} args - Arguments to find a Hopital
     * @example
     * // Get one Hopital
     * const hopital = await prisma.hopital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HopitalFindFirstOrThrowArgs>(args?: SelectSubset<T, HopitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hopitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hopitals
     * const hopitals = await prisma.hopital.findMany()
     * 
     * // Get first 10 Hopitals
     * const hopitals = await prisma.hopital.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hopitalWithIdOnly = await prisma.hopital.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HopitalFindManyArgs>(args?: SelectSubset<T, HopitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hopital.
     * @param {HopitalCreateArgs} args - Arguments to create a Hopital.
     * @example
     * // Create one Hopital
     * const Hopital = await prisma.hopital.create({
     *   data: {
     *     // ... data to create a Hopital
     *   }
     * })
     * 
     */
    create<T extends HopitalCreateArgs>(args: SelectSubset<T, HopitalCreateArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hopitals.
     * @param {HopitalCreateManyArgs} args - Arguments to create many Hopitals.
     * @example
     * // Create many Hopitals
     * const hopital = await prisma.hopital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HopitalCreateManyArgs>(args?: SelectSubset<T, HopitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hopitals and returns the data saved in the database.
     * @param {HopitalCreateManyAndReturnArgs} args - Arguments to create many Hopitals.
     * @example
     * // Create many Hopitals
     * const hopital = await prisma.hopital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hopitals and only return the `id`
     * const hopitalWithIdOnly = await prisma.hopital.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HopitalCreateManyAndReturnArgs>(args?: SelectSubset<T, HopitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hopital.
     * @param {HopitalDeleteArgs} args - Arguments to delete one Hopital.
     * @example
     * // Delete one Hopital
     * const Hopital = await prisma.hopital.delete({
     *   where: {
     *     // ... filter to delete one Hopital
     *   }
     * })
     * 
     */
    delete<T extends HopitalDeleteArgs>(args: SelectSubset<T, HopitalDeleteArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hopital.
     * @param {HopitalUpdateArgs} args - Arguments to update one Hopital.
     * @example
     * // Update one Hopital
     * const hopital = await prisma.hopital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HopitalUpdateArgs>(args: SelectSubset<T, HopitalUpdateArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hopitals.
     * @param {HopitalDeleteManyArgs} args - Arguments to filter Hopitals to delete.
     * @example
     * // Delete a few Hopitals
     * const { count } = await prisma.hopital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HopitalDeleteManyArgs>(args?: SelectSubset<T, HopitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hopitals
     * const hopital = await prisma.hopital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HopitalUpdateManyArgs>(args: SelectSubset<T, HopitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hopitals and returns the data updated in the database.
     * @param {HopitalUpdateManyAndReturnArgs} args - Arguments to update many Hopitals.
     * @example
     * // Update many Hopitals
     * const hopital = await prisma.hopital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hopitals and only return the `id`
     * const hopitalWithIdOnly = await prisma.hopital.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HopitalUpdateManyAndReturnArgs>(args: SelectSubset<T, HopitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hopital.
     * @param {HopitalUpsertArgs} args - Arguments to update or create a Hopital.
     * @example
     * // Update or create a Hopital
     * const hopital = await prisma.hopital.upsert({
     *   create: {
     *     // ... data to create a Hopital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hopital we want to update
     *   }
     * })
     */
    upsert<T extends HopitalUpsertArgs>(args: SelectSubset<T, HopitalUpsertArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalCountArgs} args - Arguments to filter Hopitals to count.
     * @example
     * // Count the number of Hopitals
     * const count = await prisma.hopital.count({
     *   where: {
     *     // ... the filter for the Hopitals we want to count
     *   }
     * })
    **/
    count<T extends HopitalCountArgs>(
      args?: Subset<T, HopitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HopitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HopitalAggregateArgs>(args: Subset<T, HopitalAggregateArgs>): Prisma.PrismaPromise<GetHopitalAggregateType<T>>

    /**
     * Group by Hopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HopitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HopitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HopitalGroupByArgs['orderBy'] }
        : { orderBy?: HopitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HopitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHopitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hopital model
   */
  readonly fields: HopitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hopital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HopitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateurHopitals<T extends Hopital$utilisateurHopitalsArgs<ExtArgs> = {}>(args?: Subset<T, Hopital$utilisateurHopitalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rendevous<T extends Hopital$rendevousArgs<ExtArgs> = {}>(args?: Subset<T, Hopital$rendevousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medecin<T extends Hopital$medecinArgs<ExtArgs> = {}>(args?: Subset<T, Hopital$medecinArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specialites<T extends Hopital$specialitesArgs<ExtArgs> = {}>(args?: Subset<T, Hopital$specialitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hopital model
   */
  interface HopitalFieldRefs {
    readonly id: FieldRef<"Hopital", 'String'>
    readonly nom: FieldRef<"Hopital", 'String'>
    readonly adresse: FieldRef<"Hopital", 'String'>
    readonly description: FieldRef<"Hopital", 'String'>
    readonly contact: FieldRef<"Hopital", 'String'>
    readonly localisation: FieldRef<"Hopital", 'String'>
    readonly slug: FieldRef<"Hopital", 'String'>
    readonly fuseauHoraire: FieldRef<"Hopital", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Hopital findUnique
   */
  export type HopitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter, which Hopital to fetch.
     */
    where: HopitalWhereUniqueInput
  }

  /**
   * Hopital findUniqueOrThrow
   */
  export type HopitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter, which Hopital to fetch.
     */
    where: HopitalWhereUniqueInput
  }

  /**
   * Hopital findFirst
   */
  export type HopitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter, which Hopital to fetch.
     */
    where?: HopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hopitals to fetch.
     */
    orderBy?: HopitalOrderByWithRelationInput | HopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hopitals.
     */
    cursor?: HopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hopitals.
     */
    distinct?: HopitalScalarFieldEnum | HopitalScalarFieldEnum[]
  }

  /**
   * Hopital findFirstOrThrow
   */
  export type HopitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter, which Hopital to fetch.
     */
    where?: HopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hopitals to fetch.
     */
    orderBy?: HopitalOrderByWithRelationInput | HopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hopitals.
     */
    cursor?: HopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hopitals.
     */
    distinct?: HopitalScalarFieldEnum | HopitalScalarFieldEnum[]
  }

  /**
   * Hopital findMany
   */
  export type HopitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter, which Hopitals to fetch.
     */
    where?: HopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hopitals to fetch.
     */
    orderBy?: HopitalOrderByWithRelationInput | HopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hopitals.
     */
    cursor?: HopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hopitals.
     */
    skip?: number
    distinct?: HopitalScalarFieldEnum | HopitalScalarFieldEnum[]
  }

  /**
   * Hopital create
   */
  export type HopitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * The data needed to create a Hopital.
     */
    data: XOR<HopitalCreateInput, HopitalUncheckedCreateInput>
  }

  /**
   * Hopital createMany
   */
  export type HopitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hopitals.
     */
    data: HopitalCreateManyInput | HopitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hopital createManyAndReturn
   */
  export type HopitalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * The data used to create many Hopitals.
     */
    data: HopitalCreateManyInput | HopitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hopital update
   */
  export type HopitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * The data needed to update a Hopital.
     */
    data: XOR<HopitalUpdateInput, HopitalUncheckedUpdateInput>
    /**
     * Choose, which Hopital to update.
     */
    where: HopitalWhereUniqueInput
  }

  /**
   * Hopital updateMany
   */
  export type HopitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hopitals.
     */
    data: XOR<HopitalUpdateManyMutationInput, HopitalUncheckedUpdateManyInput>
    /**
     * Filter which Hopitals to update
     */
    where?: HopitalWhereInput
    /**
     * Limit how many Hopitals to update.
     */
    limit?: number
  }

  /**
   * Hopital updateManyAndReturn
   */
  export type HopitalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * The data used to update Hopitals.
     */
    data: XOR<HopitalUpdateManyMutationInput, HopitalUncheckedUpdateManyInput>
    /**
     * Filter which Hopitals to update
     */
    where?: HopitalWhereInput
    /**
     * Limit how many Hopitals to update.
     */
    limit?: number
  }

  /**
   * Hopital upsert
   */
  export type HopitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * The filter to search for the Hopital to update in case it exists.
     */
    where: HopitalWhereUniqueInput
    /**
     * In case the Hopital found by the `where` argument doesn't exist, create a new Hopital with this data.
     */
    create: XOR<HopitalCreateInput, HopitalUncheckedCreateInput>
    /**
     * In case the Hopital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HopitalUpdateInput, HopitalUncheckedUpdateInput>
  }

  /**
   * Hopital delete
   */
  export type HopitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    /**
     * Filter which Hopital to delete.
     */
    where: HopitalWhereUniqueInput
  }

  /**
   * Hopital deleteMany
   */
  export type HopitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hopitals to delete
     */
    where?: HopitalWhereInput
    /**
     * Limit how many Hopitals to delete.
     */
    limit?: number
  }

  /**
   * Hopital.utilisateurHopitals
   */
  export type Hopital$utilisateurHopitalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    where?: UtilisateurHopitalWhereInput
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    cursor?: UtilisateurHopitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UtilisateurHopitalScalarFieldEnum | UtilisateurHopitalScalarFieldEnum[]
  }

  /**
   * Hopital.rendevous
   */
  export type Hopital$rendevousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * Hopital.medecin
   */
  export type Hopital$medecinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    where?: MedecinHopitalWhereInput
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    cursor?: MedecinHopitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedecinHopitalScalarFieldEnum | MedecinHopitalScalarFieldEnum[]
  }

  /**
   * Hopital.specialites
   */
  export type Hopital$specialitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    where?: SpecialiteWhereInput
    orderBy?: SpecialiteOrderByWithRelationInput | SpecialiteOrderByWithRelationInput[]
    cursor?: SpecialiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpecialiteScalarFieldEnum | SpecialiteScalarFieldEnum[]
  }

  /**
   * Hopital without action
   */
  export type HopitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
  }


  /**
   * Model MedecinHopital
   */

  export type AggregateMedecinHopital = {
    _count: MedecinHopitalCountAggregateOutputType | null
    _min: MedecinHopitalMinAggregateOutputType | null
    _max: MedecinHopitalMaxAggregateOutputType | null
  }

  export type MedecinHopitalMinAggregateOutputType = {
    id: string | null
    medecinId: string | null
    hopitalId: string | null
  }

  export type MedecinHopitalMaxAggregateOutputType = {
    id: string | null
    medecinId: string | null
    hopitalId: string | null
  }

  export type MedecinHopitalCountAggregateOutputType = {
    id: number
    medecinId: number
    hopitalId: number
    _all: number
  }


  export type MedecinHopitalMinAggregateInputType = {
    id?: true
    medecinId?: true
    hopitalId?: true
  }

  export type MedecinHopitalMaxAggregateInputType = {
    id?: true
    medecinId?: true
    hopitalId?: true
  }

  export type MedecinHopitalCountAggregateInputType = {
    id?: true
    medecinId?: true
    hopitalId?: true
    _all?: true
  }

  export type MedecinHopitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedecinHopital to aggregate.
     */
    where?: MedecinHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedecinHopitals to fetch.
     */
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedecinHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedecinHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedecinHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedecinHopitals
    **/
    _count?: true | MedecinHopitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedecinHopitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedecinHopitalMaxAggregateInputType
  }

  export type GetMedecinHopitalAggregateType<T extends MedecinHopitalAggregateArgs> = {
        [P in keyof T & keyof AggregateMedecinHopital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedecinHopital[P]>
      : GetScalarType<T[P], AggregateMedecinHopital[P]>
  }




  export type MedecinHopitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedecinHopitalWhereInput
    orderBy?: MedecinHopitalOrderByWithAggregationInput | MedecinHopitalOrderByWithAggregationInput[]
    by: MedecinHopitalScalarFieldEnum[] | MedecinHopitalScalarFieldEnum
    having?: MedecinHopitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedecinHopitalCountAggregateInputType | true
    _min?: MedecinHopitalMinAggregateInputType
    _max?: MedecinHopitalMaxAggregateInputType
  }

  export type MedecinHopitalGroupByOutputType = {
    id: string
    medecinId: string
    hopitalId: string
    _count: MedecinHopitalCountAggregateOutputType | null
    _min: MedecinHopitalMinAggregateOutputType | null
    _max: MedecinHopitalMaxAggregateOutputType | null
  }

  type GetMedecinHopitalGroupByPayload<T extends MedecinHopitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedecinHopitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedecinHopitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedecinHopitalGroupByOutputType[P]>
            : GetScalarType<T[P], MedecinHopitalGroupByOutputType[P]>
        }
      >
    >


  export type MedecinHopitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medecinId?: boolean
    hopitalId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecinHopital"]>

  export type MedecinHopitalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medecinId?: boolean
    hopitalId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecinHopital"]>

  export type MedecinHopitalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medecinId?: boolean
    hopitalId?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medecinHopital"]>

  export type MedecinHopitalSelectScalar = {
    id?: boolean
    medecinId?: boolean
    hopitalId?: boolean
  }

  export type MedecinHopitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "medecinId" | "hopitalId", ExtArgs["result"]["medecinHopital"]>
  export type MedecinHopitalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }
  export type MedecinHopitalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }
  export type MedecinHopitalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
  }

  export type $MedecinHopitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedecinHopital"
    objects: {
      medecin: Prisma.$MedecinPayload<ExtArgs>
      hopital: Prisma.$HopitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      medecinId: string
      hopitalId: string
    }, ExtArgs["result"]["medecinHopital"]>
    composites: {}
  }

  type MedecinHopitalGetPayload<S extends boolean | null | undefined | MedecinHopitalDefaultArgs> = $Result.GetResult<Prisma.$MedecinHopitalPayload, S>

  type MedecinHopitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedecinHopitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedecinHopitalCountAggregateInputType | true
    }

  export interface MedecinHopitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedecinHopital'], meta: { name: 'MedecinHopital' } }
    /**
     * Find zero or one MedecinHopital that matches the filter.
     * @param {MedecinHopitalFindUniqueArgs} args - Arguments to find a MedecinHopital
     * @example
     * // Get one MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedecinHopitalFindUniqueArgs>(args: SelectSubset<T, MedecinHopitalFindUniqueArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedecinHopital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedecinHopitalFindUniqueOrThrowArgs} args - Arguments to find a MedecinHopital
     * @example
     * // Get one MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedecinHopitalFindUniqueOrThrowArgs>(args: SelectSubset<T, MedecinHopitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedecinHopital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalFindFirstArgs} args - Arguments to find a MedecinHopital
     * @example
     * // Get one MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedecinHopitalFindFirstArgs>(args?: SelectSubset<T, MedecinHopitalFindFirstArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedecinHopital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalFindFirstOrThrowArgs} args - Arguments to find a MedecinHopital
     * @example
     * // Get one MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedecinHopitalFindFirstOrThrowArgs>(args?: SelectSubset<T, MedecinHopitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedecinHopitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedecinHopitals
     * const medecinHopitals = await prisma.medecinHopital.findMany()
     * 
     * // Get first 10 MedecinHopitals
     * const medecinHopitals = await prisma.medecinHopital.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medecinHopitalWithIdOnly = await prisma.medecinHopital.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedecinHopitalFindManyArgs>(args?: SelectSubset<T, MedecinHopitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedecinHopital.
     * @param {MedecinHopitalCreateArgs} args - Arguments to create a MedecinHopital.
     * @example
     * // Create one MedecinHopital
     * const MedecinHopital = await prisma.medecinHopital.create({
     *   data: {
     *     // ... data to create a MedecinHopital
     *   }
     * })
     * 
     */
    create<T extends MedecinHopitalCreateArgs>(args: SelectSubset<T, MedecinHopitalCreateArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedecinHopitals.
     * @param {MedecinHopitalCreateManyArgs} args - Arguments to create many MedecinHopitals.
     * @example
     * // Create many MedecinHopitals
     * const medecinHopital = await prisma.medecinHopital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedecinHopitalCreateManyArgs>(args?: SelectSubset<T, MedecinHopitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedecinHopitals and returns the data saved in the database.
     * @param {MedecinHopitalCreateManyAndReturnArgs} args - Arguments to create many MedecinHopitals.
     * @example
     * // Create many MedecinHopitals
     * const medecinHopital = await prisma.medecinHopital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedecinHopitals and only return the `id`
     * const medecinHopitalWithIdOnly = await prisma.medecinHopital.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedecinHopitalCreateManyAndReturnArgs>(args?: SelectSubset<T, MedecinHopitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedecinHopital.
     * @param {MedecinHopitalDeleteArgs} args - Arguments to delete one MedecinHopital.
     * @example
     * // Delete one MedecinHopital
     * const MedecinHopital = await prisma.medecinHopital.delete({
     *   where: {
     *     // ... filter to delete one MedecinHopital
     *   }
     * })
     * 
     */
    delete<T extends MedecinHopitalDeleteArgs>(args: SelectSubset<T, MedecinHopitalDeleteArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedecinHopital.
     * @param {MedecinHopitalUpdateArgs} args - Arguments to update one MedecinHopital.
     * @example
     * // Update one MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedecinHopitalUpdateArgs>(args: SelectSubset<T, MedecinHopitalUpdateArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedecinHopitals.
     * @param {MedecinHopitalDeleteManyArgs} args - Arguments to filter MedecinHopitals to delete.
     * @example
     * // Delete a few MedecinHopitals
     * const { count } = await prisma.medecinHopital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedecinHopitalDeleteManyArgs>(args?: SelectSubset<T, MedecinHopitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedecinHopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedecinHopitals
     * const medecinHopital = await prisma.medecinHopital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedecinHopitalUpdateManyArgs>(args: SelectSubset<T, MedecinHopitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedecinHopitals and returns the data updated in the database.
     * @param {MedecinHopitalUpdateManyAndReturnArgs} args - Arguments to update many MedecinHopitals.
     * @example
     * // Update many MedecinHopitals
     * const medecinHopital = await prisma.medecinHopital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedecinHopitals and only return the `id`
     * const medecinHopitalWithIdOnly = await prisma.medecinHopital.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedecinHopitalUpdateManyAndReturnArgs>(args: SelectSubset<T, MedecinHopitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedecinHopital.
     * @param {MedecinHopitalUpsertArgs} args - Arguments to update or create a MedecinHopital.
     * @example
     * // Update or create a MedecinHopital
     * const medecinHopital = await prisma.medecinHopital.upsert({
     *   create: {
     *     // ... data to create a MedecinHopital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedecinHopital we want to update
     *   }
     * })
     */
    upsert<T extends MedecinHopitalUpsertArgs>(args: SelectSubset<T, MedecinHopitalUpsertArgs<ExtArgs>>): Prisma__MedecinHopitalClient<$Result.GetResult<Prisma.$MedecinHopitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedecinHopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalCountArgs} args - Arguments to filter MedecinHopitals to count.
     * @example
     * // Count the number of MedecinHopitals
     * const count = await prisma.medecinHopital.count({
     *   where: {
     *     // ... the filter for the MedecinHopitals we want to count
     *   }
     * })
    **/
    count<T extends MedecinHopitalCountArgs>(
      args?: Subset<T, MedecinHopitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedecinHopitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedecinHopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedecinHopitalAggregateArgs>(args: Subset<T, MedecinHopitalAggregateArgs>): Prisma.PrismaPromise<GetMedecinHopitalAggregateType<T>>

    /**
     * Group by MedecinHopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedecinHopitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedecinHopitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedecinHopitalGroupByArgs['orderBy'] }
        : { orderBy?: MedecinHopitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedecinHopitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedecinHopitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedecinHopital model
   */
  readonly fields: MedecinHopitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedecinHopital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedecinHopitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medecin<T extends MedecinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedecinDefaultArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hopital<T extends HopitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HopitalDefaultArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MedecinHopital model
   */
  interface MedecinHopitalFieldRefs {
    readonly id: FieldRef<"MedecinHopital", 'String'>
    readonly medecinId: FieldRef<"MedecinHopital", 'String'>
    readonly hopitalId: FieldRef<"MedecinHopital", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MedecinHopital findUnique
   */
  export type MedecinHopitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter, which MedecinHopital to fetch.
     */
    where: MedecinHopitalWhereUniqueInput
  }

  /**
   * MedecinHopital findUniqueOrThrow
   */
  export type MedecinHopitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter, which MedecinHopital to fetch.
     */
    where: MedecinHopitalWhereUniqueInput
  }

  /**
   * MedecinHopital findFirst
   */
  export type MedecinHopitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter, which MedecinHopital to fetch.
     */
    where?: MedecinHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedecinHopitals to fetch.
     */
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedecinHopitals.
     */
    cursor?: MedecinHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedecinHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedecinHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedecinHopitals.
     */
    distinct?: MedecinHopitalScalarFieldEnum | MedecinHopitalScalarFieldEnum[]
  }

  /**
   * MedecinHopital findFirstOrThrow
   */
  export type MedecinHopitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter, which MedecinHopital to fetch.
     */
    where?: MedecinHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedecinHopitals to fetch.
     */
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedecinHopitals.
     */
    cursor?: MedecinHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedecinHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedecinHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedecinHopitals.
     */
    distinct?: MedecinHopitalScalarFieldEnum | MedecinHopitalScalarFieldEnum[]
  }

  /**
   * MedecinHopital findMany
   */
  export type MedecinHopitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter, which MedecinHopitals to fetch.
     */
    where?: MedecinHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedecinHopitals to fetch.
     */
    orderBy?: MedecinHopitalOrderByWithRelationInput | MedecinHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedecinHopitals.
     */
    cursor?: MedecinHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedecinHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedecinHopitals.
     */
    skip?: number
    distinct?: MedecinHopitalScalarFieldEnum | MedecinHopitalScalarFieldEnum[]
  }

  /**
   * MedecinHopital create
   */
  export type MedecinHopitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * The data needed to create a MedecinHopital.
     */
    data: XOR<MedecinHopitalCreateInput, MedecinHopitalUncheckedCreateInput>
  }

  /**
   * MedecinHopital createMany
   */
  export type MedecinHopitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedecinHopitals.
     */
    data: MedecinHopitalCreateManyInput | MedecinHopitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedecinHopital createManyAndReturn
   */
  export type MedecinHopitalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * The data used to create many MedecinHopitals.
     */
    data: MedecinHopitalCreateManyInput | MedecinHopitalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedecinHopital update
   */
  export type MedecinHopitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * The data needed to update a MedecinHopital.
     */
    data: XOR<MedecinHopitalUpdateInput, MedecinHopitalUncheckedUpdateInput>
    /**
     * Choose, which MedecinHopital to update.
     */
    where: MedecinHopitalWhereUniqueInput
  }

  /**
   * MedecinHopital updateMany
   */
  export type MedecinHopitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedecinHopitals.
     */
    data: XOR<MedecinHopitalUpdateManyMutationInput, MedecinHopitalUncheckedUpdateManyInput>
    /**
     * Filter which MedecinHopitals to update
     */
    where?: MedecinHopitalWhereInput
    /**
     * Limit how many MedecinHopitals to update.
     */
    limit?: number
  }

  /**
   * MedecinHopital updateManyAndReturn
   */
  export type MedecinHopitalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * The data used to update MedecinHopitals.
     */
    data: XOR<MedecinHopitalUpdateManyMutationInput, MedecinHopitalUncheckedUpdateManyInput>
    /**
     * Filter which MedecinHopitals to update
     */
    where?: MedecinHopitalWhereInput
    /**
     * Limit how many MedecinHopitals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedecinHopital upsert
   */
  export type MedecinHopitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * The filter to search for the MedecinHopital to update in case it exists.
     */
    where: MedecinHopitalWhereUniqueInput
    /**
     * In case the MedecinHopital found by the `where` argument doesn't exist, create a new MedecinHopital with this data.
     */
    create: XOR<MedecinHopitalCreateInput, MedecinHopitalUncheckedCreateInput>
    /**
     * In case the MedecinHopital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedecinHopitalUpdateInput, MedecinHopitalUncheckedUpdateInput>
  }

  /**
   * MedecinHopital delete
   */
  export type MedecinHopitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
    /**
     * Filter which MedecinHopital to delete.
     */
    where: MedecinHopitalWhereUniqueInput
  }

  /**
   * MedecinHopital deleteMany
   */
  export type MedecinHopitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedecinHopitals to delete
     */
    where?: MedecinHopitalWhereInput
    /**
     * Limit how many MedecinHopitals to delete.
     */
    limit?: number
  }

  /**
   * MedecinHopital without action
   */
  export type MedecinHopitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedecinHopital
     */
    select?: MedecinHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedecinHopital
     */
    omit?: MedecinHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinHopitalInclude<ExtArgs> | null
  }


  /**
   * Model Specialite
   */

  export type AggregateSpecialite = {
    _count: SpecialiteCountAggregateOutputType | null
    _min: SpecialiteMinAggregateOutputType | null
    _max: SpecialiteMaxAggregateOutputType | null
  }

  export type SpecialiteMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
  }

  export type SpecialiteMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
  }

  export type SpecialiteCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    _all: number
  }


  export type SpecialiteMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
  }

  export type SpecialiteMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
  }

  export type SpecialiteCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    _all?: true
  }

  export type SpecialiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialite to aggregate.
     */
    where?: SpecialiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialites to fetch.
     */
    orderBy?: SpecialiteOrderByWithRelationInput | SpecialiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpecialiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Specialites
    **/
    _count?: true | SpecialiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpecialiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpecialiteMaxAggregateInputType
  }

  export type GetSpecialiteAggregateType<T extends SpecialiteAggregateArgs> = {
        [P in keyof T & keyof AggregateSpecialite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpecialite[P]>
      : GetScalarType<T[P], AggregateSpecialite[P]>
  }




  export type SpecialiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecialiteWhereInput
    orderBy?: SpecialiteOrderByWithAggregationInput | SpecialiteOrderByWithAggregationInput[]
    by: SpecialiteScalarFieldEnum[] | SpecialiteScalarFieldEnum
    having?: SpecialiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpecialiteCountAggregateInputType | true
    _min?: SpecialiteMinAggregateInputType
    _max?: SpecialiteMaxAggregateInputType
  }

  export type SpecialiteGroupByOutputType = {
    id: string
    nom: string
    description: string | null
    _count: SpecialiteCountAggregateOutputType | null
    _min: SpecialiteMinAggregateOutputType | null
    _max: SpecialiteMaxAggregateOutputType | null
  }

  type GetSpecialiteGroupByPayload<T extends SpecialiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpecialiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpecialiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpecialiteGroupByOutputType[P]>
            : GetScalarType<T[P], SpecialiteGroupByOutputType[P]>
        }
      >
    >


  export type SpecialiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    medecins?: boolean | Specialite$medecinsArgs<ExtArgs>
    hopitaux?: boolean | Specialite$hopitauxArgs<ExtArgs>
    _count?: boolean | SpecialiteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["specialite"]>

  export type SpecialiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
  }, ExtArgs["result"]["specialite"]>

  export type SpecialiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
  }, ExtArgs["result"]["specialite"]>

  export type SpecialiteSelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
  }

  export type SpecialiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description", ExtArgs["result"]["specialite"]>
  export type SpecialiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecins?: boolean | Specialite$medecinsArgs<ExtArgs>
    hopitaux?: boolean | Specialite$hopitauxArgs<ExtArgs>
    _count?: boolean | SpecialiteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpecialiteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SpecialiteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SpecialitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Specialite"
    objects: {
      medecins: Prisma.$MedecinPayload<ExtArgs>[]
      hopitaux: Prisma.$HopitalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string | null
    }, ExtArgs["result"]["specialite"]>
    composites: {}
  }

  type SpecialiteGetPayload<S extends boolean | null | undefined | SpecialiteDefaultArgs> = $Result.GetResult<Prisma.$SpecialitePayload, S>

  type SpecialiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpecialiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpecialiteCountAggregateInputType | true
    }

  export interface SpecialiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Specialite'], meta: { name: 'Specialite' } }
    /**
     * Find zero or one Specialite that matches the filter.
     * @param {SpecialiteFindUniqueArgs} args - Arguments to find a Specialite
     * @example
     * // Get one Specialite
     * const specialite = await prisma.specialite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpecialiteFindUniqueArgs>(args: SelectSubset<T, SpecialiteFindUniqueArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Specialite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpecialiteFindUniqueOrThrowArgs} args - Arguments to find a Specialite
     * @example
     * // Get one Specialite
     * const specialite = await prisma.specialite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpecialiteFindUniqueOrThrowArgs>(args: SelectSubset<T, SpecialiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteFindFirstArgs} args - Arguments to find a Specialite
     * @example
     * // Get one Specialite
     * const specialite = await prisma.specialite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpecialiteFindFirstArgs>(args?: SelectSubset<T, SpecialiteFindFirstArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteFindFirstOrThrowArgs} args - Arguments to find a Specialite
     * @example
     * // Get one Specialite
     * const specialite = await prisma.specialite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpecialiteFindFirstOrThrowArgs>(args?: SelectSubset<T, SpecialiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Specialites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Specialites
     * const specialites = await prisma.specialite.findMany()
     * 
     * // Get first 10 Specialites
     * const specialites = await prisma.specialite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const specialiteWithIdOnly = await prisma.specialite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpecialiteFindManyArgs>(args?: SelectSubset<T, SpecialiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Specialite.
     * @param {SpecialiteCreateArgs} args - Arguments to create a Specialite.
     * @example
     * // Create one Specialite
     * const Specialite = await prisma.specialite.create({
     *   data: {
     *     // ... data to create a Specialite
     *   }
     * })
     * 
     */
    create<T extends SpecialiteCreateArgs>(args: SelectSubset<T, SpecialiteCreateArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Specialites.
     * @param {SpecialiteCreateManyArgs} args - Arguments to create many Specialites.
     * @example
     * // Create many Specialites
     * const specialite = await prisma.specialite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpecialiteCreateManyArgs>(args?: SelectSubset<T, SpecialiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Specialites and returns the data saved in the database.
     * @param {SpecialiteCreateManyAndReturnArgs} args - Arguments to create many Specialites.
     * @example
     * // Create many Specialites
     * const specialite = await prisma.specialite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Specialites and only return the `id`
     * const specialiteWithIdOnly = await prisma.specialite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpecialiteCreateManyAndReturnArgs>(args?: SelectSubset<T, SpecialiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Specialite.
     * @param {SpecialiteDeleteArgs} args - Arguments to delete one Specialite.
     * @example
     * // Delete one Specialite
     * const Specialite = await prisma.specialite.delete({
     *   where: {
     *     // ... filter to delete one Specialite
     *   }
     * })
     * 
     */
    delete<T extends SpecialiteDeleteArgs>(args: SelectSubset<T, SpecialiteDeleteArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Specialite.
     * @param {SpecialiteUpdateArgs} args - Arguments to update one Specialite.
     * @example
     * // Update one Specialite
     * const specialite = await prisma.specialite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpecialiteUpdateArgs>(args: SelectSubset<T, SpecialiteUpdateArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Specialites.
     * @param {SpecialiteDeleteManyArgs} args - Arguments to filter Specialites to delete.
     * @example
     * // Delete a few Specialites
     * const { count } = await prisma.specialite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpecialiteDeleteManyArgs>(args?: SelectSubset<T, SpecialiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Specialites
     * const specialite = await prisma.specialite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpecialiteUpdateManyArgs>(args: SelectSubset<T, SpecialiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialites and returns the data updated in the database.
     * @param {SpecialiteUpdateManyAndReturnArgs} args - Arguments to update many Specialites.
     * @example
     * // Update many Specialites
     * const specialite = await prisma.specialite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Specialites and only return the `id`
     * const specialiteWithIdOnly = await prisma.specialite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpecialiteUpdateManyAndReturnArgs>(args: SelectSubset<T, SpecialiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Specialite.
     * @param {SpecialiteUpsertArgs} args - Arguments to update or create a Specialite.
     * @example
     * // Update or create a Specialite
     * const specialite = await prisma.specialite.upsert({
     *   create: {
     *     // ... data to create a Specialite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Specialite we want to update
     *   }
     * })
     */
    upsert<T extends SpecialiteUpsertArgs>(args: SelectSubset<T, SpecialiteUpsertArgs<ExtArgs>>): Prisma__SpecialiteClient<$Result.GetResult<Prisma.$SpecialitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Specialites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteCountArgs} args - Arguments to filter Specialites to count.
     * @example
     * // Count the number of Specialites
     * const count = await prisma.specialite.count({
     *   where: {
     *     // ... the filter for the Specialites we want to count
     *   }
     * })
    **/
    count<T extends SpecialiteCountArgs>(
      args?: Subset<T, SpecialiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpecialiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Specialite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpecialiteAggregateArgs>(args: Subset<T, SpecialiteAggregateArgs>): Prisma.PrismaPromise<GetSpecialiteAggregateType<T>>

    /**
     * Group by Specialite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpecialiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpecialiteGroupByArgs['orderBy'] }
        : { orderBy?: SpecialiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpecialiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpecialiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Specialite model
   */
  readonly fields: SpecialiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Specialite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpecialiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medecins<T extends Specialite$medecinsArgs<ExtArgs> = {}>(args?: Subset<T, Specialite$medecinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hopitaux<T extends Specialite$hopitauxArgs<ExtArgs> = {}>(args?: Subset<T, Specialite$hopitauxArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Specialite model
   */
  interface SpecialiteFieldRefs {
    readonly id: FieldRef<"Specialite", 'String'>
    readonly nom: FieldRef<"Specialite", 'String'>
    readonly description: FieldRef<"Specialite", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Specialite findUnique
   */
  export type SpecialiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter, which Specialite to fetch.
     */
    where: SpecialiteWhereUniqueInput
  }

  /**
   * Specialite findUniqueOrThrow
   */
  export type SpecialiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter, which Specialite to fetch.
     */
    where: SpecialiteWhereUniqueInput
  }

  /**
   * Specialite findFirst
   */
  export type SpecialiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter, which Specialite to fetch.
     */
    where?: SpecialiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialites to fetch.
     */
    orderBy?: SpecialiteOrderByWithRelationInput | SpecialiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialites.
     */
    cursor?: SpecialiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialites.
     */
    distinct?: SpecialiteScalarFieldEnum | SpecialiteScalarFieldEnum[]
  }

  /**
   * Specialite findFirstOrThrow
   */
  export type SpecialiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter, which Specialite to fetch.
     */
    where?: SpecialiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialites to fetch.
     */
    orderBy?: SpecialiteOrderByWithRelationInput | SpecialiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialites.
     */
    cursor?: SpecialiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialites.
     */
    distinct?: SpecialiteScalarFieldEnum | SpecialiteScalarFieldEnum[]
  }

  /**
   * Specialite findMany
   */
  export type SpecialiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter, which Specialites to fetch.
     */
    where?: SpecialiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialites to fetch.
     */
    orderBy?: SpecialiteOrderByWithRelationInput | SpecialiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Specialites.
     */
    cursor?: SpecialiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialites.
     */
    skip?: number
    distinct?: SpecialiteScalarFieldEnum | SpecialiteScalarFieldEnum[]
  }

  /**
   * Specialite create
   */
  export type SpecialiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * The data needed to create a Specialite.
     */
    data: XOR<SpecialiteCreateInput, SpecialiteUncheckedCreateInput>
  }

  /**
   * Specialite createMany
   */
  export type SpecialiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Specialites.
     */
    data: SpecialiteCreateManyInput | SpecialiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Specialite createManyAndReturn
   */
  export type SpecialiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * The data used to create many Specialites.
     */
    data: SpecialiteCreateManyInput | SpecialiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Specialite update
   */
  export type SpecialiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * The data needed to update a Specialite.
     */
    data: XOR<SpecialiteUpdateInput, SpecialiteUncheckedUpdateInput>
    /**
     * Choose, which Specialite to update.
     */
    where: SpecialiteWhereUniqueInput
  }

  /**
   * Specialite updateMany
   */
  export type SpecialiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Specialites.
     */
    data: XOR<SpecialiteUpdateManyMutationInput, SpecialiteUncheckedUpdateManyInput>
    /**
     * Filter which Specialites to update
     */
    where?: SpecialiteWhereInput
    /**
     * Limit how many Specialites to update.
     */
    limit?: number
  }

  /**
   * Specialite updateManyAndReturn
   */
  export type SpecialiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * The data used to update Specialites.
     */
    data: XOR<SpecialiteUpdateManyMutationInput, SpecialiteUncheckedUpdateManyInput>
    /**
     * Filter which Specialites to update
     */
    where?: SpecialiteWhereInput
    /**
     * Limit how many Specialites to update.
     */
    limit?: number
  }

  /**
   * Specialite upsert
   */
  export type SpecialiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * The filter to search for the Specialite to update in case it exists.
     */
    where: SpecialiteWhereUniqueInput
    /**
     * In case the Specialite found by the `where` argument doesn't exist, create a new Specialite with this data.
     */
    create: XOR<SpecialiteCreateInput, SpecialiteUncheckedCreateInput>
    /**
     * In case the Specialite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpecialiteUpdateInput, SpecialiteUncheckedUpdateInput>
  }

  /**
   * Specialite delete
   */
  export type SpecialiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
    /**
     * Filter which Specialite to delete.
     */
    where: SpecialiteWhereUniqueInput
  }

  /**
   * Specialite deleteMany
   */
  export type SpecialiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialites to delete
     */
    where?: SpecialiteWhereInput
    /**
     * Limit how many Specialites to delete.
     */
    limit?: number
  }

  /**
   * Specialite.medecins
   */
  export type Specialite$medecinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medecin
     */
    select?: MedecinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medecin
     */
    omit?: MedecinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedecinInclude<ExtArgs> | null
    where?: MedecinWhereInput
    orderBy?: MedecinOrderByWithRelationInput | MedecinOrderByWithRelationInput[]
    cursor?: MedecinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedecinScalarFieldEnum | MedecinScalarFieldEnum[]
  }

  /**
   * Specialite.hopitaux
   */
  export type Specialite$hopitauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hopital
     */
    select?: HopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hopital
     */
    omit?: HopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HopitalInclude<ExtArgs> | null
    where?: HopitalWhereInput
    orderBy?: HopitalOrderByWithRelationInput | HopitalOrderByWithRelationInput[]
    cursor?: HopitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HopitalScalarFieldEnum | HopitalScalarFieldEnum[]
  }

  /**
   * Specialite without action
   */
  export type SpecialiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialite
     */
    select?: SpecialiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialite
     */
    omit?: SpecialiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialiteInclude<ExtArgs> | null
  }


  /**
   * Model Recommandation
   */

  export type AggregateRecommandation = {
    _count: RecommandationCountAggregateOutputType | null
    _min: RecommandationMinAggregateOutputType | null
    _max: RecommandationMaxAggregateOutputType | null
  }

  export type RecommandationMinAggregateOutputType = {
    id: string | null
    contenu: string | null
    medecinId: string | null
    date: Date | null
  }

  export type RecommandationMaxAggregateOutputType = {
    id: string | null
    contenu: string | null
    medecinId: string | null
    date: Date | null
  }

  export type RecommandationCountAggregateOutputType = {
    id: number
    contenu: number
    medecinId: number
    date: number
    _all: number
  }


  export type RecommandationMinAggregateInputType = {
    id?: true
    contenu?: true
    medecinId?: true
    date?: true
  }

  export type RecommandationMaxAggregateInputType = {
    id?: true
    contenu?: true
    medecinId?: true
    date?: true
  }

  export type RecommandationCountAggregateInputType = {
    id?: true
    contenu?: true
    medecinId?: true
    date?: true
    _all?: true
  }

  export type RecommandationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommandation to aggregate.
     */
    where?: RecommandationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommandations to fetch.
     */
    orderBy?: RecommandationOrderByWithRelationInput | RecommandationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecommandationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommandations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommandations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recommandations
    **/
    _count?: true | RecommandationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecommandationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecommandationMaxAggregateInputType
  }

  export type GetRecommandationAggregateType<T extends RecommandationAggregateArgs> = {
        [P in keyof T & keyof AggregateRecommandation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecommandation[P]>
      : GetScalarType<T[P], AggregateRecommandation[P]>
  }




  export type RecommandationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommandationWhereInput
    orderBy?: RecommandationOrderByWithAggregationInput | RecommandationOrderByWithAggregationInput[]
    by: RecommandationScalarFieldEnum[] | RecommandationScalarFieldEnum
    having?: RecommandationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecommandationCountAggregateInputType | true
    _min?: RecommandationMinAggregateInputType
    _max?: RecommandationMaxAggregateInputType
  }

  export type RecommandationGroupByOutputType = {
    id: string
    contenu: string
    medecinId: string
    date: Date
    _count: RecommandationCountAggregateOutputType | null
    _min: RecommandationMinAggregateOutputType | null
    _max: RecommandationMaxAggregateOutputType | null
  }

  type GetRecommandationGroupByPayload<T extends RecommandationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecommandationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecommandationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecommandationGroupByOutputType[P]>
            : GetScalarType<T[P], RecommandationGroupByOutputType[P]>
        }
      >
    >


  export type RecommandationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenu?: boolean
    medecinId?: boolean
    date?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommandation"]>

  export type RecommandationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenu?: boolean
    medecinId?: boolean
    date?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommandation"]>

  export type RecommandationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contenu?: boolean
    medecinId?: boolean
    date?: boolean
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommandation"]>

  export type RecommandationSelectScalar = {
    id?: boolean
    contenu?: boolean
    medecinId?: boolean
    date?: boolean
  }

  export type RecommandationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contenu" | "medecinId" | "date", ExtArgs["result"]["recommandation"]>
  export type RecommandationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }
  export type RecommandationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }
  export type RecommandationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medecin?: boolean | MedecinDefaultArgs<ExtArgs>
  }

  export type $RecommandationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recommandation"
    objects: {
      medecin: Prisma.$MedecinPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contenu: string
      medecinId: string
      date: Date
    }, ExtArgs["result"]["recommandation"]>
    composites: {}
  }

  type RecommandationGetPayload<S extends boolean | null | undefined | RecommandationDefaultArgs> = $Result.GetResult<Prisma.$RecommandationPayload, S>

  type RecommandationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecommandationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecommandationCountAggregateInputType | true
    }

  export interface RecommandationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recommandation'], meta: { name: 'Recommandation' } }
    /**
     * Find zero or one Recommandation that matches the filter.
     * @param {RecommandationFindUniqueArgs} args - Arguments to find a Recommandation
     * @example
     * // Get one Recommandation
     * const recommandation = await prisma.recommandation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecommandationFindUniqueArgs>(args: SelectSubset<T, RecommandationFindUniqueArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recommandation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecommandationFindUniqueOrThrowArgs} args - Arguments to find a Recommandation
     * @example
     * // Get one Recommandation
     * const recommandation = await prisma.recommandation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecommandationFindUniqueOrThrowArgs>(args: SelectSubset<T, RecommandationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommandation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationFindFirstArgs} args - Arguments to find a Recommandation
     * @example
     * // Get one Recommandation
     * const recommandation = await prisma.recommandation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecommandationFindFirstArgs>(args?: SelectSubset<T, RecommandationFindFirstArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommandation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationFindFirstOrThrowArgs} args - Arguments to find a Recommandation
     * @example
     * // Get one Recommandation
     * const recommandation = await prisma.recommandation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecommandationFindFirstOrThrowArgs>(args?: SelectSubset<T, RecommandationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recommandations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recommandations
     * const recommandations = await prisma.recommandation.findMany()
     * 
     * // Get first 10 Recommandations
     * const recommandations = await prisma.recommandation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recommandationWithIdOnly = await prisma.recommandation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecommandationFindManyArgs>(args?: SelectSubset<T, RecommandationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recommandation.
     * @param {RecommandationCreateArgs} args - Arguments to create a Recommandation.
     * @example
     * // Create one Recommandation
     * const Recommandation = await prisma.recommandation.create({
     *   data: {
     *     // ... data to create a Recommandation
     *   }
     * })
     * 
     */
    create<T extends RecommandationCreateArgs>(args: SelectSubset<T, RecommandationCreateArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recommandations.
     * @param {RecommandationCreateManyArgs} args - Arguments to create many Recommandations.
     * @example
     * // Create many Recommandations
     * const recommandation = await prisma.recommandation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecommandationCreateManyArgs>(args?: SelectSubset<T, RecommandationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recommandations and returns the data saved in the database.
     * @param {RecommandationCreateManyAndReturnArgs} args - Arguments to create many Recommandations.
     * @example
     * // Create many Recommandations
     * const recommandation = await prisma.recommandation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recommandations and only return the `id`
     * const recommandationWithIdOnly = await prisma.recommandation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecommandationCreateManyAndReturnArgs>(args?: SelectSubset<T, RecommandationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recommandation.
     * @param {RecommandationDeleteArgs} args - Arguments to delete one Recommandation.
     * @example
     * // Delete one Recommandation
     * const Recommandation = await prisma.recommandation.delete({
     *   where: {
     *     // ... filter to delete one Recommandation
     *   }
     * })
     * 
     */
    delete<T extends RecommandationDeleteArgs>(args: SelectSubset<T, RecommandationDeleteArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recommandation.
     * @param {RecommandationUpdateArgs} args - Arguments to update one Recommandation.
     * @example
     * // Update one Recommandation
     * const recommandation = await prisma.recommandation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecommandationUpdateArgs>(args: SelectSubset<T, RecommandationUpdateArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recommandations.
     * @param {RecommandationDeleteManyArgs} args - Arguments to filter Recommandations to delete.
     * @example
     * // Delete a few Recommandations
     * const { count } = await prisma.recommandation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecommandationDeleteManyArgs>(args?: SelectSubset<T, RecommandationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommandations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recommandations
     * const recommandation = await prisma.recommandation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecommandationUpdateManyArgs>(args: SelectSubset<T, RecommandationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommandations and returns the data updated in the database.
     * @param {RecommandationUpdateManyAndReturnArgs} args - Arguments to update many Recommandations.
     * @example
     * // Update many Recommandations
     * const recommandation = await prisma.recommandation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recommandations and only return the `id`
     * const recommandationWithIdOnly = await prisma.recommandation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecommandationUpdateManyAndReturnArgs>(args: SelectSubset<T, RecommandationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recommandation.
     * @param {RecommandationUpsertArgs} args - Arguments to update or create a Recommandation.
     * @example
     * // Update or create a Recommandation
     * const recommandation = await prisma.recommandation.upsert({
     *   create: {
     *     // ... data to create a Recommandation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recommandation we want to update
     *   }
     * })
     */
    upsert<T extends RecommandationUpsertArgs>(args: SelectSubset<T, RecommandationUpsertArgs<ExtArgs>>): Prisma__RecommandationClient<$Result.GetResult<Prisma.$RecommandationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recommandations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationCountArgs} args - Arguments to filter Recommandations to count.
     * @example
     * // Count the number of Recommandations
     * const count = await prisma.recommandation.count({
     *   where: {
     *     // ... the filter for the Recommandations we want to count
     *   }
     * })
    **/
    count<T extends RecommandationCountArgs>(
      args?: Subset<T, RecommandationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecommandationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recommandation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecommandationAggregateArgs>(args: Subset<T, RecommandationAggregateArgs>): Prisma.PrismaPromise<GetRecommandationAggregateType<T>>

    /**
     * Group by Recommandation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommandationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecommandationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecommandationGroupByArgs['orderBy'] }
        : { orderBy?: RecommandationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecommandationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommandationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recommandation model
   */
  readonly fields: RecommandationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recommandation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecommandationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medecin<T extends MedecinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedecinDefaultArgs<ExtArgs>>): Prisma__MedecinClient<$Result.GetResult<Prisma.$MedecinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recommandation model
   */
  interface RecommandationFieldRefs {
    readonly id: FieldRef<"Recommandation", 'String'>
    readonly contenu: FieldRef<"Recommandation", 'String'>
    readonly medecinId: FieldRef<"Recommandation", 'String'>
    readonly date: FieldRef<"Recommandation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recommandation findUnique
   */
  export type RecommandationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter, which Recommandation to fetch.
     */
    where: RecommandationWhereUniqueInput
  }

  /**
   * Recommandation findUniqueOrThrow
   */
  export type RecommandationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter, which Recommandation to fetch.
     */
    where: RecommandationWhereUniqueInput
  }

  /**
   * Recommandation findFirst
   */
  export type RecommandationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter, which Recommandation to fetch.
     */
    where?: RecommandationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommandations to fetch.
     */
    orderBy?: RecommandationOrderByWithRelationInput | RecommandationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommandations.
     */
    cursor?: RecommandationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommandations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommandations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommandations.
     */
    distinct?: RecommandationScalarFieldEnum | RecommandationScalarFieldEnum[]
  }

  /**
   * Recommandation findFirstOrThrow
   */
  export type RecommandationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter, which Recommandation to fetch.
     */
    where?: RecommandationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommandations to fetch.
     */
    orderBy?: RecommandationOrderByWithRelationInput | RecommandationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommandations.
     */
    cursor?: RecommandationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommandations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommandations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommandations.
     */
    distinct?: RecommandationScalarFieldEnum | RecommandationScalarFieldEnum[]
  }

  /**
   * Recommandation findMany
   */
  export type RecommandationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter, which Recommandations to fetch.
     */
    where?: RecommandationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommandations to fetch.
     */
    orderBy?: RecommandationOrderByWithRelationInput | RecommandationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recommandations.
     */
    cursor?: RecommandationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommandations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommandations.
     */
    skip?: number
    distinct?: RecommandationScalarFieldEnum | RecommandationScalarFieldEnum[]
  }

  /**
   * Recommandation create
   */
  export type RecommandationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * The data needed to create a Recommandation.
     */
    data: XOR<RecommandationCreateInput, RecommandationUncheckedCreateInput>
  }

  /**
   * Recommandation createMany
   */
  export type RecommandationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recommandations.
     */
    data: RecommandationCreateManyInput | RecommandationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recommandation createManyAndReturn
   */
  export type RecommandationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * The data used to create many Recommandations.
     */
    data: RecommandationCreateManyInput | RecommandationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommandation update
   */
  export type RecommandationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * The data needed to update a Recommandation.
     */
    data: XOR<RecommandationUpdateInput, RecommandationUncheckedUpdateInput>
    /**
     * Choose, which Recommandation to update.
     */
    where: RecommandationWhereUniqueInput
  }

  /**
   * Recommandation updateMany
   */
  export type RecommandationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recommandations.
     */
    data: XOR<RecommandationUpdateManyMutationInput, RecommandationUncheckedUpdateManyInput>
    /**
     * Filter which Recommandations to update
     */
    where?: RecommandationWhereInput
    /**
     * Limit how many Recommandations to update.
     */
    limit?: number
  }

  /**
   * Recommandation updateManyAndReturn
   */
  export type RecommandationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * The data used to update Recommandations.
     */
    data: XOR<RecommandationUpdateManyMutationInput, RecommandationUncheckedUpdateManyInput>
    /**
     * Filter which Recommandations to update
     */
    where?: RecommandationWhereInput
    /**
     * Limit how many Recommandations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommandation upsert
   */
  export type RecommandationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * The filter to search for the Recommandation to update in case it exists.
     */
    where: RecommandationWhereUniqueInput
    /**
     * In case the Recommandation found by the `where` argument doesn't exist, create a new Recommandation with this data.
     */
    create: XOR<RecommandationCreateInput, RecommandationUncheckedCreateInput>
    /**
     * In case the Recommandation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecommandationUpdateInput, RecommandationUncheckedUpdateInput>
  }

  /**
   * Recommandation delete
   */
  export type RecommandationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
    /**
     * Filter which Recommandation to delete.
     */
    where: RecommandationWhereUniqueInput
  }

  /**
   * Recommandation deleteMany
   */
  export type RecommandationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommandations to delete
     */
    where?: RecommandationWhereInput
    /**
     * Limit how many Recommandations to delete.
     */
    limit?: number
  }

  /**
   * Recommandation without action
   */
  export type RecommandationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommandation
     */
    select?: RecommandationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommandation
     */
    omit?: RecommandationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommandationInclude<ExtArgs> | null
  }


  /**
   * Model UtilisateurHopital
   */

  export type AggregateUtilisateurHopital = {
    _count: UtilisateurHopitalCountAggregateOutputType | null
    _min: UtilisateurHopitalMinAggregateOutputType | null
    _max: UtilisateurHopitalMaxAggregateOutputType | null
  }

  export type UtilisateurHopitalMinAggregateOutputType = {
    id: string | null
    utilisateurId: string | null
    hopitalId: string | null
    role: $Enums.Role | null
    dateDebut: Date | null
    dateFin: Date | null
  }

  export type UtilisateurHopitalMaxAggregateOutputType = {
    id: string | null
    utilisateurId: string | null
    hopitalId: string | null
    role: $Enums.Role | null
    dateDebut: Date | null
    dateFin: Date | null
  }

  export type UtilisateurHopitalCountAggregateOutputType = {
    id: number
    utilisateurId: number
    hopitalId: number
    role: number
    dateDebut: number
    dateFin: number
    _all: number
  }


  export type UtilisateurHopitalMinAggregateInputType = {
    id?: true
    utilisateurId?: true
    hopitalId?: true
    role?: true
    dateDebut?: true
    dateFin?: true
  }

  export type UtilisateurHopitalMaxAggregateInputType = {
    id?: true
    utilisateurId?: true
    hopitalId?: true
    role?: true
    dateDebut?: true
    dateFin?: true
  }

  export type UtilisateurHopitalCountAggregateInputType = {
    id?: true
    utilisateurId?: true
    hopitalId?: true
    role?: true
    dateDebut?: true
    dateFin?: true
    _all?: true
  }

  export type UtilisateurHopitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UtilisateurHopital to aggregate.
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilisateurHopitals to fetch.
     */
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UtilisateurHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilisateurHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilisateurHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UtilisateurHopitals
    **/
    _count?: true | UtilisateurHopitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilisateurHopitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilisateurHopitalMaxAggregateInputType
  }

  export type GetUtilisateurHopitalAggregateType<T extends UtilisateurHopitalAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilisateurHopital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilisateurHopital[P]>
      : GetScalarType<T[P], AggregateUtilisateurHopital[P]>
  }




  export type UtilisateurHopitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilisateurHopitalWhereInput
    orderBy?: UtilisateurHopitalOrderByWithAggregationInput | UtilisateurHopitalOrderByWithAggregationInput[]
    by: UtilisateurHopitalScalarFieldEnum[] | UtilisateurHopitalScalarFieldEnum
    having?: UtilisateurHopitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilisateurHopitalCountAggregateInputType | true
    _min?: UtilisateurHopitalMinAggregateInputType
    _max?: UtilisateurHopitalMaxAggregateInputType
  }

  export type UtilisateurHopitalGroupByOutputType = {
    id: string
    utilisateurId: string
    hopitalId: string
    role: $Enums.Role
    dateDebut: Date
    dateFin: Date | null
    _count: UtilisateurHopitalCountAggregateOutputType | null
    _min: UtilisateurHopitalMinAggregateOutputType | null
    _max: UtilisateurHopitalMaxAggregateOutputType | null
  }

  type GetUtilisateurHopitalGroupByPayload<T extends UtilisateurHopitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilisateurHopitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilisateurHopitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilisateurHopitalGroupByOutputType[P]>
            : GetScalarType<T[P], UtilisateurHopitalGroupByOutputType[P]>
        }
      >
    >


  export type UtilisateurHopitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateurId?: boolean
    hopitalId?: boolean
    role?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateurHopital"]>

  export type UtilisateurHopitalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateurId?: boolean
    hopitalId?: boolean
    role?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateurHopital"]>

  export type UtilisateurHopitalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateurId?: boolean
    hopitalId?: boolean
    role?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateurHopital"]>

  export type UtilisateurHopitalSelectScalar = {
    id?: boolean
    utilisateurId?: boolean
    hopitalId?: boolean
    role?: boolean
    dateDebut?: boolean
    dateFin?: boolean
  }

  export type UtilisateurHopitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "utilisateurId" | "hopitalId" | "role" | "dateDebut" | "dateFin", ExtArgs["result"]["utilisateurHopital"]>
  export type UtilisateurHopitalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type UtilisateurHopitalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type UtilisateurHopitalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hopital?: boolean | HopitalDefaultArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }

  export type $UtilisateurHopitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UtilisateurHopital"
    objects: {
      hopital: Prisma.$HopitalPayload<ExtArgs>
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      utilisateurId: string
      hopitalId: string
      role: $Enums.Role
      dateDebut: Date
      dateFin: Date | null
    }, ExtArgs["result"]["utilisateurHopital"]>
    composites: {}
  }

  type UtilisateurHopitalGetPayload<S extends boolean | null | undefined | UtilisateurHopitalDefaultArgs> = $Result.GetResult<Prisma.$UtilisateurHopitalPayload, S>

  type UtilisateurHopitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UtilisateurHopitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilisateurHopitalCountAggregateInputType | true
    }

  export interface UtilisateurHopitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UtilisateurHopital'], meta: { name: 'UtilisateurHopital' } }
    /**
     * Find zero or one UtilisateurHopital that matches the filter.
     * @param {UtilisateurHopitalFindUniqueArgs} args - Arguments to find a UtilisateurHopital
     * @example
     * // Get one UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtilisateurHopitalFindUniqueArgs>(args: SelectSubset<T, UtilisateurHopitalFindUniqueArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UtilisateurHopital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtilisateurHopitalFindUniqueOrThrowArgs} args - Arguments to find a UtilisateurHopital
     * @example
     * // Get one UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtilisateurHopitalFindUniqueOrThrowArgs>(args: SelectSubset<T, UtilisateurHopitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UtilisateurHopital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalFindFirstArgs} args - Arguments to find a UtilisateurHopital
     * @example
     * // Get one UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtilisateurHopitalFindFirstArgs>(args?: SelectSubset<T, UtilisateurHopitalFindFirstArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UtilisateurHopital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalFindFirstOrThrowArgs} args - Arguments to find a UtilisateurHopital
     * @example
     * // Get one UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtilisateurHopitalFindFirstOrThrowArgs>(args?: SelectSubset<T, UtilisateurHopitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UtilisateurHopitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UtilisateurHopitals
     * const utilisateurHopitals = await prisma.utilisateurHopital.findMany()
     * 
     * // Get first 10 UtilisateurHopitals
     * const utilisateurHopitals = await prisma.utilisateurHopital.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const utilisateurHopitalWithIdOnly = await prisma.utilisateurHopital.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UtilisateurHopitalFindManyArgs>(args?: SelectSubset<T, UtilisateurHopitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UtilisateurHopital.
     * @param {UtilisateurHopitalCreateArgs} args - Arguments to create a UtilisateurHopital.
     * @example
     * // Create one UtilisateurHopital
     * const UtilisateurHopital = await prisma.utilisateurHopital.create({
     *   data: {
     *     // ... data to create a UtilisateurHopital
     *   }
     * })
     * 
     */
    create<T extends UtilisateurHopitalCreateArgs>(args: SelectSubset<T, UtilisateurHopitalCreateArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UtilisateurHopitals.
     * @param {UtilisateurHopitalCreateManyArgs} args - Arguments to create many UtilisateurHopitals.
     * @example
     * // Create many UtilisateurHopitals
     * const utilisateurHopital = await prisma.utilisateurHopital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UtilisateurHopitalCreateManyArgs>(args?: SelectSubset<T, UtilisateurHopitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UtilisateurHopitals and returns the data saved in the database.
     * @param {UtilisateurHopitalCreateManyAndReturnArgs} args - Arguments to create many UtilisateurHopitals.
     * @example
     * // Create many UtilisateurHopitals
     * const utilisateurHopital = await prisma.utilisateurHopital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UtilisateurHopitals and only return the `id`
     * const utilisateurHopitalWithIdOnly = await prisma.utilisateurHopital.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UtilisateurHopitalCreateManyAndReturnArgs>(args?: SelectSubset<T, UtilisateurHopitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UtilisateurHopital.
     * @param {UtilisateurHopitalDeleteArgs} args - Arguments to delete one UtilisateurHopital.
     * @example
     * // Delete one UtilisateurHopital
     * const UtilisateurHopital = await prisma.utilisateurHopital.delete({
     *   where: {
     *     // ... filter to delete one UtilisateurHopital
     *   }
     * })
     * 
     */
    delete<T extends UtilisateurHopitalDeleteArgs>(args: SelectSubset<T, UtilisateurHopitalDeleteArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UtilisateurHopital.
     * @param {UtilisateurHopitalUpdateArgs} args - Arguments to update one UtilisateurHopital.
     * @example
     * // Update one UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UtilisateurHopitalUpdateArgs>(args: SelectSubset<T, UtilisateurHopitalUpdateArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UtilisateurHopitals.
     * @param {UtilisateurHopitalDeleteManyArgs} args - Arguments to filter UtilisateurHopitals to delete.
     * @example
     * // Delete a few UtilisateurHopitals
     * const { count } = await prisma.utilisateurHopital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UtilisateurHopitalDeleteManyArgs>(args?: SelectSubset<T, UtilisateurHopitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UtilisateurHopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UtilisateurHopitals
     * const utilisateurHopital = await prisma.utilisateurHopital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UtilisateurHopitalUpdateManyArgs>(args: SelectSubset<T, UtilisateurHopitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UtilisateurHopitals and returns the data updated in the database.
     * @param {UtilisateurHopitalUpdateManyAndReturnArgs} args - Arguments to update many UtilisateurHopitals.
     * @example
     * // Update many UtilisateurHopitals
     * const utilisateurHopital = await prisma.utilisateurHopital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UtilisateurHopitals and only return the `id`
     * const utilisateurHopitalWithIdOnly = await prisma.utilisateurHopital.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UtilisateurHopitalUpdateManyAndReturnArgs>(args: SelectSubset<T, UtilisateurHopitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UtilisateurHopital.
     * @param {UtilisateurHopitalUpsertArgs} args - Arguments to update or create a UtilisateurHopital.
     * @example
     * // Update or create a UtilisateurHopital
     * const utilisateurHopital = await prisma.utilisateurHopital.upsert({
     *   create: {
     *     // ... data to create a UtilisateurHopital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UtilisateurHopital we want to update
     *   }
     * })
     */
    upsert<T extends UtilisateurHopitalUpsertArgs>(args: SelectSubset<T, UtilisateurHopitalUpsertArgs<ExtArgs>>): Prisma__UtilisateurHopitalClient<$Result.GetResult<Prisma.$UtilisateurHopitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UtilisateurHopitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalCountArgs} args - Arguments to filter UtilisateurHopitals to count.
     * @example
     * // Count the number of UtilisateurHopitals
     * const count = await prisma.utilisateurHopital.count({
     *   where: {
     *     // ... the filter for the UtilisateurHopitals we want to count
     *   }
     * })
    **/
    count<T extends UtilisateurHopitalCountArgs>(
      args?: Subset<T, UtilisateurHopitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilisateurHopitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UtilisateurHopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtilisateurHopitalAggregateArgs>(args: Subset<T, UtilisateurHopitalAggregateArgs>): Prisma.PrismaPromise<GetUtilisateurHopitalAggregateType<T>>

    /**
     * Group by UtilisateurHopital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurHopitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UtilisateurHopitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UtilisateurHopitalGroupByArgs['orderBy'] }
        : { orderBy?: UtilisateurHopitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UtilisateurHopitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilisateurHopitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UtilisateurHopital model
   */
  readonly fields: UtilisateurHopitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UtilisateurHopital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UtilisateurHopitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hopital<T extends HopitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HopitalDefaultArgs<ExtArgs>>): Prisma__HopitalClient<$Result.GetResult<Prisma.$HopitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UtilisateurHopital model
   */
  interface UtilisateurHopitalFieldRefs {
    readonly id: FieldRef<"UtilisateurHopital", 'String'>
    readonly utilisateurId: FieldRef<"UtilisateurHopital", 'String'>
    readonly hopitalId: FieldRef<"UtilisateurHopital", 'String'>
    readonly role: FieldRef<"UtilisateurHopital", 'Role'>
    readonly dateDebut: FieldRef<"UtilisateurHopital", 'DateTime'>
    readonly dateFin: FieldRef<"UtilisateurHopital", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UtilisateurHopital findUnique
   */
  export type UtilisateurHopitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter, which UtilisateurHopital to fetch.
     */
    where: UtilisateurHopitalWhereUniqueInput
  }

  /**
   * UtilisateurHopital findUniqueOrThrow
   */
  export type UtilisateurHopitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter, which UtilisateurHopital to fetch.
     */
    where: UtilisateurHopitalWhereUniqueInput
  }

  /**
   * UtilisateurHopital findFirst
   */
  export type UtilisateurHopitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter, which UtilisateurHopital to fetch.
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilisateurHopitals to fetch.
     */
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UtilisateurHopitals.
     */
    cursor?: UtilisateurHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilisateurHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilisateurHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UtilisateurHopitals.
     */
    distinct?: UtilisateurHopitalScalarFieldEnum | UtilisateurHopitalScalarFieldEnum[]
  }

  /**
   * UtilisateurHopital findFirstOrThrow
   */
  export type UtilisateurHopitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter, which UtilisateurHopital to fetch.
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilisateurHopitals to fetch.
     */
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UtilisateurHopitals.
     */
    cursor?: UtilisateurHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilisateurHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilisateurHopitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UtilisateurHopitals.
     */
    distinct?: UtilisateurHopitalScalarFieldEnum | UtilisateurHopitalScalarFieldEnum[]
  }

  /**
   * UtilisateurHopital findMany
   */
  export type UtilisateurHopitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter, which UtilisateurHopitals to fetch.
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilisateurHopitals to fetch.
     */
    orderBy?: UtilisateurHopitalOrderByWithRelationInput | UtilisateurHopitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UtilisateurHopitals.
     */
    cursor?: UtilisateurHopitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilisateurHopitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilisateurHopitals.
     */
    skip?: number
    distinct?: UtilisateurHopitalScalarFieldEnum | UtilisateurHopitalScalarFieldEnum[]
  }

  /**
   * UtilisateurHopital create
   */
  export type UtilisateurHopitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * The data needed to create a UtilisateurHopital.
     */
    data: XOR<UtilisateurHopitalCreateInput, UtilisateurHopitalUncheckedCreateInput>
  }

  /**
   * UtilisateurHopital createMany
   */
  export type UtilisateurHopitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UtilisateurHopitals.
     */
    data: UtilisateurHopitalCreateManyInput | UtilisateurHopitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UtilisateurHopital createManyAndReturn
   */
  export type UtilisateurHopitalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * The data used to create many UtilisateurHopitals.
     */
    data: UtilisateurHopitalCreateManyInput | UtilisateurHopitalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UtilisateurHopital update
   */
  export type UtilisateurHopitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * The data needed to update a UtilisateurHopital.
     */
    data: XOR<UtilisateurHopitalUpdateInput, UtilisateurHopitalUncheckedUpdateInput>
    /**
     * Choose, which UtilisateurHopital to update.
     */
    where: UtilisateurHopitalWhereUniqueInput
  }

  /**
   * UtilisateurHopital updateMany
   */
  export type UtilisateurHopitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UtilisateurHopitals.
     */
    data: XOR<UtilisateurHopitalUpdateManyMutationInput, UtilisateurHopitalUncheckedUpdateManyInput>
    /**
     * Filter which UtilisateurHopitals to update
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * Limit how many UtilisateurHopitals to update.
     */
    limit?: number
  }

  /**
   * UtilisateurHopital updateManyAndReturn
   */
  export type UtilisateurHopitalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * The data used to update UtilisateurHopitals.
     */
    data: XOR<UtilisateurHopitalUpdateManyMutationInput, UtilisateurHopitalUncheckedUpdateManyInput>
    /**
     * Filter which UtilisateurHopitals to update
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * Limit how many UtilisateurHopitals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UtilisateurHopital upsert
   */
  export type UtilisateurHopitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * The filter to search for the UtilisateurHopital to update in case it exists.
     */
    where: UtilisateurHopitalWhereUniqueInput
    /**
     * In case the UtilisateurHopital found by the `where` argument doesn't exist, create a new UtilisateurHopital with this data.
     */
    create: XOR<UtilisateurHopitalCreateInput, UtilisateurHopitalUncheckedCreateInput>
    /**
     * In case the UtilisateurHopital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UtilisateurHopitalUpdateInput, UtilisateurHopitalUncheckedUpdateInput>
  }

  /**
   * UtilisateurHopital delete
   */
  export type UtilisateurHopitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
    /**
     * Filter which UtilisateurHopital to delete.
     */
    where: UtilisateurHopitalWhereUniqueInput
  }

  /**
   * UtilisateurHopital deleteMany
   */
  export type UtilisateurHopitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UtilisateurHopitals to delete
     */
    where?: UtilisateurHopitalWhereInput
    /**
     * Limit how many UtilisateurHopitals to delete.
     */
    limit?: number
  }

  /**
   * UtilisateurHopital without action
   */
  export type UtilisateurHopitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurHopital
     */
    select?: UtilisateurHopitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilisateurHopital
     */
    omit?: UtilisateurHopitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurHopitalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UtilisateurScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    telephone: 'telephone',
    dateCreation: 'dateCreation',
    status: 'status'
  };

  export type UtilisateurScalarFieldEnum = (typeof UtilisateurScalarFieldEnum)[keyof typeof UtilisateurScalarFieldEnum]


  export const AdministrateurScalarFieldEnum: {
    id: 'id',
    fonction: 'fonction',
    userId: 'userId'
  };

  export type AdministrateurScalarFieldEnum = (typeof AdministrateurScalarFieldEnum)[keyof typeof AdministrateurScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    dateNaissance: 'dateNaissance',
    adresse: 'adresse',
    groupeSanguin: 'groupeSanguin',
    poids: 'poids',
    taille: 'taille',
    sexe: 'sexe',
    userId: 'userId'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const MedecinScalarFieldEnum: {
    id: 'id',
    specialiteId: 'specialiteId',
    numLicence: 'numLicence',
    anneeExperience: 'anneeExperience',
    titre: 'titre',
    userId: 'userId',
    isDisponible: 'isDisponible',
    statut: 'statut'
  };

  export type MedecinScalarFieldEnum = (typeof MedecinScalarFieldEnum)[keyof typeof MedecinScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    titre: 'titre',
    description: 'description',
    dateCreation: 'dateCreation',
    patientId: 'patientId',
    url: 'url'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const RendezVousScalarFieldEnum: {
    id: 'id',
    date: 'date',
    duree: 'duree',
    statut: 'statut',
    motif: 'motif',
    hopitalId: 'hopitalId',
    utilisateurId: 'utilisateurId',
    medecinId: 'medecinId',
    patientId: 'patientId'
  };

  export type RendezVousScalarFieldEnum = (typeof RendezVousScalarFieldEnum)[keyof typeof RendezVousScalarFieldEnum]


  export const HopitalScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    adresse: 'adresse',
    description: 'description',
    contact: 'contact',
    localisation: 'localisation',
    slug: 'slug',
    fuseauHoraire: 'fuseauHoraire'
  };

  export type HopitalScalarFieldEnum = (typeof HopitalScalarFieldEnum)[keyof typeof HopitalScalarFieldEnum]


  export const MedecinHopitalScalarFieldEnum: {
    id: 'id',
    medecinId: 'medecinId',
    hopitalId: 'hopitalId'
  };

  export type MedecinHopitalScalarFieldEnum = (typeof MedecinHopitalScalarFieldEnum)[keyof typeof MedecinHopitalScalarFieldEnum]


  export const SpecialiteScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description'
  };

  export type SpecialiteScalarFieldEnum = (typeof SpecialiteScalarFieldEnum)[keyof typeof SpecialiteScalarFieldEnum]


  export const RecommandationScalarFieldEnum: {
    id: 'id',
    contenu: 'contenu',
    medecinId: 'medecinId',
    date: 'date'
  };

  export type RecommandationScalarFieldEnum = (typeof RecommandationScalarFieldEnum)[keyof typeof RecommandationScalarFieldEnum]


  export const UtilisateurHopitalScalarFieldEnum: {
    id: 'id',
    utilisateurId: 'utilisateurId',
    hopitalId: 'hopitalId',
    role: 'role',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin'
  };

  export type UtilisateurHopitalScalarFieldEnum = (typeof UtilisateurHopitalScalarFieldEnum)[keyof typeof UtilisateurHopitalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StatusUtilisateur'
   */
  export type EnumStatusUtilisateurFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusUtilisateur'>
    


  /**
   * Reference to a field of type 'StatusUtilisateur[]'
   */
  export type ListEnumStatusUtilisateurFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusUtilisateur[]'>
    


  /**
   * Reference to a field of type 'FonctionAdmin'
   */
  export type EnumFonctionAdminFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FonctionAdmin'>
    


  /**
   * Reference to a field of type 'FonctionAdmin[]'
   */
  export type ListEnumFonctionAdminFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FonctionAdmin[]'>
    


  /**
   * Reference to a field of type 'GroupeSanguin'
   */
  export type EnumGroupeSanguinFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupeSanguin'>
    


  /**
   * Reference to a field of type 'GroupeSanguin[]'
   */
  export type ListEnumGroupeSanguinFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupeSanguin[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Sexe'
   */
  export type EnumSexeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sexe'>
    


  /**
   * Reference to a field of type 'Sexe[]'
   */
  export type ListEnumSexeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sexe[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'StatutApproval'
   */
  export type EnumStatutApprovalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutApproval'>
    


  /**
   * Reference to a field of type 'StatutApproval[]'
   */
  export type ListEnumStatutApprovalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutApproval[]'>
    


  /**
   * Reference to a field of type 'StatutRendezVous'
   */
  export type EnumStatutRendezVousFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutRendezVous'>
    


  /**
   * Reference to a field of type 'StatutRendezVous[]'
   */
  export type ListEnumStatutRendezVousFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutRendezVous[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type UtilisateurWhereInput = {
    AND?: UtilisateurWhereInput | UtilisateurWhereInput[]
    OR?: UtilisateurWhereInput[]
    NOT?: UtilisateurWhereInput | UtilisateurWhereInput[]
    id?: StringFilter<"Utilisateur"> | string
    nom?: StringFilter<"Utilisateur"> | string
    prenom?: StringNullableFilter<"Utilisateur"> | string | null
    email?: StringFilter<"Utilisateur"> | string
    telephone?: StringNullableFilter<"Utilisateur"> | string | null
    dateCreation?: DateTimeFilter<"Utilisateur"> | Date | string
    status?: EnumStatusUtilisateurFilter<"Utilisateur"> | $Enums.StatusUtilisateur
    administrateur?: XOR<AdministrateurNullableScalarRelationFilter, AdministrateurWhereInput> | null
    medecin?: XOR<MedecinNullableScalarRelationFilter, MedecinWhereInput> | null
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    rendezVous?: RendezVousListRelationFilter
    utilisateurHopitals?: UtilisateurHopitalListRelationFilter
  }

  export type UtilisateurOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrderInput | SortOrder
    email?: SortOrder
    telephone?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    status?: SortOrder
    administrateur?: AdministrateurOrderByWithRelationInput
    medecin?: MedecinOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
    utilisateurHopitals?: UtilisateurHopitalOrderByRelationAggregateInput
  }

  export type UtilisateurWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UtilisateurWhereInput | UtilisateurWhereInput[]
    OR?: UtilisateurWhereInput[]
    NOT?: UtilisateurWhereInput | UtilisateurWhereInput[]
    nom?: StringFilter<"Utilisateur"> | string
    prenom?: StringNullableFilter<"Utilisateur"> | string | null
    telephone?: StringNullableFilter<"Utilisateur"> | string | null
    dateCreation?: DateTimeFilter<"Utilisateur"> | Date | string
    status?: EnumStatusUtilisateurFilter<"Utilisateur"> | $Enums.StatusUtilisateur
    administrateur?: XOR<AdministrateurNullableScalarRelationFilter, AdministrateurWhereInput> | null
    medecin?: XOR<MedecinNullableScalarRelationFilter, MedecinWhereInput> | null
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    rendezVous?: RendezVousListRelationFilter
    utilisateurHopitals?: UtilisateurHopitalListRelationFilter
  }, "id" | "email">

  export type UtilisateurOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrderInput | SortOrder
    email?: SortOrder
    telephone?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    status?: SortOrder
    _count?: UtilisateurCountOrderByAggregateInput
    _max?: UtilisateurMaxOrderByAggregateInput
    _min?: UtilisateurMinOrderByAggregateInput
  }

  export type UtilisateurScalarWhereWithAggregatesInput = {
    AND?: UtilisateurScalarWhereWithAggregatesInput | UtilisateurScalarWhereWithAggregatesInput[]
    OR?: UtilisateurScalarWhereWithAggregatesInput[]
    NOT?: UtilisateurScalarWhereWithAggregatesInput | UtilisateurScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Utilisateur"> | string
    nom?: StringWithAggregatesFilter<"Utilisateur"> | string
    prenom?: StringNullableWithAggregatesFilter<"Utilisateur"> | string | null
    email?: StringWithAggregatesFilter<"Utilisateur"> | string
    telephone?: StringNullableWithAggregatesFilter<"Utilisateur"> | string | null
    dateCreation?: DateTimeWithAggregatesFilter<"Utilisateur"> | Date | string
    status?: EnumStatusUtilisateurWithAggregatesFilter<"Utilisateur"> | $Enums.StatusUtilisateur
  }

  export type AdministrateurWhereInput = {
    AND?: AdministrateurWhereInput | AdministrateurWhereInput[]
    OR?: AdministrateurWhereInput[]
    NOT?: AdministrateurWhereInput | AdministrateurWhereInput[]
    id?: StringFilter<"Administrateur"> | string
    fonction?: EnumFonctionAdminFilter<"Administrateur"> | $Enums.FonctionAdmin
    userId?: StringFilter<"Administrateur"> | string
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
  }

  export type AdministrateurOrderByWithRelationInput = {
    id?: SortOrder
    fonction?: SortOrder
    userId?: SortOrder
    utilisateur?: UtilisateurOrderByWithRelationInput
  }

  export type AdministrateurWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AdministrateurWhereInput | AdministrateurWhereInput[]
    OR?: AdministrateurWhereInput[]
    NOT?: AdministrateurWhereInput | AdministrateurWhereInput[]
    fonction?: EnumFonctionAdminFilter<"Administrateur"> | $Enums.FonctionAdmin
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
  }, "id" | "userId">

  export type AdministrateurOrderByWithAggregationInput = {
    id?: SortOrder
    fonction?: SortOrder
    userId?: SortOrder
    _count?: AdministrateurCountOrderByAggregateInput
    _max?: AdministrateurMaxOrderByAggregateInput
    _min?: AdministrateurMinOrderByAggregateInput
  }

  export type AdministrateurScalarWhereWithAggregatesInput = {
    AND?: AdministrateurScalarWhereWithAggregatesInput | AdministrateurScalarWhereWithAggregatesInput[]
    OR?: AdministrateurScalarWhereWithAggregatesInput[]
    NOT?: AdministrateurScalarWhereWithAggregatesInput | AdministrateurScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Administrateur"> | string
    fonction?: EnumFonctionAdminWithAggregatesFilter<"Administrateur"> | $Enums.FonctionAdmin
    userId?: StringWithAggregatesFilter<"Administrateur"> | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    dateNaissance?: DateTimeFilter<"Patient"> | Date | string
    adresse?: StringNullableFilter<"Patient"> | string | null
    groupeSanguin?: EnumGroupeSanguinFilter<"Patient"> | $Enums.GroupeSanguin
    poids?: FloatNullableFilter<"Patient"> | number | null
    taille?: FloatNullableFilter<"Patient"> | number | null
    sexe?: EnumSexeFilter<"Patient"> | $Enums.Sexe
    userId?: StringFilter<"Patient"> | string
    documents?: DocumentListRelationFilter
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    rendezVous?: RendezVousListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    dateNaissance?: SortOrder
    adresse?: SortOrderInput | SortOrder
    groupeSanguin?: SortOrder
    poids?: SortOrderInput | SortOrder
    taille?: SortOrderInput | SortOrder
    sexe?: SortOrder
    userId?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    utilisateur?: UtilisateurOrderByWithRelationInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    dateNaissance?: DateTimeFilter<"Patient"> | Date | string
    adresse?: StringNullableFilter<"Patient"> | string | null
    groupeSanguin?: EnumGroupeSanguinFilter<"Patient"> | $Enums.GroupeSanguin
    poids?: FloatNullableFilter<"Patient"> | number | null
    taille?: FloatNullableFilter<"Patient"> | number | null
    sexe?: EnumSexeFilter<"Patient"> | $Enums.Sexe
    documents?: DocumentListRelationFilter
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    rendezVous?: RendezVousListRelationFilter
  }, "id" | "userId">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    dateNaissance?: SortOrder
    adresse?: SortOrderInput | SortOrder
    groupeSanguin?: SortOrder
    poids?: SortOrderInput | SortOrder
    taille?: SortOrderInput | SortOrder
    sexe?: SortOrder
    userId?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    dateNaissance?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    adresse?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    groupeSanguin?: EnumGroupeSanguinWithAggregatesFilter<"Patient"> | $Enums.GroupeSanguin
    poids?: FloatNullableWithAggregatesFilter<"Patient"> | number | null
    taille?: FloatNullableWithAggregatesFilter<"Patient"> | number | null
    sexe?: EnumSexeWithAggregatesFilter<"Patient"> | $Enums.Sexe
    userId?: StringWithAggregatesFilter<"Patient"> | string
  }

  export type MedecinWhereInput = {
    AND?: MedecinWhereInput | MedecinWhereInput[]
    OR?: MedecinWhereInput[]
    NOT?: MedecinWhereInput | MedecinWhereInput[]
    id?: StringFilter<"Medecin"> | string
    specialiteId?: StringFilter<"Medecin"> | string
    numLicence?: StringFilter<"Medecin"> | string
    anneeExperience?: IntNullableFilter<"Medecin"> | number | null
    titre?: StringFilter<"Medecin"> | string
    userId?: StringFilter<"Medecin"> | string
    isDisponible?: BoolFilter<"Medecin"> | boolean
    statut?: EnumStatutApprovalFilter<"Medecin"> | $Enums.StatutApproval
    specialite?: XOR<SpecialiteScalarRelationFilter, SpecialiteWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    recommandations?: RecommandationListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    hopitaux?: MedecinHopitalListRelationFilter
  }

  export type MedecinOrderByWithRelationInput = {
    id?: SortOrder
    specialiteId?: SortOrder
    numLicence?: SortOrder
    anneeExperience?: SortOrderInput | SortOrder
    titre?: SortOrder
    userId?: SortOrder
    isDisponible?: SortOrder
    statut?: SortOrder
    specialite?: SpecialiteOrderByWithRelationInput
    utilisateur?: UtilisateurOrderByWithRelationInput
    recommandations?: RecommandationOrderByRelationAggregateInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
    hopitaux?: MedecinHopitalOrderByRelationAggregateInput
  }

  export type MedecinWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numLicence?: string
    userId?: string
    AND?: MedecinWhereInput | MedecinWhereInput[]
    OR?: MedecinWhereInput[]
    NOT?: MedecinWhereInput | MedecinWhereInput[]
    specialiteId?: StringFilter<"Medecin"> | string
    anneeExperience?: IntNullableFilter<"Medecin"> | number | null
    titre?: StringFilter<"Medecin"> | string
    isDisponible?: BoolFilter<"Medecin"> | boolean
    statut?: EnumStatutApprovalFilter<"Medecin"> | $Enums.StatutApproval
    specialite?: XOR<SpecialiteScalarRelationFilter, SpecialiteWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    recommandations?: RecommandationListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    hopitaux?: MedecinHopitalListRelationFilter
  }, "id" | "numLicence" | "userId">

  export type MedecinOrderByWithAggregationInput = {
    id?: SortOrder
    specialiteId?: SortOrder
    numLicence?: SortOrder
    anneeExperience?: SortOrderInput | SortOrder
    titre?: SortOrder
    userId?: SortOrder
    isDisponible?: SortOrder
    statut?: SortOrder
    _count?: MedecinCountOrderByAggregateInput
    _avg?: MedecinAvgOrderByAggregateInput
    _max?: MedecinMaxOrderByAggregateInput
    _min?: MedecinMinOrderByAggregateInput
    _sum?: MedecinSumOrderByAggregateInput
  }

  export type MedecinScalarWhereWithAggregatesInput = {
    AND?: MedecinScalarWhereWithAggregatesInput | MedecinScalarWhereWithAggregatesInput[]
    OR?: MedecinScalarWhereWithAggregatesInput[]
    NOT?: MedecinScalarWhereWithAggregatesInput | MedecinScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Medecin"> | string
    specialiteId?: StringWithAggregatesFilter<"Medecin"> | string
    numLicence?: StringWithAggregatesFilter<"Medecin"> | string
    anneeExperience?: IntNullableWithAggregatesFilter<"Medecin"> | number | null
    titre?: StringWithAggregatesFilter<"Medecin"> | string
    userId?: StringWithAggregatesFilter<"Medecin"> | string
    isDisponible?: BoolWithAggregatesFilter<"Medecin"> | boolean
    statut?: EnumStatutApprovalWithAggregatesFilter<"Medecin"> | $Enums.StatutApproval
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    titre?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    dateCreation?: DateTimeFilter<"Document"> | Date | string
    patientId?: StringNullableFilter<"Document"> | string | null
    url?: StringFilter<"Document"> | string
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    patientId?: SortOrderInput | SortOrder
    url?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    titre?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    dateCreation?: DateTimeFilter<"Document"> | Date | string
    patientId?: StringNullableFilter<"Document"> | string | null
    url?: StringFilter<"Document"> | string
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    patientId?: SortOrderInput | SortOrder
    url?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    titre?: StringWithAggregatesFilter<"Document"> | string
    description?: StringNullableWithAggregatesFilter<"Document"> | string | null
    dateCreation?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    patientId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    url?: StringWithAggregatesFilter<"Document"> | string
  }

  export type RendezVousWhereInput = {
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    id?: StringFilter<"RendezVous"> | string
    date?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    statut?: EnumStatutRendezVousFilter<"RendezVous"> | $Enums.StatutRendezVous
    motif?: StringNullableFilter<"RendezVous"> | string | null
    hopitalId?: StringFilter<"RendezVous"> | string
    utilisateurId?: StringFilter<"RendezVous"> | string
    medecinId?: StringFilter<"RendezVous"> | string
    patientId?: StringFilter<"RendezVous"> | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
  }

  export type RendezVousOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    duree?: SortOrder
    statut?: SortOrder
    motif?: SortOrderInput | SortOrder
    hopitalId?: SortOrder
    utilisateurId?: SortOrder
    medecinId?: SortOrder
    patientId?: SortOrder
    medecin?: MedecinOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    utilisateur?: UtilisateurOrderByWithRelationInput
    hopital?: HopitalOrderByWithRelationInput
  }

  export type RendezVousWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    medecinId_date?: RendezVousMedecinIdDateCompoundUniqueInput
    patientId_date?: RendezVousPatientIdDateCompoundUniqueInput
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    date?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    statut?: EnumStatutRendezVousFilter<"RendezVous"> | $Enums.StatutRendezVous
    motif?: StringNullableFilter<"RendezVous"> | string | null
    hopitalId?: StringFilter<"RendezVous"> | string
    utilisateurId?: StringFilter<"RendezVous"> | string
    medecinId?: StringFilter<"RendezVous"> | string
    patientId?: StringFilter<"RendezVous"> | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
  }, "id" | "medecinId_date" | "patientId_date">

  export type RendezVousOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    duree?: SortOrder
    statut?: SortOrder
    motif?: SortOrderInput | SortOrder
    hopitalId?: SortOrder
    utilisateurId?: SortOrder
    medecinId?: SortOrder
    patientId?: SortOrder
    _count?: RendezVousCountOrderByAggregateInput
    _avg?: RendezVousAvgOrderByAggregateInput
    _max?: RendezVousMaxOrderByAggregateInput
    _min?: RendezVousMinOrderByAggregateInput
    _sum?: RendezVousSumOrderByAggregateInput
  }

  export type RendezVousScalarWhereWithAggregatesInput = {
    AND?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    OR?: RendezVousScalarWhereWithAggregatesInput[]
    NOT?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RendezVous"> | string
    date?: DateTimeWithAggregatesFilter<"RendezVous"> | Date | string
    duree?: IntWithAggregatesFilter<"RendezVous"> | number
    statut?: EnumStatutRendezVousWithAggregatesFilter<"RendezVous"> | $Enums.StatutRendezVous
    motif?: StringNullableWithAggregatesFilter<"RendezVous"> | string | null
    hopitalId?: StringWithAggregatesFilter<"RendezVous"> | string
    utilisateurId?: StringWithAggregatesFilter<"RendezVous"> | string
    medecinId?: StringWithAggregatesFilter<"RendezVous"> | string
    patientId?: StringWithAggregatesFilter<"RendezVous"> | string
  }

  export type HopitalWhereInput = {
    AND?: HopitalWhereInput | HopitalWhereInput[]
    OR?: HopitalWhereInput[]
    NOT?: HopitalWhereInput | HopitalWhereInput[]
    id?: StringFilter<"Hopital"> | string
    nom?: StringFilter<"Hopital"> | string
    adresse?: StringFilter<"Hopital"> | string
    description?: StringNullableFilter<"Hopital"> | string | null
    contact?: StringFilter<"Hopital"> | string
    localisation?: StringNullableFilter<"Hopital"> | string | null
    slug?: StringNullableFilter<"Hopital"> | string | null
    fuseauHoraire?: StringFilter<"Hopital"> | string
    utilisateurHopitals?: UtilisateurHopitalListRelationFilter
    rendevous?: RendezVousListRelationFilter
    medecin?: MedecinHopitalListRelationFilter
    specialites?: SpecialiteListRelationFilter
  }

  export type HopitalOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    description?: SortOrderInput | SortOrder
    contact?: SortOrder
    localisation?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    fuseauHoraire?: SortOrder
    utilisateurHopitals?: UtilisateurHopitalOrderByRelationAggregateInput
    rendevous?: RendezVousOrderByRelationAggregateInput
    medecin?: MedecinHopitalOrderByRelationAggregateInput
    specialites?: SpecialiteOrderByRelationAggregateInput
  }

  export type HopitalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: HopitalWhereInput | HopitalWhereInput[]
    OR?: HopitalWhereInput[]
    NOT?: HopitalWhereInput | HopitalWhereInput[]
    nom?: StringFilter<"Hopital"> | string
    adresse?: StringFilter<"Hopital"> | string
    description?: StringNullableFilter<"Hopital"> | string | null
    contact?: StringFilter<"Hopital"> | string
    localisation?: StringNullableFilter<"Hopital"> | string | null
    fuseauHoraire?: StringFilter<"Hopital"> | string
    utilisateurHopitals?: UtilisateurHopitalListRelationFilter
    rendevous?: RendezVousListRelationFilter
    medecin?: MedecinHopitalListRelationFilter
    specialites?: SpecialiteListRelationFilter
  }, "id" | "slug">

  export type HopitalOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    description?: SortOrderInput | SortOrder
    contact?: SortOrder
    localisation?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    fuseauHoraire?: SortOrder
    _count?: HopitalCountOrderByAggregateInput
    _max?: HopitalMaxOrderByAggregateInput
    _min?: HopitalMinOrderByAggregateInput
  }

  export type HopitalScalarWhereWithAggregatesInput = {
    AND?: HopitalScalarWhereWithAggregatesInput | HopitalScalarWhereWithAggregatesInput[]
    OR?: HopitalScalarWhereWithAggregatesInput[]
    NOT?: HopitalScalarWhereWithAggregatesInput | HopitalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hopital"> | string
    nom?: StringWithAggregatesFilter<"Hopital"> | string
    adresse?: StringWithAggregatesFilter<"Hopital"> | string
    description?: StringNullableWithAggregatesFilter<"Hopital"> | string | null
    contact?: StringWithAggregatesFilter<"Hopital"> | string
    localisation?: StringNullableWithAggregatesFilter<"Hopital"> | string | null
    slug?: StringNullableWithAggregatesFilter<"Hopital"> | string | null
    fuseauHoraire?: StringWithAggregatesFilter<"Hopital"> | string
  }

  export type MedecinHopitalWhereInput = {
    AND?: MedecinHopitalWhereInput | MedecinHopitalWhereInput[]
    OR?: MedecinHopitalWhereInput[]
    NOT?: MedecinHopitalWhereInput | MedecinHopitalWhereInput[]
    id?: StringFilter<"MedecinHopital"> | string
    medecinId?: StringFilter<"MedecinHopital"> | string
    hopitalId?: StringFilter<"MedecinHopital"> | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
  }

  export type MedecinHopitalOrderByWithRelationInput = {
    id?: SortOrder
    medecinId?: SortOrder
    hopitalId?: SortOrder
    medecin?: MedecinOrderByWithRelationInput
    hopital?: HopitalOrderByWithRelationInput
  }

  export type MedecinHopitalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    medecinId_hopitalId?: MedecinHopitalMedecinIdHopitalIdCompoundUniqueInput
    AND?: MedecinHopitalWhereInput | MedecinHopitalWhereInput[]
    OR?: MedecinHopitalWhereInput[]
    NOT?: MedecinHopitalWhereInput | MedecinHopitalWhereInput[]
    medecinId?: StringFilter<"MedecinHopital"> | string
    hopitalId?: StringFilter<"MedecinHopital"> | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
  }, "id" | "medecinId_hopitalId">

  export type MedecinHopitalOrderByWithAggregationInput = {
    id?: SortOrder
    medecinId?: SortOrder
    hopitalId?: SortOrder
    _count?: MedecinHopitalCountOrderByAggregateInput
    _max?: MedecinHopitalMaxOrderByAggregateInput
    _min?: MedecinHopitalMinOrderByAggregateInput
  }

  export type MedecinHopitalScalarWhereWithAggregatesInput = {
    AND?: MedecinHopitalScalarWhereWithAggregatesInput | MedecinHopitalScalarWhereWithAggregatesInput[]
    OR?: MedecinHopitalScalarWhereWithAggregatesInput[]
    NOT?: MedecinHopitalScalarWhereWithAggregatesInput | MedecinHopitalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedecinHopital"> | string
    medecinId?: StringWithAggregatesFilter<"MedecinHopital"> | string
    hopitalId?: StringWithAggregatesFilter<"MedecinHopital"> | string
  }

  export type SpecialiteWhereInput = {
    AND?: SpecialiteWhereInput | SpecialiteWhereInput[]
    OR?: SpecialiteWhereInput[]
    NOT?: SpecialiteWhereInput | SpecialiteWhereInput[]
    id?: StringFilter<"Specialite"> | string
    nom?: StringFilter<"Specialite"> | string
    description?: StringNullableFilter<"Specialite"> | string | null
    medecins?: MedecinListRelationFilter
    hopitaux?: HopitalListRelationFilter
  }

  export type SpecialiteOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    medecins?: MedecinOrderByRelationAggregateInput
    hopitaux?: HopitalOrderByRelationAggregateInput
  }

  export type SpecialiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpecialiteWhereInput | SpecialiteWhereInput[]
    OR?: SpecialiteWhereInput[]
    NOT?: SpecialiteWhereInput | SpecialiteWhereInput[]
    nom?: StringFilter<"Specialite"> | string
    description?: StringNullableFilter<"Specialite"> | string | null
    medecins?: MedecinListRelationFilter
    hopitaux?: HopitalListRelationFilter
  }, "id">

  export type SpecialiteOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: SpecialiteCountOrderByAggregateInput
    _max?: SpecialiteMaxOrderByAggregateInput
    _min?: SpecialiteMinOrderByAggregateInput
  }

  export type SpecialiteScalarWhereWithAggregatesInput = {
    AND?: SpecialiteScalarWhereWithAggregatesInput | SpecialiteScalarWhereWithAggregatesInput[]
    OR?: SpecialiteScalarWhereWithAggregatesInput[]
    NOT?: SpecialiteScalarWhereWithAggregatesInput | SpecialiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Specialite"> | string
    nom?: StringWithAggregatesFilter<"Specialite"> | string
    description?: StringNullableWithAggregatesFilter<"Specialite"> | string | null
  }

  export type RecommandationWhereInput = {
    AND?: RecommandationWhereInput | RecommandationWhereInput[]
    OR?: RecommandationWhereInput[]
    NOT?: RecommandationWhereInput | RecommandationWhereInput[]
    id?: StringFilter<"Recommandation"> | string
    contenu?: StringFilter<"Recommandation"> | string
    medecinId?: StringFilter<"Recommandation"> | string
    date?: DateTimeFilter<"Recommandation"> | Date | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
  }

  export type RecommandationOrderByWithRelationInput = {
    id?: SortOrder
    contenu?: SortOrder
    medecinId?: SortOrder
    date?: SortOrder
    medecin?: MedecinOrderByWithRelationInput
  }

  export type RecommandationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecommandationWhereInput | RecommandationWhereInput[]
    OR?: RecommandationWhereInput[]
    NOT?: RecommandationWhereInput | RecommandationWhereInput[]
    contenu?: StringFilter<"Recommandation"> | string
    medecinId?: StringFilter<"Recommandation"> | string
    date?: DateTimeFilter<"Recommandation"> | Date | string
    medecin?: XOR<MedecinScalarRelationFilter, MedecinWhereInput>
  }, "id">

  export type RecommandationOrderByWithAggregationInput = {
    id?: SortOrder
    contenu?: SortOrder
    medecinId?: SortOrder
    date?: SortOrder
    _count?: RecommandationCountOrderByAggregateInput
    _max?: RecommandationMaxOrderByAggregateInput
    _min?: RecommandationMinOrderByAggregateInput
  }

  export type RecommandationScalarWhereWithAggregatesInput = {
    AND?: RecommandationScalarWhereWithAggregatesInput | RecommandationScalarWhereWithAggregatesInput[]
    OR?: RecommandationScalarWhereWithAggregatesInput[]
    NOT?: RecommandationScalarWhereWithAggregatesInput | RecommandationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recommandation"> | string
    contenu?: StringWithAggregatesFilter<"Recommandation"> | string
    medecinId?: StringWithAggregatesFilter<"Recommandation"> | string
    date?: DateTimeWithAggregatesFilter<"Recommandation"> | Date | string
  }

  export type UtilisateurHopitalWhereInput = {
    AND?: UtilisateurHopitalWhereInput | UtilisateurHopitalWhereInput[]
    OR?: UtilisateurHopitalWhereInput[]
    NOT?: UtilisateurHopitalWhereInput | UtilisateurHopitalWhereInput[]
    id?: StringFilter<"UtilisateurHopital"> | string
    utilisateurId?: StringFilter<"UtilisateurHopital"> | string
    hopitalId?: StringFilter<"UtilisateurHopital"> | string
    role?: EnumRoleFilter<"UtilisateurHopital"> | $Enums.Role
    dateDebut?: DateTimeFilter<"UtilisateurHopital"> | Date | string
    dateFin?: DateTimeNullableFilter<"UtilisateurHopital"> | Date | string | null
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
  }

  export type UtilisateurHopitalOrderByWithRelationInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    hopitalId?: SortOrder
    role?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrderInput | SortOrder
    hopital?: HopitalOrderByWithRelationInput
    utilisateur?: UtilisateurOrderByWithRelationInput
  }

  export type UtilisateurHopitalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    utilisateurId_hopitalId_role?: UtilisateurHopitalUtilisateurIdHopitalIdRoleCompoundUniqueInput
    AND?: UtilisateurHopitalWhereInput | UtilisateurHopitalWhereInput[]
    OR?: UtilisateurHopitalWhereInput[]
    NOT?: UtilisateurHopitalWhereInput | UtilisateurHopitalWhereInput[]
    utilisateurId?: StringFilter<"UtilisateurHopital"> | string
    hopitalId?: StringFilter<"UtilisateurHopital"> | string
    role?: EnumRoleFilter<"UtilisateurHopital"> | $Enums.Role
    dateDebut?: DateTimeFilter<"UtilisateurHopital"> | Date | string
    dateFin?: DateTimeNullableFilter<"UtilisateurHopital"> | Date | string | null
    hopital?: XOR<HopitalScalarRelationFilter, HopitalWhereInput>
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
  }, "id" | "utilisateurId_hopitalId_role">

  export type UtilisateurHopitalOrderByWithAggregationInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    hopitalId?: SortOrder
    role?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrderInput | SortOrder
    _count?: UtilisateurHopitalCountOrderByAggregateInput
    _max?: UtilisateurHopitalMaxOrderByAggregateInput
    _min?: UtilisateurHopitalMinOrderByAggregateInput
  }

  export type UtilisateurHopitalScalarWhereWithAggregatesInput = {
    AND?: UtilisateurHopitalScalarWhereWithAggregatesInput | UtilisateurHopitalScalarWhereWithAggregatesInput[]
    OR?: UtilisateurHopitalScalarWhereWithAggregatesInput[]
    NOT?: UtilisateurHopitalScalarWhereWithAggregatesInput | UtilisateurHopitalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UtilisateurHopital"> | string
    utilisateurId?: StringWithAggregatesFilter<"UtilisateurHopital"> | string
    hopitalId?: StringWithAggregatesFilter<"UtilisateurHopital"> | string
    role?: EnumRoleWithAggregatesFilter<"UtilisateurHopital"> | $Enums.Role
    dateDebut?: DateTimeWithAggregatesFilter<"UtilisateurHopital"> | Date | string
    dateFin?: DateTimeNullableWithAggregatesFilter<"UtilisateurHopital"> | Date | string | null
  }

  export type UtilisateurCreateInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinCreateNestedOneWithoutUtilisateurInput
    patient?: PatientCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinUncheckedCreateNestedOneWithoutUtilisateurInput
    patient?: PatientUncheckedCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurCreateManyInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
  }

  export type UtilisateurUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
  }

  export type UtilisateurUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
  }

  export type AdministrateurCreateInput = {
    id?: string
    fonction?: $Enums.FonctionAdmin
    utilisateur: UtilisateurCreateNestedOneWithoutAdministrateurInput
  }

  export type AdministrateurUncheckedCreateInput = {
    id?: string
    fonction?: $Enums.FonctionAdmin
    userId: string
  }

  export type AdministrateurUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
    utilisateur?: UtilisateurUpdateOneRequiredWithoutAdministrateurNestedInput
  }

  export type AdministrateurUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AdministrateurCreateManyInput = {
    id?: string
    fonction?: $Enums.FonctionAdmin
    userId: string
  }

  export type AdministrateurUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
  }

  export type AdministrateurUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PatientCreateInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    documents?: DocumentCreateNestedManyWithoutPatientInput
    utilisateur: UtilisateurCreateNestedOneWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    userId: string
    documents?: DocumentUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    documents?: DocumentUpdateManyWithoutPatientNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    userId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    userId: string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinCreateInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    specialite: SpecialiteCreateNestedOneWithoutMedecinsInput
    utilisateur: UtilisateurCreateNestedOneWithoutMedecinInput
    recommandations?: RecommandationCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    recommandations?: RecommandationUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    specialite?: SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutMedecinNestedInput
    recommandations?: RecommandationUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    recommandations?: RecommandationUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinCreateManyInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
  }

  export type MedecinUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
  }

  export type MedecinUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
  }

  export type DocumentCreateInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    url: string
    patient?: PatientCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    patientId?: string | null
    url: string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    patientId?: string | null
    url: string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousCreateInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    medecin: MedecinCreateNestedOneWithoutRendezVousInput
    patient: PatientCreateNestedOneWithoutRendezVousInput
    utilisateur: UtilisateurCreateNestedOneWithoutRendezVousInput
    hopital: HopitalCreateNestedOneWithoutRendevousInput
  }

  export type RendezVousUncheckedCreateInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    medecinId: string
    patientId: string
  }

  export type RendezVousUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    medecin?: MedecinUpdateOneRequiredWithoutRendezVousNestedInput
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutRendezVousNestedInput
    hopital?: HopitalUpdateOneRequiredWithoutRendevousNestedInput
  }

  export type RendezVousUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousCreateManyInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    medecinId: string
    patientId: string
  }

  export type RendezVousUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RendezVousUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type HopitalCreateInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalUncheckedCreateInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousUncheckedCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalUncheckedCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteUncheckedCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUpdateManyWithoutHopitauxNestedInput
  }

  export type HopitalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUncheckedUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUncheckedUpdateManyWithoutHopitauxNestedInput
  }

  export type HopitalCreateManyInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
  }

  export type HopitalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
  }

  export type HopitalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalCreateInput = {
    id?: string
    medecin: MedecinCreateNestedOneWithoutHopitauxInput
    hopital: HopitalCreateNestedOneWithoutMedecinInput
  }

  export type MedecinHopitalUncheckedCreateInput = {
    id?: string
    medecinId: string
    hopitalId: string
  }

  export type MedecinHopitalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecin?: MedecinUpdateOneRequiredWithoutHopitauxNestedInput
    hopital?: HopitalUpdateOneRequiredWithoutMedecinNestedInput
  }

  export type MedecinHopitalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalCreateManyInput = {
    id?: string
    medecinId: string
    hopitalId: string
  }

  export type MedecinHopitalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
  }

  export type SpecialiteCreateInput = {
    id?: string
    nom: string
    description?: string | null
    medecins?: MedecinCreateNestedManyWithoutSpecialiteInput
    hopitaux?: HopitalCreateNestedManyWithoutSpecialitesInput
  }

  export type SpecialiteUncheckedCreateInput = {
    id?: string
    nom: string
    description?: string | null
    medecins?: MedecinUncheckedCreateNestedManyWithoutSpecialiteInput
    hopitaux?: HopitalUncheckedCreateNestedManyWithoutSpecialitesInput
  }

  export type SpecialiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    medecins?: MedecinUpdateManyWithoutSpecialiteNestedInput
    hopitaux?: HopitalUpdateManyWithoutSpecialitesNestedInput
  }

  export type SpecialiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    medecins?: MedecinUncheckedUpdateManyWithoutSpecialiteNestedInput
    hopitaux?: HopitalUncheckedUpdateManyWithoutSpecialitesNestedInput
  }

  export type SpecialiteCreateManyInput = {
    id?: string
    nom: string
    description?: string | null
  }

  export type SpecialiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpecialiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecommandationCreateInput = {
    id?: string
    contenu: string
    date?: Date | string
    medecin: MedecinCreateNestedOneWithoutRecommandationsInput
  }

  export type RecommandationUncheckedCreateInput = {
    id?: string
    contenu: string
    medecinId: string
    date?: Date | string
  }

  export type RecommandationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    medecin?: MedecinUpdateOneRequiredWithoutRecommandationsNestedInput
  }

  export type RecommandationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommandationCreateManyInput = {
    id?: string
    contenu: string
    medecinId: string
    date?: Date | string
  }

  export type RecommandationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommandationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UtilisateurHopitalCreateInput = {
    id?: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
    hopital: HopitalCreateNestedOneWithoutUtilisateurHopitalsInput
    utilisateur: UtilisateurCreateNestedOneWithoutUtilisateurHopitalsInput
  }

  export type UtilisateurHopitalUncheckedCreateInput = {
    id?: string
    utilisateurId: string
    hopitalId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type UtilisateurHopitalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hopital?: HopitalUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput
  }

  export type UtilisateurHopitalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UtilisateurHopitalCreateManyInput = {
    id?: string
    utilisateurId: string
    hopitalId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type UtilisateurHopitalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UtilisateurHopitalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumStatusUtilisateurFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusUtilisateur | EnumStatusUtilisateurFieldRefInput<$PrismaModel>
    in?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusUtilisateurFilter<$PrismaModel> | $Enums.StatusUtilisateur
  }

  export type AdministrateurNullableScalarRelationFilter = {
    is?: AdministrateurWhereInput | null
    isNot?: AdministrateurWhereInput | null
  }

  export type MedecinNullableScalarRelationFilter = {
    is?: MedecinWhereInput | null
    isNot?: MedecinWhereInput | null
  }

  export type PatientNullableScalarRelationFilter = {
    is?: PatientWhereInput | null
    isNot?: PatientWhereInput | null
  }

  export type RendezVousListRelationFilter = {
    every?: RendezVousWhereInput
    some?: RendezVousWhereInput
    none?: RendezVousWhereInput
  }

  export type UtilisateurHopitalListRelationFilter = {
    every?: UtilisateurHopitalWhereInput
    some?: UtilisateurHopitalWhereInput
    none?: UtilisateurHopitalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RendezVousOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UtilisateurHopitalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UtilisateurCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    dateCreation?: SortOrder
    status?: SortOrder
  }

  export type UtilisateurMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    dateCreation?: SortOrder
    status?: SortOrder
  }

  export type UtilisateurMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    dateCreation?: SortOrder
    status?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStatusUtilisateurWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusUtilisateur | EnumStatusUtilisateurFieldRefInput<$PrismaModel>
    in?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusUtilisateurWithAggregatesFilter<$PrismaModel> | $Enums.StatusUtilisateur
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusUtilisateurFilter<$PrismaModel>
    _max?: NestedEnumStatusUtilisateurFilter<$PrismaModel>
  }

  export type EnumFonctionAdminFilter<$PrismaModel = never> = {
    equals?: $Enums.FonctionAdmin | EnumFonctionAdminFieldRefInput<$PrismaModel>
    in?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    notIn?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    not?: NestedEnumFonctionAdminFilter<$PrismaModel> | $Enums.FonctionAdmin
  }

  export type UtilisateurScalarRelationFilter = {
    is?: UtilisateurWhereInput
    isNot?: UtilisateurWhereInput
  }

  export type AdministrateurCountOrderByAggregateInput = {
    id?: SortOrder
    fonction?: SortOrder
    userId?: SortOrder
  }

  export type AdministrateurMaxOrderByAggregateInput = {
    id?: SortOrder
    fonction?: SortOrder
    userId?: SortOrder
  }

  export type AdministrateurMinOrderByAggregateInput = {
    id?: SortOrder
    fonction?: SortOrder
    userId?: SortOrder
  }

  export type EnumFonctionAdminWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FonctionAdmin | EnumFonctionAdminFieldRefInput<$PrismaModel>
    in?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    notIn?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    not?: NestedEnumFonctionAdminWithAggregatesFilter<$PrismaModel> | $Enums.FonctionAdmin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFonctionAdminFilter<$PrismaModel>
    _max?: NestedEnumFonctionAdminFilter<$PrismaModel>
  }

  export type EnumGroupeSanguinFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupeSanguin | EnumGroupeSanguinFieldRefInput<$PrismaModel>
    in?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupeSanguinFilter<$PrismaModel> | $Enums.GroupeSanguin
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSexeFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexe | EnumSexeFieldRefInput<$PrismaModel>
    in?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    not?: NestedEnumSexeFilter<$PrismaModel> | $Enums.Sexe
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    dateNaissance?: SortOrder
    adresse?: SortOrder
    groupeSanguin?: SortOrder
    poids?: SortOrder
    taille?: SortOrder
    sexe?: SortOrder
    userId?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    poids?: SortOrder
    taille?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    dateNaissance?: SortOrder
    adresse?: SortOrder
    groupeSanguin?: SortOrder
    poids?: SortOrder
    taille?: SortOrder
    sexe?: SortOrder
    userId?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    dateNaissance?: SortOrder
    adresse?: SortOrder
    groupeSanguin?: SortOrder
    poids?: SortOrder
    taille?: SortOrder
    sexe?: SortOrder
    userId?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    poids?: SortOrder
    taille?: SortOrder
  }

  export type EnumGroupeSanguinWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupeSanguin | EnumGroupeSanguinFieldRefInput<$PrismaModel>
    in?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupeSanguinWithAggregatesFilter<$PrismaModel> | $Enums.GroupeSanguin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupeSanguinFilter<$PrismaModel>
    _max?: NestedEnumGroupeSanguinFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumSexeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexe | EnumSexeFieldRefInput<$PrismaModel>
    in?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    not?: NestedEnumSexeWithAggregatesFilter<$PrismaModel> | $Enums.Sexe
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexeFilter<$PrismaModel>
    _max?: NestedEnumSexeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumStatutApprovalFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApproval | EnumStatutApprovalFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprovalFilter<$PrismaModel> | $Enums.StatutApproval
  }

  export type SpecialiteScalarRelationFilter = {
    is?: SpecialiteWhereInput
    isNot?: SpecialiteWhereInput
  }

  export type RecommandationListRelationFilter = {
    every?: RecommandationWhereInput
    some?: RecommandationWhereInput
    none?: RecommandationWhereInput
  }

  export type MedecinHopitalListRelationFilter = {
    every?: MedecinHopitalWhereInput
    some?: MedecinHopitalWhereInput
    none?: MedecinHopitalWhereInput
  }

  export type RecommandationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedecinHopitalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedecinCountOrderByAggregateInput = {
    id?: SortOrder
    specialiteId?: SortOrder
    numLicence?: SortOrder
    anneeExperience?: SortOrder
    titre?: SortOrder
    userId?: SortOrder
    isDisponible?: SortOrder
    statut?: SortOrder
  }

  export type MedecinAvgOrderByAggregateInput = {
    anneeExperience?: SortOrder
  }

  export type MedecinMaxOrderByAggregateInput = {
    id?: SortOrder
    specialiteId?: SortOrder
    numLicence?: SortOrder
    anneeExperience?: SortOrder
    titre?: SortOrder
    userId?: SortOrder
    isDisponible?: SortOrder
    statut?: SortOrder
  }

  export type MedecinMinOrderByAggregateInput = {
    id?: SortOrder
    specialiteId?: SortOrder
    numLicence?: SortOrder
    anneeExperience?: SortOrder
    titre?: SortOrder
    userId?: SortOrder
    isDisponible?: SortOrder
    statut?: SortOrder
  }

  export type MedecinSumOrderByAggregateInput = {
    anneeExperience?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumStatutApprovalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApproval | EnumStatutApprovalFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprovalWithAggregatesFilter<$PrismaModel> | $Enums.StatutApproval
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutApprovalFilter<$PrismaModel>
    _max?: NestedEnumStatutApprovalFilter<$PrismaModel>
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    dateCreation?: SortOrder
    patientId?: SortOrder
    url?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    dateCreation?: SortOrder
    patientId?: SortOrder
    url?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    dateCreation?: SortOrder
    patientId?: SortOrder
    url?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatutRendezVousFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutRendezVous | EnumStatutRendezVousFieldRefInput<$PrismaModel>
    in?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutRendezVousFilter<$PrismaModel> | $Enums.StatutRendezVous
  }

  export type MedecinScalarRelationFilter = {
    is?: MedecinWhereInput
    isNot?: MedecinWhereInput
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type HopitalScalarRelationFilter = {
    is?: HopitalWhereInput
    isNot?: HopitalWhereInput
  }

  export type RendezVousMedecinIdDateCompoundUniqueInput = {
    medecinId: string
    date: Date | string
  }

  export type RendezVousPatientIdDateCompoundUniqueInput = {
    patientId: string
    date: Date | string
  }

  export type RendezVousCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duree?: SortOrder
    statut?: SortOrder
    motif?: SortOrder
    hopitalId?: SortOrder
    utilisateurId?: SortOrder
    medecinId?: SortOrder
    patientId?: SortOrder
  }

  export type RendezVousAvgOrderByAggregateInput = {
    duree?: SortOrder
  }

  export type RendezVousMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duree?: SortOrder
    statut?: SortOrder
    motif?: SortOrder
    hopitalId?: SortOrder
    utilisateurId?: SortOrder
    medecinId?: SortOrder
    patientId?: SortOrder
  }

  export type RendezVousMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duree?: SortOrder
    statut?: SortOrder
    motif?: SortOrder
    hopitalId?: SortOrder
    utilisateurId?: SortOrder
    medecinId?: SortOrder
    patientId?: SortOrder
  }

  export type RendezVousSumOrderByAggregateInput = {
    duree?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatutRendezVousWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutRendezVous | EnumStatutRendezVousFieldRefInput<$PrismaModel>
    in?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutRendezVousWithAggregatesFilter<$PrismaModel> | $Enums.StatutRendezVous
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutRendezVousFilter<$PrismaModel>
    _max?: NestedEnumStatutRendezVousFilter<$PrismaModel>
  }

  export type SpecialiteListRelationFilter = {
    every?: SpecialiteWhereInput
    some?: SpecialiteWhereInput
    none?: SpecialiteWhereInput
  }

  export type SpecialiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HopitalCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    description?: SortOrder
    contact?: SortOrder
    localisation?: SortOrder
    slug?: SortOrder
    fuseauHoraire?: SortOrder
  }

  export type HopitalMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    description?: SortOrder
    contact?: SortOrder
    localisation?: SortOrder
    slug?: SortOrder
    fuseauHoraire?: SortOrder
  }

  export type HopitalMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    description?: SortOrder
    contact?: SortOrder
    localisation?: SortOrder
    slug?: SortOrder
    fuseauHoraire?: SortOrder
  }

  export type MedecinHopitalMedecinIdHopitalIdCompoundUniqueInput = {
    medecinId: string
    hopitalId: string
  }

  export type MedecinHopitalCountOrderByAggregateInput = {
    id?: SortOrder
    medecinId?: SortOrder
    hopitalId?: SortOrder
  }

  export type MedecinHopitalMaxOrderByAggregateInput = {
    id?: SortOrder
    medecinId?: SortOrder
    hopitalId?: SortOrder
  }

  export type MedecinHopitalMinOrderByAggregateInput = {
    id?: SortOrder
    medecinId?: SortOrder
    hopitalId?: SortOrder
  }

  export type MedecinListRelationFilter = {
    every?: MedecinWhereInput
    some?: MedecinWhereInput
    none?: MedecinWhereInput
  }

  export type HopitalListRelationFilter = {
    every?: HopitalWhereInput
    some?: HopitalWhereInput
    none?: HopitalWhereInput
  }

  export type MedecinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HopitalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpecialiteCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
  }

  export type SpecialiteMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
  }

  export type SpecialiteMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
  }

  export type RecommandationCountOrderByAggregateInput = {
    id?: SortOrder
    contenu?: SortOrder
    medecinId?: SortOrder
    date?: SortOrder
  }

  export type RecommandationMaxOrderByAggregateInput = {
    id?: SortOrder
    contenu?: SortOrder
    medecinId?: SortOrder
    date?: SortOrder
  }

  export type RecommandationMinOrderByAggregateInput = {
    id?: SortOrder
    contenu?: SortOrder
    medecinId?: SortOrder
    date?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UtilisateurHopitalUtilisateurIdHopitalIdRoleCompoundUniqueInput = {
    utilisateurId: string
    hopitalId: string
    role: $Enums.Role
  }

  export type UtilisateurHopitalCountOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    hopitalId?: SortOrder
    role?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
  }

  export type UtilisateurHopitalMaxOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    hopitalId?: SortOrder
    role?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
  }

  export type UtilisateurHopitalMinOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    hopitalId?: SortOrder
    role?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdministrateurCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: AdministrateurCreateOrConnectWithoutUtilisateurInput
    connect?: AdministrateurWhereUniqueInput
  }

  export type MedecinCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutUtilisateurInput
    connect?: MedecinWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUtilisateurInput
    connect?: PatientWhereUniqueInput
  }

  export type RendezVousCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput> | UtilisateurHopitalCreateWithoutUtilisateurInput[] | UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput | UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput[]
    createMany?: UtilisateurHopitalCreateManyUtilisateurInputEnvelope
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
  }

  export type AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: AdministrateurCreateOrConnectWithoutUtilisateurInput
    connect?: AdministrateurWhereUniqueInput
  }

  export type MedecinUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutUtilisateurInput
    connect?: MedecinWhereUniqueInput
  }

  export type PatientUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUtilisateurInput
    connect?: PatientWhereUniqueInput
  }

  export type RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput> | UtilisateurHopitalCreateWithoutUtilisateurInput[] | UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput | UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput[]
    createMany?: UtilisateurHopitalCreateManyUtilisateurInputEnvelope
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumStatusUtilisateurFieldUpdateOperationsInput = {
    set?: $Enums.StatusUtilisateur
  }

  export type AdministrateurUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: AdministrateurCreateOrConnectWithoutUtilisateurInput
    upsert?: AdministrateurUpsertWithoutUtilisateurInput
    disconnect?: AdministrateurWhereInput | boolean
    delete?: AdministrateurWhereInput | boolean
    connect?: AdministrateurWhereUniqueInput
    update?: XOR<XOR<AdministrateurUpdateToOneWithWhereWithoutUtilisateurInput, AdministrateurUpdateWithoutUtilisateurInput>, AdministrateurUncheckedUpdateWithoutUtilisateurInput>
  }

  export type MedecinUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutUtilisateurInput
    upsert?: MedecinUpsertWithoutUtilisateurInput
    disconnect?: MedecinWhereInput | boolean
    delete?: MedecinWhereInput | boolean
    connect?: MedecinWhereUniqueInput
    update?: XOR<XOR<MedecinUpdateToOneWithWhereWithoutUtilisateurInput, MedecinUpdateWithoutUtilisateurInput>, MedecinUncheckedUpdateWithoutUtilisateurInput>
  }

  export type PatientUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUtilisateurInput
    upsert?: PatientUpsertWithoutUtilisateurInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUtilisateurInput, PatientUpdateWithoutUtilisateurInput>, PatientUncheckedUpdateWithoutUtilisateurInput>
  }

  export type RendezVousUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput | RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput | RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutUtilisateurInput | RendezVousUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput> | UtilisateurHopitalCreateWithoutUtilisateurInput[] | UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput | UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput[]
    upsert?: UtilisateurHopitalUpsertWithWhereUniqueWithoutUtilisateurInput | UtilisateurHopitalUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: UtilisateurHopitalCreateManyUtilisateurInputEnvelope
    set?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    disconnect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    delete?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    update?: UtilisateurHopitalUpdateWithWhereUniqueWithoutUtilisateurInput | UtilisateurHopitalUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: UtilisateurHopitalUpdateManyWithWhereWithoutUtilisateurInput | UtilisateurHopitalUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
  }

  export type AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: AdministrateurCreateOrConnectWithoutUtilisateurInput
    upsert?: AdministrateurUpsertWithoutUtilisateurInput
    disconnect?: AdministrateurWhereInput | boolean
    delete?: AdministrateurWhereInput | boolean
    connect?: AdministrateurWhereUniqueInput
    update?: XOR<XOR<AdministrateurUpdateToOneWithWhereWithoutUtilisateurInput, AdministrateurUpdateWithoutUtilisateurInput>, AdministrateurUncheckedUpdateWithoutUtilisateurInput>
  }

  export type MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutUtilisateurInput
    upsert?: MedecinUpsertWithoutUtilisateurInput
    disconnect?: MedecinWhereInput | boolean
    delete?: MedecinWhereInput | boolean
    connect?: MedecinWhereUniqueInput
    update?: XOR<XOR<MedecinUpdateToOneWithWhereWithoutUtilisateurInput, MedecinUpdateWithoutUtilisateurInput>, MedecinUncheckedUpdateWithoutUtilisateurInput>
  }

  export type PatientUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUtilisateurInput
    upsert?: PatientUpsertWithoutUtilisateurInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUtilisateurInput, PatientUpdateWithoutUtilisateurInput>, PatientUncheckedUpdateWithoutUtilisateurInput>
  }

  export type RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput | RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput | RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutUtilisateurInput | RendezVousUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput> | UtilisateurHopitalCreateWithoutUtilisateurInput[] | UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput | UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput[]
    upsert?: UtilisateurHopitalUpsertWithWhereUniqueWithoutUtilisateurInput | UtilisateurHopitalUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: UtilisateurHopitalCreateManyUtilisateurInputEnvelope
    set?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    disconnect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    delete?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    update?: UtilisateurHopitalUpdateWithWhereUniqueWithoutUtilisateurInput | UtilisateurHopitalUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: UtilisateurHopitalUpdateManyWithWhereWithoutUtilisateurInput | UtilisateurHopitalUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
  }

  export type UtilisateurCreateNestedOneWithoutAdministrateurInput = {
    create?: XOR<UtilisateurCreateWithoutAdministrateurInput, UtilisateurUncheckedCreateWithoutAdministrateurInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutAdministrateurInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type EnumFonctionAdminFieldUpdateOperationsInput = {
    set?: $Enums.FonctionAdmin
  }

  export type UtilisateurUpdateOneRequiredWithoutAdministrateurNestedInput = {
    create?: XOR<UtilisateurCreateWithoutAdministrateurInput, UtilisateurUncheckedCreateWithoutAdministrateurInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutAdministrateurInput
    upsert?: UtilisateurUpsertWithoutAdministrateurInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutAdministrateurInput, UtilisateurUpdateWithoutAdministrateurInput>, UtilisateurUncheckedUpdateWithoutAdministrateurInput>
  }

  export type DocumentCreateNestedManyWithoutPatientInput = {
    create?: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput> | DocumentCreateWithoutPatientInput[] | DocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPatientInput | DocumentCreateOrConnectWithoutPatientInput[]
    createMany?: DocumentCreateManyPatientInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type UtilisateurCreateNestedOneWithoutPatientInput = {
    create?: XOR<UtilisateurCreateWithoutPatientInput, UtilisateurUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutPatientInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type RendezVousCreateNestedManyWithoutPatientInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput> | DocumentCreateWithoutPatientInput[] | DocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPatientInput | DocumentCreateOrConnectWithoutPatientInput[]
    createMany?: DocumentCreateManyPatientInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type EnumGroupeSanguinFieldUpdateOperationsInput = {
    set?: $Enums.GroupeSanguin
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSexeFieldUpdateOperationsInput = {
    set?: $Enums.Sexe
  }

  export type DocumentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput> | DocumentCreateWithoutPatientInput[] | DocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPatientInput | DocumentCreateOrConnectWithoutPatientInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutPatientInput | DocumentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DocumentCreateManyPatientInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutPatientInput | DocumentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutPatientInput | DocumentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type UtilisateurUpdateOneRequiredWithoutPatientNestedInput = {
    create?: XOR<UtilisateurCreateWithoutPatientInput, UtilisateurUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutPatientInput
    upsert?: UtilisateurUpsertWithoutPatientInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutPatientInput, UtilisateurUpdateWithoutPatientInput>, UtilisateurUncheckedUpdateWithoutPatientInput>
  }

  export type RendezVousUpdateManyWithoutPatientNestedInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutPatientInput | RendezVousUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutPatientInput | RendezVousUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutPatientInput | RendezVousUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput> | DocumentCreateWithoutPatientInput[] | DocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPatientInput | DocumentCreateOrConnectWithoutPatientInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutPatientInput | DocumentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DocumentCreateManyPatientInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutPatientInput | DocumentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutPatientInput | DocumentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutPatientInput | RendezVousUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutPatientInput | RendezVousUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutPatientInput | RendezVousUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type SpecialiteCreateNestedOneWithoutMedecinsInput = {
    create?: XOR<SpecialiteCreateWithoutMedecinsInput, SpecialiteUncheckedCreateWithoutMedecinsInput>
    connectOrCreate?: SpecialiteCreateOrConnectWithoutMedecinsInput
    connect?: SpecialiteWhereUniqueInput
  }

  export type UtilisateurCreateNestedOneWithoutMedecinInput = {
    create?: XOR<UtilisateurCreateWithoutMedecinInput, UtilisateurUncheckedCreateWithoutMedecinInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutMedecinInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type RecommandationCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput> | RecommandationCreateWithoutMedecinInput[] | RecommandationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RecommandationCreateOrConnectWithoutMedecinInput | RecommandationCreateOrConnectWithoutMedecinInput[]
    createMany?: RecommandationCreateManyMedecinInputEnvelope
    connect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
  }

  export type RendezVousCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type MedecinHopitalCreateNestedManyWithoutMedecinInput = {
    create?: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput> | MedecinHopitalCreateWithoutMedecinInput[] | MedecinHopitalUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutMedecinInput | MedecinHopitalCreateOrConnectWithoutMedecinInput[]
    createMany?: MedecinHopitalCreateManyMedecinInputEnvelope
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
  }

  export type RecommandationUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput> | RecommandationCreateWithoutMedecinInput[] | RecommandationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RecommandationCreateOrConnectWithoutMedecinInput | RecommandationCreateOrConnectWithoutMedecinInput[]
    createMany?: RecommandationCreateManyMedecinInputEnvelope
    connect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput> | MedecinHopitalCreateWithoutMedecinInput[] | MedecinHopitalUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutMedecinInput | MedecinHopitalCreateOrConnectWithoutMedecinInput[]
    createMany?: MedecinHopitalCreateManyMedecinInputEnvelope
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumStatutApprovalFieldUpdateOperationsInput = {
    set?: $Enums.StatutApproval
  }

  export type SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput = {
    create?: XOR<SpecialiteCreateWithoutMedecinsInput, SpecialiteUncheckedCreateWithoutMedecinsInput>
    connectOrCreate?: SpecialiteCreateOrConnectWithoutMedecinsInput
    upsert?: SpecialiteUpsertWithoutMedecinsInput
    connect?: SpecialiteWhereUniqueInput
    update?: XOR<XOR<SpecialiteUpdateToOneWithWhereWithoutMedecinsInput, SpecialiteUpdateWithoutMedecinsInput>, SpecialiteUncheckedUpdateWithoutMedecinsInput>
  }

  export type UtilisateurUpdateOneRequiredWithoutMedecinNestedInput = {
    create?: XOR<UtilisateurCreateWithoutMedecinInput, UtilisateurUncheckedCreateWithoutMedecinInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutMedecinInput
    upsert?: UtilisateurUpsertWithoutMedecinInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutMedecinInput, UtilisateurUpdateWithoutMedecinInput>, UtilisateurUncheckedUpdateWithoutMedecinInput>
  }

  export type RecommandationUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput> | RecommandationCreateWithoutMedecinInput[] | RecommandationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RecommandationCreateOrConnectWithoutMedecinInput | RecommandationCreateOrConnectWithoutMedecinInput[]
    upsert?: RecommandationUpsertWithWhereUniqueWithoutMedecinInput | RecommandationUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RecommandationCreateManyMedecinInputEnvelope
    set?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    disconnect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    delete?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    connect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    update?: RecommandationUpdateWithWhereUniqueWithoutMedecinInput | RecommandationUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RecommandationUpdateManyWithWhereWithoutMedecinInput | RecommandationUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RecommandationScalarWhereInput | RecommandationScalarWhereInput[]
  }

  export type RendezVousUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutMedecinInput | RendezVousUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutMedecinInput | RendezVousUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutMedecinInput | RendezVousUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type MedecinHopitalUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput> | MedecinHopitalCreateWithoutMedecinInput[] | MedecinHopitalUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutMedecinInput | MedecinHopitalCreateOrConnectWithoutMedecinInput[]
    upsert?: MedecinHopitalUpsertWithWhereUniqueWithoutMedecinInput | MedecinHopitalUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: MedecinHopitalCreateManyMedecinInputEnvelope
    set?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    disconnect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    delete?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    update?: MedecinHopitalUpdateWithWhereUniqueWithoutMedecinInput | MedecinHopitalUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: MedecinHopitalUpdateManyWithWhereWithoutMedecinInput | MedecinHopitalUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
  }

  export type RecommandationUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput> | RecommandationCreateWithoutMedecinInput[] | RecommandationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RecommandationCreateOrConnectWithoutMedecinInput | RecommandationCreateOrConnectWithoutMedecinInput[]
    upsert?: RecommandationUpsertWithWhereUniqueWithoutMedecinInput | RecommandationUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RecommandationCreateManyMedecinInputEnvelope
    set?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    disconnect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    delete?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    connect?: RecommandationWhereUniqueInput | RecommandationWhereUniqueInput[]
    update?: RecommandationUpdateWithWhereUniqueWithoutMedecinInput | RecommandationUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RecommandationUpdateManyWithWhereWithoutMedecinInput | RecommandationUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RecommandationScalarWhereInput | RecommandationScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutMedecinInput | RendezVousUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutMedecinInput | RendezVousUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutMedecinInput | RendezVousUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput> | MedecinHopitalCreateWithoutMedecinInput[] | MedecinHopitalUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutMedecinInput | MedecinHopitalCreateOrConnectWithoutMedecinInput[]
    upsert?: MedecinHopitalUpsertWithWhereUniqueWithoutMedecinInput | MedecinHopitalUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: MedecinHopitalCreateManyMedecinInputEnvelope
    set?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    disconnect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    delete?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    update?: MedecinHopitalUpdateWithWhereUniqueWithoutMedecinInput | MedecinHopitalUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: MedecinHopitalUpdateManyWithWhereWithoutMedecinInput | MedecinHopitalUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<PatientCreateWithoutDocumentsInput, PatientUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutDocumentsInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<PatientCreateWithoutDocumentsInput, PatientUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutDocumentsInput
    upsert?: PatientUpsertWithoutDocumentsInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutDocumentsInput, PatientUpdateWithoutDocumentsInput>, PatientUncheckedUpdateWithoutDocumentsInput>
  }

  export type MedecinCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<MedecinCreateWithoutRendezVousInput, MedecinUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutRendezVousInput
    connect?: MedecinWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRendezVousInput
    connect?: PatientWhereUniqueInput
  }

  export type UtilisateurCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<UtilisateurCreateWithoutRendezVousInput, UtilisateurUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutRendezVousInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type HopitalCreateNestedOneWithoutRendevousInput = {
    create?: XOR<HopitalCreateWithoutRendevousInput, HopitalUncheckedCreateWithoutRendevousInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutRendevousInput
    connect?: HopitalWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatutRendezVousFieldUpdateOperationsInput = {
    set?: $Enums.StatutRendezVous
  }

  export type MedecinUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<MedecinCreateWithoutRendezVousInput, MedecinUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutRendezVousInput
    upsert?: MedecinUpsertWithoutRendezVousInput
    connect?: MedecinWhereUniqueInput
    update?: XOR<XOR<MedecinUpdateToOneWithWhereWithoutRendezVousInput, MedecinUpdateWithoutRendezVousInput>, MedecinUncheckedUpdateWithoutRendezVousInput>
  }

  export type PatientUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRendezVousInput
    upsert?: PatientUpsertWithoutRendezVousInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutRendezVousInput, PatientUpdateWithoutRendezVousInput>, PatientUncheckedUpdateWithoutRendezVousInput>
  }

  export type UtilisateurUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<UtilisateurCreateWithoutRendezVousInput, UtilisateurUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutRendezVousInput
    upsert?: UtilisateurUpsertWithoutRendezVousInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutRendezVousInput, UtilisateurUpdateWithoutRendezVousInput>, UtilisateurUncheckedUpdateWithoutRendezVousInput>
  }

  export type HopitalUpdateOneRequiredWithoutRendevousNestedInput = {
    create?: XOR<HopitalCreateWithoutRendevousInput, HopitalUncheckedCreateWithoutRendevousInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutRendevousInput
    upsert?: HopitalUpsertWithoutRendevousInput
    connect?: HopitalWhereUniqueInput
    update?: XOR<XOR<HopitalUpdateToOneWithWhereWithoutRendevousInput, HopitalUpdateWithoutRendevousInput>, HopitalUncheckedUpdateWithoutRendevousInput>
  }

  export type UtilisateurHopitalCreateNestedManyWithoutHopitalInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput> | UtilisateurHopitalCreateWithoutHopitalInput[] | UtilisateurHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutHopitalInput | UtilisateurHopitalCreateOrConnectWithoutHopitalInput[]
    createMany?: UtilisateurHopitalCreateManyHopitalInputEnvelope
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
  }

  export type RendezVousCreateNestedManyWithoutHopitalInput = {
    create?: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput> | RendezVousCreateWithoutHopitalInput[] | RendezVousUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutHopitalInput | RendezVousCreateOrConnectWithoutHopitalInput[]
    createMany?: RendezVousCreateManyHopitalInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type MedecinHopitalCreateNestedManyWithoutHopitalInput = {
    create?: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput> | MedecinHopitalCreateWithoutHopitalInput[] | MedecinHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutHopitalInput | MedecinHopitalCreateOrConnectWithoutHopitalInput[]
    createMany?: MedecinHopitalCreateManyHopitalInputEnvelope
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
  }

  export type SpecialiteCreateNestedManyWithoutHopitauxInput = {
    create?: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput> | SpecialiteCreateWithoutHopitauxInput[] | SpecialiteUncheckedCreateWithoutHopitauxInput[]
    connectOrCreate?: SpecialiteCreateOrConnectWithoutHopitauxInput | SpecialiteCreateOrConnectWithoutHopitauxInput[]
    connect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
  }

  export type UtilisateurHopitalUncheckedCreateNestedManyWithoutHopitalInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput> | UtilisateurHopitalCreateWithoutHopitalInput[] | UtilisateurHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutHopitalInput | UtilisateurHopitalCreateOrConnectWithoutHopitalInput[]
    createMany?: UtilisateurHopitalCreateManyHopitalInputEnvelope
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutHopitalInput = {
    create?: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput> | RendezVousCreateWithoutHopitalInput[] | RendezVousUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutHopitalInput | RendezVousCreateOrConnectWithoutHopitalInput[]
    createMany?: RendezVousCreateManyHopitalInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type MedecinHopitalUncheckedCreateNestedManyWithoutHopitalInput = {
    create?: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput> | MedecinHopitalCreateWithoutHopitalInput[] | MedecinHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutHopitalInput | MedecinHopitalCreateOrConnectWithoutHopitalInput[]
    createMany?: MedecinHopitalCreateManyHopitalInputEnvelope
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
  }

  export type SpecialiteUncheckedCreateNestedManyWithoutHopitauxInput = {
    create?: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput> | SpecialiteCreateWithoutHopitauxInput[] | SpecialiteUncheckedCreateWithoutHopitauxInput[]
    connectOrCreate?: SpecialiteCreateOrConnectWithoutHopitauxInput | SpecialiteCreateOrConnectWithoutHopitauxInput[]
    connect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
  }

  export type UtilisateurHopitalUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput> | UtilisateurHopitalCreateWithoutHopitalInput[] | UtilisateurHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutHopitalInput | UtilisateurHopitalCreateOrConnectWithoutHopitalInput[]
    upsert?: UtilisateurHopitalUpsertWithWhereUniqueWithoutHopitalInput | UtilisateurHopitalUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: UtilisateurHopitalCreateManyHopitalInputEnvelope
    set?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    disconnect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    delete?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    update?: UtilisateurHopitalUpdateWithWhereUniqueWithoutHopitalInput | UtilisateurHopitalUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: UtilisateurHopitalUpdateManyWithWhereWithoutHopitalInput | UtilisateurHopitalUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
  }

  export type RendezVousUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput> | RendezVousCreateWithoutHopitalInput[] | RendezVousUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutHopitalInput | RendezVousCreateOrConnectWithoutHopitalInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutHopitalInput | RendezVousUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: RendezVousCreateManyHopitalInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutHopitalInput | RendezVousUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutHopitalInput | RendezVousUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type MedecinHopitalUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput> | MedecinHopitalCreateWithoutHopitalInput[] | MedecinHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutHopitalInput | MedecinHopitalCreateOrConnectWithoutHopitalInput[]
    upsert?: MedecinHopitalUpsertWithWhereUniqueWithoutHopitalInput | MedecinHopitalUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: MedecinHopitalCreateManyHopitalInputEnvelope
    set?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    disconnect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    delete?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    update?: MedecinHopitalUpdateWithWhereUniqueWithoutHopitalInput | MedecinHopitalUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: MedecinHopitalUpdateManyWithWhereWithoutHopitalInput | MedecinHopitalUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
  }

  export type SpecialiteUpdateManyWithoutHopitauxNestedInput = {
    create?: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput> | SpecialiteCreateWithoutHopitauxInput[] | SpecialiteUncheckedCreateWithoutHopitauxInput[]
    connectOrCreate?: SpecialiteCreateOrConnectWithoutHopitauxInput | SpecialiteCreateOrConnectWithoutHopitauxInput[]
    upsert?: SpecialiteUpsertWithWhereUniqueWithoutHopitauxInput | SpecialiteUpsertWithWhereUniqueWithoutHopitauxInput[]
    set?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    disconnect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    delete?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    connect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    update?: SpecialiteUpdateWithWhereUniqueWithoutHopitauxInput | SpecialiteUpdateWithWhereUniqueWithoutHopitauxInput[]
    updateMany?: SpecialiteUpdateManyWithWhereWithoutHopitauxInput | SpecialiteUpdateManyWithWhereWithoutHopitauxInput[]
    deleteMany?: SpecialiteScalarWhereInput | SpecialiteScalarWhereInput[]
  }

  export type UtilisateurHopitalUncheckedUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput> | UtilisateurHopitalCreateWithoutHopitalInput[] | UtilisateurHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: UtilisateurHopitalCreateOrConnectWithoutHopitalInput | UtilisateurHopitalCreateOrConnectWithoutHopitalInput[]
    upsert?: UtilisateurHopitalUpsertWithWhereUniqueWithoutHopitalInput | UtilisateurHopitalUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: UtilisateurHopitalCreateManyHopitalInputEnvelope
    set?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    disconnect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    delete?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    connect?: UtilisateurHopitalWhereUniqueInput | UtilisateurHopitalWhereUniqueInput[]
    update?: UtilisateurHopitalUpdateWithWhereUniqueWithoutHopitalInput | UtilisateurHopitalUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: UtilisateurHopitalUpdateManyWithWhereWithoutHopitalInput | UtilisateurHopitalUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput> | RendezVousCreateWithoutHopitalInput[] | RendezVousUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutHopitalInput | RendezVousCreateOrConnectWithoutHopitalInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutHopitalInput | RendezVousUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: RendezVousCreateManyHopitalInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutHopitalInput | RendezVousUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutHopitalInput | RendezVousUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type MedecinHopitalUncheckedUpdateManyWithoutHopitalNestedInput = {
    create?: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput> | MedecinHopitalCreateWithoutHopitalInput[] | MedecinHopitalUncheckedCreateWithoutHopitalInput[]
    connectOrCreate?: MedecinHopitalCreateOrConnectWithoutHopitalInput | MedecinHopitalCreateOrConnectWithoutHopitalInput[]
    upsert?: MedecinHopitalUpsertWithWhereUniqueWithoutHopitalInput | MedecinHopitalUpsertWithWhereUniqueWithoutHopitalInput[]
    createMany?: MedecinHopitalCreateManyHopitalInputEnvelope
    set?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    disconnect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    delete?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    connect?: MedecinHopitalWhereUniqueInput | MedecinHopitalWhereUniqueInput[]
    update?: MedecinHopitalUpdateWithWhereUniqueWithoutHopitalInput | MedecinHopitalUpdateWithWhereUniqueWithoutHopitalInput[]
    updateMany?: MedecinHopitalUpdateManyWithWhereWithoutHopitalInput | MedecinHopitalUpdateManyWithWhereWithoutHopitalInput[]
    deleteMany?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
  }

  export type SpecialiteUncheckedUpdateManyWithoutHopitauxNestedInput = {
    create?: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput> | SpecialiteCreateWithoutHopitauxInput[] | SpecialiteUncheckedCreateWithoutHopitauxInput[]
    connectOrCreate?: SpecialiteCreateOrConnectWithoutHopitauxInput | SpecialiteCreateOrConnectWithoutHopitauxInput[]
    upsert?: SpecialiteUpsertWithWhereUniqueWithoutHopitauxInput | SpecialiteUpsertWithWhereUniqueWithoutHopitauxInput[]
    set?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    disconnect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    delete?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    connect?: SpecialiteWhereUniqueInput | SpecialiteWhereUniqueInput[]
    update?: SpecialiteUpdateWithWhereUniqueWithoutHopitauxInput | SpecialiteUpdateWithWhereUniqueWithoutHopitauxInput[]
    updateMany?: SpecialiteUpdateManyWithWhereWithoutHopitauxInput | SpecialiteUpdateManyWithWhereWithoutHopitauxInput[]
    deleteMany?: SpecialiteScalarWhereInput | SpecialiteScalarWhereInput[]
  }

  export type MedecinCreateNestedOneWithoutHopitauxInput = {
    create?: XOR<MedecinCreateWithoutHopitauxInput, MedecinUncheckedCreateWithoutHopitauxInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutHopitauxInput
    connect?: MedecinWhereUniqueInput
  }

  export type HopitalCreateNestedOneWithoutMedecinInput = {
    create?: XOR<HopitalCreateWithoutMedecinInput, HopitalUncheckedCreateWithoutMedecinInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutMedecinInput
    connect?: HopitalWhereUniqueInput
  }

  export type MedecinUpdateOneRequiredWithoutHopitauxNestedInput = {
    create?: XOR<MedecinCreateWithoutHopitauxInput, MedecinUncheckedCreateWithoutHopitauxInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutHopitauxInput
    upsert?: MedecinUpsertWithoutHopitauxInput
    connect?: MedecinWhereUniqueInput
    update?: XOR<XOR<MedecinUpdateToOneWithWhereWithoutHopitauxInput, MedecinUpdateWithoutHopitauxInput>, MedecinUncheckedUpdateWithoutHopitauxInput>
  }

  export type HopitalUpdateOneRequiredWithoutMedecinNestedInput = {
    create?: XOR<HopitalCreateWithoutMedecinInput, HopitalUncheckedCreateWithoutMedecinInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutMedecinInput
    upsert?: HopitalUpsertWithoutMedecinInput
    connect?: HopitalWhereUniqueInput
    update?: XOR<XOR<HopitalUpdateToOneWithWhereWithoutMedecinInput, HopitalUpdateWithoutMedecinInput>, HopitalUncheckedUpdateWithoutMedecinInput>
  }

  export type MedecinCreateNestedManyWithoutSpecialiteInput = {
    create?: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput> | MedecinCreateWithoutSpecialiteInput[] | MedecinUncheckedCreateWithoutSpecialiteInput[]
    connectOrCreate?: MedecinCreateOrConnectWithoutSpecialiteInput | MedecinCreateOrConnectWithoutSpecialiteInput[]
    createMany?: MedecinCreateManySpecialiteInputEnvelope
    connect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
  }

  export type HopitalCreateNestedManyWithoutSpecialitesInput = {
    create?: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput> | HopitalCreateWithoutSpecialitesInput[] | HopitalUncheckedCreateWithoutSpecialitesInput[]
    connectOrCreate?: HopitalCreateOrConnectWithoutSpecialitesInput | HopitalCreateOrConnectWithoutSpecialitesInput[]
    connect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
  }

  export type MedecinUncheckedCreateNestedManyWithoutSpecialiteInput = {
    create?: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput> | MedecinCreateWithoutSpecialiteInput[] | MedecinUncheckedCreateWithoutSpecialiteInput[]
    connectOrCreate?: MedecinCreateOrConnectWithoutSpecialiteInput | MedecinCreateOrConnectWithoutSpecialiteInput[]
    createMany?: MedecinCreateManySpecialiteInputEnvelope
    connect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
  }

  export type HopitalUncheckedCreateNestedManyWithoutSpecialitesInput = {
    create?: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput> | HopitalCreateWithoutSpecialitesInput[] | HopitalUncheckedCreateWithoutSpecialitesInput[]
    connectOrCreate?: HopitalCreateOrConnectWithoutSpecialitesInput | HopitalCreateOrConnectWithoutSpecialitesInput[]
    connect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
  }

  export type MedecinUpdateManyWithoutSpecialiteNestedInput = {
    create?: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput> | MedecinCreateWithoutSpecialiteInput[] | MedecinUncheckedCreateWithoutSpecialiteInput[]
    connectOrCreate?: MedecinCreateOrConnectWithoutSpecialiteInput | MedecinCreateOrConnectWithoutSpecialiteInput[]
    upsert?: MedecinUpsertWithWhereUniqueWithoutSpecialiteInput | MedecinUpsertWithWhereUniqueWithoutSpecialiteInput[]
    createMany?: MedecinCreateManySpecialiteInputEnvelope
    set?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    disconnect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    delete?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    connect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    update?: MedecinUpdateWithWhereUniqueWithoutSpecialiteInput | MedecinUpdateWithWhereUniqueWithoutSpecialiteInput[]
    updateMany?: MedecinUpdateManyWithWhereWithoutSpecialiteInput | MedecinUpdateManyWithWhereWithoutSpecialiteInput[]
    deleteMany?: MedecinScalarWhereInput | MedecinScalarWhereInput[]
  }

  export type HopitalUpdateManyWithoutSpecialitesNestedInput = {
    create?: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput> | HopitalCreateWithoutSpecialitesInput[] | HopitalUncheckedCreateWithoutSpecialitesInput[]
    connectOrCreate?: HopitalCreateOrConnectWithoutSpecialitesInput | HopitalCreateOrConnectWithoutSpecialitesInput[]
    upsert?: HopitalUpsertWithWhereUniqueWithoutSpecialitesInput | HopitalUpsertWithWhereUniqueWithoutSpecialitesInput[]
    set?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    disconnect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    delete?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    connect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    update?: HopitalUpdateWithWhereUniqueWithoutSpecialitesInput | HopitalUpdateWithWhereUniqueWithoutSpecialitesInput[]
    updateMany?: HopitalUpdateManyWithWhereWithoutSpecialitesInput | HopitalUpdateManyWithWhereWithoutSpecialitesInput[]
    deleteMany?: HopitalScalarWhereInput | HopitalScalarWhereInput[]
  }

  export type MedecinUncheckedUpdateManyWithoutSpecialiteNestedInput = {
    create?: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput> | MedecinCreateWithoutSpecialiteInput[] | MedecinUncheckedCreateWithoutSpecialiteInput[]
    connectOrCreate?: MedecinCreateOrConnectWithoutSpecialiteInput | MedecinCreateOrConnectWithoutSpecialiteInput[]
    upsert?: MedecinUpsertWithWhereUniqueWithoutSpecialiteInput | MedecinUpsertWithWhereUniqueWithoutSpecialiteInput[]
    createMany?: MedecinCreateManySpecialiteInputEnvelope
    set?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    disconnect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    delete?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    connect?: MedecinWhereUniqueInput | MedecinWhereUniqueInput[]
    update?: MedecinUpdateWithWhereUniqueWithoutSpecialiteInput | MedecinUpdateWithWhereUniqueWithoutSpecialiteInput[]
    updateMany?: MedecinUpdateManyWithWhereWithoutSpecialiteInput | MedecinUpdateManyWithWhereWithoutSpecialiteInput[]
    deleteMany?: MedecinScalarWhereInput | MedecinScalarWhereInput[]
  }

  export type HopitalUncheckedUpdateManyWithoutSpecialitesNestedInput = {
    create?: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput> | HopitalCreateWithoutSpecialitesInput[] | HopitalUncheckedCreateWithoutSpecialitesInput[]
    connectOrCreate?: HopitalCreateOrConnectWithoutSpecialitesInput | HopitalCreateOrConnectWithoutSpecialitesInput[]
    upsert?: HopitalUpsertWithWhereUniqueWithoutSpecialitesInput | HopitalUpsertWithWhereUniqueWithoutSpecialitesInput[]
    set?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    disconnect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    delete?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    connect?: HopitalWhereUniqueInput | HopitalWhereUniqueInput[]
    update?: HopitalUpdateWithWhereUniqueWithoutSpecialitesInput | HopitalUpdateWithWhereUniqueWithoutSpecialitesInput[]
    updateMany?: HopitalUpdateManyWithWhereWithoutSpecialitesInput | HopitalUpdateManyWithWhereWithoutSpecialitesInput[]
    deleteMany?: HopitalScalarWhereInput | HopitalScalarWhereInput[]
  }

  export type MedecinCreateNestedOneWithoutRecommandationsInput = {
    create?: XOR<MedecinCreateWithoutRecommandationsInput, MedecinUncheckedCreateWithoutRecommandationsInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutRecommandationsInput
    connect?: MedecinWhereUniqueInput
  }

  export type MedecinUpdateOneRequiredWithoutRecommandationsNestedInput = {
    create?: XOR<MedecinCreateWithoutRecommandationsInput, MedecinUncheckedCreateWithoutRecommandationsInput>
    connectOrCreate?: MedecinCreateOrConnectWithoutRecommandationsInput
    upsert?: MedecinUpsertWithoutRecommandationsInput
    connect?: MedecinWhereUniqueInput
    update?: XOR<XOR<MedecinUpdateToOneWithWhereWithoutRecommandationsInput, MedecinUpdateWithoutRecommandationsInput>, MedecinUncheckedUpdateWithoutRecommandationsInput>
  }

  export type HopitalCreateNestedOneWithoutUtilisateurHopitalsInput = {
    create?: XOR<HopitalCreateWithoutUtilisateurHopitalsInput, HopitalUncheckedCreateWithoutUtilisateurHopitalsInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutUtilisateurHopitalsInput
    connect?: HopitalWhereUniqueInput
  }

  export type UtilisateurCreateNestedOneWithoutUtilisateurHopitalsInput = {
    create?: XOR<UtilisateurCreateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedCreateWithoutUtilisateurHopitalsInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutUtilisateurHopitalsInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type HopitalUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput = {
    create?: XOR<HopitalCreateWithoutUtilisateurHopitalsInput, HopitalUncheckedCreateWithoutUtilisateurHopitalsInput>
    connectOrCreate?: HopitalCreateOrConnectWithoutUtilisateurHopitalsInput
    upsert?: HopitalUpsertWithoutUtilisateurHopitalsInput
    connect?: HopitalWhereUniqueInput
    update?: XOR<XOR<HopitalUpdateToOneWithWhereWithoutUtilisateurHopitalsInput, HopitalUpdateWithoutUtilisateurHopitalsInput>, HopitalUncheckedUpdateWithoutUtilisateurHopitalsInput>
  }

  export type UtilisateurUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput = {
    create?: XOR<UtilisateurCreateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedCreateWithoutUtilisateurHopitalsInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutUtilisateurHopitalsInput
    upsert?: UtilisateurUpsertWithoutUtilisateurHopitalsInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutUtilisateurHopitalsInput, UtilisateurUpdateWithoutUtilisateurHopitalsInput>, UtilisateurUncheckedUpdateWithoutUtilisateurHopitalsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumStatusUtilisateurFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusUtilisateur | EnumStatusUtilisateurFieldRefInput<$PrismaModel>
    in?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusUtilisateurFilter<$PrismaModel> | $Enums.StatusUtilisateur
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStatusUtilisateurWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusUtilisateur | EnumStatusUtilisateurFieldRefInput<$PrismaModel>
    in?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusUtilisateur[] | ListEnumStatusUtilisateurFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusUtilisateurWithAggregatesFilter<$PrismaModel> | $Enums.StatusUtilisateur
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusUtilisateurFilter<$PrismaModel>
    _max?: NestedEnumStatusUtilisateurFilter<$PrismaModel>
  }

  export type NestedEnumFonctionAdminFilter<$PrismaModel = never> = {
    equals?: $Enums.FonctionAdmin | EnumFonctionAdminFieldRefInput<$PrismaModel>
    in?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    notIn?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    not?: NestedEnumFonctionAdminFilter<$PrismaModel> | $Enums.FonctionAdmin
  }

  export type NestedEnumFonctionAdminWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FonctionAdmin | EnumFonctionAdminFieldRefInput<$PrismaModel>
    in?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    notIn?: $Enums.FonctionAdmin[] | ListEnumFonctionAdminFieldRefInput<$PrismaModel>
    not?: NestedEnumFonctionAdminWithAggregatesFilter<$PrismaModel> | $Enums.FonctionAdmin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFonctionAdminFilter<$PrismaModel>
    _max?: NestedEnumFonctionAdminFilter<$PrismaModel>
  }

  export type NestedEnumGroupeSanguinFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupeSanguin | EnumGroupeSanguinFieldRefInput<$PrismaModel>
    in?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupeSanguinFilter<$PrismaModel> | $Enums.GroupeSanguin
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSexeFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexe | EnumSexeFieldRefInput<$PrismaModel>
    in?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    not?: NestedEnumSexeFilter<$PrismaModel> | $Enums.Sexe
  }

  export type NestedEnumGroupeSanguinWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupeSanguin | EnumGroupeSanguinFieldRefInput<$PrismaModel>
    in?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupeSanguin[] | ListEnumGroupeSanguinFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupeSanguinWithAggregatesFilter<$PrismaModel> | $Enums.GroupeSanguin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupeSanguinFilter<$PrismaModel>
    _max?: NestedEnumGroupeSanguinFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumSexeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexe | EnumSexeFieldRefInput<$PrismaModel>
    in?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexe[] | ListEnumSexeFieldRefInput<$PrismaModel>
    not?: NestedEnumSexeWithAggregatesFilter<$PrismaModel> | $Enums.Sexe
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexeFilter<$PrismaModel>
    _max?: NestedEnumSexeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStatutApprovalFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApproval | EnumStatutApprovalFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprovalFilter<$PrismaModel> | $Enums.StatutApproval
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStatutApprovalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApproval | EnumStatutApprovalFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApproval[] | ListEnumStatutApprovalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprovalWithAggregatesFilter<$PrismaModel> | $Enums.StatutApproval
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutApprovalFilter<$PrismaModel>
    _max?: NestedEnumStatutApprovalFilter<$PrismaModel>
  }

  export type NestedEnumStatutRendezVousFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutRendezVous | EnumStatutRendezVousFieldRefInput<$PrismaModel>
    in?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutRendezVousFilter<$PrismaModel> | $Enums.StatutRendezVous
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatutRendezVousWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutRendezVous | EnumStatutRendezVousFieldRefInput<$PrismaModel>
    in?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutRendezVous[] | ListEnumStatutRendezVousFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutRendezVousWithAggregatesFilter<$PrismaModel> | $Enums.StatutRendezVous
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutRendezVousFilter<$PrismaModel>
    _max?: NestedEnumStatutRendezVousFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdministrateurCreateWithoutUtilisateurInput = {
    id?: string
    fonction?: $Enums.FonctionAdmin
  }

  export type AdministrateurUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    fonction?: $Enums.FonctionAdmin
  }

  export type AdministrateurCreateOrConnectWithoutUtilisateurInput = {
    where: AdministrateurWhereUniqueInput
    create: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
  }

  export type MedecinCreateWithoutUtilisateurInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    specialite: SpecialiteCreateNestedOneWithoutMedecinsInput
    recommandations?: RecommandationCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    recommandations?: RecommandationUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinCreateOrConnectWithoutUtilisateurInput = {
    where: MedecinWhereUniqueInput
    create: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
  }

  export type PatientCreateWithoutUtilisateurInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    documents?: DocumentCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    documents?: DocumentUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUtilisateurInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
  }

  export type RendezVousCreateWithoutUtilisateurInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    medecin: MedecinCreateNestedOneWithoutRendezVousInput
    patient: PatientCreateNestedOneWithoutRendezVousInput
    hopital: HopitalCreateNestedOneWithoutRendevousInput
  }

  export type RendezVousUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    medecinId: string
    patientId: string
  }

  export type RendezVousCreateOrConnectWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput>
  }

  export type RendezVousCreateManyUtilisateurInputEnvelope = {
    data: RendezVousCreateManyUtilisateurInput | RendezVousCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type UtilisateurHopitalCreateWithoutUtilisateurInput = {
    id?: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
    hopital: HopitalCreateNestedOneWithoutUtilisateurHopitalsInput
  }

  export type UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    hopitalId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type UtilisateurHopitalCreateOrConnectWithoutUtilisateurInput = {
    where: UtilisateurHopitalWhereUniqueInput
    create: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput>
  }

  export type UtilisateurHopitalCreateManyUtilisateurInputEnvelope = {
    data: UtilisateurHopitalCreateManyUtilisateurInput | UtilisateurHopitalCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type AdministrateurUpsertWithoutUtilisateurInput = {
    update: XOR<AdministrateurUpdateWithoutUtilisateurInput, AdministrateurUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<AdministrateurCreateWithoutUtilisateurInput, AdministrateurUncheckedCreateWithoutUtilisateurInput>
    where?: AdministrateurWhereInput
  }

  export type AdministrateurUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: AdministrateurWhereInput
    data: XOR<AdministrateurUpdateWithoutUtilisateurInput, AdministrateurUncheckedUpdateWithoutUtilisateurInput>
  }

  export type AdministrateurUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
  }

  export type AdministrateurUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    fonction?: EnumFonctionAdminFieldUpdateOperationsInput | $Enums.FonctionAdmin
  }

  export type MedecinUpsertWithoutUtilisateurInput = {
    update: XOR<MedecinUpdateWithoutUtilisateurInput, MedecinUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<MedecinCreateWithoutUtilisateurInput, MedecinUncheckedCreateWithoutUtilisateurInput>
    where?: MedecinWhereInput
  }

  export type MedecinUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: MedecinWhereInput
    data: XOR<MedecinUpdateWithoutUtilisateurInput, MedecinUncheckedUpdateWithoutUtilisateurInput>
  }

  export type MedecinUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    specialite?: SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput
    recommandations?: RecommandationUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    recommandations?: RecommandationUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type PatientUpsertWithoutUtilisateurInput = {
    update: XOR<PatientUpdateWithoutUtilisateurInput, PatientUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<PatientCreateWithoutUtilisateurInput, PatientUncheckedCreateWithoutUtilisateurInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutUtilisateurInput, PatientUncheckedUpdateWithoutUtilisateurInput>
  }

  export type PatientUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    documents?: DocumentUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    documents?: DocumentUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutUtilisateurInput, RendezVousUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutUtilisateurInput, RendezVousUncheckedUpdateWithoutUtilisateurInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutUtilisateurInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type RendezVousScalarWhereInput = {
    AND?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    OR?: RendezVousScalarWhereInput[]
    NOT?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    id?: StringFilter<"RendezVous"> | string
    date?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    statut?: EnumStatutRendezVousFilter<"RendezVous"> | $Enums.StatutRendezVous
    motif?: StringNullableFilter<"RendezVous"> | string | null
    hopitalId?: StringFilter<"RendezVous"> | string
    utilisateurId?: StringFilter<"RendezVous"> | string
    medecinId?: StringFilter<"RendezVous"> | string
    patientId?: StringFilter<"RendezVous"> | string
  }

  export type UtilisateurHopitalUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: UtilisateurHopitalWhereUniqueInput
    update: XOR<UtilisateurHopitalUpdateWithoutUtilisateurInput, UtilisateurHopitalUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<UtilisateurHopitalCreateWithoutUtilisateurInput, UtilisateurHopitalUncheckedCreateWithoutUtilisateurInput>
  }

  export type UtilisateurHopitalUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: UtilisateurHopitalWhereUniqueInput
    data: XOR<UtilisateurHopitalUpdateWithoutUtilisateurInput, UtilisateurHopitalUncheckedUpdateWithoutUtilisateurInput>
  }

  export type UtilisateurHopitalUpdateManyWithWhereWithoutUtilisateurInput = {
    where: UtilisateurHopitalScalarWhereInput
    data: XOR<UtilisateurHopitalUpdateManyMutationInput, UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type UtilisateurHopitalScalarWhereInput = {
    AND?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
    OR?: UtilisateurHopitalScalarWhereInput[]
    NOT?: UtilisateurHopitalScalarWhereInput | UtilisateurHopitalScalarWhereInput[]
    id?: StringFilter<"UtilisateurHopital"> | string
    utilisateurId?: StringFilter<"UtilisateurHopital"> | string
    hopitalId?: StringFilter<"UtilisateurHopital"> | string
    role?: EnumRoleFilter<"UtilisateurHopital"> | $Enums.Role
    dateDebut?: DateTimeFilter<"UtilisateurHopital"> | Date | string
    dateFin?: DateTimeNullableFilter<"UtilisateurHopital"> | Date | string | null
  }

  export type UtilisateurCreateWithoutAdministrateurInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    medecin?: MedecinCreateNestedOneWithoutUtilisateurInput
    patient?: PatientCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutAdministrateurInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    medecin?: MedecinUncheckedCreateNestedOneWithoutUtilisateurInput
    patient?: PatientUncheckedCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutAdministrateurInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutAdministrateurInput, UtilisateurUncheckedCreateWithoutAdministrateurInput>
  }

  export type UtilisateurUpsertWithoutAdministrateurInput = {
    update: XOR<UtilisateurUpdateWithoutAdministrateurInput, UtilisateurUncheckedUpdateWithoutAdministrateurInput>
    create: XOR<UtilisateurCreateWithoutAdministrateurInput, UtilisateurUncheckedCreateWithoutAdministrateurInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutAdministrateurInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutAdministrateurInput, UtilisateurUncheckedUpdateWithoutAdministrateurInput>
  }

  export type UtilisateurUpdateWithoutAdministrateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    medecin?: MedecinUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutAdministrateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    medecin?: MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type DocumentCreateWithoutPatientInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    url: string
  }

  export type DocumentUncheckedCreateWithoutPatientInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    url: string
  }

  export type DocumentCreateOrConnectWithoutPatientInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput>
  }

  export type DocumentCreateManyPatientInputEnvelope = {
    data: DocumentCreateManyPatientInput | DocumentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UtilisateurCreateWithoutPatientInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutPatientInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinUncheckedCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutPatientInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutPatientInput, UtilisateurUncheckedCreateWithoutPatientInput>
  }

  export type RendezVousCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    medecin: MedecinCreateNestedOneWithoutRendezVousInput
    utilisateur: UtilisateurCreateNestedOneWithoutRendezVousInput
    hopital: HopitalCreateNestedOneWithoutRendevousInput
  }

  export type RendezVousUncheckedCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    medecinId: string
  }

  export type RendezVousCreateOrConnectWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput>
  }

  export type RendezVousCreateManyPatientInputEnvelope = {
    data: RendezVousCreateManyPatientInput | RendezVousCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutPatientInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutPatientInput, DocumentUncheckedUpdateWithoutPatientInput>
    create: XOR<DocumentCreateWithoutPatientInput, DocumentUncheckedCreateWithoutPatientInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutPatientInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutPatientInput, DocumentUncheckedUpdateWithoutPatientInput>
  }

  export type DocumentUpdateManyWithWhereWithoutPatientInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutPatientInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    titre?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    dateCreation?: DateTimeFilter<"Document"> | Date | string
    patientId?: StringNullableFilter<"Document"> | string | null
    url?: StringFilter<"Document"> | string
  }

  export type UtilisateurUpsertWithoutPatientInput = {
    update: XOR<UtilisateurUpdateWithoutPatientInput, UtilisateurUncheckedUpdateWithoutPatientInput>
    create: XOR<UtilisateurCreateWithoutPatientInput, UtilisateurUncheckedCreateWithoutPatientInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutPatientInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutPatientInput, UtilisateurUncheckedUpdateWithoutPatientInput>
  }

  export type UtilisateurUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type RendezVousUpsertWithWhereUniqueWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutPatientInput, RendezVousUncheckedUpdateWithoutPatientInput>
    create: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutPatientInput, RendezVousUncheckedUpdateWithoutPatientInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutPatientInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutPatientInput>
  }

  export type SpecialiteCreateWithoutMedecinsInput = {
    id?: string
    nom: string
    description?: string | null
    hopitaux?: HopitalCreateNestedManyWithoutSpecialitesInput
  }

  export type SpecialiteUncheckedCreateWithoutMedecinsInput = {
    id?: string
    nom: string
    description?: string | null
    hopitaux?: HopitalUncheckedCreateNestedManyWithoutSpecialitesInput
  }

  export type SpecialiteCreateOrConnectWithoutMedecinsInput = {
    where: SpecialiteWhereUniqueInput
    create: XOR<SpecialiteCreateWithoutMedecinsInput, SpecialiteUncheckedCreateWithoutMedecinsInput>
  }

  export type UtilisateurCreateWithoutMedecinInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurCreateNestedOneWithoutUtilisateurInput
    patient?: PatientCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutMedecinInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput
    patient?: PatientUncheckedCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutMedecinInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutMedecinInput, UtilisateurUncheckedCreateWithoutMedecinInput>
  }

  export type RecommandationCreateWithoutMedecinInput = {
    id?: string
    contenu: string
    date?: Date | string
  }

  export type RecommandationUncheckedCreateWithoutMedecinInput = {
    id?: string
    contenu: string
    date?: Date | string
  }

  export type RecommandationCreateOrConnectWithoutMedecinInput = {
    where: RecommandationWhereUniqueInput
    create: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput>
  }

  export type RecommandationCreateManyMedecinInputEnvelope = {
    data: RecommandationCreateManyMedecinInput | RecommandationCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousCreateWithoutMedecinInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    patient: PatientCreateNestedOneWithoutRendezVousInput
    utilisateur: UtilisateurCreateNestedOneWithoutRendezVousInput
    hopital: HopitalCreateNestedOneWithoutRendevousInput
  }

  export type RendezVousUncheckedCreateWithoutMedecinInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    patientId: string
  }

  export type RendezVousCreateOrConnectWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput>
  }

  export type RendezVousCreateManyMedecinInputEnvelope = {
    data: RendezVousCreateManyMedecinInput | RendezVousCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type MedecinHopitalCreateWithoutMedecinInput = {
    id?: string
    hopital: HopitalCreateNestedOneWithoutMedecinInput
  }

  export type MedecinHopitalUncheckedCreateWithoutMedecinInput = {
    id?: string
    hopitalId: string
  }

  export type MedecinHopitalCreateOrConnectWithoutMedecinInput = {
    where: MedecinHopitalWhereUniqueInput
    create: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput>
  }

  export type MedecinHopitalCreateManyMedecinInputEnvelope = {
    data: MedecinHopitalCreateManyMedecinInput | MedecinHopitalCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type SpecialiteUpsertWithoutMedecinsInput = {
    update: XOR<SpecialiteUpdateWithoutMedecinsInput, SpecialiteUncheckedUpdateWithoutMedecinsInput>
    create: XOR<SpecialiteCreateWithoutMedecinsInput, SpecialiteUncheckedCreateWithoutMedecinsInput>
    where?: SpecialiteWhereInput
  }

  export type SpecialiteUpdateToOneWithWhereWithoutMedecinsInput = {
    where?: SpecialiteWhereInput
    data: XOR<SpecialiteUpdateWithoutMedecinsInput, SpecialiteUncheckedUpdateWithoutMedecinsInput>
  }

  export type SpecialiteUpdateWithoutMedecinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hopitaux?: HopitalUpdateManyWithoutSpecialitesNestedInput
  }

  export type SpecialiteUncheckedUpdateWithoutMedecinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hopitaux?: HopitalUncheckedUpdateManyWithoutSpecialitesNestedInput
  }

  export type UtilisateurUpsertWithoutMedecinInput = {
    update: XOR<UtilisateurUpdateWithoutMedecinInput, UtilisateurUncheckedUpdateWithoutMedecinInput>
    create: XOR<UtilisateurCreateWithoutMedecinInput, UtilisateurUncheckedCreateWithoutMedecinInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutMedecinInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutMedecinInput, UtilisateurUncheckedUpdateWithoutMedecinInput>
  }

  export type UtilisateurUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type RecommandationUpsertWithWhereUniqueWithoutMedecinInput = {
    where: RecommandationWhereUniqueInput
    update: XOR<RecommandationUpdateWithoutMedecinInput, RecommandationUncheckedUpdateWithoutMedecinInput>
    create: XOR<RecommandationCreateWithoutMedecinInput, RecommandationUncheckedCreateWithoutMedecinInput>
  }

  export type RecommandationUpdateWithWhereUniqueWithoutMedecinInput = {
    where: RecommandationWhereUniqueInput
    data: XOR<RecommandationUpdateWithoutMedecinInput, RecommandationUncheckedUpdateWithoutMedecinInput>
  }

  export type RecommandationUpdateManyWithWhereWithoutMedecinInput = {
    where: RecommandationScalarWhereInput
    data: XOR<RecommandationUpdateManyMutationInput, RecommandationUncheckedUpdateManyWithoutMedecinInput>
  }

  export type RecommandationScalarWhereInput = {
    AND?: RecommandationScalarWhereInput | RecommandationScalarWhereInput[]
    OR?: RecommandationScalarWhereInput[]
    NOT?: RecommandationScalarWhereInput | RecommandationScalarWhereInput[]
    id?: StringFilter<"Recommandation"> | string
    contenu?: StringFilter<"Recommandation"> | string
    medecinId?: StringFilter<"Recommandation"> | string
    date?: DateTimeFilter<"Recommandation"> | Date | string
  }

  export type RendezVousUpsertWithWhereUniqueWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutMedecinInput, RendezVousUncheckedUpdateWithoutMedecinInput>
    create: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutMedecinInput, RendezVousUncheckedUpdateWithoutMedecinInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutMedecinInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutMedecinInput>
  }

  export type MedecinHopitalUpsertWithWhereUniqueWithoutMedecinInput = {
    where: MedecinHopitalWhereUniqueInput
    update: XOR<MedecinHopitalUpdateWithoutMedecinInput, MedecinHopitalUncheckedUpdateWithoutMedecinInput>
    create: XOR<MedecinHopitalCreateWithoutMedecinInput, MedecinHopitalUncheckedCreateWithoutMedecinInput>
  }

  export type MedecinHopitalUpdateWithWhereUniqueWithoutMedecinInput = {
    where: MedecinHopitalWhereUniqueInput
    data: XOR<MedecinHopitalUpdateWithoutMedecinInput, MedecinHopitalUncheckedUpdateWithoutMedecinInput>
  }

  export type MedecinHopitalUpdateManyWithWhereWithoutMedecinInput = {
    where: MedecinHopitalScalarWhereInput
    data: XOR<MedecinHopitalUpdateManyMutationInput, MedecinHopitalUncheckedUpdateManyWithoutMedecinInput>
  }

  export type MedecinHopitalScalarWhereInput = {
    AND?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
    OR?: MedecinHopitalScalarWhereInput[]
    NOT?: MedecinHopitalScalarWhereInput | MedecinHopitalScalarWhereInput[]
    id?: StringFilter<"MedecinHopital"> | string
    medecinId?: StringFilter<"MedecinHopital"> | string
    hopitalId?: StringFilter<"MedecinHopital"> | string
  }

  export type PatientCreateWithoutDocumentsInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    utilisateur: UtilisateurCreateNestedOneWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutDocumentsInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    userId: string
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutDocumentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutDocumentsInput, PatientUncheckedCreateWithoutDocumentsInput>
  }

  export type PatientUpsertWithoutDocumentsInput = {
    update: XOR<PatientUpdateWithoutDocumentsInput, PatientUncheckedUpdateWithoutDocumentsInput>
    create: XOR<PatientCreateWithoutDocumentsInput, PatientUncheckedCreateWithoutDocumentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutDocumentsInput, PatientUncheckedUpdateWithoutDocumentsInput>
  }

  export type PatientUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    utilisateur?: UtilisateurUpdateOneRequiredWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    userId?: StringFieldUpdateOperationsInput | string
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type MedecinCreateWithoutRendezVousInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    specialite: SpecialiteCreateNestedOneWithoutMedecinsInput
    utilisateur: UtilisateurCreateNestedOneWithoutMedecinInput
    recommandations?: RecommandationCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateWithoutRendezVousInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    recommandations?: RecommandationUncheckedCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinCreateOrConnectWithoutRendezVousInput = {
    where: MedecinWhereUniqueInput
    create: XOR<MedecinCreateWithoutRendezVousInput, MedecinUncheckedCreateWithoutRendezVousInput>
  }

  export type PatientCreateWithoutRendezVousInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    documents?: DocumentCreateNestedManyWithoutPatientInput
    utilisateur: UtilisateurCreateNestedOneWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutRendezVousInput = {
    id?: string
    dateNaissance: Date | string
    adresse?: string | null
    groupeSanguin?: $Enums.GroupeSanguin
    poids?: number | null
    taille?: number | null
    sexe?: $Enums.Sexe
    userId: string
    documents?: DocumentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutRendezVousInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
  }

  export type UtilisateurCreateWithoutRendezVousInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinCreateNestedOneWithoutUtilisateurInput
    patient?: PatientCreateNestedOneWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutRendezVousInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinUncheckedCreateNestedOneWithoutUtilisateurInput
    patient?: PatientUncheckedCreateNestedOneWithoutUtilisateurInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutRendezVousInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutRendezVousInput, UtilisateurUncheckedCreateWithoutRendezVousInput>
  }

  export type HopitalCreateWithoutRendevousInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalUncheckedCreateWithoutRendevousInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalUncheckedCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteUncheckedCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalCreateOrConnectWithoutRendevousInput = {
    where: HopitalWhereUniqueInput
    create: XOR<HopitalCreateWithoutRendevousInput, HopitalUncheckedCreateWithoutRendevousInput>
  }

  export type MedecinUpsertWithoutRendezVousInput = {
    update: XOR<MedecinUpdateWithoutRendezVousInput, MedecinUncheckedUpdateWithoutRendezVousInput>
    create: XOR<MedecinCreateWithoutRendezVousInput, MedecinUncheckedCreateWithoutRendezVousInput>
    where?: MedecinWhereInput
  }

  export type MedecinUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: MedecinWhereInput
    data: XOR<MedecinUpdateWithoutRendezVousInput, MedecinUncheckedUpdateWithoutRendezVousInput>
  }

  export type MedecinUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    specialite?: SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutMedecinNestedInput
    recommandations?: RecommandationUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    recommandations?: RecommandationUncheckedUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type PatientUpsertWithoutRendezVousInput = {
    update: XOR<PatientUpdateWithoutRendezVousInput, PatientUncheckedUpdateWithoutRendezVousInput>
    create: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutRendezVousInput, PatientUncheckedUpdateWithoutRendezVousInput>
  }

  export type PatientUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    documents?: DocumentUpdateManyWithoutPatientNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateNaissance?: DateTimeFieldUpdateOperationsInput | Date | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    groupeSanguin?: EnumGroupeSanguinFieldUpdateOperationsInput | $Enums.GroupeSanguin
    poids?: NullableFloatFieldUpdateOperationsInput | number | null
    taille?: NullableFloatFieldUpdateOperationsInput | number | null
    sexe?: EnumSexeFieldUpdateOperationsInput | $Enums.Sexe
    userId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UtilisateurUpsertWithoutRendezVousInput = {
    update: XOR<UtilisateurUpdateWithoutRendezVousInput, UtilisateurUncheckedUpdateWithoutRendezVousInput>
    create: XOR<UtilisateurCreateWithoutRendezVousInput, UtilisateurUncheckedCreateWithoutRendezVousInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutRendezVousInput, UtilisateurUncheckedUpdateWithoutRendezVousInput>
  }

  export type UtilisateurUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUpdateOneWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUtilisateurNestedInput
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type HopitalUpsertWithoutRendevousInput = {
    update: XOR<HopitalUpdateWithoutRendevousInput, HopitalUncheckedUpdateWithoutRendevousInput>
    create: XOR<HopitalCreateWithoutRendevousInput, HopitalUncheckedCreateWithoutRendevousInput>
    where?: HopitalWhereInput
  }

  export type HopitalUpdateToOneWithWhereWithoutRendevousInput = {
    where?: HopitalWhereInput
    data: XOR<HopitalUpdateWithoutRendevousInput, HopitalUncheckedUpdateWithoutRendevousInput>
  }

  export type HopitalUpdateWithoutRendevousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUpdateManyWithoutHopitauxNestedInput
  }

  export type HopitalUncheckedUpdateWithoutRendevousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUncheckedUpdateManyWithoutHopitauxNestedInput
  }

  export type UtilisateurHopitalCreateWithoutHopitalInput = {
    id?: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
    utilisateur: UtilisateurCreateNestedOneWithoutUtilisateurHopitalsInput
  }

  export type UtilisateurHopitalUncheckedCreateWithoutHopitalInput = {
    id?: string
    utilisateurId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type UtilisateurHopitalCreateOrConnectWithoutHopitalInput = {
    where: UtilisateurHopitalWhereUniqueInput
    create: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput>
  }

  export type UtilisateurHopitalCreateManyHopitalInputEnvelope = {
    data: UtilisateurHopitalCreateManyHopitalInput | UtilisateurHopitalCreateManyHopitalInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousCreateWithoutHopitalInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    medecin: MedecinCreateNestedOneWithoutRendezVousInput
    patient: PatientCreateNestedOneWithoutRendezVousInput
    utilisateur: UtilisateurCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateWithoutHopitalInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    utilisateurId: string
    medecinId: string
    patientId: string
  }

  export type RendezVousCreateOrConnectWithoutHopitalInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput>
  }

  export type RendezVousCreateManyHopitalInputEnvelope = {
    data: RendezVousCreateManyHopitalInput | RendezVousCreateManyHopitalInput[]
    skipDuplicates?: boolean
  }

  export type MedecinHopitalCreateWithoutHopitalInput = {
    id?: string
    medecin: MedecinCreateNestedOneWithoutHopitauxInput
  }

  export type MedecinHopitalUncheckedCreateWithoutHopitalInput = {
    id?: string
    medecinId: string
  }

  export type MedecinHopitalCreateOrConnectWithoutHopitalInput = {
    where: MedecinHopitalWhereUniqueInput
    create: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput>
  }

  export type MedecinHopitalCreateManyHopitalInputEnvelope = {
    data: MedecinHopitalCreateManyHopitalInput | MedecinHopitalCreateManyHopitalInput[]
    skipDuplicates?: boolean
  }

  export type SpecialiteCreateWithoutHopitauxInput = {
    id?: string
    nom: string
    description?: string | null
    medecins?: MedecinCreateNestedManyWithoutSpecialiteInput
  }

  export type SpecialiteUncheckedCreateWithoutHopitauxInput = {
    id?: string
    nom: string
    description?: string | null
    medecins?: MedecinUncheckedCreateNestedManyWithoutSpecialiteInput
  }

  export type SpecialiteCreateOrConnectWithoutHopitauxInput = {
    where: SpecialiteWhereUniqueInput
    create: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput>
  }

  export type UtilisateurHopitalUpsertWithWhereUniqueWithoutHopitalInput = {
    where: UtilisateurHopitalWhereUniqueInput
    update: XOR<UtilisateurHopitalUpdateWithoutHopitalInput, UtilisateurHopitalUncheckedUpdateWithoutHopitalInput>
    create: XOR<UtilisateurHopitalCreateWithoutHopitalInput, UtilisateurHopitalUncheckedCreateWithoutHopitalInput>
  }

  export type UtilisateurHopitalUpdateWithWhereUniqueWithoutHopitalInput = {
    where: UtilisateurHopitalWhereUniqueInput
    data: XOR<UtilisateurHopitalUpdateWithoutHopitalInput, UtilisateurHopitalUncheckedUpdateWithoutHopitalInput>
  }

  export type UtilisateurHopitalUpdateManyWithWhereWithoutHopitalInput = {
    where: UtilisateurHopitalScalarWhereInput
    data: XOR<UtilisateurHopitalUpdateManyMutationInput, UtilisateurHopitalUncheckedUpdateManyWithoutHopitalInput>
  }

  export type RendezVousUpsertWithWhereUniqueWithoutHopitalInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutHopitalInput, RendezVousUncheckedUpdateWithoutHopitalInput>
    create: XOR<RendezVousCreateWithoutHopitalInput, RendezVousUncheckedCreateWithoutHopitalInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutHopitalInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutHopitalInput, RendezVousUncheckedUpdateWithoutHopitalInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutHopitalInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutHopitalInput>
  }

  export type MedecinHopitalUpsertWithWhereUniqueWithoutHopitalInput = {
    where: MedecinHopitalWhereUniqueInput
    update: XOR<MedecinHopitalUpdateWithoutHopitalInput, MedecinHopitalUncheckedUpdateWithoutHopitalInput>
    create: XOR<MedecinHopitalCreateWithoutHopitalInput, MedecinHopitalUncheckedCreateWithoutHopitalInput>
  }

  export type MedecinHopitalUpdateWithWhereUniqueWithoutHopitalInput = {
    where: MedecinHopitalWhereUniqueInput
    data: XOR<MedecinHopitalUpdateWithoutHopitalInput, MedecinHopitalUncheckedUpdateWithoutHopitalInput>
  }

  export type MedecinHopitalUpdateManyWithWhereWithoutHopitalInput = {
    where: MedecinHopitalScalarWhereInput
    data: XOR<MedecinHopitalUpdateManyMutationInput, MedecinHopitalUncheckedUpdateManyWithoutHopitalInput>
  }

  export type SpecialiteUpsertWithWhereUniqueWithoutHopitauxInput = {
    where: SpecialiteWhereUniqueInput
    update: XOR<SpecialiteUpdateWithoutHopitauxInput, SpecialiteUncheckedUpdateWithoutHopitauxInput>
    create: XOR<SpecialiteCreateWithoutHopitauxInput, SpecialiteUncheckedCreateWithoutHopitauxInput>
  }

  export type SpecialiteUpdateWithWhereUniqueWithoutHopitauxInput = {
    where: SpecialiteWhereUniqueInput
    data: XOR<SpecialiteUpdateWithoutHopitauxInput, SpecialiteUncheckedUpdateWithoutHopitauxInput>
  }

  export type SpecialiteUpdateManyWithWhereWithoutHopitauxInput = {
    where: SpecialiteScalarWhereInput
    data: XOR<SpecialiteUpdateManyMutationInput, SpecialiteUncheckedUpdateManyWithoutHopitauxInput>
  }

  export type SpecialiteScalarWhereInput = {
    AND?: SpecialiteScalarWhereInput | SpecialiteScalarWhereInput[]
    OR?: SpecialiteScalarWhereInput[]
    NOT?: SpecialiteScalarWhereInput | SpecialiteScalarWhereInput[]
    id?: StringFilter<"Specialite"> | string
    nom?: StringFilter<"Specialite"> | string
    description?: StringNullableFilter<"Specialite"> | string | null
  }

  export type MedecinCreateWithoutHopitauxInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    specialite: SpecialiteCreateNestedOneWithoutMedecinsInput
    utilisateur: UtilisateurCreateNestedOneWithoutMedecinInput
    recommandations?: RecommandationCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateWithoutHopitauxInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    recommandations?: RecommandationUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinCreateOrConnectWithoutHopitauxInput = {
    where: MedecinWhereUniqueInput
    create: XOR<MedecinCreateWithoutHopitauxInput, MedecinUncheckedCreateWithoutHopitauxInput>
  }

  export type HopitalCreateWithoutMedecinInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalUncheckedCreateWithoutMedecinInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousUncheckedCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteUncheckedCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalCreateOrConnectWithoutMedecinInput = {
    where: HopitalWhereUniqueInput
    create: XOR<HopitalCreateWithoutMedecinInput, HopitalUncheckedCreateWithoutMedecinInput>
  }

  export type MedecinUpsertWithoutHopitauxInput = {
    update: XOR<MedecinUpdateWithoutHopitauxInput, MedecinUncheckedUpdateWithoutHopitauxInput>
    create: XOR<MedecinCreateWithoutHopitauxInput, MedecinUncheckedCreateWithoutHopitauxInput>
    where?: MedecinWhereInput
  }

  export type MedecinUpdateToOneWithWhereWithoutHopitauxInput = {
    where?: MedecinWhereInput
    data: XOR<MedecinUpdateWithoutHopitauxInput, MedecinUncheckedUpdateWithoutHopitauxInput>
  }

  export type MedecinUpdateWithoutHopitauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    specialite?: SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutMedecinNestedInput
    recommandations?: RecommandationUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateWithoutHopitauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    recommandations?: RecommandationUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type HopitalUpsertWithoutMedecinInput = {
    update: XOR<HopitalUpdateWithoutMedecinInput, HopitalUncheckedUpdateWithoutMedecinInput>
    create: XOR<HopitalCreateWithoutMedecinInput, HopitalUncheckedCreateWithoutMedecinInput>
    where?: HopitalWhereInput
  }

  export type HopitalUpdateToOneWithWhereWithoutMedecinInput = {
    where?: HopitalWhereInput
    data: XOR<HopitalUpdateWithoutMedecinInput, HopitalUncheckedUpdateWithoutMedecinInput>
  }

  export type HopitalUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUpdateManyWithoutHopitauxNestedInput
  }

  export type HopitalUncheckedUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUncheckedUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUncheckedUpdateManyWithoutHopitauxNestedInput
  }

  export type MedecinCreateWithoutSpecialiteInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    utilisateur: UtilisateurCreateNestedOneWithoutMedecinInput
    recommandations?: RecommandationCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateWithoutSpecialiteInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    recommandations?: RecommandationUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinCreateOrConnectWithoutSpecialiteInput = {
    where: MedecinWhereUniqueInput
    create: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput>
  }

  export type MedecinCreateManySpecialiteInputEnvelope = {
    data: MedecinCreateManySpecialiteInput | MedecinCreateManySpecialiteInput[]
    skipDuplicates?: boolean
  }

  export type HopitalCreateWithoutSpecialitesInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalCreateNestedManyWithoutHopitalInput
  }

  export type HopitalUncheckedCreateWithoutSpecialitesInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    utilisateurHopitals?: UtilisateurHopitalUncheckedCreateNestedManyWithoutHopitalInput
    rendevous?: RendezVousUncheckedCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalUncheckedCreateNestedManyWithoutHopitalInput
  }

  export type HopitalCreateOrConnectWithoutSpecialitesInput = {
    where: HopitalWhereUniqueInput
    create: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput>
  }

  export type MedecinUpsertWithWhereUniqueWithoutSpecialiteInput = {
    where: MedecinWhereUniqueInput
    update: XOR<MedecinUpdateWithoutSpecialiteInput, MedecinUncheckedUpdateWithoutSpecialiteInput>
    create: XOR<MedecinCreateWithoutSpecialiteInput, MedecinUncheckedCreateWithoutSpecialiteInput>
  }

  export type MedecinUpdateWithWhereUniqueWithoutSpecialiteInput = {
    where: MedecinWhereUniqueInput
    data: XOR<MedecinUpdateWithoutSpecialiteInput, MedecinUncheckedUpdateWithoutSpecialiteInput>
  }

  export type MedecinUpdateManyWithWhereWithoutSpecialiteInput = {
    where: MedecinScalarWhereInput
    data: XOR<MedecinUpdateManyMutationInput, MedecinUncheckedUpdateManyWithoutSpecialiteInput>
  }

  export type MedecinScalarWhereInput = {
    AND?: MedecinScalarWhereInput | MedecinScalarWhereInput[]
    OR?: MedecinScalarWhereInput[]
    NOT?: MedecinScalarWhereInput | MedecinScalarWhereInput[]
    id?: StringFilter<"Medecin"> | string
    specialiteId?: StringFilter<"Medecin"> | string
    numLicence?: StringFilter<"Medecin"> | string
    anneeExperience?: IntNullableFilter<"Medecin"> | number | null
    titre?: StringFilter<"Medecin"> | string
    userId?: StringFilter<"Medecin"> | string
    isDisponible?: BoolFilter<"Medecin"> | boolean
    statut?: EnumStatutApprovalFilter<"Medecin"> | $Enums.StatutApproval
  }

  export type HopitalUpsertWithWhereUniqueWithoutSpecialitesInput = {
    where: HopitalWhereUniqueInput
    update: XOR<HopitalUpdateWithoutSpecialitesInput, HopitalUncheckedUpdateWithoutSpecialitesInput>
    create: XOR<HopitalCreateWithoutSpecialitesInput, HopitalUncheckedCreateWithoutSpecialitesInput>
  }

  export type HopitalUpdateWithWhereUniqueWithoutSpecialitesInput = {
    where: HopitalWhereUniqueInput
    data: XOR<HopitalUpdateWithoutSpecialitesInput, HopitalUncheckedUpdateWithoutSpecialitesInput>
  }

  export type HopitalUpdateManyWithWhereWithoutSpecialitesInput = {
    where: HopitalScalarWhereInput
    data: XOR<HopitalUpdateManyMutationInput, HopitalUncheckedUpdateManyWithoutSpecialitesInput>
  }

  export type HopitalScalarWhereInput = {
    AND?: HopitalScalarWhereInput | HopitalScalarWhereInput[]
    OR?: HopitalScalarWhereInput[]
    NOT?: HopitalScalarWhereInput | HopitalScalarWhereInput[]
    id?: StringFilter<"Hopital"> | string
    nom?: StringFilter<"Hopital"> | string
    adresse?: StringFilter<"Hopital"> | string
    description?: StringNullableFilter<"Hopital"> | string | null
    contact?: StringFilter<"Hopital"> | string
    localisation?: StringNullableFilter<"Hopital"> | string | null
    slug?: StringNullableFilter<"Hopital"> | string | null
    fuseauHoraire?: StringFilter<"Hopital"> | string
  }

  export type MedecinCreateWithoutRecommandationsInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    specialite: SpecialiteCreateNestedOneWithoutMedecinsInput
    utilisateur: UtilisateurCreateNestedOneWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalCreateNestedManyWithoutMedecinInput
  }

  export type MedecinUncheckedCreateWithoutRecommandationsInput = {
    id?: string
    specialiteId: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    hopitaux?: MedecinHopitalUncheckedCreateNestedManyWithoutMedecinInput
  }

  export type MedecinCreateOrConnectWithoutRecommandationsInput = {
    where: MedecinWhereUniqueInput
    create: XOR<MedecinCreateWithoutRecommandationsInput, MedecinUncheckedCreateWithoutRecommandationsInput>
  }

  export type MedecinUpsertWithoutRecommandationsInput = {
    update: XOR<MedecinUpdateWithoutRecommandationsInput, MedecinUncheckedUpdateWithoutRecommandationsInput>
    create: XOR<MedecinCreateWithoutRecommandationsInput, MedecinUncheckedCreateWithoutRecommandationsInput>
    where?: MedecinWhereInput
  }

  export type MedecinUpdateToOneWithWhereWithoutRecommandationsInput = {
    where?: MedecinWhereInput
    data: XOR<MedecinUpdateWithoutRecommandationsInput, MedecinUncheckedUpdateWithoutRecommandationsInput>
  }

  export type MedecinUpdateWithoutRecommandationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    specialite?: SpecialiteUpdateOneRequiredWithoutMedecinsNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateWithoutRecommandationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialiteId?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type HopitalCreateWithoutUtilisateurHopitalsInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    rendevous?: RendezVousCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalUncheckedCreateWithoutUtilisateurHopitalsInput = {
    id?: string
    nom: string
    adresse: string
    description?: string | null
    contact: string
    localisation?: string | null
    slug?: string | null
    fuseauHoraire?: string
    rendevous?: RendezVousUncheckedCreateNestedManyWithoutHopitalInput
    medecin?: MedecinHopitalUncheckedCreateNestedManyWithoutHopitalInput
    specialites?: SpecialiteUncheckedCreateNestedManyWithoutHopitauxInput
  }

  export type HopitalCreateOrConnectWithoutUtilisateurHopitalsInput = {
    where: HopitalWhereUniqueInput
    create: XOR<HopitalCreateWithoutUtilisateurHopitalsInput, HopitalUncheckedCreateWithoutUtilisateurHopitalsInput>
  }

  export type UtilisateurCreateWithoutUtilisateurHopitalsInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinCreateNestedOneWithoutUtilisateurInput
    patient?: PatientCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutUtilisateurHopitalsInput = {
    id?: string
    nom: string
    prenom?: string | null
    email: string
    telephone?: string | null
    dateCreation?: Date | string
    status?: $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedCreateNestedOneWithoutUtilisateurInput
    medecin?: MedecinUncheckedCreateNestedOneWithoutUtilisateurInput
    patient?: PatientUncheckedCreateNestedOneWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutUtilisateurHopitalsInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedCreateWithoutUtilisateurHopitalsInput>
  }

  export type HopitalUpsertWithoutUtilisateurHopitalsInput = {
    update: XOR<HopitalUpdateWithoutUtilisateurHopitalsInput, HopitalUncheckedUpdateWithoutUtilisateurHopitalsInput>
    create: XOR<HopitalCreateWithoutUtilisateurHopitalsInput, HopitalUncheckedCreateWithoutUtilisateurHopitalsInput>
    where?: HopitalWhereInput
  }

  export type HopitalUpdateToOneWithWhereWithoutUtilisateurHopitalsInput = {
    where?: HopitalWhereInput
    data: XOR<HopitalUpdateWithoutUtilisateurHopitalsInput, HopitalUncheckedUpdateWithoutUtilisateurHopitalsInput>
  }

  export type HopitalUpdateWithoutUtilisateurHopitalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    rendevous?: RendezVousUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUpdateManyWithoutHopitauxNestedInput
  }

  export type HopitalUncheckedUpdateWithoutUtilisateurHopitalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    rendevous?: RendezVousUncheckedUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    specialites?: SpecialiteUncheckedUpdateManyWithoutHopitauxNestedInput
  }

  export type UtilisateurUpsertWithoutUtilisateurHopitalsInput = {
    update: XOR<UtilisateurUpdateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedUpdateWithoutUtilisateurHopitalsInput>
    create: XOR<UtilisateurCreateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedCreateWithoutUtilisateurHopitalsInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutUtilisateurHopitalsInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutUtilisateurHopitalsInput, UtilisateurUncheckedUpdateWithoutUtilisateurHopitalsInput>
  }

  export type UtilisateurUpdateWithoutUtilisateurHopitalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutUtilisateurHopitalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusUtilisateurFieldUpdateOperationsInput | $Enums.StatusUtilisateur
    administrateur?: AdministrateurUncheckedUpdateOneWithoutUtilisateurNestedInput
    medecin?: MedecinUncheckedUpdateOneWithoutUtilisateurNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type RendezVousCreateManyUtilisateurInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    medecinId: string
    patientId: string
  }

  export type UtilisateurHopitalCreateManyUtilisateurInput = {
    id?: string
    hopitalId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type RendezVousUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    medecin?: MedecinUpdateOneRequiredWithoutRendezVousNestedInput
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
    hopital?: HopitalUpdateOneRequiredWithoutRendevousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type UtilisateurHopitalUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hopital?: HopitalUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput
  }

  export type UtilisateurHopitalUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UtilisateurHopitalUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentCreateManyPatientInput = {
    id?: string
    titre: string
    description?: string | null
    dateCreation?: Date | string
    url: string
  }

  export type RendezVousCreateManyPatientInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    medecinId: string
  }

  export type DocumentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    medecin?: MedecinUpdateOneRequiredWithoutRendezVousNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutRendezVousNestedInput
    hopital?: HopitalUpdateOneRequiredWithoutRendevousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
  }

  export type RecommandationCreateManyMedecinInput = {
    id?: string
    contenu: string
    date?: Date | string
  }

  export type RendezVousCreateManyMedecinInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    hopitalId: string
    utilisateurId: string
    patientId: string
  }

  export type MedecinHopitalCreateManyMedecinInput = {
    id?: string
    hopitalId: string
  }

  export type RecommandationUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommandationUncheckedUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommandationUncheckedUpdateManyWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutRendezVousNestedInput
    hopital?: HopitalUpdateOneRequiredWithoutRendevousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousUncheckedUpdateManyWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    hopitalId?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    hopital?: HopitalUpdateOneRequiredWithoutMedecinNestedInput
  }

  export type MedecinHopitalUncheckedUpdateWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalUncheckedUpdateManyWithoutMedecinInput = {
    id?: StringFieldUpdateOperationsInput | string
    hopitalId?: StringFieldUpdateOperationsInput | string
  }

  export type UtilisateurHopitalCreateManyHopitalInput = {
    id?: string
    utilisateurId: string
    role: $Enums.Role
    dateDebut?: Date | string
    dateFin?: Date | string | null
  }

  export type RendezVousCreateManyHopitalInput = {
    id?: string
    date: Date | string
    duree?: number
    statut?: $Enums.StatutRendezVous
    motif?: string | null
    utilisateurId: string
    medecinId: string
    patientId: string
  }

  export type MedecinHopitalCreateManyHopitalInput = {
    id?: string
    medecinId: string
  }

  export type UtilisateurHopitalUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utilisateur?: UtilisateurUpdateOneRequiredWithoutUtilisateurHopitalsNestedInput
  }

  export type UtilisateurHopitalUncheckedUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UtilisateurHopitalUncheckedUpdateManyWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RendezVousUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    medecin?: MedecinUpdateOneRequiredWithoutRendezVousNestedInput
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type RendezVousUncheckedUpdateManyWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutRendezVousFieldUpdateOperationsInput | $Enums.StatutRendezVous
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    utilisateurId?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecin?: MedecinUpdateOneRequiredWithoutHopitauxNestedInput
  }

  export type MedecinHopitalUncheckedUpdateWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
  }

  export type MedecinHopitalUncheckedUpdateManyWithoutHopitalInput = {
    id?: StringFieldUpdateOperationsInput | string
    medecinId?: StringFieldUpdateOperationsInput | string
  }

  export type SpecialiteUpdateWithoutHopitauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    medecins?: MedecinUpdateManyWithoutSpecialiteNestedInput
  }

  export type SpecialiteUncheckedUpdateWithoutHopitauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    medecins?: MedecinUncheckedUpdateManyWithoutSpecialiteNestedInput
  }

  export type SpecialiteUncheckedUpdateManyWithoutHopitauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MedecinCreateManySpecialiteInput = {
    id?: string
    numLicence: string
    anneeExperience?: number | null
    titre: string
    userId: string
    isDisponible?: boolean
    statut?: $Enums.StatutApproval
  }

  export type MedecinUpdateWithoutSpecialiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    utilisateur?: UtilisateurUpdateOneRequiredWithoutMedecinNestedInput
    recommandations?: RecommandationUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateWithoutSpecialiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
    recommandations?: RecommandationUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    hopitaux?: MedecinHopitalUncheckedUpdateManyWithoutMedecinNestedInput
  }

  export type MedecinUncheckedUpdateManyWithoutSpecialiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numLicence?: StringFieldUpdateOperationsInput | string
    anneeExperience?: NullableIntFieldUpdateOperationsInput | number | null
    titre?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDisponible?: BoolFieldUpdateOperationsInput | boolean
    statut?: EnumStatutApprovalFieldUpdateOperationsInput | $Enums.StatutApproval
  }

  export type HopitalUpdateWithoutSpecialitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUpdateManyWithoutHopitalNestedInput
  }

  export type HopitalUncheckedUpdateWithoutSpecialitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
    utilisateurHopitals?: UtilisateurHopitalUncheckedUpdateManyWithoutHopitalNestedInput
    rendevous?: RendezVousUncheckedUpdateManyWithoutHopitalNestedInput
    medecin?: MedecinHopitalUncheckedUpdateManyWithoutHopitalNestedInput
  }

  export type HopitalUncheckedUpdateManyWithoutSpecialitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: StringFieldUpdateOperationsInput | string
    localisation?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    fuseauHoraire?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}