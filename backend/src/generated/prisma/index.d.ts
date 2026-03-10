
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserIdentity
 * 
 */
export type UserIdentity = $Result.DefaultSelection<Prisma.$UserIdentityPayload>
/**
 * Model Otp
 * 
 */
export type Otp = $Result.DefaultSelection<Prisma.$OtpPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model Email
 * 
 */
export type Email = $Result.DefaultSelection<Prisma.$EmailPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Deal
 * 
 */
export type Deal = $Result.DefaultSelection<Prisma.$DealPayload>
/**
 * Model LineItem
 * 
 */
export type LineItem = $Result.DefaultSelection<Prisma.$LineItemPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model EmailTemplate
 * 
 */
export type EmailTemplate = $Result.DefaultSelection<Prisma.$EmailTemplatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userIdentity`: Exposes CRUD operations for the **UserIdentity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserIdentities
    * const userIdentities = await prisma.userIdentity.findMany()
    * ```
    */
  get userIdentity(): Prisma.UserIdentityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otp`: Exposes CRUD operations for the **Otp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otps
    * const otps = await prisma.otp.findMany()
    * ```
    */
  get otp(): Prisma.OtpDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.email`: Exposes CRUD operations for the **Email** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emails
    * const emails = await prisma.email.findMany()
    * ```
    */
  get email(): Prisma.EmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deal`: Exposes CRUD operations for the **Deal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deals
    * const deals = await prisma.deal.findMany()
    * ```
    */
  get deal(): Prisma.DealDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lineItem`: Exposes CRUD operations for the **LineItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LineItems
    * const lineItems = await prisma.lineItem.findMany()
    * ```
    */
  get lineItem(): Prisma.LineItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailTemplate`: Exposes CRUD operations for the **EmailTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailTemplates
    * const emailTemplates = await prisma.emailTemplate.findMany()
    * ```
    */
  get emailTemplate(): Prisma.EmailTemplateDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    UserIdentity: 'UserIdentity',
    Otp: 'Otp',
    Contact: 'Contact',
    Email: 'Email',
    Company: 'Company',
    Deal: 'Deal',
    LineItem: 'LineItem',
    Activity: 'Activity',
    Task: 'Task',
    EmailTemplate: 'EmailTemplate'
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
      modelProps: "user" | "userIdentity" | "otp" | "contact" | "email" | "company" | "deal" | "lineItem" | "activity" | "task" | "emailTemplate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserIdentity: {
        payload: Prisma.$UserIdentityPayload<ExtArgs>
        fields: Prisma.UserIdentityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserIdentityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserIdentityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findFirst: {
            args: Prisma.UserIdentityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserIdentityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findMany: {
            args: Prisma.UserIdentityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          create: {
            args: Prisma.UserIdentityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          createMany: {
            args: Prisma.UserIdentityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserIdentityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          delete: {
            args: Prisma.UserIdentityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          update: {
            args: Prisma.UserIdentityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          deleteMany: {
            args: Prisma.UserIdentityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserIdentityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserIdentityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          upsert: {
            args: Prisma.UserIdentityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          aggregate: {
            args: Prisma.UserIdentityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserIdentity>
          }
          groupBy: {
            args: Prisma.UserIdentityGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserIdentityCountArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityCountAggregateOutputType> | number
          }
        }
      }
      Otp: {
        payload: Prisma.$OtpPayload<ExtArgs>
        fields: Prisma.OtpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findFirst: {
            args: Prisma.OtpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findMany: {
            args: Prisma.OtpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          create: {
            args: Prisma.OtpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          createMany: {
            args: Prisma.OtpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          delete: {
            args: Prisma.OtpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          update: {
            args: Prisma.OtpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          deleteMany: {
            args: Prisma.OtpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          upsert: {
            args: Prisma.OtpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          aggregate: {
            args: Prisma.OtpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtp>
          }
          groupBy: {
            args: Prisma.OtpGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Email: {
        payload: Prisma.$EmailPayload<ExtArgs>
        fields: Prisma.EmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findFirst: {
            args: Prisma.EmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findMany: {
            args: Prisma.EmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          create: {
            args: Prisma.EmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          createMany: {
            args: Prisma.EmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          delete: {
            args: Prisma.EmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          update: {
            args: Prisma.EmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          deleteMany: {
            args: Prisma.EmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          upsert: {
            args: Prisma.EmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          aggregate: {
            args: Prisma.EmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmail>
          }
          groupBy: {
            args: Prisma.EmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailCountArgs<ExtArgs>
            result: $Utils.Optional<EmailCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Deal: {
        payload: Prisma.$DealPayload<ExtArgs>
        fields: Prisma.DealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findFirst: {
            args: Prisma.DealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findMany: {
            args: Prisma.DealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          create: {
            args: Prisma.DealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          createMany: {
            args: Prisma.DealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          delete: {
            args: Prisma.DealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          update: {
            args: Prisma.DealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          deleteMany: {
            args: Prisma.DealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          upsert: {
            args: Prisma.DealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          aggregate: {
            args: Prisma.DealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeal>
          }
          groupBy: {
            args: Prisma.DealGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealCountArgs<ExtArgs>
            result: $Utils.Optional<DealCountAggregateOutputType> | number
          }
        }
      }
      LineItem: {
        payload: Prisma.$LineItemPayload<ExtArgs>
        fields: Prisma.LineItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LineItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LineItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          findFirst: {
            args: Prisma.LineItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LineItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          findMany: {
            args: Prisma.LineItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>[]
          }
          create: {
            args: Prisma.LineItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          createMany: {
            args: Prisma.LineItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LineItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>[]
          }
          delete: {
            args: Prisma.LineItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          update: {
            args: Prisma.LineItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          deleteMany: {
            args: Prisma.LineItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LineItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LineItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>[]
          }
          upsert: {
            args: Prisma.LineItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineItemPayload>
          }
          aggregate: {
            args: Prisma.LineItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLineItem>
          }
          groupBy: {
            args: Prisma.LineItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<LineItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.LineItemCountArgs<ExtArgs>
            result: $Utils.Optional<LineItemCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      EmailTemplate: {
        payload: Prisma.$EmailTemplatePayload<ExtArgs>
        fields: Prisma.EmailTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          findFirst: {
            args: Prisma.EmailTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          findMany: {
            args: Prisma.EmailTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>[]
          }
          create: {
            args: Prisma.EmailTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          createMany: {
            args: Prisma.EmailTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>[]
          }
          delete: {
            args: Prisma.EmailTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          update: {
            args: Prisma.EmailTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          deleteMany: {
            args: Prisma.EmailTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>[]
          }
          upsert: {
            args: Prisma.EmailTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          aggregate: {
            args: Prisma.EmailTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailTemplate>
          }
          groupBy: {
            args: Prisma.EmailTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<EmailTemplateCountAggregateOutputType> | number
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
    user?: UserOmit
    userIdentity?: UserIdentityOmit
    otp?: OtpOmit
    contact?: ContactOmit
    email?: EmailOmit
    company?: CompanyOmit
    deal?: DealOmit
    lineItem?: LineItemOmit
    activity?: ActivityOmit
    task?: TaskOmit
    emailTemplate?: EmailTemplateOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    identities: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | UserCountOutputTypeCountIdentitiesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
  }


  /**
   * Count Type ContactCountOutputType
   */

  export type ContactCountOutputType = {
    activities: number
    tasks: number
    deals: number
    emails: number
  }

  export type ContactCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | ContactCountOutputTypeCountActivitiesArgs
    tasks?: boolean | ContactCountOutputTypeCountTasksArgs
    deals?: boolean | ContactCountOutputTypeCountDealsArgs
    emails?: boolean | ContactCountOutputTypeCountEmailsArgs
  }

  // Custom InputTypes
  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactCountOutputType
     */
    select?: ContactCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    contacts: number
    deals: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | CompanyCountOutputTypeCountContactsArgs
    deals?: boolean | CompanyCountOutputTypeCountDealsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }


  /**
   * Count Type DealCountOutputType
   */

  export type DealCountOutputType = {
    lineItems: number
    activities: number
    tasks: number
    emails: number
  }

  export type DealCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItems?: boolean | DealCountOutputTypeCountLineItemsArgs
    activities?: boolean | DealCountOutputTypeCountActivitiesArgs
    tasks?: boolean | DealCountOutputTypeCountTasksArgs
    emails?: boolean | DealCountOutputTypeCountEmailsArgs
  }

  // Custom InputTypes
  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealCountOutputType
     */
    select?: DealCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeCountLineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineItemWhereInput
  }

  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    isDeleted: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    isDeleted: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    isDeleted: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    isDeleted: boolean | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    identities?: boolean | User$identitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "isDeleted", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | User$identitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      identities: Prisma.$UserIdentityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    identities<T extends User$identitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$identitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.identities
   */
  export type User$identitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    cursor?: UserIdentityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserIdentity
   */

  export type AggregateUserIdentity = {
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  export type UserIdentityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type UserIdentityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type UserIdentityCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerId: number
    metadata: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type UserIdentityMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type UserIdentityMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type UserIdentityCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type UserIdentityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentity to aggregate.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserIdentities
    **/
    _count?: true | UserIdentityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserIdentityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserIdentityMaxAggregateInputType
  }

  export type GetUserIdentityAggregateType<T extends UserIdentityAggregateArgs> = {
        [P in keyof T & keyof AggregateUserIdentity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserIdentity[P]>
      : GetScalarType<T[P], AggregateUserIdentity[P]>
  }




  export type UserIdentityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithAggregationInput | UserIdentityOrderByWithAggregationInput[]
    by: UserIdentityScalarFieldEnum[] | UserIdentityScalarFieldEnum
    having?: UserIdentityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserIdentityCountAggregateInputType | true
    _min?: UserIdentityMinAggregateInputType
    _max?: UserIdentityMaxAggregateInputType
  }

  export type UserIdentityGroupByOutputType = {
    id: string
    userId: string
    provider: string
    providerId: string
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean | null
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  type GetUserIdentityGroupByPayload<T extends UserIdentityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserIdentityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserIdentityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
            : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
        }
      >
    >


  export type UserIdentitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type UserIdentityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerId" | "metadata" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["userIdentity"]>
  export type UserIdentityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserIdentityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserIdentityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserIdentityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserIdentity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      providerId: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["userIdentity"]>
    composites: {}
  }

  type UserIdentityGetPayload<S extends boolean | null | undefined | UserIdentityDefaultArgs> = $Result.GetResult<Prisma.$UserIdentityPayload, S>

  type UserIdentityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserIdentityCountAggregateInputType | true
    }

  export interface UserIdentityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserIdentity'], meta: { name: 'UserIdentity' } }
    /**
     * Find zero or one UserIdentity that matches the filter.
     * @param {UserIdentityFindUniqueArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserIdentityFindUniqueArgs>(args: SelectSubset<T, UserIdentityFindUniqueArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserIdentity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserIdentityFindUniqueOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserIdentityFindUniqueOrThrowArgs>(args: SelectSubset<T, UserIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserIdentity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserIdentityFindFirstArgs>(args?: SelectSubset<T, UserIdentityFindFirstArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserIdentity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserIdentityFindFirstOrThrowArgs>(args?: SelectSubset<T, UserIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserIdentities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany()
     * 
     * // Get first 10 UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserIdentityFindManyArgs>(args?: SelectSubset<T, UserIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserIdentity.
     * @param {UserIdentityCreateArgs} args - Arguments to create a UserIdentity.
     * @example
     * // Create one UserIdentity
     * const UserIdentity = await prisma.userIdentity.create({
     *   data: {
     *     // ... data to create a UserIdentity
     *   }
     * })
     * 
     */
    create<T extends UserIdentityCreateArgs>(args: SelectSubset<T, UserIdentityCreateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserIdentities.
     * @param {UserIdentityCreateManyArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserIdentityCreateManyArgs>(args?: SelectSubset<T, UserIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserIdentities and returns the data saved in the database.
     * @param {UserIdentityCreateManyAndReturnArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserIdentities and only return the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserIdentityCreateManyAndReturnArgs>(args?: SelectSubset<T, UserIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserIdentity.
     * @param {UserIdentityDeleteArgs} args - Arguments to delete one UserIdentity.
     * @example
     * // Delete one UserIdentity
     * const UserIdentity = await prisma.userIdentity.delete({
     *   where: {
     *     // ... filter to delete one UserIdentity
     *   }
     * })
     * 
     */
    delete<T extends UserIdentityDeleteArgs>(args: SelectSubset<T, UserIdentityDeleteArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserIdentity.
     * @param {UserIdentityUpdateArgs} args - Arguments to update one UserIdentity.
     * @example
     * // Update one UserIdentity
     * const userIdentity = await prisma.userIdentity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserIdentityUpdateArgs>(args: SelectSubset<T, UserIdentityUpdateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserIdentities.
     * @param {UserIdentityDeleteManyArgs} args - Arguments to filter UserIdentities to delete.
     * @example
     * // Delete a few UserIdentities
     * const { count } = await prisma.userIdentity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserIdentityDeleteManyArgs>(args?: SelectSubset<T, UserIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserIdentities
     * const userIdentity = await prisma.userIdentity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserIdentityUpdateManyArgs>(args: SelectSubset<T, UserIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserIdentities and returns the data updated in the database.
     * @param {UserIdentityUpdateManyAndReturnArgs} args - Arguments to update many UserIdentities.
     * @example
     * // Update many UserIdentities
     * const userIdentity = await prisma.userIdentity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserIdentities and only return the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserIdentityUpdateManyAndReturnArgs>(args: SelectSubset<T, UserIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserIdentity.
     * @param {UserIdentityUpsertArgs} args - Arguments to update or create a UserIdentity.
     * @example
     * // Update or create a UserIdentity
     * const userIdentity = await prisma.userIdentity.upsert({
     *   create: {
     *     // ... data to create a UserIdentity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserIdentity we want to update
     *   }
     * })
     */
    upsert<T extends UserIdentityUpsertArgs>(args: SelectSubset<T, UserIdentityUpsertArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityCountArgs} args - Arguments to filter UserIdentities to count.
     * @example
     * // Count the number of UserIdentities
     * const count = await prisma.userIdentity.count({
     *   where: {
     *     // ... the filter for the UserIdentities we want to count
     *   }
     * })
    **/
    count<T extends UserIdentityCountArgs>(
      args?: Subset<T, UserIdentityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserIdentityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserIdentityAggregateArgs>(args: Subset<T, UserIdentityAggregateArgs>): Prisma.PrismaPromise<GetUserIdentityAggregateType<T>>

    /**
     * Group by UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityGroupByArgs} args - Group by arguments.
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
      T extends UserIdentityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserIdentityGroupByArgs['orderBy'] }
        : { orderBy?: UserIdentityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserIdentity model
   */
  readonly fields: UserIdentityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserIdentity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserIdentityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserIdentity model
   */
  interface UserIdentityFieldRefs {
    readonly id: FieldRef<"UserIdentity", 'String'>
    readonly userId: FieldRef<"UserIdentity", 'String'>
    readonly provider: FieldRef<"UserIdentity", 'String'>
    readonly providerId: FieldRef<"UserIdentity", 'String'>
    readonly metadata: FieldRef<"UserIdentity", 'Json'>
    readonly createdAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly updatedAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly isDeleted: FieldRef<"UserIdentity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserIdentity findUnique
   */
  export type UserIdentityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findUniqueOrThrow
   */
  export type UserIdentityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findFirst
   */
  export type UserIdentityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findFirstOrThrow
   */
  export type UserIdentityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findMany
   */
  export type UserIdentityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentities to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity create
   */
  export type UserIdentityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to create a UserIdentity.
     */
    data: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
  }

  /**
   * UserIdentity createMany
   */
  export type UserIdentityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserIdentity createManyAndReturn
   */
  export type UserIdentityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserIdentity update
   */
  export type UserIdentityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to update a UserIdentity.
     */
    data: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
    /**
     * Choose, which UserIdentity to update.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity updateMany
   */
  export type UserIdentityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserIdentities.
     */
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyInput>
    /**
     * Filter which UserIdentities to update
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to update.
     */
    limit?: number
  }

  /**
   * UserIdentity updateManyAndReturn
   */
  export type UserIdentityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * The data used to update UserIdentities.
     */
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyInput>
    /**
     * Filter which UserIdentities to update
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserIdentity upsert
   */
  export type UserIdentityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The filter to search for the UserIdentity to update in case it exists.
     */
    where: UserIdentityWhereUniqueInput
    /**
     * In case the UserIdentity found by the `where` argument doesn't exist, create a new UserIdentity with this data.
     */
    create: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
    /**
     * In case the UserIdentity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
  }

  /**
   * UserIdentity delete
   */
  export type UserIdentityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter which UserIdentity to delete.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity deleteMany
   */
  export type UserIdentityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentities to delete
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to delete.
     */
    limit?: number
  }

  /**
   * UserIdentity without action
   */
  export type UserIdentityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
  }


  /**
   * Model Otp
   */

  export type AggregateOtp = {
    _count: OtpCountAggregateOutputType | null
    _avg: OtpAvgAggregateOutputType | null
    _sum: OtpSumAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  export type OtpAvgAggregateOutputType = {
    attempts: number | null
  }

  export type OtpSumAggregateOutputType = {
    attempts: number | null
  }

  export type OtpMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    type: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    verified: boolean | null
    purpose: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type OtpMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    type: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    verified: boolean | null
    purpose: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type OtpCountAggregateOutputType = {
    id: number
    identifier: number
    type: number
    otp: number
    expiresAt: number
    attempts: number
    verified: number
    purpose: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type OtpAvgAggregateInputType = {
    attempts?: true
  }

  export type OtpSumAggregateInputType = {
    attempts?: true
  }

  export type OtpMinAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type OtpMaxAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type OtpCountAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type OtpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otp to aggregate.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Otps
    **/
    _count?: true | OtpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpMaxAggregateInputType
  }

  export type GetOtpAggregateType<T extends OtpAggregateArgs> = {
        [P in keyof T & keyof AggregateOtp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtp[P]>
      : GetScalarType<T[P], AggregateOtp[P]>
  }




  export type OtpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpWhereInput
    orderBy?: OtpOrderByWithAggregationInput | OtpOrderByWithAggregationInput[]
    by: OtpScalarFieldEnum[] | OtpScalarFieldEnum
    having?: OtpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCountAggregateInputType | true
    _avg?: OtpAvgAggregateInputType
    _sum?: OtpSumAggregateInputType
    _min?: OtpMinAggregateInputType
    _max?: OtpMaxAggregateInputType
  }

  export type OtpGroupByOutputType = {
    id: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date
    attempts: number
    verified: boolean
    purpose: string | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean | null
    _count: OtpCountAggregateOutputType | null
    _avg: OtpAvgAggregateOutputType | null
    _sum: OtpSumAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  type GetOtpGroupByPayload<T extends OtpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpGroupByOutputType[P]>
            : GetScalarType<T[P], OtpGroupByOutputType[P]>
        }
      >
    >


  export type OtpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectScalar = {
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type OtpOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "type" | "otp" | "expiresAt" | "attempts" | "verified" | "purpose" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["otp"]>

  export type $OtpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Otp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      type: string
      otp: string
      expiresAt: Date
      attempts: number
      verified: boolean
      purpose: string | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["otp"]>
    composites: {}
  }

  type OtpGetPayload<S extends boolean | null | undefined | OtpDefaultArgs> = $Result.GetResult<Prisma.$OtpPayload, S>

  type OtpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCountAggregateInputType | true
    }

  export interface OtpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Otp'], meta: { name: 'Otp' } }
    /**
     * Find zero or one Otp that matches the filter.
     * @param {OtpFindUniqueArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpFindUniqueArgs>(args: SelectSubset<T, OtpFindUniqueArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpFindUniqueOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpFindFirstArgs>(args?: SelectSubset<T, OtpFindFirstArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otps
     * const otps = await prisma.otp.findMany()
     * 
     * // Get first 10 Otps
     * const otps = await prisma.otp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpWithIdOnly = await prisma.otp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpFindManyArgs>(args?: SelectSubset<T, OtpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otp.
     * @param {OtpCreateArgs} args - Arguments to create a Otp.
     * @example
     * // Create one Otp
     * const Otp = await prisma.otp.create({
     *   data: {
     *     // ... data to create a Otp
     *   }
     * })
     * 
     */
    create<T extends OtpCreateArgs>(args: SelectSubset<T, OtpCreateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otps.
     * @param {OtpCreateManyArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCreateManyArgs>(args?: SelectSubset<T, OtpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Otps and returns the data saved in the database.
     * @param {OtpCreateManyAndReturnArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Otp.
     * @param {OtpDeleteArgs} args - Arguments to delete one Otp.
     * @example
     * // Delete one Otp
     * const Otp = await prisma.otp.delete({
     *   where: {
     *     // ... filter to delete one Otp
     *   }
     * })
     * 
     */
    delete<T extends OtpDeleteArgs>(args: SelectSubset<T, OtpDeleteArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otp.
     * @param {OtpUpdateArgs} args - Arguments to update one Otp.
     * @example
     * // Update one Otp
     * const otp = await prisma.otp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpUpdateArgs>(args: SelectSubset<T, OtpUpdateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otps.
     * @param {OtpDeleteManyArgs} args - Arguments to filter Otps to delete.
     * @example
     * // Delete a few Otps
     * const { count } = await prisma.otp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpDeleteManyArgs>(args?: SelectSubset<T, OtpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpUpdateManyArgs>(args: SelectSubset<T, OtpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps and returns the data updated in the database.
     * @param {OtpUpdateManyAndReturnArgs} args - Arguments to update many Otps.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.updateManyAndReturn({
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
    updateManyAndReturn<T extends OtpUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Otp.
     * @param {OtpUpsertArgs} args - Arguments to update or create a Otp.
     * @example
     * // Update or create a Otp
     * const otp = await prisma.otp.upsert({
     *   create: {
     *     // ... data to create a Otp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otp we want to update
     *   }
     * })
     */
    upsert<T extends OtpUpsertArgs>(args: SelectSubset<T, OtpUpsertArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCountArgs} args - Arguments to filter Otps to count.
     * @example
     * // Count the number of Otps
     * const count = await prisma.otp.count({
     *   where: {
     *     // ... the filter for the Otps we want to count
     *   }
     * })
    **/
    count<T extends OtpCountArgs>(
      args?: Subset<T, OtpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtpAggregateArgs>(args: Subset<T, OtpAggregateArgs>): Prisma.PrismaPromise<GetOtpAggregateType<T>>

    /**
     * Group by Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpGroupByArgs} args - Group by arguments.
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
      T extends OtpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpGroupByArgs['orderBy'] }
        : { orderBy?: OtpGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OtpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Otp model
   */
  readonly fields: OtpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Otp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Otp model
   */
  interface OtpFieldRefs {
    readonly id: FieldRef<"Otp", 'String'>
    readonly identifier: FieldRef<"Otp", 'String'>
    readonly type: FieldRef<"Otp", 'String'>
    readonly otp: FieldRef<"Otp", 'String'>
    readonly expiresAt: FieldRef<"Otp", 'DateTime'>
    readonly attempts: FieldRef<"Otp", 'Int'>
    readonly verified: FieldRef<"Otp", 'Boolean'>
    readonly purpose: FieldRef<"Otp", 'String'>
    readonly createdAt: FieldRef<"Otp", 'DateTime'>
    readonly updatedAt: FieldRef<"Otp", 'DateTime'>
    readonly isDeleted: FieldRef<"Otp", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Otp findUnique
   */
  export type OtpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findUniqueOrThrow
   */
  export type OtpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findFirst
   */
  export type OtpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findFirstOrThrow
   */
  export type OtpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findMany
   */
  export type OtpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otps to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp create
   */
  export type OtpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to create a Otp.
     */
    data: XOR<OtpCreateInput, OtpUncheckedCreateInput>
  }

  /**
   * Otp createMany
   */
  export type OtpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp createManyAndReturn
   */
  export type OtpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp update
   */
  export type OtpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to update a Otp.
     */
    data: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
    /**
     * Choose, which Otp to update.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp updateMany
   */
  export type OtpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp updateManyAndReturn
   */
  export type OtpUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp upsert
   */
  export type OtpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The filter to search for the Otp to update in case it exists.
     */
    where: OtpWhereUniqueInput
    /**
     * In case the Otp found by the `where` argument doesn't exist, create a new Otp with this data.
     */
    create: XOR<OtpCreateInput, OtpUncheckedCreateInput>
    /**
     * In case the Otp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
  }

  /**
   * Otp delete
   */
  export type OtpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter which Otp to delete.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp deleteMany
   */
  export type OtpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otps to delete
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to delete.
     */
    limit?: number
  }

  /**
   * Otp without action
   */
  export type OtpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    leadScore: number | null
  }

  export type ContactSumAggregateOutputType = {
    id: number | null
    companyId: number | null
    leadScore: number | null
  }

  export type ContactMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    jobTitle: string | null
    companyId: number | null
    leadSource: string | null
    leadStatus: string | null
    leadScore: number | null
    address: string | null
    linkedinUrl: string | null
    twitterUrl: string | null
    website: string | null
    notes: string | null
    lastContacted: Date | null
    owner: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ContactMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    jobTitle: string | null
    companyId: number | null
    leadSource: string | null
    leadStatus: string | null
    leadScore: number | null
    address: string | null
    linkedinUrl: string | null
    twitterUrl: string | null
    website: string | null
    notes: string | null
    lastContacted: Date | null
    owner: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phone: number
    jobTitle: number
    companyId: number
    leadSource: number
    leadStatus: number
    leadScore: number
    tags: number
    address: number
    linkedinUrl: number
    twitterUrl: number
    website: number
    notes: number
    lastContacted: number
    owner: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type ContactAvgAggregateInputType = {
    id?: true
    companyId?: true
    leadScore?: true
  }

  export type ContactSumAggregateInputType = {
    id?: true
    companyId?: true
    leadScore?: true
  }

  export type ContactMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    jobTitle?: true
    companyId?: true
    leadSource?: true
    leadStatus?: true
    leadScore?: true
    address?: true
    linkedinUrl?: true
    twitterUrl?: true
    website?: true
    notes?: true
    lastContacted?: true
    owner?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    jobTitle?: true
    companyId?: true
    leadSource?: true
    leadStatus?: true
    leadScore?: true
    address?: true
    linkedinUrl?: true
    twitterUrl?: true
    website?: true
    notes?: true
    lastContacted?: true
    owner?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    jobTitle?: true
    companyId?: true
    leadSource?: true
    leadStatus?: true
    leadScore?: true
    tags?: true
    address?: true
    linkedinUrl?: true
    twitterUrl?: true
    website?: true
    notes?: true
    lastContacted?: true
    owner?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _avg?: ContactAvgAggregateInputType
    _sum?: ContactSumAggregateInputType
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string | null
    jobTitle: string | null
    companyId: number | null
    leadSource: string | null
    leadStatus: string | null
    leadScore: number
    tags: string[]
    address: string | null
    linkedinUrl: string | null
    twitterUrl: string | null
    website: string | null
    notes: string | null
    lastContacted: Date | null
    owner: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    jobTitle?: boolean
    companyId?: boolean
    leadSource?: boolean
    leadStatus?: boolean
    leadScore?: boolean
    tags?: boolean
    address?: boolean
    linkedinUrl?: boolean
    twitterUrl?: boolean
    website?: boolean
    notes?: boolean
    lastContacted?: boolean
    owner?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    company?: boolean | Contact$companyArgs<ExtArgs>
    activities?: boolean | Contact$activitiesArgs<ExtArgs>
    tasks?: boolean | Contact$tasksArgs<ExtArgs>
    deals?: boolean | Contact$dealsArgs<ExtArgs>
    emails?: boolean | Contact$emailsArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    jobTitle?: boolean
    companyId?: boolean
    leadSource?: boolean
    leadStatus?: boolean
    leadScore?: boolean
    tags?: boolean
    address?: boolean
    linkedinUrl?: boolean
    twitterUrl?: boolean
    website?: boolean
    notes?: boolean
    lastContacted?: boolean
    owner?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    company?: boolean | Contact$companyArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    jobTitle?: boolean
    companyId?: boolean
    leadSource?: boolean
    leadStatus?: boolean
    leadScore?: boolean
    tags?: boolean
    address?: boolean
    linkedinUrl?: boolean
    twitterUrl?: boolean
    website?: boolean
    notes?: boolean
    lastContacted?: boolean
    owner?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    company?: boolean | Contact$companyArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    jobTitle?: boolean
    companyId?: boolean
    leadSource?: boolean
    leadStatus?: boolean
    leadScore?: boolean
    tags?: boolean
    address?: boolean
    linkedinUrl?: boolean
    twitterUrl?: boolean
    website?: boolean
    notes?: boolean
    lastContacted?: boolean
    owner?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phone" | "jobTitle" | "companyId" | "leadSource" | "leadStatus" | "leadScore" | "tags" | "address" | "linkedinUrl" | "twitterUrl" | "website" | "notes" | "lastContacted" | "owner" | "avatarUrl" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | Contact$companyArgs<ExtArgs>
    activities?: boolean | Contact$activitiesArgs<ExtArgs>
    tasks?: boolean | Contact$tasksArgs<ExtArgs>
    deals?: boolean | Contact$dealsArgs<ExtArgs>
    emails?: boolean | Contact$emailsArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | Contact$companyArgs<ExtArgs>
  }
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | Contact$companyArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      deals: Prisma.$DealPayload<ExtArgs>[]
      emails: Prisma.$EmailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      email: string
      phone: string | null
      jobTitle: string | null
      companyId: number | null
      leadSource: string | null
      leadStatus: string | null
      leadScore: number
      tags: string[]
      address: string | null
      linkedinUrl: string | null
      twitterUrl: string | null
      website: string | null
      notes: string | null
      lastContacted: Date | null
      owner: string
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
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
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends Contact$companyArgs<ExtArgs> = {}>(args?: Subset<T, Contact$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activities<T extends Contact$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Contact$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Contact$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Contact$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deals<T extends Contact$dealsArgs<ExtArgs> = {}>(args?: Subset<T, Contact$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emails<T extends Contact$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Contact$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'Int'>
    readonly firstName: FieldRef<"Contact", 'String'>
    readonly lastName: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly phone: FieldRef<"Contact", 'String'>
    readonly jobTitle: FieldRef<"Contact", 'String'>
    readonly companyId: FieldRef<"Contact", 'Int'>
    readonly leadSource: FieldRef<"Contact", 'String'>
    readonly leadStatus: FieldRef<"Contact", 'String'>
    readonly leadScore: FieldRef<"Contact", 'Int'>
    readonly tags: FieldRef<"Contact", 'String[]'>
    readonly address: FieldRef<"Contact", 'String'>
    readonly linkedinUrl: FieldRef<"Contact", 'String'>
    readonly twitterUrl: FieldRef<"Contact", 'String'>
    readonly website: FieldRef<"Contact", 'String'>
    readonly notes: FieldRef<"Contact", 'String'>
    readonly lastContacted: FieldRef<"Contact", 'DateTime'>
    readonly owner: FieldRef<"Contact", 'String'>
    readonly avatarUrl: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
    readonly isDeleted: FieldRef<"Contact", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact.company
   */
  export type Contact$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * Contact.activities
   */
  export type Contact$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Contact.tasks
   */
  export type Contact$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Contact.deals
   */
  export type Contact$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Contact.emails
   */
  export type Contact$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model Email
   */

  export type AggregateEmail = {
    _count: EmailCountAggregateOutputType | null
    _avg: EmailAvgAggregateOutputType | null
    _sum: EmailSumAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  export type EmailAvgAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
    sentimentScore: number | null
  }

  export type EmailSumAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
    sentimentScore: number | null
  }

  export type EmailMinAggregateOutputType = {
    id: number | null
    sender: string | null
    senderName: string | null
    senderAvatar: string | null
    subject: string | null
    content: string | null
    timestamp: Date | null
    isRead: boolean | null
    isStarred: boolean | null
    isAIFlagged: boolean | null
    folder: string | null
    contactId: number | null
    dealId: number | null
    summary: string | null
    sentiment: string | null
    sentimentScore: number | null
    intent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type EmailMaxAggregateOutputType = {
    id: number | null
    sender: string | null
    senderName: string | null
    senderAvatar: string | null
    subject: string | null
    content: string | null
    timestamp: Date | null
    isRead: boolean | null
    isStarred: boolean | null
    isAIFlagged: boolean | null
    folder: string | null
    contactId: number | null
    dealId: number | null
    summary: string | null
    sentiment: string | null
    sentimentScore: number | null
    intent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type EmailCountAggregateOutputType = {
    id: number
    sender: number
    senderName: number
    senderAvatar: number
    subject: number
    content: number
    timestamp: number
    isRead: number
    isStarred: number
    isAIFlagged: number
    folder: number
    contactId: number
    dealId: number
    summary: number
    sentiment: number
    sentimentScore: number
    attachments: number
    keyPoints: number
    intent: number
    suggestedActions: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type EmailAvgAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
    sentimentScore?: true
  }

  export type EmailSumAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
    sentimentScore?: true
  }

  export type EmailMinAggregateInputType = {
    id?: true
    sender?: true
    senderName?: true
    senderAvatar?: true
    subject?: true
    content?: true
    timestamp?: true
    isRead?: true
    isStarred?: true
    isAIFlagged?: true
    folder?: true
    contactId?: true
    dealId?: true
    summary?: true
    sentiment?: true
    sentimentScore?: true
    intent?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type EmailMaxAggregateInputType = {
    id?: true
    sender?: true
    senderName?: true
    senderAvatar?: true
    subject?: true
    content?: true
    timestamp?: true
    isRead?: true
    isStarred?: true
    isAIFlagged?: true
    folder?: true
    contactId?: true
    dealId?: true
    summary?: true
    sentiment?: true
    sentimentScore?: true
    intent?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type EmailCountAggregateInputType = {
    id?: true
    sender?: true
    senderName?: true
    senderAvatar?: true
    subject?: true
    content?: true
    timestamp?: true
    isRead?: true
    isStarred?: true
    isAIFlagged?: true
    folder?: true
    contactId?: true
    dealId?: true
    summary?: true
    sentiment?: true
    sentimentScore?: true
    attachments?: true
    keyPoints?: true
    intent?: true
    suggestedActions?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type EmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Email to aggregate.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emails
    **/
    _count?: true | EmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailMaxAggregateInputType
  }

  export type GetEmailAggregateType<T extends EmailAggregateArgs> = {
        [P in keyof T & keyof AggregateEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmail[P]>
      : GetScalarType<T[P], AggregateEmail[P]>
  }




  export type EmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithAggregationInput | EmailOrderByWithAggregationInput[]
    by: EmailScalarFieldEnum[] | EmailScalarFieldEnum
    having?: EmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailCountAggregateInputType | true
    _avg?: EmailAvgAggregateInputType
    _sum?: EmailSumAggregateInputType
    _min?: EmailMinAggregateInputType
    _max?: EmailMaxAggregateInputType
  }

  export type EmailGroupByOutputType = {
    id: number
    sender: string
    senderName: string | null
    senderAvatar: string | null
    subject: string
    content: string
    timestamp: Date
    isRead: boolean
    isStarred: boolean
    isAIFlagged: boolean
    folder: string
    contactId: number | null
    dealId: number | null
    summary: string | null
    sentiment: string | null
    sentimentScore: number | null
    attachments: JsonValue | null
    keyPoints: string[]
    intent: string | null
    suggestedActions: string[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: EmailCountAggregateOutputType | null
    _avg: EmailAvgAggregateOutputType | null
    _sum: EmailSumAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  type GetEmailGroupByPayload<T extends EmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailGroupByOutputType[P]>
            : GetScalarType<T[P], EmailGroupByOutputType[P]>
        }
      >
    >


  export type EmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    senderName?: boolean
    senderAvatar?: boolean
    subject?: boolean
    content?: boolean
    timestamp?: boolean
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: boolean
    contactId?: boolean
    dealId?: boolean
    summary?: boolean
    sentiment?: boolean
    sentimentScore?: boolean
    attachments?: boolean
    keyPoints?: boolean
    intent?: boolean
    suggestedActions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    senderName?: boolean
    senderAvatar?: boolean
    subject?: boolean
    content?: boolean
    timestamp?: boolean
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: boolean
    contactId?: boolean
    dealId?: boolean
    summary?: boolean
    sentiment?: boolean
    sentimentScore?: boolean
    attachments?: boolean
    keyPoints?: boolean
    intent?: boolean
    suggestedActions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    senderName?: boolean
    senderAvatar?: boolean
    subject?: boolean
    content?: boolean
    timestamp?: boolean
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: boolean
    contactId?: boolean
    dealId?: boolean
    summary?: boolean
    sentiment?: boolean
    sentimentScore?: boolean
    attachments?: boolean
    keyPoints?: boolean
    intent?: boolean
    suggestedActions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectScalar = {
    id?: boolean
    sender?: boolean
    senderName?: boolean
    senderAvatar?: boolean
    subject?: boolean
    content?: boolean
    timestamp?: boolean
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: boolean
    contactId?: boolean
    dealId?: boolean
    summary?: boolean
    sentiment?: boolean
    sentimentScore?: boolean
    attachments?: boolean
    keyPoints?: boolean
    intent?: boolean
    suggestedActions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type EmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sender" | "senderName" | "senderAvatar" | "subject" | "content" | "timestamp" | "isRead" | "isStarred" | "isAIFlagged" | "folder" | "contactId" | "dealId" | "summary" | "sentiment" | "sentimentScore" | "attachments" | "keyPoints" | "intent" | "suggestedActions" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["email"]>
  export type EmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }
  export type EmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }
  export type EmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Email$contactArgs<ExtArgs>
    deal?: boolean | Email$dealArgs<ExtArgs>
  }

  export type $EmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Email"
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs> | null
      deal: Prisma.$DealPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sender: string
      senderName: string | null
      senderAvatar: string | null
      subject: string
      content: string
      timestamp: Date
      isRead: boolean
      isStarred: boolean
      isAIFlagged: boolean
      folder: string
      contactId: number | null
      dealId: number | null
      summary: string | null
      sentiment: string | null
      sentimentScore: number | null
      attachments: Prisma.JsonValue | null
      keyPoints: string[]
      intent: string | null
      suggestedActions: string[]
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["email"]>
    composites: {}
  }

  type EmailGetPayload<S extends boolean | null | undefined | EmailDefaultArgs> = $Result.GetResult<Prisma.$EmailPayload, S>

  type EmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailCountAggregateInputType | true
    }

  export interface EmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Email'], meta: { name: 'Email' } }
    /**
     * Find zero or one Email that matches the filter.
     * @param {EmailFindUniqueArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailFindUniqueArgs>(args: SelectSubset<T, EmailFindUniqueArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Email that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailFindUniqueOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailFindFirstArgs>(args?: SelectSubset<T, EmailFindFirstArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emails
     * const emails = await prisma.email.findMany()
     * 
     * // Get first 10 Emails
     * const emails = await prisma.email.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailWithIdOnly = await prisma.email.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailFindManyArgs>(args?: SelectSubset<T, EmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Email.
     * @param {EmailCreateArgs} args - Arguments to create a Email.
     * @example
     * // Create one Email
     * const Email = await prisma.email.create({
     *   data: {
     *     // ... data to create a Email
     *   }
     * })
     * 
     */
    create<T extends EmailCreateArgs>(args: SelectSubset<T, EmailCreateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emails.
     * @param {EmailCreateManyArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailCreateManyArgs>(args?: SelectSubset<T, EmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Emails and returns the data saved in the database.
     * @param {EmailCreateManyAndReturnArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Email.
     * @param {EmailDeleteArgs} args - Arguments to delete one Email.
     * @example
     * // Delete one Email
     * const Email = await prisma.email.delete({
     *   where: {
     *     // ... filter to delete one Email
     *   }
     * })
     * 
     */
    delete<T extends EmailDeleteArgs>(args: SelectSubset<T, EmailDeleteArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Email.
     * @param {EmailUpdateArgs} args - Arguments to update one Email.
     * @example
     * // Update one Email
     * const email = await prisma.email.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailUpdateArgs>(args: SelectSubset<T, EmailUpdateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emails.
     * @param {EmailDeleteManyArgs} args - Arguments to filter Emails to delete.
     * @example
     * // Delete a few Emails
     * const { count } = await prisma.email.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailDeleteManyArgs>(args?: SelectSubset<T, EmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailUpdateManyArgs>(args: SelectSubset<T, EmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails and returns the data updated in the database.
     * @param {EmailUpdateManyAndReturnArgs} args - Arguments to update many Emails.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Email.
     * @param {EmailUpsertArgs} args - Arguments to update or create a Email.
     * @example
     * // Update or create a Email
     * const email = await prisma.email.upsert({
     *   create: {
     *     // ... data to create a Email
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Email we want to update
     *   }
     * })
     */
    upsert<T extends EmailUpsertArgs>(args: SelectSubset<T, EmailUpsertArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCountArgs} args - Arguments to filter Emails to count.
     * @example
     * // Count the number of Emails
     * const count = await prisma.email.count({
     *   where: {
     *     // ... the filter for the Emails we want to count
     *   }
     * })
    **/
    count<T extends EmailCountArgs>(
      args?: Subset<T, EmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailAggregateArgs>(args: Subset<T, EmailAggregateArgs>): Prisma.PrismaPromise<GetEmailAggregateType<T>>

    /**
     * Group by Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupByArgs} args - Group by arguments.
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
      T extends EmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailGroupByArgs['orderBy'] }
        : { orderBy?: EmailGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Email model
   */
  readonly fields: EmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Email.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends Email$contactArgs<ExtArgs> = {}>(args?: Subset<T, Email$contactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    deal<T extends Email$dealArgs<ExtArgs> = {}>(args?: Subset<T, Email$dealArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Email model
   */
  interface EmailFieldRefs {
    readonly id: FieldRef<"Email", 'Int'>
    readonly sender: FieldRef<"Email", 'String'>
    readonly senderName: FieldRef<"Email", 'String'>
    readonly senderAvatar: FieldRef<"Email", 'String'>
    readonly subject: FieldRef<"Email", 'String'>
    readonly content: FieldRef<"Email", 'String'>
    readonly timestamp: FieldRef<"Email", 'DateTime'>
    readonly isRead: FieldRef<"Email", 'Boolean'>
    readonly isStarred: FieldRef<"Email", 'Boolean'>
    readonly isAIFlagged: FieldRef<"Email", 'Boolean'>
    readonly folder: FieldRef<"Email", 'String'>
    readonly contactId: FieldRef<"Email", 'Int'>
    readonly dealId: FieldRef<"Email", 'Int'>
    readonly summary: FieldRef<"Email", 'String'>
    readonly sentiment: FieldRef<"Email", 'String'>
    readonly sentimentScore: FieldRef<"Email", 'Int'>
    readonly attachments: FieldRef<"Email", 'Json'>
    readonly keyPoints: FieldRef<"Email", 'String[]'>
    readonly intent: FieldRef<"Email", 'String'>
    readonly suggestedActions: FieldRef<"Email", 'String[]'>
    readonly createdAt: FieldRef<"Email", 'DateTime'>
    readonly updatedAt: FieldRef<"Email", 'DateTime'>
    readonly isDeleted: FieldRef<"Email", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Email findUnique
   */
  export type EmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findUniqueOrThrow
   */
  export type EmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findFirst
   */
  export type EmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findFirstOrThrow
   */
  export type EmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findMany
   */
  export type EmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Emails to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email create
   */
  export type EmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to create a Email.
     */
    data: XOR<EmailCreateInput, EmailUncheckedCreateInput>
  }

  /**
   * Email createMany
   */
  export type EmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Email createManyAndReturn
   */
  export type EmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email update
   */
  export type EmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to update a Email.
     */
    data: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
    /**
     * Choose, which Email to update.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email updateMany
   */
  export type EmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
  }

  /**
   * Email updateManyAndReturn
   */
  export type EmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email upsert
   */
  export type EmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The filter to search for the Email to update in case it exists.
     */
    where: EmailWhereUniqueInput
    /**
     * In case the Email found by the `where` argument doesn't exist, create a new Email with this data.
     */
    create: XOR<EmailCreateInput, EmailUncheckedCreateInput>
    /**
     * In case the Email was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
  }

  /**
   * Email delete
   */
  export type EmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter which Email to delete.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email deleteMany
   */
  export type EmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emails to delete
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to delete.
     */
    limit?: number
  }

  /**
   * Email.contact
   */
  export type Email$contactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Email.deal
   */
  export type Email$dealArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
  }

  /**
   * Email without action
   */
  export type EmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    domain: string | null
    industry: string | null
    size: string | null
    revenue: string | null
    location: string | null
    website: string | null
    linkedinUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    domain: string | null
    industry: string | null
    size: string | null
    revenue: string | null
    location: string | null
    website: string | null
    linkedinUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    domain: number
    industry: number
    size: number
    revenue: number
    location: number
    website: number
    linkedinUrl: number
    description: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    industry?: true
    size?: true
    revenue?: true
    location?: true
    website?: true
    linkedinUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    industry?: true
    size?: true
    revenue?: true
    location?: true
    website?: true
    linkedinUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    industry?: true
    size?: true
    revenue?: true
    location?: true
    website?: true
    linkedinUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    domain: string | null
    industry: string | null
    size: string | null
    revenue: string | null
    location: string | null
    website: string | null
    linkedinUrl: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    domain?: boolean
    industry?: boolean
    size?: boolean
    revenue?: boolean
    location?: boolean
    website?: boolean
    linkedinUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contacts?: boolean | Company$contactsArgs<ExtArgs>
    deals?: boolean | Company$dealsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    domain?: boolean
    industry?: boolean
    size?: boolean
    revenue?: boolean
    location?: boolean
    website?: boolean
    linkedinUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    domain?: boolean
    industry?: boolean
    size?: boolean
    revenue?: boolean
    location?: boolean
    website?: boolean
    linkedinUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    domain?: boolean
    industry?: boolean
    size?: boolean
    revenue?: boolean
    location?: boolean
    website?: boolean
    linkedinUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "domain" | "industry" | "size" | "revenue" | "location" | "website" | "linkedinUrl" | "description" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | Company$contactsArgs<ExtArgs>
    deals?: boolean | Company$dealsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      contacts: Prisma.$ContactPayload<ExtArgs>[]
      deals: Prisma.$DealPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      domain: string | null
      industry: string | null
      size: string | null
      revenue: string | null
      location: string | null
      website: string | null
      linkedinUrl: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
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
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contacts<T extends Company$contactsArgs<ExtArgs> = {}>(args?: Subset<T, Company$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deals<T extends Company$dealsArgs<ExtArgs> = {}>(args?: Subset<T, Company$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly domain: FieldRef<"Company", 'String'>
    readonly industry: FieldRef<"Company", 'String'>
    readonly size: FieldRef<"Company", 'String'>
    readonly revenue: FieldRef<"Company", 'String'>
    readonly location: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly linkedinUrl: FieldRef<"Company", 'String'>
    readonly description: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
    readonly isDeleted: FieldRef<"Company", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.contacts
   */
  export type Company$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Company.deals
   */
  export type Company$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Deal
   */

  export type AggregateDeal = {
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  export type DealAvgAggregateOutputType = {
    id: number | null
    value: number | null
    probability: number | null
    contactId: number | null
    companyId: number | null
  }

  export type DealSumAggregateOutputType = {
    id: number | null
    value: number | null
    probability: number | null
    contactId: number | null
    companyId: number | null
  }

  export type DealMinAggregateOutputType = {
    id: number | null
    name: string | null
    value: number | null
    currency: string | null
    stage: string | null
    probability: number | null
    contactId: number | null
    companyId: number | null
    expectedCloseDate: Date | null
    actualCloseDate: Date | null
    lossReason: string | null
    priority: string | null
    notes: string | null
    owner: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type DealMaxAggregateOutputType = {
    id: number | null
    name: string | null
    value: number | null
    currency: string | null
    stage: string | null
    probability: number | null
    contactId: number | null
    companyId: number | null
    expectedCloseDate: Date | null
    actualCloseDate: Date | null
    lossReason: string | null
    priority: string | null
    notes: string | null
    owner: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type DealCountAggregateOutputType = {
    id: number
    name: number
    value: number
    currency: number
    stage: number
    probability: number
    contactId: number
    companyId: number
    expectedCloseDate: number
    actualCloseDate: number
    lossReason: number
    priority: number
    notes: number
    competitors: number
    owner: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type DealAvgAggregateInputType = {
    id?: true
    value?: true
    probability?: true
    contactId?: true
    companyId?: true
  }

  export type DealSumAggregateInputType = {
    id?: true
    value?: true
    probability?: true
    contactId?: true
    companyId?: true
  }

  export type DealMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    currency?: true
    stage?: true
    probability?: true
    contactId?: true
    companyId?: true
    expectedCloseDate?: true
    actualCloseDate?: true
    lossReason?: true
    priority?: true
    notes?: true
    owner?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type DealMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    currency?: true
    stage?: true
    probability?: true
    contactId?: true
    companyId?: true
    expectedCloseDate?: true
    actualCloseDate?: true
    lossReason?: true
    priority?: true
    notes?: true
    owner?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type DealCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    currency?: true
    stage?: true
    probability?: true
    contactId?: true
    companyId?: true
    expectedCloseDate?: true
    actualCloseDate?: true
    lossReason?: true
    priority?: true
    notes?: true
    competitors?: true
    owner?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type DealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deal to aggregate.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deals
    **/
    _count?: true | DealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealMaxAggregateInputType
  }

  export type GetDealAggregateType<T extends DealAggregateArgs> = {
        [P in keyof T & keyof AggregateDeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeal[P]>
      : GetScalarType<T[P], AggregateDeal[P]>
  }




  export type DealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
    orderBy?: DealOrderByWithAggregationInput | DealOrderByWithAggregationInput[]
    by: DealScalarFieldEnum[] | DealScalarFieldEnum
    having?: DealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealCountAggregateInputType | true
    _avg?: DealAvgAggregateInputType
    _sum?: DealSumAggregateInputType
    _min?: DealMinAggregateInputType
    _max?: DealMaxAggregateInputType
  }

  export type DealGroupByOutputType = {
    id: number
    name: string
    value: number
    currency: string
    stage: string
    probability: number | null
    contactId: number | null
    companyId: number | null
    expectedCloseDate: Date | null
    actualCloseDate: Date | null
    lossReason: string | null
    priority: string
    notes: string | null
    competitors: string[]
    owner: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  type GetDealGroupByPayload<T extends DealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealGroupByOutputType[P]>
            : GetScalarType<T[P], DealGroupByOutputType[P]>
        }
      >
    >


  export type DealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    currency?: boolean
    stage?: boolean
    probability?: boolean
    contactId?: boolean
    companyId?: boolean
    expectedCloseDate?: boolean
    actualCloseDate?: boolean
    lossReason?: boolean
    priority?: boolean
    notes?: boolean
    competitors?: boolean
    owner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
    lineItems?: boolean | Deal$lineItemsArgs<ExtArgs>
    activities?: boolean | Deal$activitiesArgs<ExtArgs>
    tasks?: boolean | Deal$tasksArgs<ExtArgs>
    emails?: boolean | Deal$emailsArgs<ExtArgs>
    _count?: boolean | DealCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    currency?: boolean
    stage?: boolean
    probability?: boolean
    contactId?: boolean
    companyId?: boolean
    expectedCloseDate?: boolean
    actualCloseDate?: boolean
    lossReason?: boolean
    priority?: boolean
    notes?: boolean
    competitors?: boolean
    owner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    currency?: boolean
    stage?: boolean
    probability?: boolean
    contactId?: boolean
    companyId?: boolean
    expectedCloseDate?: boolean
    actualCloseDate?: boolean
    lossReason?: boolean
    priority?: boolean
    notes?: boolean
    competitors?: boolean
    owner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
    currency?: boolean
    stage?: boolean
    probability?: boolean
    contactId?: boolean
    companyId?: boolean
    expectedCloseDate?: boolean
    actualCloseDate?: boolean
    lossReason?: boolean
    priority?: boolean
    notes?: boolean
    competitors?: boolean
    owner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type DealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value" | "currency" | "stage" | "probability" | "contactId" | "companyId" | "expectedCloseDate" | "actualCloseDate" | "lossReason" | "priority" | "notes" | "competitors" | "owner" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["deal"]>
  export type DealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
    lineItems?: boolean | Deal$lineItemsArgs<ExtArgs>
    activities?: boolean | Deal$activitiesArgs<ExtArgs>
    tasks?: boolean | Deal$tasksArgs<ExtArgs>
    emails?: boolean | Deal$emailsArgs<ExtArgs>
    _count?: boolean | DealCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
  }
  export type DealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Deal$contactArgs<ExtArgs>
    company?: boolean | Deal$companyArgs<ExtArgs>
  }

  export type $DealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deal"
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs> | null
      company: Prisma.$CompanyPayload<ExtArgs> | null
      lineItems: Prisma.$LineItemPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      emails: Prisma.$EmailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      value: number
      currency: string
      stage: string
      probability: number | null
      contactId: number | null
      companyId: number | null
      expectedCloseDate: Date | null
      actualCloseDate: Date | null
      lossReason: string | null
      priority: string
      notes: string | null
      competitors: string[]
      owner: string
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["deal"]>
    composites: {}
  }

  type DealGetPayload<S extends boolean | null | undefined | DealDefaultArgs> = $Result.GetResult<Prisma.$DealPayload, S>

  type DealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealCountAggregateInputType | true
    }

  export interface DealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deal'], meta: { name: 'Deal' } }
    /**
     * Find zero or one Deal that matches the filter.
     * @param {DealFindUniqueArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealFindUniqueArgs>(args: SelectSubset<T, DealFindUniqueArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealFindUniqueOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealFindUniqueOrThrowArgs>(args: SelectSubset<T, DealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealFindFirstArgs>(args?: SelectSubset<T, DealFindFirstArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealFindFirstOrThrowArgs>(args?: SelectSubset<T, DealFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deals
     * const deals = await prisma.deal.findMany()
     * 
     * // Get first 10 Deals
     * const deals = await prisma.deal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealWithIdOnly = await prisma.deal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealFindManyArgs>(args?: SelectSubset<T, DealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deal.
     * @param {DealCreateArgs} args - Arguments to create a Deal.
     * @example
     * // Create one Deal
     * const Deal = await prisma.deal.create({
     *   data: {
     *     // ... data to create a Deal
     *   }
     * })
     * 
     */
    create<T extends DealCreateArgs>(args: SelectSubset<T, DealCreateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deals.
     * @param {DealCreateManyArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealCreateManyArgs>(args?: SelectSubset<T, DealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deals and returns the data saved in the database.
     * @param {DealCreateManyAndReturnArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealCreateManyAndReturnArgs>(args?: SelectSubset<T, DealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deal.
     * @param {DealDeleteArgs} args - Arguments to delete one Deal.
     * @example
     * // Delete one Deal
     * const Deal = await prisma.deal.delete({
     *   where: {
     *     // ... filter to delete one Deal
     *   }
     * })
     * 
     */
    delete<T extends DealDeleteArgs>(args: SelectSubset<T, DealDeleteArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deal.
     * @param {DealUpdateArgs} args - Arguments to update one Deal.
     * @example
     * // Update one Deal
     * const deal = await prisma.deal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealUpdateArgs>(args: SelectSubset<T, DealUpdateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deals.
     * @param {DealDeleteManyArgs} args - Arguments to filter Deals to delete.
     * @example
     * // Delete a few Deals
     * const { count } = await prisma.deal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealDeleteManyArgs>(args?: SelectSubset<T, DealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealUpdateManyArgs>(args: SelectSubset<T, DealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals and returns the data updated in the database.
     * @param {DealUpdateManyAndReturnArgs} args - Arguments to update many Deals.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.updateManyAndReturn({
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
    updateManyAndReturn<T extends DealUpdateManyAndReturnArgs>(args: SelectSubset<T, DealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deal.
     * @param {DealUpsertArgs} args - Arguments to update or create a Deal.
     * @example
     * // Update or create a Deal
     * const deal = await prisma.deal.upsert({
     *   create: {
     *     // ... data to create a Deal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deal we want to update
     *   }
     * })
     */
    upsert<T extends DealUpsertArgs>(args: SelectSubset<T, DealUpsertArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealCountArgs} args - Arguments to filter Deals to count.
     * @example
     * // Count the number of Deals
     * const count = await prisma.deal.count({
     *   where: {
     *     // ... the filter for the Deals we want to count
     *   }
     * })
    **/
    count<T extends DealCountArgs>(
      args?: Subset<T, DealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DealAggregateArgs>(args: Subset<T, DealAggregateArgs>): Prisma.PrismaPromise<GetDealAggregateType<T>>

    /**
     * Group by Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealGroupByArgs} args - Group by arguments.
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
      T extends DealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealGroupByArgs['orderBy'] }
        : { orderBy?: DealGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deal model
   */
  readonly fields: DealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends Deal$contactArgs<ExtArgs> = {}>(args?: Subset<T, Deal$contactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends Deal$companyArgs<ExtArgs> = {}>(args?: Subset<T, Deal$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lineItems<T extends Deal$lineItemsArgs<ExtArgs> = {}>(args?: Subset<T, Deal$lineItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Deal$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Deal$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Deal$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Deal$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emails<T extends Deal$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Deal$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Deal model
   */
  interface DealFieldRefs {
    readonly id: FieldRef<"Deal", 'Int'>
    readonly name: FieldRef<"Deal", 'String'>
    readonly value: FieldRef<"Deal", 'Float'>
    readonly currency: FieldRef<"Deal", 'String'>
    readonly stage: FieldRef<"Deal", 'String'>
    readonly probability: FieldRef<"Deal", 'Int'>
    readonly contactId: FieldRef<"Deal", 'Int'>
    readonly companyId: FieldRef<"Deal", 'Int'>
    readonly expectedCloseDate: FieldRef<"Deal", 'DateTime'>
    readonly actualCloseDate: FieldRef<"Deal", 'DateTime'>
    readonly lossReason: FieldRef<"Deal", 'String'>
    readonly priority: FieldRef<"Deal", 'String'>
    readonly notes: FieldRef<"Deal", 'String'>
    readonly competitors: FieldRef<"Deal", 'String[]'>
    readonly owner: FieldRef<"Deal", 'String'>
    readonly createdAt: FieldRef<"Deal", 'DateTime'>
    readonly updatedAt: FieldRef<"Deal", 'DateTime'>
    readonly isDeleted: FieldRef<"Deal", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Deal findUnique
   */
  export type DealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findUniqueOrThrow
   */
  export type DealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findFirst
   */
  export type DealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findFirstOrThrow
   */
  export type DealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findMany
   */
  export type DealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deals to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal create
   */
  export type DealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to create a Deal.
     */
    data: XOR<DealCreateInput, DealUncheckedCreateInput>
  }

  /**
   * Deal createMany
   */
  export type DealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deal createManyAndReturn
   */
  export type DealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal update
   */
  export type DealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to update a Deal.
     */
    data: XOR<DealUpdateInput, DealUncheckedUpdateInput>
    /**
     * Choose, which Deal to update.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal updateMany
   */
  export type DealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
  }

  /**
   * Deal updateManyAndReturn
   */
  export type DealUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal upsert
   */
  export type DealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The filter to search for the Deal to update in case it exists.
     */
    where: DealWhereUniqueInput
    /**
     * In case the Deal found by the `where` argument doesn't exist, create a new Deal with this data.
     */
    create: XOR<DealCreateInput, DealUncheckedCreateInput>
    /**
     * In case the Deal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealUpdateInput, DealUncheckedUpdateInput>
  }

  /**
   * Deal delete
   */
  export type DealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter which Deal to delete.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal deleteMany
   */
  export type DealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deals to delete
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to delete.
     */
    limit?: number
  }

  /**
   * Deal.contact
   */
  export type Deal$contactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Deal.company
   */
  export type Deal$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * Deal.lineItems
   */
  export type Deal$lineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    where?: LineItemWhereInput
    orderBy?: LineItemOrderByWithRelationInput | LineItemOrderByWithRelationInput[]
    cursor?: LineItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LineItemScalarFieldEnum | LineItemScalarFieldEnum[]
  }

  /**
   * Deal.activities
   */
  export type Deal$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Deal.tasks
   */
  export type Deal$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Deal.emails
   */
  export type Deal$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Deal without action
   */
  export type DealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
  }


  /**
   * Model LineItem
   */

  export type AggregateLineItem = {
    _count: LineItemCountAggregateOutputType | null
    _avg: LineItemAvgAggregateOutputType | null
    _sum: LineItemSumAggregateOutputType | null
    _min: LineItemMinAggregateOutputType | null
    _max: LineItemMaxAggregateOutputType | null
  }

  export type LineItemAvgAggregateOutputType = {
    id: number | null
    dealId: number | null
    quantity: number | null
    unitPrice: number | null
    total: number | null
  }

  export type LineItemSumAggregateOutputType = {
    id: number | null
    dealId: number | null
    quantity: number | null
    unitPrice: number | null
    total: number | null
  }

  export type LineItemMinAggregateOutputType = {
    id: number | null
    dealId: number | null
    productName: string | null
    quantity: number | null
    unitPrice: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type LineItemMaxAggregateOutputType = {
    id: number | null
    dealId: number | null
    productName: string | null
    quantity: number | null
    unitPrice: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type LineItemCountAggregateOutputType = {
    id: number
    dealId: number
    productName: number
    quantity: number
    unitPrice: number
    total: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type LineItemAvgAggregateInputType = {
    id?: true
    dealId?: true
    quantity?: true
    unitPrice?: true
    total?: true
  }

  export type LineItemSumAggregateInputType = {
    id?: true
    dealId?: true
    quantity?: true
    unitPrice?: true
    total?: true
  }

  export type LineItemMinAggregateInputType = {
    id?: true
    dealId?: true
    productName?: true
    quantity?: true
    unitPrice?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type LineItemMaxAggregateInputType = {
    id?: true
    dealId?: true
    productName?: true
    quantity?: true
    unitPrice?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type LineItemCountAggregateInputType = {
    id?: true
    dealId?: true
    productName?: true
    quantity?: true
    unitPrice?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type LineItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineItem to aggregate.
     */
    where?: LineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineItems to fetch.
     */
    orderBy?: LineItemOrderByWithRelationInput | LineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LineItems
    **/
    _count?: true | LineItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LineItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LineItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LineItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LineItemMaxAggregateInputType
  }

  export type GetLineItemAggregateType<T extends LineItemAggregateArgs> = {
        [P in keyof T & keyof AggregateLineItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLineItem[P]>
      : GetScalarType<T[P], AggregateLineItem[P]>
  }




  export type LineItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineItemWhereInput
    orderBy?: LineItemOrderByWithAggregationInput | LineItemOrderByWithAggregationInput[]
    by: LineItemScalarFieldEnum[] | LineItemScalarFieldEnum
    having?: LineItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LineItemCountAggregateInputType | true
    _avg?: LineItemAvgAggregateInputType
    _sum?: LineItemSumAggregateInputType
    _min?: LineItemMinAggregateInputType
    _max?: LineItemMaxAggregateInputType
  }

  export type LineItemGroupByOutputType = {
    id: number
    dealId: number
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: LineItemCountAggregateOutputType | null
    _avg: LineItemAvgAggregateOutputType | null
    _sum: LineItemSumAggregateOutputType | null
    _min: LineItemMinAggregateOutputType | null
    _max: LineItemMaxAggregateOutputType | null
  }

  type GetLineItemGroupByPayload<T extends LineItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LineItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LineItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LineItemGroupByOutputType[P]>
            : GetScalarType<T[P], LineItemGroupByOutputType[P]>
        }
      >
    >


  export type LineItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPrice?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineItem"]>

  export type LineItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPrice?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineItem"]>

  export type LineItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPrice?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineItem"]>

  export type LineItemSelectScalar = {
    id?: boolean
    dealId?: boolean
    productName?: boolean
    quantity?: boolean
    unitPrice?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type LineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dealId" | "productName" | "quantity" | "unitPrice" | "total" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["lineItem"]>
  export type LineItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }
  export type LineItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }
  export type LineItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deal?: boolean | DealDefaultArgs<ExtArgs>
  }

  export type $LineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LineItem"
    objects: {
      deal: Prisma.$DealPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dealId: number
      productName: string
      quantity: number
      unitPrice: number
      total: number
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["lineItem"]>
    composites: {}
  }

  type LineItemGetPayload<S extends boolean | null | undefined | LineItemDefaultArgs> = $Result.GetResult<Prisma.$LineItemPayload, S>

  type LineItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LineItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LineItemCountAggregateInputType | true
    }

  export interface LineItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LineItem'], meta: { name: 'LineItem' } }
    /**
     * Find zero or one LineItem that matches the filter.
     * @param {LineItemFindUniqueArgs} args - Arguments to find a LineItem
     * @example
     * // Get one LineItem
     * const lineItem = await prisma.lineItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LineItemFindUniqueArgs>(args: SelectSubset<T, LineItemFindUniqueArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LineItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LineItemFindUniqueOrThrowArgs} args - Arguments to find a LineItem
     * @example
     * // Get one LineItem
     * const lineItem = await prisma.lineItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LineItemFindUniqueOrThrowArgs>(args: SelectSubset<T, LineItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemFindFirstArgs} args - Arguments to find a LineItem
     * @example
     * // Get one LineItem
     * const lineItem = await prisma.lineItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LineItemFindFirstArgs>(args?: SelectSubset<T, LineItemFindFirstArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemFindFirstOrThrowArgs} args - Arguments to find a LineItem
     * @example
     * // Get one LineItem
     * const lineItem = await prisma.lineItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LineItemFindFirstOrThrowArgs>(args?: SelectSubset<T, LineItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LineItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LineItems
     * const lineItems = await prisma.lineItem.findMany()
     * 
     * // Get first 10 LineItems
     * const lineItems = await prisma.lineItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lineItemWithIdOnly = await prisma.lineItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LineItemFindManyArgs>(args?: SelectSubset<T, LineItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LineItem.
     * @param {LineItemCreateArgs} args - Arguments to create a LineItem.
     * @example
     * // Create one LineItem
     * const LineItem = await prisma.lineItem.create({
     *   data: {
     *     // ... data to create a LineItem
     *   }
     * })
     * 
     */
    create<T extends LineItemCreateArgs>(args: SelectSubset<T, LineItemCreateArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LineItems.
     * @param {LineItemCreateManyArgs} args - Arguments to create many LineItems.
     * @example
     * // Create many LineItems
     * const lineItem = await prisma.lineItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LineItemCreateManyArgs>(args?: SelectSubset<T, LineItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LineItems and returns the data saved in the database.
     * @param {LineItemCreateManyAndReturnArgs} args - Arguments to create many LineItems.
     * @example
     * // Create many LineItems
     * const lineItem = await prisma.lineItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LineItems and only return the `id`
     * const lineItemWithIdOnly = await prisma.lineItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LineItemCreateManyAndReturnArgs>(args?: SelectSubset<T, LineItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LineItem.
     * @param {LineItemDeleteArgs} args - Arguments to delete one LineItem.
     * @example
     * // Delete one LineItem
     * const LineItem = await prisma.lineItem.delete({
     *   where: {
     *     // ... filter to delete one LineItem
     *   }
     * })
     * 
     */
    delete<T extends LineItemDeleteArgs>(args: SelectSubset<T, LineItemDeleteArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LineItem.
     * @param {LineItemUpdateArgs} args - Arguments to update one LineItem.
     * @example
     * // Update one LineItem
     * const lineItem = await prisma.lineItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LineItemUpdateArgs>(args: SelectSubset<T, LineItemUpdateArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LineItems.
     * @param {LineItemDeleteManyArgs} args - Arguments to filter LineItems to delete.
     * @example
     * // Delete a few LineItems
     * const { count } = await prisma.lineItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LineItemDeleteManyArgs>(args?: SelectSubset<T, LineItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LineItems
     * const lineItem = await prisma.lineItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LineItemUpdateManyArgs>(args: SelectSubset<T, LineItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineItems and returns the data updated in the database.
     * @param {LineItemUpdateManyAndReturnArgs} args - Arguments to update many LineItems.
     * @example
     * // Update many LineItems
     * const lineItem = await prisma.lineItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LineItems and only return the `id`
     * const lineItemWithIdOnly = await prisma.lineItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends LineItemUpdateManyAndReturnArgs>(args: SelectSubset<T, LineItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LineItem.
     * @param {LineItemUpsertArgs} args - Arguments to update or create a LineItem.
     * @example
     * // Update or create a LineItem
     * const lineItem = await prisma.lineItem.upsert({
     *   create: {
     *     // ... data to create a LineItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LineItem we want to update
     *   }
     * })
     */
    upsert<T extends LineItemUpsertArgs>(args: SelectSubset<T, LineItemUpsertArgs<ExtArgs>>): Prisma__LineItemClient<$Result.GetResult<Prisma.$LineItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemCountArgs} args - Arguments to filter LineItems to count.
     * @example
     * // Count the number of LineItems
     * const count = await prisma.lineItem.count({
     *   where: {
     *     // ... the filter for the LineItems we want to count
     *   }
     * })
    **/
    count<T extends LineItemCountArgs>(
      args?: Subset<T, LineItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LineItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LineItemAggregateArgs>(args: Subset<T, LineItemAggregateArgs>): Prisma.PrismaPromise<GetLineItemAggregateType<T>>

    /**
     * Group by LineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineItemGroupByArgs} args - Group by arguments.
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
      T extends LineItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LineItemGroupByArgs['orderBy'] }
        : { orderBy?: LineItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LineItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LineItem model
   */
  readonly fields: LineItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LineItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LineItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deal<T extends DealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DealDefaultArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LineItem model
   */
  interface LineItemFieldRefs {
    readonly id: FieldRef<"LineItem", 'Int'>
    readonly dealId: FieldRef<"LineItem", 'Int'>
    readonly productName: FieldRef<"LineItem", 'String'>
    readonly quantity: FieldRef<"LineItem", 'Int'>
    readonly unitPrice: FieldRef<"LineItem", 'Float'>
    readonly total: FieldRef<"LineItem", 'Float'>
    readonly createdAt: FieldRef<"LineItem", 'DateTime'>
    readonly updatedAt: FieldRef<"LineItem", 'DateTime'>
    readonly isDeleted: FieldRef<"LineItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * LineItem findUnique
   */
  export type LineItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter, which LineItem to fetch.
     */
    where: LineItemWhereUniqueInput
  }

  /**
   * LineItem findUniqueOrThrow
   */
  export type LineItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter, which LineItem to fetch.
     */
    where: LineItemWhereUniqueInput
  }

  /**
   * LineItem findFirst
   */
  export type LineItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter, which LineItem to fetch.
     */
    where?: LineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineItems to fetch.
     */
    orderBy?: LineItemOrderByWithRelationInput | LineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineItems.
     */
    cursor?: LineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineItems.
     */
    distinct?: LineItemScalarFieldEnum | LineItemScalarFieldEnum[]
  }

  /**
   * LineItem findFirstOrThrow
   */
  export type LineItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter, which LineItem to fetch.
     */
    where?: LineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineItems to fetch.
     */
    orderBy?: LineItemOrderByWithRelationInput | LineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineItems.
     */
    cursor?: LineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineItems.
     */
    distinct?: LineItemScalarFieldEnum | LineItemScalarFieldEnum[]
  }

  /**
   * LineItem findMany
   */
  export type LineItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter, which LineItems to fetch.
     */
    where?: LineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineItems to fetch.
     */
    orderBy?: LineItemOrderByWithRelationInput | LineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LineItems.
     */
    cursor?: LineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineItems.
     */
    skip?: number
    distinct?: LineItemScalarFieldEnum | LineItemScalarFieldEnum[]
  }

  /**
   * LineItem create
   */
  export type LineItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * The data needed to create a LineItem.
     */
    data: XOR<LineItemCreateInput, LineItemUncheckedCreateInput>
  }

  /**
   * LineItem createMany
   */
  export type LineItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LineItems.
     */
    data: LineItemCreateManyInput | LineItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LineItem createManyAndReturn
   */
  export type LineItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * The data used to create many LineItems.
     */
    data: LineItemCreateManyInput | LineItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LineItem update
   */
  export type LineItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * The data needed to update a LineItem.
     */
    data: XOR<LineItemUpdateInput, LineItemUncheckedUpdateInput>
    /**
     * Choose, which LineItem to update.
     */
    where: LineItemWhereUniqueInput
  }

  /**
   * LineItem updateMany
   */
  export type LineItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LineItems.
     */
    data: XOR<LineItemUpdateManyMutationInput, LineItemUncheckedUpdateManyInput>
    /**
     * Filter which LineItems to update
     */
    where?: LineItemWhereInput
    /**
     * Limit how many LineItems to update.
     */
    limit?: number
  }

  /**
   * LineItem updateManyAndReturn
   */
  export type LineItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * The data used to update LineItems.
     */
    data: XOR<LineItemUpdateManyMutationInput, LineItemUncheckedUpdateManyInput>
    /**
     * Filter which LineItems to update
     */
    where?: LineItemWhereInput
    /**
     * Limit how many LineItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LineItem upsert
   */
  export type LineItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * The filter to search for the LineItem to update in case it exists.
     */
    where: LineItemWhereUniqueInput
    /**
     * In case the LineItem found by the `where` argument doesn't exist, create a new LineItem with this data.
     */
    create: XOR<LineItemCreateInput, LineItemUncheckedCreateInput>
    /**
     * In case the LineItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LineItemUpdateInput, LineItemUncheckedUpdateInput>
  }

  /**
   * LineItem delete
   */
  export type LineItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
    /**
     * Filter which LineItem to delete.
     */
    where: LineItemWhereUniqueInput
  }

  /**
   * LineItem deleteMany
   */
  export type LineItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineItems to delete
     */
    where?: LineItemWhereInput
    /**
     * Limit how many LineItems to delete.
     */
    limit?: number
  }

  /**
   * LineItem without action
   */
  export type LineItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineItem
     */
    select?: LineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineItem
     */
    omit?: LineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineItemInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
    durationMinutes: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
    durationMinutes: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    type: string | null
    title: string | null
    description: string | null
    contactId: number | null
    dealId: number | null
    date: Date | null
    durationMinutes: number | null
    outcome: string | null
    nextSteps: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    type: string | null
    title: string | null
    description: string | null
    contactId: number | null
    dealId: number | null
    date: Date | null
    durationMinutes: number | null
    outcome: string | null
    nextSteps: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    type: number
    title: number
    description: number
    contactId: number
    dealId: number
    date: number
    durationMinutes: number
    outcome: number
    nextSteps: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
    durationMinutes?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
    durationMinutes?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    contactId?: true
    dealId?: true
    date?: true
    durationMinutes?: true
    outcome?: true
    nextSteps?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    contactId?: true
    dealId?: true
    date?: true
    durationMinutes?: true
    outcome?: true
    nextSteps?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    contactId?: true
    dealId?: true
    date?: true
    durationMinutes?: true
    outcome?: true
    nextSteps?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    type: string
    title: string
    description: string | null
    contactId: number | null
    dealId: number | null
    date: Date
    durationMinutes: number | null
    outcome: string | null
    nextSteps: string | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    contactId?: boolean
    dealId?: boolean
    date?: boolean
    durationMinutes?: boolean
    outcome?: boolean
    nextSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    contactId?: boolean
    dealId?: boolean
    date?: boolean
    durationMinutes?: boolean
    outcome?: boolean
    nextSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    contactId?: boolean
    dealId?: boolean
    date?: boolean
    durationMinutes?: boolean
    outcome?: boolean
    nextSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    contactId?: boolean
    dealId?: boolean
    date?: boolean
    durationMinutes?: boolean
    outcome?: boolean
    nextSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "title" | "description" | "contactId" | "dealId" | "date" | "durationMinutes" | "outcome" | "nextSteps" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Activity$contactArgs<ExtArgs>
    deal?: boolean | Activity$dealArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs> | null
      deal: Prisma.$DealPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      title: string
      description: string | null
      contactId: number | null
      dealId: number | null
      date: Date
      durationMinutes: number | null
      outcome: string | null
      nextSteps: string | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
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
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends Activity$contactArgs<ExtArgs> = {}>(args?: Subset<T, Activity$contactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    deal<T extends Activity$dealArgs<ExtArgs> = {}>(args?: Subset<T, Activity$dealArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly type: FieldRef<"Activity", 'String'>
    readonly title: FieldRef<"Activity", 'String'>
    readonly description: FieldRef<"Activity", 'String'>
    readonly contactId: FieldRef<"Activity", 'Int'>
    readonly dealId: FieldRef<"Activity", 'Int'>
    readonly date: FieldRef<"Activity", 'DateTime'>
    readonly durationMinutes: FieldRef<"Activity", 'Int'>
    readonly outcome: FieldRef<"Activity", 'String'>
    readonly nextSteps: FieldRef<"Activity", 'String'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
    readonly updatedAt: FieldRef<"Activity", 'DateTime'>
    readonly isDeleted: FieldRef<"Activity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.contact
   */
  export type Activity$contactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Activity.deal
   */
  export type Activity$dealArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    contactId: number | null
    dealId: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    dueDate: Date | null
    priority: string | null
    status: string | null
    contactId: number | null
    dealId: number | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    dueDate: Date | null
    priority: string | null
    status: string | null
    contactId: number | null
    dealId: number | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    dueDate: number
    priority: number
    status: number
    contactId: number
    dealId: number
    aiGenerated: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    contactId?: true
    dealId?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    contactId?: true
    dealId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    contactId?: true
    dealId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueDate?: true
    priority?: true
    status?: true
    contactId?: true
    dealId?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    title: string
    description: string | null
    dueDate: Date | null
    priority: string
    status: string
    contactId: number | null
    dealId: number | null
    aiGenerated: boolean
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    contactId?: boolean
    dealId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    contactId?: boolean
    dealId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    contactId?: boolean
    dealId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    priority?: boolean
    status?: boolean
    contactId?: boolean
    dealId?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "dueDate" | "priority" | "status" | "contactId" | "dealId" | "aiGenerated" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | Task$contactArgs<ExtArgs>
    deal?: boolean | Task$dealArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs> | null
      deal: Prisma.$DealPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      dueDate: Date | null
      priority: string
      status: string
      contactId: number | null
      dealId: number | null
      aiGenerated: boolean
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
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
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends Task$contactArgs<ExtArgs> = {}>(args?: Subset<T, Task$contactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    deal<T extends Task$dealArgs<ExtArgs> = {}>(args?: Subset<T, Task$dealArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly priority: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly contactId: FieldRef<"Task", 'Int'>
    readonly dealId: FieldRef<"Task", 'Int'>
    readonly aiGenerated: FieldRef<"Task", 'Boolean'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly isDeleted: FieldRef<"Task", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.contact
   */
  export type Task$contactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Task.deal
   */
  export type Task$dealArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model EmailTemplate
   */

  export type AggregateEmailTemplate = {
    _count: EmailTemplateCountAggregateOutputType | null
    _avg: EmailTemplateAvgAggregateOutputType | null
    _sum: EmailTemplateSumAggregateOutputType | null
    _min: EmailTemplateMinAggregateOutputType | null
    _max: EmailTemplateMaxAggregateOutputType | null
  }

  export type EmailTemplateAvgAggregateOutputType = {
    id: number | null
  }

  export type EmailTemplateSumAggregateOutputType = {
    id: number | null
  }

  export type EmailTemplateMinAggregateOutputType = {
    id: number | null
    name: string | null
    subject: string | null
    body: string | null
    category: string | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type EmailTemplateMaxAggregateOutputType = {
    id: number | null
    name: string | null
    subject: string | null
    body: string | null
    category: string | null
    aiGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type EmailTemplateCountAggregateOutputType = {
    id: number
    name: number
    subject: number
    body: number
    category: number
    aiGenerated: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type EmailTemplateAvgAggregateInputType = {
    id?: true
  }

  export type EmailTemplateSumAggregateInputType = {
    id?: true
  }

  export type EmailTemplateMinAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    category?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type EmailTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    category?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type EmailTemplateCountAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    category?: true
    aiGenerated?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type EmailTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailTemplate to aggregate.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailTemplates
    **/
    _count?: true | EmailTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailTemplateMaxAggregateInputType
  }

  export type GetEmailTemplateAggregateType<T extends EmailTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailTemplate[P]>
      : GetScalarType<T[P], AggregateEmailTemplate[P]>
  }




  export type EmailTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailTemplateWhereInput
    orderBy?: EmailTemplateOrderByWithAggregationInput | EmailTemplateOrderByWithAggregationInput[]
    by: EmailTemplateScalarFieldEnum[] | EmailTemplateScalarFieldEnum
    having?: EmailTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailTemplateCountAggregateInputType | true
    _avg?: EmailTemplateAvgAggregateInputType
    _sum?: EmailTemplateSumAggregateInputType
    _min?: EmailTemplateMinAggregateInputType
    _max?: EmailTemplateMaxAggregateInputType
  }

  export type EmailTemplateGroupByOutputType = {
    id: number
    name: string | null
    subject: string | null
    body: string | null
    category: string | null
    aiGenerated: boolean
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: EmailTemplateCountAggregateOutputType | null
    _avg: EmailTemplateAvgAggregateOutputType | null
    _sum: EmailTemplateSumAggregateOutputType | null
    _min: EmailTemplateMinAggregateOutputType | null
    _max: EmailTemplateMaxAggregateOutputType | null
  }

  type GetEmailTemplateGroupByPayload<T extends EmailTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], EmailTemplateGroupByOutputType[P]>
        }
      >
    >


  export type EmailTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    category?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["emailTemplate"]>

  export type EmailTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    category?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["emailTemplate"]>

  export type EmailTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    category?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["emailTemplate"]>

  export type EmailTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    category?: boolean
    aiGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type EmailTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "subject" | "body" | "category" | "aiGenerated" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["emailTemplate"]>

  export type $EmailTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      subject: string | null
      body: string | null
      category: string | null
      aiGenerated: boolean
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["emailTemplate"]>
    composites: {}
  }

  type EmailTemplateGetPayload<S extends boolean | null | undefined | EmailTemplateDefaultArgs> = $Result.GetResult<Prisma.$EmailTemplatePayload, S>

  type EmailTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailTemplateCountAggregateInputType | true
    }

  export interface EmailTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailTemplate'], meta: { name: 'EmailTemplate' } }
    /**
     * Find zero or one EmailTemplate that matches the filter.
     * @param {EmailTemplateFindUniqueArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailTemplateFindUniqueArgs>(args: SelectSubset<T, EmailTemplateFindUniqueArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailTemplateFindUniqueOrThrowArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindFirstArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailTemplateFindFirstArgs>(args?: SelectSubset<T, EmailTemplateFindFirstArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindFirstOrThrowArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailTemplates
     * const emailTemplates = await prisma.emailTemplate.findMany()
     * 
     * // Get first 10 EmailTemplates
     * const emailTemplates = await prisma.emailTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailTemplateWithIdOnly = await prisma.emailTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailTemplateFindManyArgs>(args?: SelectSubset<T, EmailTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailTemplate.
     * @param {EmailTemplateCreateArgs} args - Arguments to create a EmailTemplate.
     * @example
     * // Create one EmailTemplate
     * const EmailTemplate = await prisma.emailTemplate.create({
     *   data: {
     *     // ... data to create a EmailTemplate
     *   }
     * })
     * 
     */
    create<T extends EmailTemplateCreateArgs>(args: SelectSubset<T, EmailTemplateCreateArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailTemplates.
     * @param {EmailTemplateCreateManyArgs} args - Arguments to create many EmailTemplates.
     * @example
     * // Create many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailTemplateCreateManyArgs>(args?: SelectSubset<T, EmailTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailTemplates and returns the data saved in the database.
     * @param {EmailTemplateCreateManyAndReturnArgs} args - Arguments to create many EmailTemplates.
     * @example
     * // Create many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailTemplates and only return the `id`
     * const emailTemplateWithIdOnly = await prisma.emailTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailTemplate.
     * @param {EmailTemplateDeleteArgs} args - Arguments to delete one EmailTemplate.
     * @example
     * // Delete one EmailTemplate
     * const EmailTemplate = await prisma.emailTemplate.delete({
     *   where: {
     *     // ... filter to delete one EmailTemplate
     *   }
     * })
     * 
     */
    delete<T extends EmailTemplateDeleteArgs>(args: SelectSubset<T, EmailTemplateDeleteArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailTemplate.
     * @param {EmailTemplateUpdateArgs} args - Arguments to update one EmailTemplate.
     * @example
     * // Update one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailTemplateUpdateArgs>(args: SelectSubset<T, EmailTemplateUpdateArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailTemplates.
     * @param {EmailTemplateDeleteManyArgs} args - Arguments to filter EmailTemplates to delete.
     * @example
     * // Delete a few EmailTemplates
     * const { count } = await prisma.emailTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailTemplateDeleteManyArgs>(args?: SelectSubset<T, EmailTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailTemplateUpdateManyArgs>(args: SelectSubset<T, EmailTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailTemplates and returns the data updated in the database.
     * @param {EmailTemplateUpdateManyAndReturnArgs} args - Arguments to update many EmailTemplates.
     * @example
     * // Update many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailTemplates and only return the `id`
     * const emailTemplateWithIdOnly = await prisma.emailTemplate.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailTemplate.
     * @param {EmailTemplateUpsertArgs} args - Arguments to update or create a EmailTemplate.
     * @example
     * // Update or create a EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.upsert({
     *   create: {
     *     // ... data to create a EmailTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailTemplate we want to update
     *   }
     * })
     */
    upsert<T extends EmailTemplateUpsertArgs>(args: SelectSubset<T, EmailTemplateUpsertArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateCountArgs} args - Arguments to filter EmailTemplates to count.
     * @example
     * // Count the number of EmailTemplates
     * const count = await prisma.emailTemplate.count({
     *   where: {
     *     // ... the filter for the EmailTemplates we want to count
     *   }
     * })
    **/
    count<T extends EmailTemplateCountArgs>(
      args?: Subset<T, EmailTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailTemplateAggregateArgs>(args: Subset<T, EmailTemplateAggregateArgs>): Prisma.PrismaPromise<GetEmailTemplateAggregateType<T>>

    /**
     * Group by EmailTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateGroupByArgs} args - Group by arguments.
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
      T extends EmailTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailTemplateGroupByArgs['orderBy'] }
        : { orderBy?: EmailTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailTemplate model
   */
  readonly fields: EmailTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the EmailTemplate model
   */
  interface EmailTemplateFieldRefs {
    readonly id: FieldRef<"EmailTemplate", 'Int'>
    readonly name: FieldRef<"EmailTemplate", 'String'>
    readonly subject: FieldRef<"EmailTemplate", 'String'>
    readonly body: FieldRef<"EmailTemplate", 'String'>
    readonly category: FieldRef<"EmailTemplate", 'String'>
    readonly aiGenerated: FieldRef<"EmailTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"EmailTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailTemplate", 'DateTime'>
    readonly isDeleted: FieldRef<"EmailTemplate", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * EmailTemplate findUnique
   */
  export type EmailTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate findUniqueOrThrow
   */
  export type EmailTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate findFirst
   */
  export type EmailTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailTemplates.
     */
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate findFirstOrThrow
   */
  export type EmailTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailTemplates.
     */
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate findMany
   */
  export type EmailTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter, which EmailTemplates to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate create
   */
  export type EmailTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailTemplate.
     */
    data: XOR<EmailTemplateCreateInput, EmailTemplateUncheckedCreateInput>
  }

  /**
   * EmailTemplate createMany
   */
  export type EmailTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailTemplates.
     */
    data: EmailTemplateCreateManyInput | EmailTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailTemplate createManyAndReturn
   */
  export type EmailTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many EmailTemplates.
     */
    data: EmailTemplateCreateManyInput | EmailTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailTemplate update
   */
  export type EmailTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailTemplate.
     */
    data: XOR<EmailTemplateUpdateInput, EmailTemplateUncheckedUpdateInput>
    /**
     * Choose, which EmailTemplate to update.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate updateMany
   */
  export type EmailTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailTemplates.
     */
    data: XOR<EmailTemplateUpdateManyMutationInput, EmailTemplateUncheckedUpdateManyInput>
    /**
     * Filter which EmailTemplates to update
     */
    where?: EmailTemplateWhereInput
    /**
     * Limit how many EmailTemplates to update.
     */
    limit?: number
  }

  /**
   * EmailTemplate updateManyAndReturn
   */
  export type EmailTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * The data used to update EmailTemplates.
     */
    data: XOR<EmailTemplateUpdateManyMutationInput, EmailTemplateUncheckedUpdateManyInput>
    /**
     * Filter which EmailTemplates to update
     */
    where?: EmailTemplateWhereInput
    /**
     * Limit how many EmailTemplates to update.
     */
    limit?: number
  }

  /**
   * EmailTemplate upsert
   */
  export type EmailTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailTemplate to update in case it exists.
     */
    where: EmailTemplateWhereUniqueInput
    /**
     * In case the EmailTemplate found by the `where` argument doesn't exist, create a new EmailTemplate with this data.
     */
    create: XOR<EmailTemplateCreateInput, EmailTemplateUncheckedCreateInput>
    /**
     * In case the EmailTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailTemplateUpdateInput, EmailTemplateUncheckedUpdateInput>
  }

  /**
   * EmailTemplate delete
   */
  export type EmailTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Filter which EmailTemplate to delete.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate deleteMany
   */
  export type EmailTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailTemplates to delete
     */
    where?: EmailTemplateWhereInput
    /**
     * Limit how many EmailTemplates to delete.
     */
    limit?: number
  }

  /**
   * EmailTemplate without action
   */
  export type EmailTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    isDeleted: 'isDeleted'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserIdentityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type UserIdentityScalarFieldEnum = (typeof UserIdentityScalarFieldEnum)[keyof typeof UserIdentityScalarFieldEnum]


  export const OtpScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    type: 'type',
    otp: 'otp',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    verified: 'verified',
    purpose: 'purpose',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type OtpScalarFieldEnum = (typeof OtpScalarFieldEnum)[keyof typeof OtpScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    jobTitle: 'jobTitle',
    companyId: 'companyId',
    leadSource: 'leadSource',
    leadStatus: 'leadStatus',
    leadScore: 'leadScore',
    tags: 'tags',
    address: 'address',
    linkedinUrl: 'linkedinUrl',
    twitterUrl: 'twitterUrl',
    website: 'website',
    notes: 'notes',
    lastContacted: 'lastContacted',
    owner: 'owner',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const EmailScalarFieldEnum: {
    id: 'id',
    sender: 'sender',
    senderName: 'senderName',
    senderAvatar: 'senderAvatar',
    subject: 'subject',
    content: 'content',
    timestamp: 'timestamp',
    isRead: 'isRead',
    isStarred: 'isStarred',
    isAIFlagged: 'isAIFlagged',
    folder: 'folder',
    contactId: 'contactId',
    dealId: 'dealId',
    summary: 'summary',
    sentiment: 'sentiment',
    sentimentScore: 'sentimentScore',
    attachments: 'attachments',
    keyPoints: 'keyPoints',
    intent: 'intent',
    suggestedActions: 'suggestedActions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type EmailScalarFieldEnum = (typeof EmailScalarFieldEnum)[keyof typeof EmailScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    domain: 'domain',
    industry: 'industry',
    size: 'size',
    revenue: 'revenue',
    location: 'location',
    website: 'website',
    linkedinUrl: 'linkedinUrl',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const DealScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    currency: 'currency',
    stage: 'stage',
    probability: 'probability',
    contactId: 'contactId',
    companyId: 'companyId',
    expectedCloseDate: 'expectedCloseDate',
    actualCloseDate: 'actualCloseDate',
    lossReason: 'lossReason',
    priority: 'priority',
    notes: 'notes',
    competitors: 'competitors',
    owner: 'owner',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type DealScalarFieldEnum = (typeof DealScalarFieldEnum)[keyof typeof DealScalarFieldEnum]


  export const LineItemScalarFieldEnum: {
    id: 'id',
    dealId: 'dealId',
    productName: 'productName',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    total: 'total',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type LineItemScalarFieldEnum = (typeof LineItemScalarFieldEnum)[keyof typeof LineItemScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    type: 'type',
    title: 'title',
    description: 'description',
    contactId: 'contactId',
    dealId: 'dealId',
    date: 'date',
    durationMinutes: 'durationMinutes',
    outcome: 'outcome',
    nextSteps: 'nextSteps',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    dueDate: 'dueDate',
    priority: 'priority',
    status: 'status',
    contactId: 'contactId',
    dealId: 'dealId',
    aiGenerated: 'aiGenerated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const EmailTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subject: 'subject',
    body: 'body',
    category: 'category',
    aiGenerated: 'aiGenerated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type EmailTemplateScalarFieldEnum = (typeof EmailTemplateScalarFieldEnum)[keyof typeof EmailTemplateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isDeleted?: BoolNullableFilter<"User"> | boolean | null
    identities?: UserIdentityListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    identities?: UserIdentityOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isDeleted?: BoolNullableFilter<"User"> | boolean | null
    identities?: UserIdentityListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
  }

  export type UserIdentityWhereInput = {
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserIdentityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerId?: UserIdentityProviderProviderIdCompoundUniqueInput
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerId">

  export type UserIdentityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: UserIdentityCountOrderByAggregateInput
    _max?: UserIdentityMaxOrderByAggregateInput
    _min?: UserIdentityMinOrderByAggregateInput
  }

  export type UserIdentityScalarWhereWithAggregatesInput = {
    AND?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    OR?: UserIdentityScalarWhereWithAggregatesInput[]
    NOT?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserIdentity"> | string
    userId?: StringWithAggregatesFilter<"UserIdentity"> | string
    provider?: StringWithAggregatesFilter<"UserIdentity"> | string
    providerId?: StringWithAggregatesFilter<"UserIdentity"> | string
    metadata?: JsonNullableWithAggregatesFilter<"UserIdentity">
    createdAt?: DateTimeWithAggregatesFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"UserIdentity"> | boolean | null
  }

  export type OtpWhereInput = {
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    id?: StringFilter<"Otp"> | string
    identifier?: StringFilter<"Otp"> | string
    type?: StringFilter<"Otp"> | string
    otp?: StringFilter<"Otp"> | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
    attempts?: IntFilter<"Otp"> | number
    verified?: BoolFilter<"Otp"> | boolean
    purpose?: StringNullableFilter<"Otp"> | string | null
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    updatedAt?: DateTimeFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableFilter<"Otp"> | boolean | null
  }

  export type OtpOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
  }

  export type OtpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    identifier?: StringFilter<"Otp"> | string
    type?: StringFilter<"Otp"> | string
    otp?: StringFilter<"Otp"> | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
    attempts?: IntFilter<"Otp"> | number
    verified?: BoolFilter<"Otp"> | boolean
    purpose?: StringNullableFilter<"Otp"> | string | null
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    updatedAt?: DateTimeFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableFilter<"Otp"> | boolean | null
  }, "id">

  export type OtpOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: OtpCountOrderByAggregateInput
    _avg?: OtpAvgOrderByAggregateInput
    _max?: OtpMaxOrderByAggregateInput
    _min?: OtpMinOrderByAggregateInput
    _sum?: OtpSumOrderByAggregateInput
  }

  export type OtpScalarWhereWithAggregatesInput = {
    AND?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    OR?: OtpScalarWhereWithAggregatesInput[]
    NOT?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Otp"> | string
    identifier?: StringWithAggregatesFilter<"Otp"> | string
    type?: StringWithAggregatesFilter<"Otp"> | string
    otp?: StringWithAggregatesFilter<"Otp"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    attempts?: IntWithAggregatesFilter<"Otp"> | number
    verified?: BoolWithAggregatesFilter<"Otp"> | boolean
    purpose?: StringNullableWithAggregatesFilter<"Otp"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"Otp"> | boolean | null
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: IntFilter<"Contact"> | number
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    phone?: StringNullableFilter<"Contact"> | string | null
    jobTitle?: StringNullableFilter<"Contact"> | string | null
    companyId?: IntNullableFilter<"Contact"> | number | null
    leadSource?: StringNullableFilter<"Contact"> | string | null
    leadStatus?: StringNullableFilter<"Contact"> | string | null
    leadScore?: IntFilter<"Contact"> | number
    tags?: StringNullableListFilter<"Contact">
    address?: StringNullableFilter<"Contact"> | string | null
    linkedinUrl?: StringNullableFilter<"Contact"> | string | null
    twitterUrl?: StringNullableFilter<"Contact"> | string | null
    website?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    lastContacted?: DateTimeNullableFilter<"Contact"> | Date | string | null
    owner?: StringFilter<"Contact"> | string
    avatarUrl?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    isDeleted?: BoolFilter<"Contact"> | boolean
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    activities?: ActivityListRelationFilter
    tasks?: TaskListRelationFilter
    deals?: DealListRelationFilter
    emails?: EmailListRelationFilter
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    leadSource?: SortOrderInput | SortOrder
    leadStatus?: SortOrderInput | SortOrder
    leadScore?: SortOrder
    tags?: SortOrder
    address?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    twitterUrl?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    lastContacted?: SortOrderInput | SortOrder
    owner?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    company?: CompanyOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    deals?: DealOrderByRelationAggregateInput
    emails?: EmailOrderByRelationAggregateInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    phone?: StringNullableFilter<"Contact"> | string | null
    jobTitle?: StringNullableFilter<"Contact"> | string | null
    companyId?: IntNullableFilter<"Contact"> | number | null
    leadSource?: StringNullableFilter<"Contact"> | string | null
    leadStatus?: StringNullableFilter<"Contact"> | string | null
    leadScore?: IntFilter<"Contact"> | number
    tags?: StringNullableListFilter<"Contact">
    address?: StringNullableFilter<"Contact"> | string | null
    linkedinUrl?: StringNullableFilter<"Contact"> | string | null
    twitterUrl?: StringNullableFilter<"Contact"> | string | null
    website?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    lastContacted?: DateTimeNullableFilter<"Contact"> | Date | string | null
    owner?: StringFilter<"Contact"> | string
    avatarUrl?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    isDeleted?: BoolFilter<"Contact"> | boolean
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    activities?: ActivityListRelationFilter
    tasks?: TaskListRelationFilter
    deals?: DealListRelationFilter
    emails?: EmailListRelationFilter
  }, "id" | "email">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    leadSource?: SortOrderInput | SortOrder
    leadStatus?: SortOrderInput | SortOrder
    leadScore?: SortOrder
    tags?: SortOrder
    address?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    twitterUrl?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    lastContacted?: SortOrderInput | SortOrder
    owner?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _avg?: ContactAvgOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
    _sum?: ContactSumOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Contact"> | number
    firstName?: StringWithAggregatesFilter<"Contact"> | string
    lastName?: StringWithAggregatesFilter<"Contact"> | string
    email?: StringWithAggregatesFilter<"Contact"> | string
    phone?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    jobTitle?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    companyId?: IntNullableWithAggregatesFilter<"Contact"> | number | null
    leadSource?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    leadStatus?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    leadScore?: IntWithAggregatesFilter<"Contact"> | number
    tags?: StringNullableListFilter<"Contact">
    address?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    twitterUrl?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    website?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    lastContacted?: DateTimeNullableWithAggregatesFilter<"Contact"> | Date | string | null
    owner?: StringWithAggregatesFilter<"Contact"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Contact"> | boolean
  }

  export type EmailWhereInput = {
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    id?: IntFilter<"Email"> | number
    sender?: StringFilter<"Email"> | string
    senderName?: StringNullableFilter<"Email"> | string | null
    senderAvatar?: StringNullableFilter<"Email"> | string | null
    subject?: StringFilter<"Email"> | string
    content?: StringFilter<"Email"> | string
    timestamp?: DateTimeFilter<"Email"> | Date | string
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    isAIFlagged?: BoolFilter<"Email"> | boolean
    folder?: StringFilter<"Email"> | string
    contactId?: IntNullableFilter<"Email"> | number | null
    dealId?: IntNullableFilter<"Email"> | number | null
    summary?: StringNullableFilter<"Email"> | string | null
    sentiment?: StringNullableFilter<"Email"> | string | null
    sentimentScore?: IntNullableFilter<"Email"> | number | null
    attachments?: JsonNullableFilter<"Email">
    keyPoints?: StringNullableListFilter<"Email">
    intent?: StringNullableFilter<"Email"> | string | null
    suggestedActions?: StringNullableListFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    isDeleted?: BoolFilter<"Email"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }

  export type EmailOrderByWithRelationInput = {
    id?: SortOrder
    sender?: SortOrder
    senderName?: SortOrderInput | SortOrder
    senderAvatar?: SortOrderInput | SortOrder
    subject?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    isAIFlagged?: SortOrder
    folder?: SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    sentiment?: SortOrderInput | SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    keyPoints?: SortOrder
    intent?: SortOrderInput | SortOrder
    suggestedActions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    contact?: ContactOrderByWithRelationInput
    deal?: DealOrderByWithRelationInput
  }

  export type EmailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    sender?: StringFilter<"Email"> | string
    senderName?: StringNullableFilter<"Email"> | string | null
    senderAvatar?: StringNullableFilter<"Email"> | string | null
    subject?: StringFilter<"Email"> | string
    content?: StringFilter<"Email"> | string
    timestamp?: DateTimeFilter<"Email"> | Date | string
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    isAIFlagged?: BoolFilter<"Email"> | boolean
    folder?: StringFilter<"Email"> | string
    contactId?: IntNullableFilter<"Email"> | number | null
    dealId?: IntNullableFilter<"Email"> | number | null
    summary?: StringNullableFilter<"Email"> | string | null
    sentiment?: StringNullableFilter<"Email"> | string | null
    sentimentScore?: IntNullableFilter<"Email"> | number | null
    attachments?: JsonNullableFilter<"Email">
    keyPoints?: StringNullableListFilter<"Email">
    intent?: StringNullableFilter<"Email"> | string | null
    suggestedActions?: StringNullableListFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    isDeleted?: BoolFilter<"Email"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }, "id">

  export type EmailOrderByWithAggregationInput = {
    id?: SortOrder
    sender?: SortOrder
    senderName?: SortOrderInput | SortOrder
    senderAvatar?: SortOrderInput | SortOrder
    subject?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    isAIFlagged?: SortOrder
    folder?: SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    sentiment?: SortOrderInput | SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    keyPoints?: SortOrder
    intent?: SortOrderInput | SortOrder
    suggestedActions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: EmailCountOrderByAggregateInput
    _avg?: EmailAvgOrderByAggregateInput
    _max?: EmailMaxOrderByAggregateInput
    _min?: EmailMinOrderByAggregateInput
    _sum?: EmailSumOrderByAggregateInput
  }

  export type EmailScalarWhereWithAggregatesInput = {
    AND?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    OR?: EmailScalarWhereWithAggregatesInput[]
    NOT?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Email"> | number
    sender?: StringWithAggregatesFilter<"Email"> | string
    senderName?: StringNullableWithAggregatesFilter<"Email"> | string | null
    senderAvatar?: StringNullableWithAggregatesFilter<"Email"> | string | null
    subject?: StringWithAggregatesFilter<"Email"> | string
    content?: StringWithAggregatesFilter<"Email"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    isRead?: BoolWithAggregatesFilter<"Email"> | boolean
    isStarred?: BoolWithAggregatesFilter<"Email"> | boolean
    isAIFlagged?: BoolWithAggregatesFilter<"Email"> | boolean
    folder?: StringWithAggregatesFilter<"Email"> | string
    contactId?: IntNullableWithAggregatesFilter<"Email"> | number | null
    dealId?: IntNullableWithAggregatesFilter<"Email"> | number | null
    summary?: StringNullableWithAggregatesFilter<"Email"> | string | null
    sentiment?: StringNullableWithAggregatesFilter<"Email"> | string | null
    sentimentScore?: IntNullableWithAggregatesFilter<"Email"> | number | null
    attachments?: JsonNullableWithAggregatesFilter<"Email">
    keyPoints?: StringNullableListFilter<"Email">
    intent?: StringNullableWithAggregatesFilter<"Email"> | string | null
    suggestedActions?: StringNullableListFilter<"Email">
    createdAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Email"> | boolean
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    domain?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    size?: StringNullableFilter<"Company"> | string | null
    revenue?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    linkedinUrl?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    isDeleted?: BoolFilter<"Company"> | boolean
    contacts?: ContactListRelationFilter
    deals?: DealListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    revenue?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    contacts?: ContactOrderByRelationAggregateInput
    deals?: DealOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    domain?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    size?: StringNullableFilter<"Company"> | string | null
    revenue?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    linkedinUrl?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    isDeleted?: BoolFilter<"Company"> | boolean
    contacts?: ContactListRelationFilter
    deals?: DealListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    revenue?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    domain?: StringNullableWithAggregatesFilter<"Company"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Company"> | string | null
    size?: StringNullableWithAggregatesFilter<"Company"> | string | null
    revenue?: StringNullableWithAggregatesFilter<"Company"> | string | null
    location?: StringNullableWithAggregatesFilter<"Company"> | string | null
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Company"> | string | null
    description?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Company"> | boolean
  }

  export type DealWhereInput = {
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    id?: IntFilter<"Deal"> | number
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    currency?: StringFilter<"Deal"> | string
    stage?: StringFilter<"Deal"> | string
    probability?: IntNullableFilter<"Deal"> | number | null
    contactId?: IntNullableFilter<"Deal"> | number | null
    companyId?: IntNullableFilter<"Deal"> | number | null
    expectedCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    actualCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    lossReason?: StringNullableFilter<"Deal"> | string | null
    priority?: StringFilter<"Deal"> | string
    notes?: StringNullableFilter<"Deal"> | string | null
    competitors?: StringNullableListFilter<"Deal">
    owner?: StringFilter<"Deal"> | string
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    isDeleted?: BoolFilter<"Deal"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    lineItems?: LineItemListRelationFilter
    activities?: ActivityListRelationFilter
    tasks?: TaskListRelationFilter
    emails?: EmailListRelationFilter
  }

  export type DealOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    stage?: SortOrder
    probability?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    expectedCloseDate?: SortOrderInput | SortOrder
    actualCloseDate?: SortOrderInput | SortOrder
    lossReason?: SortOrderInput | SortOrder
    priority?: SortOrder
    notes?: SortOrderInput | SortOrder
    competitors?: SortOrder
    owner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    contact?: ContactOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    lineItems?: LineItemOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    emails?: EmailOrderByRelationAggregateInput
  }

  export type DealWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    currency?: StringFilter<"Deal"> | string
    stage?: StringFilter<"Deal"> | string
    probability?: IntNullableFilter<"Deal"> | number | null
    contactId?: IntNullableFilter<"Deal"> | number | null
    companyId?: IntNullableFilter<"Deal"> | number | null
    expectedCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    actualCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    lossReason?: StringNullableFilter<"Deal"> | string | null
    priority?: StringFilter<"Deal"> | string
    notes?: StringNullableFilter<"Deal"> | string | null
    competitors?: StringNullableListFilter<"Deal">
    owner?: StringFilter<"Deal"> | string
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    isDeleted?: BoolFilter<"Deal"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    lineItems?: LineItemListRelationFilter
    activities?: ActivityListRelationFilter
    tasks?: TaskListRelationFilter
    emails?: EmailListRelationFilter
  }, "id">

  export type DealOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    stage?: SortOrder
    probability?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    expectedCloseDate?: SortOrderInput | SortOrder
    actualCloseDate?: SortOrderInput | SortOrder
    lossReason?: SortOrderInput | SortOrder
    priority?: SortOrder
    notes?: SortOrderInput | SortOrder
    competitors?: SortOrder
    owner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: DealCountOrderByAggregateInput
    _avg?: DealAvgOrderByAggregateInput
    _max?: DealMaxOrderByAggregateInput
    _min?: DealMinOrderByAggregateInput
    _sum?: DealSumOrderByAggregateInput
  }

  export type DealScalarWhereWithAggregatesInput = {
    AND?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    OR?: DealScalarWhereWithAggregatesInput[]
    NOT?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Deal"> | number
    name?: StringWithAggregatesFilter<"Deal"> | string
    value?: FloatWithAggregatesFilter<"Deal"> | number
    currency?: StringWithAggregatesFilter<"Deal"> | string
    stage?: StringWithAggregatesFilter<"Deal"> | string
    probability?: IntNullableWithAggregatesFilter<"Deal"> | number | null
    contactId?: IntNullableWithAggregatesFilter<"Deal"> | number | null
    companyId?: IntNullableWithAggregatesFilter<"Deal"> | number | null
    expectedCloseDate?: DateTimeNullableWithAggregatesFilter<"Deal"> | Date | string | null
    actualCloseDate?: DateTimeNullableWithAggregatesFilter<"Deal"> | Date | string | null
    lossReason?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    priority?: StringWithAggregatesFilter<"Deal"> | string
    notes?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    competitors?: StringNullableListFilter<"Deal">
    owner?: StringWithAggregatesFilter<"Deal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Deal"> | boolean
  }

  export type LineItemWhereInput = {
    AND?: LineItemWhereInput | LineItemWhereInput[]
    OR?: LineItemWhereInput[]
    NOT?: LineItemWhereInput | LineItemWhereInput[]
    id?: IntFilter<"LineItem"> | number
    dealId?: IntFilter<"LineItem"> | number
    productName?: StringFilter<"LineItem"> | string
    quantity?: IntFilter<"LineItem"> | number
    unitPrice?: FloatFilter<"LineItem"> | number
    total?: FloatFilter<"LineItem"> | number
    createdAt?: DateTimeFilter<"LineItem"> | Date | string
    updatedAt?: DateTimeFilter<"LineItem"> | Date | string
    isDeleted?: BoolFilter<"LineItem"> | boolean
    deal?: XOR<DealScalarRelationFilter, DealWhereInput>
  }

  export type LineItemOrderByWithRelationInput = {
    id?: SortOrder
    dealId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    deal?: DealOrderByWithRelationInput
  }

  export type LineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LineItemWhereInput | LineItemWhereInput[]
    OR?: LineItemWhereInput[]
    NOT?: LineItemWhereInput | LineItemWhereInput[]
    dealId?: IntFilter<"LineItem"> | number
    productName?: StringFilter<"LineItem"> | string
    quantity?: IntFilter<"LineItem"> | number
    unitPrice?: FloatFilter<"LineItem"> | number
    total?: FloatFilter<"LineItem"> | number
    createdAt?: DateTimeFilter<"LineItem"> | Date | string
    updatedAt?: DateTimeFilter<"LineItem"> | Date | string
    isDeleted?: BoolFilter<"LineItem"> | boolean
    deal?: XOR<DealScalarRelationFilter, DealWhereInput>
  }, "id">

  export type LineItemOrderByWithAggregationInput = {
    id?: SortOrder
    dealId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: LineItemCountOrderByAggregateInput
    _avg?: LineItemAvgOrderByAggregateInput
    _max?: LineItemMaxOrderByAggregateInput
    _min?: LineItemMinOrderByAggregateInput
    _sum?: LineItemSumOrderByAggregateInput
  }

  export type LineItemScalarWhereWithAggregatesInput = {
    AND?: LineItemScalarWhereWithAggregatesInput | LineItemScalarWhereWithAggregatesInput[]
    OR?: LineItemScalarWhereWithAggregatesInput[]
    NOT?: LineItemScalarWhereWithAggregatesInput | LineItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LineItem"> | number
    dealId?: IntWithAggregatesFilter<"LineItem"> | number
    productName?: StringWithAggregatesFilter<"LineItem"> | string
    quantity?: IntWithAggregatesFilter<"LineItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"LineItem"> | number
    total?: FloatWithAggregatesFilter<"LineItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LineItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LineItem"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"LineItem"> | boolean
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    type?: StringFilter<"Activity"> | string
    title?: StringFilter<"Activity"> | string
    description?: StringNullableFilter<"Activity"> | string | null
    contactId?: IntNullableFilter<"Activity"> | number | null
    dealId?: IntNullableFilter<"Activity"> | number | null
    date?: DateTimeFilter<"Activity"> | Date | string
    durationMinutes?: IntNullableFilter<"Activity"> | number | null
    outcome?: StringNullableFilter<"Activity"> | string | null
    nextSteps?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
    isDeleted?: BoolFilter<"Activity"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    date?: SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    nextSteps?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    contact?: ContactOrderByWithRelationInput
    deal?: DealOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    type?: StringFilter<"Activity"> | string
    title?: StringFilter<"Activity"> | string
    description?: StringNullableFilter<"Activity"> | string | null
    contactId?: IntNullableFilter<"Activity"> | number | null
    dealId?: IntNullableFilter<"Activity"> | number | null
    date?: DateTimeFilter<"Activity"> | Date | string
    durationMinutes?: IntNullableFilter<"Activity"> | number | null
    outcome?: StringNullableFilter<"Activity"> | string | null
    nextSteps?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
    isDeleted?: BoolFilter<"Activity"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    date?: SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    nextSteps?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    type?: StringWithAggregatesFilter<"Activity"> | string
    title?: StringWithAggregatesFilter<"Activity"> | string
    description?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    contactId?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    dealId?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    date?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    durationMinutes?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    outcome?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    nextSteps?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Activity"> | boolean
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    contactId?: IntNullableFilter<"Task"> | number | null
    dealId?: IntNullableFilter<"Task"> | number | null
    aiGenerated?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    isDeleted?: BoolFilter<"Task"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    contact?: ContactOrderByWithRelationInput
    deal?: DealOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    contactId?: IntNullableFilter<"Task"> | number | null
    dealId?: IntNullableFilter<"Task"> | number | null
    aiGenerated?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    isDeleted?: BoolFilter<"Task"> | boolean
    contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    deal?: XOR<DealNullableScalarRelationFilter, DealWhereInput> | null
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    contactId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    priority?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    contactId?: IntNullableWithAggregatesFilter<"Task"> | number | null
    dealId?: IntNullableWithAggregatesFilter<"Task"> | number | null
    aiGenerated?: BoolWithAggregatesFilter<"Task"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Task"> | boolean
  }

  export type EmailTemplateWhereInput = {
    AND?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    OR?: EmailTemplateWhereInput[]
    NOT?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    id?: IntFilter<"EmailTemplate"> | number
    name?: StringNullableFilter<"EmailTemplate"> | string | null
    subject?: StringNullableFilter<"EmailTemplate"> | string | null
    body?: StringNullableFilter<"EmailTemplate"> | string | null
    category?: StringNullableFilter<"EmailTemplate"> | string | null
    aiGenerated?: BoolFilter<"EmailTemplate"> | boolean
    createdAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    isDeleted?: BoolFilter<"EmailTemplate"> | boolean
  }

  export type EmailTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    OR?: EmailTemplateWhereInput[]
    NOT?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    name?: StringNullableFilter<"EmailTemplate"> | string | null
    subject?: StringNullableFilter<"EmailTemplate"> | string | null
    body?: StringNullableFilter<"EmailTemplate"> | string | null
    category?: StringNullableFilter<"EmailTemplate"> | string | null
    aiGenerated?: BoolFilter<"EmailTemplate"> | boolean
    createdAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    isDeleted?: BoolFilter<"EmailTemplate"> | boolean
  }, "id">

  export type EmailTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: EmailTemplateCountOrderByAggregateInput
    _avg?: EmailTemplateAvgOrderByAggregateInput
    _max?: EmailTemplateMaxOrderByAggregateInput
    _min?: EmailTemplateMinOrderByAggregateInput
    _sum?: EmailTemplateSumOrderByAggregateInput
  }

  export type EmailTemplateScalarWhereWithAggregatesInput = {
    AND?: EmailTemplateScalarWhereWithAggregatesInput | EmailTemplateScalarWhereWithAggregatesInput[]
    OR?: EmailTemplateScalarWhereWithAggregatesInput[]
    NOT?: EmailTemplateScalarWhereWithAggregatesInput | EmailTemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailTemplate"> | number
    name?: StringNullableWithAggregatesFilter<"EmailTemplate"> | string | null
    subject?: StringNullableWithAggregatesFilter<"EmailTemplate"> | string | null
    body?: StringNullableWithAggregatesFilter<"EmailTemplate"> | string | null
    category?: StringNullableWithAggregatesFilter<"EmailTemplate"> | string | null
    aiGenerated?: BoolWithAggregatesFilter<"EmailTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailTemplate"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"EmailTemplate"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
    identities?: UserIdentityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityCreateInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
    user: UserCreateNestedOneWithoutIdentitiesInput
  }

  export type UserIdentityUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    user?: UserUpdateOneRequiredWithoutIdentitiesNestedInput
  }

  export type UserIdentityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityCreateManyInput = {
    id?: string
    userId: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpCreateInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUncheckedCreateInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpCreateManyInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ContactCreateInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutContactsInput
    activities?: ActivityCreateNestedManyWithoutContactInput
    tasks?: TaskCreateNestedManyWithoutContactInput
    deals?: DealCreateNestedManyWithoutContactInput
    emails?: EmailCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutContactInput
    tasks?: TaskUncheckedCreateNestedManyWithoutContactInput
    deals?: DealUncheckedCreateNestedManyWithoutContactInput
    emails?: EmailUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutContactsNestedInput
    activities?: ActivityUpdateManyWithoutContactNestedInput
    tasks?: TaskUpdateManyWithoutContactNestedInput
    deals?: DealUpdateManyWithoutContactNestedInput
    emails?: EmailUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutContactNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutContactNestedInput
    deals?: DealUncheckedUpdateManyWithoutContactNestedInput
    emails?: EmailUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ContactUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailCreateInput = {
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutEmailsInput
    deal?: DealCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    contactId?: number | null
    dealId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailUpdateInput = {
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutEmailsNestedInput
    deal?: DealUpdateOneWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailCreateManyInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    contactId?: number | null
    dealId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailUpdateManyMutationInput = {
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CompanyCreateInput = {
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contacts?: ContactCreateNestedManyWithoutCompanyInput
    deals?: DealCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contacts?: ContactUncheckedCreateNestedManyWithoutCompanyInput
    deals?: DealUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contacts?: ContactUpdateManyWithoutCompanyNestedInput
    deals?: DealUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contacts?: ContactUncheckedUpdateManyWithoutCompanyNestedInput
    deals?: DealUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DealCreateInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    company?: CompanyCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    company?: CompanyUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type DealCreateManyInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type DealUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DealUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemCreateInput = {
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deal: DealCreateNestedOneWithoutLineItemsInput
  }

  export type LineItemUncheckedCreateInput = {
    id?: number
    dealId: number
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LineItemUpdateInput = {
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deal?: DealUpdateOneRequiredWithoutLineItemsNestedInput
  }

  export type LineItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemCreateManyInput = {
    id?: number
    dealId: number
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LineItemUpdateManyMutationInput = {
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateInput = {
    type: string
    title: string
    description?: string | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutActivitiesInput
    deal?: DealCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    contactId?: number | null
    dealId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutActivitiesNestedInput
    deal?: DealUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateManyInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    contactId?: number | null
    dealId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateInput = {
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutTasksInput
    deal?: DealCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    contactId?: number | null
    dealId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutTasksNestedInput
    deal?: DealUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    contactId?: number | null
    dealId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailTemplateCreateInput = {
    name?: string | null
    subject?: string | null
    body?: string | null
    category?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailTemplateUncheckedCreateInput = {
    id?: number
    name?: string | null
    subject?: string | null
    body?: string | null
    category?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailTemplateUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailTemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailTemplateCreateManyInput = {
    id?: number
    name?: string | null
    subject?: string | null
    body?: string | null
    category?: string | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailTemplateUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailTemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserIdentityListRelationFilter = {
    every?: UserIdentityWhereInput
    some?: UserIdentityWhereInput
    none?: UserIdentityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserIdentityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserIdentityProviderProviderIdCompoundUniqueInput = {
    provider: string
    providerId: string
  }

  export type UserIdentityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserIdentityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserIdentityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OtpCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type OtpMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpSumOrderByAggregateInput = {
    attempts?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type DealListRelationFilter = {
    every?: DealWhereInput
    some?: DealWhereInput
    none?: DealWhereInput
  }

  export type EmailListRelationFilter = {
    every?: EmailWhereInput
    some?: EmailWhereInput
    none?: EmailWhereInput
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    jobTitle?: SortOrder
    companyId?: SortOrder
    leadSource?: SortOrder
    leadStatus?: SortOrder
    leadScore?: SortOrder
    tags?: SortOrder
    address?: SortOrder
    linkedinUrl?: SortOrder
    twitterUrl?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    lastContacted?: SortOrder
    owner?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ContactAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    leadScore?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    jobTitle?: SortOrder
    companyId?: SortOrder
    leadSource?: SortOrder
    leadStatus?: SortOrder
    leadScore?: SortOrder
    address?: SortOrder
    linkedinUrl?: SortOrder
    twitterUrl?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    lastContacted?: SortOrder
    owner?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    jobTitle?: SortOrder
    companyId?: SortOrder
    leadSource?: SortOrder
    leadStatus?: SortOrder
    leadScore?: SortOrder
    address?: SortOrder
    linkedinUrl?: SortOrder
    twitterUrl?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    lastContacted?: SortOrder
    owner?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ContactSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    leadScore?: SortOrder
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

  export type ContactNullableScalarRelationFilter = {
    is?: ContactWhereInput | null
    isNot?: ContactWhereInput | null
  }

  export type DealNullableScalarRelationFilter = {
    is?: DealWhereInput | null
    isNot?: DealWhereInput | null
  }

  export type EmailCountOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    senderName?: SortOrder
    senderAvatar?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    isAIFlagged?: SortOrder
    folder?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    summary?: SortOrder
    sentiment?: SortOrder
    sentimentScore?: SortOrder
    attachments?: SortOrder
    keyPoints?: SortOrder
    intent?: SortOrder
    suggestedActions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailAvgOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    sentimentScore?: SortOrder
  }

  export type EmailMaxOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    senderName?: SortOrder
    senderAvatar?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    isAIFlagged?: SortOrder
    folder?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    summary?: SortOrder
    sentiment?: SortOrder
    sentimentScore?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailMinOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    senderName?: SortOrder
    senderAvatar?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    isAIFlagged?: SortOrder
    folder?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    summary?: SortOrder
    sentiment?: SortOrder
    sentimentScore?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailSumOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    sentimentScore?: SortOrder
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    industry?: SortOrder
    size?: SortOrder
    revenue?: SortOrder
    location?: SortOrder
    website?: SortOrder
    linkedinUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    industry?: SortOrder
    size?: SortOrder
    revenue?: SortOrder
    location?: SortOrder
    website?: SortOrder
    linkedinUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    industry?: SortOrder
    size?: SortOrder
    revenue?: SortOrder
    location?: SortOrder
    website?: SortOrder
    linkedinUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LineItemListRelationFilter = {
    every?: LineItemWhereInput
    some?: LineItemWhereInput
    none?: LineItemWhereInput
  }

  export type LineItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    stage?: SortOrder
    probability?: SortOrder
    contactId?: SortOrder
    companyId?: SortOrder
    expectedCloseDate?: SortOrder
    actualCloseDate?: SortOrder
    lossReason?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    competitors?: SortOrder
    owner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type DealAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    probability?: SortOrder
    contactId?: SortOrder
    companyId?: SortOrder
  }

  export type DealMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    stage?: SortOrder
    probability?: SortOrder
    contactId?: SortOrder
    companyId?: SortOrder
    expectedCloseDate?: SortOrder
    actualCloseDate?: SortOrder
    lossReason?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    owner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type DealMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    stage?: SortOrder
    probability?: SortOrder
    contactId?: SortOrder
    companyId?: SortOrder
    expectedCloseDate?: SortOrder
    actualCloseDate?: SortOrder
    lossReason?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    owner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type DealSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    probability?: SortOrder
    contactId?: SortOrder
    companyId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DealScalarRelationFilter = {
    is?: DealWhereInput
    isNot?: DealWhereInput
  }

  export type LineItemCountOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LineItemAvgOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
  }

  export type LineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LineItemMinOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    productName?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LineItemSumOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    total?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    date?: SortOrder
    durationMinutes?: SortOrder
    outcome?: SortOrder
    nextSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    durationMinutes?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    date?: SortOrder
    durationMinutes?: SortOrder
    outcome?: SortOrder
    nextSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    date?: SortOrder
    durationMinutes?: SortOrder
    outcome?: SortOrder
    nextSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    durationMinutes?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    dealId?: SortOrder
  }

  export type EmailTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    category?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailTemplateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmailTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    category?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    category?: SortOrder
    aiGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type EmailTemplateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserIdentityCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
  }

  export type UserIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
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

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserIdentityUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutIdentitiesInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutIdentitiesNestedInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    upsert?: UserUpsertWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutIdentitiesInput, UserUpdateWithoutIdentitiesInput>, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ContactCreatetagsInput = {
    set: string[]
  }

  export type CompanyCreateNestedOneWithoutContactsInput = {
    create?: XOR<CompanyCreateWithoutContactsInput, CompanyUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutContactsInput
    connect?: CompanyWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutContactInput = {
    create?: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput> | ActivityCreateWithoutContactInput[] | ActivityUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutContactInput | ActivityCreateOrConnectWithoutContactInput[]
    createMany?: ActivityCreateManyContactInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutContactInput = {
    create?: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput> | TaskCreateWithoutContactInput[] | TaskUncheckedCreateWithoutContactInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutContactInput | TaskCreateOrConnectWithoutContactInput[]
    createMany?: TaskCreateManyContactInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DealCreateNestedManyWithoutContactInput = {
    create?: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput> | DealCreateWithoutContactInput[] | DealUncheckedCreateWithoutContactInput[]
    connectOrCreate?: DealCreateOrConnectWithoutContactInput | DealCreateOrConnectWithoutContactInput[]
    createMany?: DealCreateManyContactInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type EmailCreateNestedManyWithoutContactInput = {
    create?: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput> | EmailCreateWithoutContactInput[] | EmailUncheckedCreateWithoutContactInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutContactInput | EmailCreateOrConnectWithoutContactInput[]
    createMany?: EmailCreateManyContactInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput> | ActivityCreateWithoutContactInput[] | ActivityUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutContactInput | ActivityCreateOrConnectWithoutContactInput[]
    createMany?: ActivityCreateManyContactInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput> | TaskCreateWithoutContactInput[] | TaskUncheckedCreateWithoutContactInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutContactInput | TaskCreateOrConnectWithoutContactInput[]
    createMany?: TaskCreateManyContactInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput> | DealCreateWithoutContactInput[] | DealUncheckedCreateWithoutContactInput[]
    connectOrCreate?: DealCreateOrConnectWithoutContactInput | DealCreateOrConnectWithoutContactInput[]
    createMany?: DealCreateManyContactInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput> | EmailCreateWithoutContactInput[] | EmailUncheckedCreateWithoutContactInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutContactInput | EmailCreateOrConnectWithoutContactInput[]
    createMany?: EmailCreateManyContactInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type ContactUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CompanyUpdateOneWithoutContactsNestedInput = {
    create?: XOR<CompanyCreateWithoutContactsInput, CompanyUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutContactsInput
    upsert?: CompanyUpsertWithoutContactsInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutContactsInput, CompanyUpdateWithoutContactsInput>, CompanyUncheckedUpdateWithoutContactsInput>
  }

  export type ActivityUpdateManyWithoutContactNestedInput = {
    create?: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput> | ActivityCreateWithoutContactInput[] | ActivityUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutContactInput | ActivityCreateOrConnectWithoutContactInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutContactInput | ActivityUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: ActivityCreateManyContactInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutContactInput | ActivityUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutContactInput | ActivityUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutContactNestedInput = {
    create?: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput> | TaskCreateWithoutContactInput[] | TaskUncheckedCreateWithoutContactInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutContactInput | TaskCreateOrConnectWithoutContactInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutContactInput | TaskUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: TaskCreateManyContactInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutContactInput | TaskUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutContactInput | TaskUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DealUpdateManyWithoutContactNestedInput = {
    create?: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput> | DealCreateWithoutContactInput[] | DealUncheckedCreateWithoutContactInput[]
    connectOrCreate?: DealCreateOrConnectWithoutContactInput | DealCreateOrConnectWithoutContactInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutContactInput | DealUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: DealCreateManyContactInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutContactInput | DealUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: DealUpdateManyWithWhereWithoutContactInput | DealUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type EmailUpdateManyWithoutContactNestedInput = {
    create?: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput> | EmailCreateWithoutContactInput[] | EmailUncheckedCreateWithoutContactInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutContactInput | EmailCreateOrConnectWithoutContactInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutContactInput | EmailUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: EmailCreateManyContactInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutContactInput | EmailUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutContactInput | EmailUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput> | ActivityCreateWithoutContactInput[] | ActivityUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutContactInput | ActivityCreateOrConnectWithoutContactInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutContactInput | ActivityUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: ActivityCreateManyContactInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutContactInput | ActivityUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutContactInput | ActivityUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput> | TaskCreateWithoutContactInput[] | TaskUncheckedCreateWithoutContactInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutContactInput | TaskCreateOrConnectWithoutContactInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutContactInput | TaskUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: TaskCreateManyContactInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutContactInput | TaskUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutContactInput | TaskUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput> | DealCreateWithoutContactInput[] | DealUncheckedCreateWithoutContactInput[]
    connectOrCreate?: DealCreateOrConnectWithoutContactInput | DealCreateOrConnectWithoutContactInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutContactInput | DealUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: DealCreateManyContactInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutContactInput | DealUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: DealUpdateManyWithWhereWithoutContactInput | DealUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput> | EmailCreateWithoutContactInput[] | EmailUncheckedCreateWithoutContactInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutContactInput | EmailCreateOrConnectWithoutContactInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutContactInput | EmailUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: EmailCreateManyContactInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutContactInput | EmailUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutContactInput | EmailUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type EmailCreatekeyPointsInput = {
    set: string[]
  }

  export type EmailCreatesuggestedActionsInput = {
    set: string[]
  }

  export type ContactCreateNestedOneWithoutEmailsInput = {
    create?: XOR<ContactCreateWithoutEmailsInput, ContactUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ContactCreateOrConnectWithoutEmailsInput
    connect?: ContactWhereUniqueInput
  }

  export type DealCreateNestedOneWithoutEmailsInput = {
    create?: XOR<DealCreateWithoutEmailsInput, DealUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: DealCreateOrConnectWithoutEmailsInput
    connect?: DealWhereUniqueInput
  }

  export type EmailUpdatekeyPointsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EmailUpdatesuggestedActionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ContactUpdateOneWithoutEmailsNestedInput = {
    create?: XOR<ContactCreateWithoutEmailsInput, ContactUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ContactCreateOrConnectWithoutEmailsInput
    upsert?: ContactUpsertWithoutEmailsInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutEmailsInput, ContactUpdateWithoutEmailsInput>, ContactUncheckedUpdateWithoutEmailsInput>
  }

  export type DealUpdateOneWithoutEmailsNestedInput = {
    create?: XOR<DealCreateWithoutEmailsInput, DealUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: DealCreateOrConnectWithoutEmailsInput
    upsert?: DealUpsertWithoutEmailsInput
    disconnect?: DealWhereInput | boolean
    delete?: DealWhereInput | boolean
    connect?: DealWhereUniqueInput
    update?: XOR<XOR<DealUpdateToOneWithWhereWithoutEmailsInput, DealUpdateWithoutEmailsInput>, DealUncheckedUpdateWithoutEmailsInput>
  }

  export type ContactCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput> | ContactCreateWithoutCompanyInput[] | ContactUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutCompanyInput | ContactCreateOrConnectWithoutCompanyInput[]
    createMany?: ContactCreateManyCompanyInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type DealCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput> | DealCreateWithoutCompanyInput[] | DealUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DealCreateOrConnectWithoutCompanyInput | DealCreateOrConnectWithoutCompanyInput[]
    createMany?: DealCreateManyCompanyInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput> | ContactCreateWithoutCompanyInput[] | ContactUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutCompanyInput | ContactCreateOrConnectWithoutCompanyInput[]
    createMany?: ContactCreateManyCompanyInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput> | DealCreateWithoutCompanyInput[] | DealUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DealCreateOrConnectWithoutCompanyInput | DealCreateOrConnectWithoutCompanyInput[]
    createMany?: DealCreateManyCompanyInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type ContactUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput> | ContactCreateWithoutCompanyInput[] | ContactUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutCompanyInput | ContactCreateOrConnectWithoutCompanyInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutCompanyInput | ContactUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ContactCreateManyCompanyInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutCompanyInput | ContactUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutCompanyInput | ContactUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type DealUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput> | DealCreateWithoutCompanyInput[] | DealUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DealCreateOrConnectWithoutCompanyInput | DealCreateOrConnectWithoutCompanyInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutCompanyInput | DealUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DealCreateManyCompanyInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutCompanyInput | DealUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DealUpdateManyWithWhereWithoutCompanyInput | DealUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput> | ContactCreateWithoutCompanyInput[] | ContactUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutCompanyInput | ContactCreateOrConnectWithoutCompanyInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutCompanyInput | ContactUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ContactCreateManyCompanyInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutCompanyInput | ContactUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutCompanyInput | ContactUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput> | DealCreateWithoutCompanyInput[] | DealUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DealCreateOrConnectWithoutCompanyInput | DealCreateOrConnectWithoutCompanyInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutCompanyInput | DealUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DealCreateManyCompanyInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutCompanyInput | DealUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DealUpdateManyWithWhereWithoutCompanyInput | DealUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type DealCreatecompetitorsInput = {
    set: string[]
  }

  export type ContactCreateNestedOneWithoutDealsInput = {
    create?: XOR<ContactCreateWithoutDealsInput, ContactUncheckedCreateWithoutDealsInput>
    connectOrCreate?: ContactCreateOrConnectWithoutDealsInput
    connect?: ContactWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutDealsInput = {
    create?: XOR<CompanyCreateWithoutDealsInput, CompanyUncheckedCreateWithoutDealsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDealsInput
    connect?: CompanyWhereUniqueInput
  }

  export type LineItemCreateNestedManyWithoutDealInput = {
    create?: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput> | LineItemCreateWithoutDealInput[] | LineItemUncheckedCreateWithoutDealInput[]
    connectOrCreate?: LineItemCreateOrConnectWithoutDealInput | LineItemCreateOrConnectWithoutDealInput[]
    createMany?: LineItemCreateManyDealInputEnvelope
    connect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutDealInput = {
    create?: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput> | ActivityCreateWithoutDealInput[] | ActivityUncheckedCreateWithoutDealInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutDealInput | ActivityCreateOrConnectWithoutDealInput[]
    createMany?: ActivityCreateManyDealInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutDealInput = {
    create?: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput> | TaskCreateWithoutDealInput[] | TaskUncheckedCreateWithoutDealInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDealInput | TaskCreateOrConnectWithoutDealInput[]
    createMany?: TaskCreateManyDealInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EmailCreateNestedManyWithoutDealInput = {
    create?: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput> | EmailCreateWithoutDealInput[] | EmailUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutDealInput | EmailCreateOrConnectWithoutDealInput[]
    createMany?: EmailCreateManyDealInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type LineItemUncheckedCreateNestedManyWithoutDealInput = {
    create?: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput> | LineItemCreateWithoutDealInput[] | LineItemUncheckedCreateWithoutDealInput[]
    connectOrCreate?: LineItemCreateOrConnectWithoutDealInput | LineItemCreateOrConnectWithoutDealInput[]
    createMany?: LineItemCreateManyDealInputEnvelope
    connect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutDealInput = {
    create?: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput> | ActivityCreateWithoutDealInput[] | ActivityUncheckedCreateWithoutDealInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutDealInput | ActivityCreateOrConnectWithoutDealInput[]
    createMany?: ActivityCreateManyDealInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutDealInput = {
    create?: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput> | TaskCreateWithoutDealInput[] | TaskUncheckedCreateWithoutDealInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDealInput | TaskCreateOrConnectWithoutDealInput[]
    createMany?: TaskCreateManyDealInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutDealInput = {
    create?: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput> | EmailCreateWithoutDealInput[] | EmailUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutDealInput | EmailCreateOrConnectWithoutDealInput[]
    createMany?: EmailCreateManyDealInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DealUpdatecompetitorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ContactUpdateOneWithoutDealsNestedInput = {
    create?: XOR<ContactCreateWithoutDealsInput, ContactUncheckedCreateWithoutDealsInput>
    connectOrCreate?: ContactCreateOrConnectWithoutDealsInput
    upsert?: ContactUpsertWithoutDealsInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutDealsInput, ContactUpdateWithoutDealsInput>, ContactUncheckedUpdateWithoutDealsInput>
  }

  export type CompanyUpdateOneWithoutDealsNestedInput = {
    create?: XOR<CompanyCreateWithoutDealsInput, CompanyUncheckedCreateWithoutDealsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDealsInput
    upsert?: CompanyUpsertWithoutDealsInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutDealsInput, CompanyUpdateWithoutDealsInput>, CompanyUncheckedUpdateWithoutDealsInput>
  }

  export type LineItemUpdateManyWithoutDealNestedInput = {
    create?: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput> | LineItemCreateWithoutDealInput[] | LineItemUncheckedCreateWithoutDealInput[]
    connectOrCreate?: LineItemCreateOrConnectWithoutDealInput | LineItemCreateOrConnectWithoutDealInput[]
    upsert?: LineItemUpsertWithWhereUniqueWithoutDealInput | LineItemUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: LineItemCreateManyDealInputEnvelope
    set?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    disconnect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    delete?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    connect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    update?: LineItemUpdateWithWhereUniqueWithoutDealInput | LineItemUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: LineItemUpdateManyWithWhereWithoutDealInput | LineItemUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: LineItemScalarWhereInput | LineItemScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutDealNestedInput = {
    create?: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput> | ActivityCreateWithoutDealInput[] | ActivityUncheckedCreateWithoutDealInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutDealInput | ActivityCreateOrConnectWithoutDealInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutDealInput | ActivityUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: ActivityCreateManyDealInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutDealInput | ActivityUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutDealInput | ActivityUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutDealNestedInput = {
    create?: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput> | TaskCreateWithoutDealInput[] | TaskUncheckedCreateWithoutDealInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDealInput | TaskCreateOrConnectWithoutDealInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutDealInput | TaskUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: TaskCreateManyDealInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutDealInput | TaskUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutDealInput | TaskUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type EmailUpdateManyWithoutDealNestedInput = {
    create?: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput> | EmailCreateWithoutDealInput[] | EmailUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutDealInput | EmailCreateOrConnectWithoutDealInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutDealInput | EmailUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: EmailCreateManyDealInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutDealInput | EmailUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutDealInput | EmailUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type LineItemUncheckedUpdateManyWithoutDealNestedInput = {
    create?: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput> | LineItemCreateWithoutDealInput[] | LineItemUncheckedCreateWithoutDealInput[]
    connectOrCreate?: LineItemCreateOrConnectWithoutDealInput | LineItemCreateOrConnectWithoutDealInput[]
    upsert?: LineItemUpsertWithWhereUniqueWithoutDealInput | LineItemUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: LineItemCreateManyDealInputEnvelope
    set?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    disconnect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    delete?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    connect?: LineItemWhereUniqueInput | LineItemWhereUniqueInput[]
    update?: LineItemUpdateWithWhereUniqueWithoutDealInput | LineItemUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: LineItemUpdateManyWithWhereWithoutDealInput | LineItemUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: LineItemScalarWhereInput | LineItemScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutDealNestedInput = {
    create?: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput> | ActivityCreateWithoutDealInput[] | ActivityUncheckedCreateWithoutDealInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutDealInput | ActivityCreateOrConnectWithoutDealInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutDealInput | ActivityUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: ActivityCreateManyDealInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutDealInput | ActivityUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutDealInput | ActivityUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutDealNestedInput = {
    create?: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput> | TaskCreateWithoutDealInput[] | TaskUncheckedCreateWithoutDealInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDealInput | TaskCreateOrConnectWithoutDealInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutDealInput | TaskUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: TaskCreateManyDealInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutDealInput | TaskUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutDealInput | TaskUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutDealNestedInput = {
    create?: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput> | EmailCreateWithoutDealInput[] | EmailUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutDealInput | EmailCreateOrConnectWithoutDealInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutDealInput | EmailUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: EmailCreateManyDealInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutDealInput | EmailUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutDealInput | EmailUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DealCreateNestedOneWithoutLineItemsInput = {
    create?: XOR<DealCreateWithoutLineItemsInput, DealUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: DealCreateOrConnectWithoutLineItemsInput
    connect?: DealWhereUniqueInput
  }

  export type DealUpdateOneRequiredWithoutLineItemsNestedInput = {
    create?: XOR<DealCreateWithoutLineItemsInput, DealUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: DealCreateOrConnectWithoutLineItemsInput
    upsert?: DealUpsertWithoutLineItemsInput
    connect?: DealWhereUniqueInput
    update?: XOR<XOR<DealUpdateToOneWithWhereWithoutLineItemsInput, DealUpdateWithoutLineItemsInput>, DealUncheckedUpdateWithoutLineItemsInput>
  }

  export type ContactCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<ContactCreateWithoutActivitiesInput, ContactUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ContactCreateOrConnectWithoutActivitiesInput
    connect?: ContactWhereUniqueInput
  }

  export type DealCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<DealCreateWithoutActivitiesInput, DealUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: DealCreateOrConnectWithoutActivitiesInput
    connect?: DealWhereUniqueInput
  }

  export type ContactUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<ContactCreateWithoutActivitiesInput, ContactUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ContactCreateOrConnectWithoutActivitiesInput
    upsert?: ContactUpsertWithoutActivitiesInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutActivitiesInput, ContactUpdateWithoutActivitiesInput>, ContactUncheckedUpdateWithoutActivitiesInput>
  }

  export type DealUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<DealCreateWithoutActivitiesInput, DealUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: DealCreateOrConnectWithoutActivitiesInput
    upsert?: DealUpsertWithoutActivitiesInput
    disconnect?: DealWhereInput | boolean
    delete?: DealWhereInput | boolean
    connect?: DealWhereUniqueInput
    update?: XOR<XOR<DealUpdateToOneWithWhereWithoutActivitiesInput, DealUpdateWithoutActivitiesInput>, DealUncheckedUpdateWithoutActivitiesInput>
  }

  export type ContactCreateNestedOneWithoutTasksInput = {
    create?: XOR<ContactCreateWithoutTasksInput, ContactUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ContactCreateOrConnectWithoutTasksInput
    connect?: ContactWhereUniqueInput
  }

  export type DealCreateNestedOneWithoutTasksInput = {
    create?: XOR<DealCreateWithoutTasksInput, DealUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DealCreateOrConnectWithoutTasksInput
    connect?: DealWhereUniqueInput
  }

  export type ContactUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ContactCreateWithoutTasksInput, ContactUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ContactCreateOrConnectWithoutTasksInput
    upsert?: ContactUpsertWithoutTasksInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutTasksInput, ContactUpdateWithoutTasksInput>, ContactUncheckedUpdateWithoutTasksInput>
  }

  export type DealUpdateOneWithoutTasksNestedInput = {
    create?: XOR<DealCreateWithoutTasksInput, DealUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DealCreateOrConnectWithoutTasksInput
    upsert?: DealUpsertWithoutTasksInput
    disconnect?: DealWhereInput | boolean
    delete?: DealWhereInput | boolean
    connect?: DealWhereUniqueInput
    update?: XOR<XOR<DealUpdateToOneWithWhereWithoutTasksInput, DealUpdateWithoutTasksInput>, DealUncheckedUpdateWithoutTasksInput>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserIdentityCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityCreateOrConnectWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityCreateManyUserInputEnvelope = {
    data: UserIdentityCreateManyUserInput | UserIdentityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    update: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    data: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
  }

  export type UserIdentityUpdateManyWithWhereWithoutUserInput = {
    where: UserIdentityScalarWhereInput
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyWithoutUserInput>
  }

  export type UserIdentityScalarWhereInput = {
    AND?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    OR?: UserIdentityScalarWhereInput[]
    NOT?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
  }

  export type UserCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserUncheckedCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserCreateOrConnectWithoutIdentitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
  }

  export type UserUpsertWithoutIdentitiesInput = {
    update: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutIdentitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type CompanyCreateWithoutContactsInput = {
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deals?: DealCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutContactsInput = {
    id?: number
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deals?: DealUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutContactsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutContactsInput, CompanyUncheckedCreateWithoutContactsInput>
  }

  export type ActivityCreateWithoutContactInput = {
    type: string
    title: string
    description?: string | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deal?: DealCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutContactInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    dealId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityCreateOrConnectWithoutContactInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput>
  }

  export type ActivityCreateManyContactInputEnvelope = {
    data: ActivityCreateManyContactInput | ActivityCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutContactInput = {
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deal?: DealCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutContactInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    dealId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskCreateOrConnectWithoutContactInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput>
  }

  export type TaskCreateManyContactInputEnvelope = {
    data: TaskCreateManyContactInput | TaskCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type DealCreateWithoutContactInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutContactInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutContactInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput>
  }

  export type DealCreateManyContactInputEnvelope = {
    data: DealCreateManyContactInput | DealCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type EmailCreateWithoutContactInput = {
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    deal?: DealCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutContactInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    dealId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailCreateOrConnectWithoutContactInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput>
  }

  export type EmailCreateManyContactInputEnvelope = {
    data: EmailCreateManyContactInput | EmailCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutContactsInput = {
    update: XOR<CompanyUpdateWithoutContactsInput, CompanyUncheckedUpdateWithoutContactsInput>
    create: XOR<CompanyCreateWithoutContactsInput, CompanyUncheckedCreateWithoutContactsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutContactsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutContactsInput, CompanyUncheckedUpdateWithoutContactsInput>
  }

  export type CompanyUpdateWithoutContactsInput = {
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deals?: DealUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutContactsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deals?: DealUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ActivityUpsertWithWhereUniqueWithoutContactInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutContactInput, ActivityUncheckedUpdateWithoutContactInput>
    create: XOR<ActivityCreateWithoutContactInput, ActivityUncheckedCreateWithoutContactInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutContactInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutContactInput, ActivityUncheckedUpdateWithoutContactInput>
  }

  export type ActivityUpdateManyWithWhereWithoutContactInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutContactInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    type?: StringFilter<"Activity"> | string
    title?: StringFilter<"Activity"> | string
    description?: StringNullableFilter<"Activity"> | string | null
    contactId?: IntNullableFilter<"Activity"> | number | null
    dealId?: IntNullableFilter<"Activity"> | number | null
    date?: DateTimeFilter<"Activity"> | Date | string
    durationMinutes?: IntNullableFilter<"Activity"> | number | null
    outcome?: StringNullableFilter<"Activity"> | string | null
    nextSteps?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
    isDeleted?: BoolFilter<"Activity"> | boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutContactInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutContactInput, TaskUncheckedUpdateWithoutContactInput>
    create: XOR<TaskCreateWithoutContactInput, TaskUncheckedCreateWithoutContactInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutContactInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutContactInput, TaskUncheckedUpdateWithoutContactInput>
  }

  export type TaskUpdateManyWithWhereWithoutContactInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutContactInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    contactId?: IntNullableFilter<"Task"> | number | null
    dealId?: IntNullableFilter<"Task"> | number | null
    aiGenerated?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    isDeleted?: BoolFilter<"Task"> | boolean
  }

  export type DealUpsertWithWhereUniqueWithoutContactInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutContactInput, DealUncheckedUpdateWithoutContactInput>
    create: XOR<DealCreateWithoutContactInput, DealUncheckedCreateWithoutContactInput>
  }

  export type DealUpdateWithWhereUniqueWithoutContactInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutContactInput, DealUncheckedUpdateWithoutContactInput>
  }

  export type DealUpdateManyWithWhereWithoutContactInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutContactInput>
  }

  export type DealScalarWhereInput = {
    AND?: DealScalarWhereInput | DealScalarWhereInput[]
    OR?: DealScalarWhereInput[]
    NOT?: DealScalarWhereInput | DealScalarWhereInput[]
    id?: IntFilter<"Deal"> | number
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    currency?: StringFilter<"Deal"> | string
    stage?: StringFilter<"Deal"> | string
    probability?: IntNullableFilter<"Deal"> | number | null
    contactId?: IntNullableFilter<"Deal"> | number | null
    companyId?: IntNullableFilter<"Deal"> | number | null
    expectedCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    actualCloseDate?: DateTimeNullableFilter<"Deal"> | Date | string | null
    lossReason?: StringNullableFilter<"Deal"> | string | null
    priority?: StringFilter<"Deal"> | string
    notes?: StringNullableFilter<"Deal"> | string | null
    competitors?: StringNullableListFilter<"Deal">
    owner?: StringFilter<"Deal"> | string
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    isDeleted?: BoolFilter<"Deal"> | boolean
  }

  export type EmailUpsertWithWhereUniqueWithoutContactInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutContactInput, EmailUncheckedUpdateWithoutContactInput>
    create: XOR<EmailCreateWithoutContactInput, EmailUncheckedCreateWithoutContactInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutContactInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutContactInput, EmailUncheckedUpdateWithoutContactInput>
  }

  export type EmailUpdateManyWithWhereWithoutContactInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutContactInput>
  }

  export type EmailScalarWhereInput = {
    AND?: EmailScalarWhereInput | EmailScalarWhereInput[]
    OR?: EmailScalarWhereInput[]
    NOT?: EmailScalarWhereInput | EmailScalarWhereInput[]
    id?: IntFilter<"Email"> | number
    sender?: StringFilter<"Email"> | string
    senderName?: StringNullableFilter<"Email"> | string | null
    senderAvatar?: StringNullableFilter<"Email"> | string | null
    subject?: StringFilter<"Email"> | string
    content?: StringFilter<"Email"> | string
    timestamp?: DateTimeFilter<"Email"> | Date | string
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    isAIFlagged?: BoolFilter<"Email"> | boolean
    folder?: StringFilter<"Email"> | string
    contactId?: IntNullableFilter<"Email"> | number | null
    dealId?: IntNullableFilter<"Email"> | number | null
    summary?: StringNullableFilter<"Email"> | string | null
    sentiment?: StringNullableFilter<"Email"> | string | null
    sentimentScore?: IntNullableFilter<"Email"> | number | null
    attachments?: JsonNullableFilter<"Email">
    keyPoints?: StringNullableListFilter<"Email">
    intent?: StringNullableFilter<"Email"> | string | null
    suggestedActions?: StringNullableListFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    isDeleted?: BoolFilter<"Email"> | boolean
  }

  export type ContactCreateWithoutEmailsInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutContactsInput
    activities?: ActivityCreateNestedManyWithoutContactInput
    tasks?: TaskCreateNestedManyWithoutContactInput
    deals?: DealCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutEmailsInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutContactInput
    tasks?: TaskUncheckedCreateNestedManyWithoutContactInput
    deals?: DealUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutEmailsInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutEmailsInput, ContactUncheckedCreateWithoutEmailsInput>
  }

  export type DealCreateWithoutEmailsInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    company?: CompanyCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutEmailsInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutEmailsInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutEmailsInput, DealUncheckedCreateWithoutEmailsInput>
  }

  export type ContactUpsertWithoutEmailsInput = {
    update: XOR<ContactUpdateWithoutEmailsInput, ContactUncheckedUpdateWithoutEmailsInput>
    create: XOR<ContactCreateWithoutEmailsInput, ContactUncheckedCreateWithoutEmailsInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutEmailsInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutEmailsInput, ContactUncheckedUpdateWithoutEmailsInput>
  }

  export type ContactUpdateWithoutEmailsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutContactsNestedInput
    activities?: ActivityUpdateManyWithoutContactNestedInput
    tasks?: TaskUpdateManyWithoutContactNestedInput
    deals?: DealUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutEmailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutContactNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutContactNestedInput
    deals?: DealUncheckedUpdateManyWithoutContactNestedInput
  }

  export type DealUpsertWithoutEmailsInput = {
    update: XOR<DealUpdateWithoutEmailsInput, DealUncheckedUpdateWithoutEmailsInput>
    create: XOR<DealCreateWithoutEmailsInput, DealUncheckedCreateWithoutEmailsInput>
    where?: DealWhereInput
  }

  export type DealUpdateToOneWithWhereWithoutEmailsInput = {
    where?: DealWhereInput
    data: XOR<DealUpdateWithoutEmailsInput, DealUncheckedUpdateWithoutEmailsInput>
  }

  export type DealUpdateWithoutEmailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    company?: CompanyUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutEmailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
  }

  export type ContactCreateWithoutCompanyInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityCreateNestedManyWithoutContactInput
    tasks?: TaskCreateNestedManyWithoutContactInput
    deals?: DealCreateNestedManyWithoutContactInput
    emails?: EmailCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutCompanyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutContactInput
    tasks?: TaskUncheckedCreateNestedManyWithoutContactInput
    deals?: DealUncheckedCreateNestedManyWithoutContactInput
    emails?: EmailUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutCompanyInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput>
  }

  export type ContactCreateManyCompanyInputEnvelope = {
    data: ContactCreateManyCompanyInput | ContactCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type DealCreateWithoutCompanyInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutCompanyInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput>
  }

  export type DealCreateManyCompanyInputEnvelope = {
    data: DealCreateManyCompanyInput | DealCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ContactUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutCompanyInput, ContactUncheckedUpdateWithoutCompanyInput>
    create: XOR<ContactCreateWithoutCompanyInput, ContactUncheckedCreateWithoutCompanyInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutCompanyInput, ContactUncheckedUpdateWithoutCompanyInput>
  }

  export type ContactUpdateManyWithWhereWithoutCompanyInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    id?: IntFilter<"Contact"> | number
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    phone?: StringNullableFilter<"Contact"> | string | null
    jobTitle?: StringNullableFilter<"Contact"> | string | null
    companyId?: IntNullableFilter<"Contact"> | number | null
    leadSource?: StringNullableFilter<"Contact"> | string | null
    leadStatus?: StringNullableFilter<"Contact"> | string | null
    leadScore?: IntFilter<"Contact"> | number
    tags?: StringNullableListFilter<"Contact">
    address?: StringNullableFilter<"Contact"> | string | null
    linkedinUrl?: StringNullableFilter<"Contact"> | string | null
    twitterUrl?: StringNullableFilter<"Contact"> | string | null
    website?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    lastContacted?: DateTimeNullableFilter<"Contact"> | Date | string | null
    owner?: StringFilter<"Contact"> | string
    avatarUrl?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    isDeleted?: BoolFilter<"Contact"> | boolean
  }

  export type DealUpsertWithWhereUniqueWithoutCompanyInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutCompanyInput, DealUncheckedUpdateWithoutCompanyInput>
    create: XOR<DealCreateWithoutCompanyInput, DealUncheckedCreateWithoutCompanyInput>
  }

  export type DealUpdateWithWhereUniqueWithoutCompanyInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutCompanyInput, DealUncheckedUpdateWithoutCompanyInput>
  }

  export type DealUpdateManyWithWhereWithoutCompanyInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ContactCreateWithoutDealsInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutContactsInput
    activities?: ActivityCreateNestedManyWithoutContactInput
    tasks?: TaskCreateNestedManyWithoutContactInput
    emails?: EmailCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutDealsInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutContactInput
    tasks?: TaskUncheckedCreateNestedManyWithoutContactInput
    emails?: EmailUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutDealsInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutDealsInput, ContactUncheckedCreateWithoutDealsInput>
  }

  export type CompanyCreateWithoutDealsInput = {
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contacts?: ContactCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutDealsInput = {
    id?: number
    name: string
    domain?: string | null
    industry?: string | null
    size?: string | null
    revenue?: string | null
    location?: string | null
    website?: string | null
    linkedinUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contacts?: ContactUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutDealsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutDealsInput, CompanyUncheckedCreateWithoutDealsInput>
  }

  export type LineItemCreateWithoutDealInput = {
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LineItemUncheckedCreateWithoutDealInput = {
    id?: number
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LineItemCreateOrConnectWithoutDealInput = {
    where: LineItemWhereUniqueInput
    create: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput>
  }

  export type LineItemCreateManyDealInputEnvelope = {
    data: LineItemCreateManyDealInput | LineItemCreateManyDealInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutDealInput = {
    type: string
    title: string
    description?: string | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutDealInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    contactId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityCreateOrConnectWithoutDealInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput>
  }

  export type ActivityCreateManyDealInputEnvelope = {
    data: ActivityCreateManyDealInput | ActivityCreateManyDealInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutDealInput = {
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutDealInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    contactId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskCreateOrConnectWithoutDealInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput>
  }

  export type TaskCreateManyDealInputEnvelope = {
    data: TaskCreateManyDealInput | TaskCreateManyDealInput[]
    skipDuplicates?: boolean
  }

  export type EmailCreateWithoutDealInput = {
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutDealInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    contactId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailCreateOrConnectWithoutDealInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput>
  }

  export type EmailCreateManyDealInputEnvelope = {
    data: EmailCreateManyDealInput | EmailCreateManyDealInput[]
    skipDuplicates?: boolean
  }

  export type ContactUpsertWithoutDealsInput = {
    update: XOR<ContactUpdateWithoutDealsInput, ContactUncheckedUpdateWithoutDealsInput>
    create: XOR<ContactCreateWithoutDealsInput, ContactUncheckedCreateWithoutDealsInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutDealsInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutDealsInput, ContactUncheckedUpdateWithoutDealsInput>
  }

  export type ContactUpdateWithoutDealsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutContactsNestedInput
    activities?: ActivityUpdateManyWithoutContactNestedInput
    tasks?: TaskUpdateManyWithoutContactNestedInput
    emails?: EmailUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutContactNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutContactNestedInput
    emails?: EmailUncheckedUpdateManyWithoutContactNestedInput
  }

  export type CompanyUpsertWithoutDealsInput = {
    update: XOR<CompanyUpdateWithoutDealsInput, CompanyUncheckedUpdateWithoutDealsInput>
    create: XOR<CompanyCreateWithoutDealsInput, CompanyUncheckedCreateWithoutDealsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutDealsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutDealsInput, CompanyUncheckedUpdateWithoutDealsInput>
  }

  export type CompanyUpdateWithoutDealsInput = {
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contacts?: ContactUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contacts?: ContactUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type LineItemUpsertWithWhereUniqueWithoutDealInput = {
    where: LineItemWhereUniqueInput
    update: XOR<LineItemUpdateWithoutDealInput, LineItemUncheckedUpdateWithoutDealInput>
    create: XOR<LineItemCreateWithoutDealInput, LineItemUncheckedCreateWithoutDealInput>
  }

  export type LineItemUpdateWithWhereUniqueWithoutDealInput = {
    where: LineItemWhereUniqueInput
    data: XOR<LineItemUpdateWithoutDealInput, LineItemUncheckedUpdateWithoutDealInput>
  }

  export type LineItemUpdateManyWithWhereWithoutDealInput = {
    where: LineItemScalarWhereInput
    data: XOR<LineItemUpdateManyMutationInput, LineItemUncheckedUpdateManyWithoutDealInput>
  }

  export type LineItemScalarWhereInput = {
    AND?: LineItemScalarWhereInput | LineItemScalarWhereInput[]
    OR?: LineItemScalarWhereInput[]
    NOT?: LineItemScalarWhereInput | LineItemScalarWhereInput[]
    id?: IntFilter<"LineItem"> | number
    dealId?: IntFilter<"LineItem"> | number
    productName?: StringFilter<"LineItem"> | string
    quantity?: IntFilter<"LineItem"> | number
    unitPrice?: FloatFilter<"LineItem"> | number
    total?: FloatFilter<"LineItem"> | number
    createdAt?: DateTimeFilter<"LineItem"> | Date | string
    updatedAt?: DateTimeFilter<"LineItem"> | Date | string
    isDeleted?: BoolFilter<"LineItem"> | boolean
  }

  export type ActivityUpsertWithWhereUniqueWithoutDealInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutDealInput, ActivityUncheckedUpdateWithoutDealInput>
    create: XOR<ActivityCreateWithoutDealInput, ActivityUncheckedCreateWithoutDealInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutDealInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutDealInput, ActivityUncheckedUpdateWithoutDealInput>
  }

  export type ActivityUpdateManyWithWhereWithoutDealInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutDealInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutDealInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutDealInput, TaskUncheckedUpdateWithoutDealInput>
    create: XOR<TaskCreateWithoutDealInput, TaskUncheckedCreateWithoutDealInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutDealInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutDealInput, TaskUncheckedUpdateWithoutDealInput>
  }

  export type TaskUpdateManyWithWhereWithoutDealInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutDealInput>
  }

  export type EmailUpsertWithWhereUniqueWithoutDealInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutDealInput, EmailUncheckedUpdateWithoutDealInput>
    create: XOR<EmailCreateWithoutDealInput, EmailUncheckedCreateWithoutDealInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutDealInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutDealInput, EmailUncheckedUpdateWithoutDealInput>
  }

  export type EmailUpdateManyWithWhereWithoutDealInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutDealInput>
  }

  export type DealCreateWithoutLineItemsInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    company?: CompanyCreateNestedOneWithoutDealsInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutLineItemsInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutLineItemsInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutLineItemsInput, DealUncheckedCreateWithoutLineItemsInput>
  }

  export type DealUpsertWithoutLineItemsInput = {
    update: XOR<DealUpdateWithoutLineItemsInput, DealUncheckedUpdateWithoutLineItemsInput>
    create: XOR<DealCreateWithoutLineItemsInput, DealUncheckedCreateWithoutLineItemsInput>
    where?: DealWhereInput
  }

  export type DealUpdateToOneWithWhereWithoutLineItemsInput = {
    where?: DealWhereInput
    data: XOR<DealUpdateWithoutLineItemsInput, DealUncheckedUpdateWithoutLineItemsInput>
  }

  export type DealUpdateWithoutLineItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    company?: CompanyUpdateOneWithoutDealsNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutLineItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type ContactCreateWithoutActivitiesInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutContactsInput
    tasks?: TaskCreateNestedManyWithoutContactInput
    deals?: DealCreateNestedManyWithoutContactInput
    emails?: EmailCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutActivitiesInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    tasks?: TaskUncheckedCreateNestedManyWithoutContactInput
    deals?: DealUncheckedCreateNestedManyWithoutContactInput
    emails?: EmailUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutActivitiesInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutActivitiesInput, ContactUncheckedCreateWithoutActivitiesInput>
  }

  export type DealCreateWithoutActivitiesInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    company?: CompanyCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    tasks?: TaskCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutActivitiesInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    tasks?: TaskUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutActivitiesInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutActivitiesInput, DealUncheckedCreateWithoutActivitiesInput>
  }

  export type ContactUpsertWithoutActivitiesInput = {
    update: XOR<ContactUpdateWithoutActivitiesInput, ContactUncheckedUpdateWithoutActivitiesInput>
    create: XOR<ContactCreateWithoutActivitiesInput, ContactUncheckedCreateWithoutActivitiesInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutActivitiesInput, ContactUncheckedUpdateWithoutActivitiesInput>
  }

  export type ContactUpdateWithoutActivitiesInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutContactsNestedInput
    tasks?: TaskUpdateManyWithoutContactNestedInput
    deals?: DealUpdateManyWithoutContactNestedInput
    emails?: EmailUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    tasks?: TaskUncheckedUpdateManyWithoutContactNestedInput
    deals?: DealUncheckedUpdateManyWithoutContactNestedInput
    emails?: EmailUncheckedUpdateManyWithoutContactNestedInput
  }

  export type DealUpsertWithoutActivitiesInput = {
    update: XOR<DealUpdateWithoutActivitiesInput, DealUncheckedUpdateWithoutActivitiesInput>
    create: XOR<DealCreateWithoutActivitiesInput, DealUncheckedCreateWithoutActivitiesInput>
    where?: DealWhereInput
  }

  export type DealUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: DealWhereInput
    data: XOR<DealUpdateWithoutActivitiesInput, DealUncheckedUpdateWithoutActivitiesInput>
  }

  export type DealUpdateWithoutActivitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    company?: CompanyUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type ContactCreateWithoutTasksInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    company?: CompanyCreateNestedOneWithoutContactsInput
    activities?: ActivityCreateNestedManyWithoutContactInput
    deals?: DealCreateNestedManyWithoutContactInput
    emails?: EmailCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutTasksInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    companyId?: number | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    activities?: ActivityUncheckedCreateNestedManyWithoutContactInput
    deals?: DealUncheckedCreateNestedManyWithoutContactInput
    emails?: EmailUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutTasksInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutTasksInput, ContactUncheckedCreateWithoutTasksInput>
  }

  export type DealCreateWithoutTasksInput = {
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    contact?: ContactCreateNestedOneWithoutDealsInput
    company?: CompanyCreateNestedOneWithoutDealsInput
    lineItems?: LineItemCreateNestedManyWithoutDealInput
    activities?: ActivityCreateNestedManyWithoutDealInput
    emails?: EmailCreateNestedManyWithoutDealInput
  }

  export type DealUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
    lineItems?: LineItemUncheckedCreateNestedManyWithoutDealInput
    activities?: ActivityUncheckedCreateNestedManyWithoutDealInput
    emails?: EmailUncheckedCreateNestedManyWithoutDealInput
  }

  export type DealCreateOrConnectWithoutTasksInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutTasksInput, DealUncheckedCreateWithoutTasksInput>
  }

  export type ContactUpsertWithoutTasksInput = {
    update: XOR<ContactUpdateWithoutTasksInput, ContactUncheckedUpdateWithoutTasksInput>
    create: XOR<ContactCreateWithoutTasksInput, ContactUncheckedCreateWithoutTasksInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutTasksInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutTasksInput, ContactUncheckedUpdateWithoutTasksInput>
  }

  export type ContactUpdateWithoutTasksInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutContactsNestedInput
    activities?: ActivityUpdateManyWithoutContactNestedInput
    deals?: DealUpdateManyWithoutContactNestedInput
    emails?: EmailUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutContactNestedInput
    deals?: DealUncheckedUpdateManyWithoutContactNestedInput
    emails?: EmailUncheckedUpdateManyWithoutContactNestedInput
  }

  export type DealUpsertWithoutTasksInput = {
    update: XOR<DealUpdateWithoutTasksInput, DealUncheckedUpdateWithoutTasksInput>
    create: XOR<DealCreateWithoutTasksInput, DealUncheckedCreateWithoutTasksInput>
    where?: DealWhereInput
  }

  export type DealUpdateToOneWithWhereWithoutTasksInput = {
    where?: DealWhereInput
    data: XOR<DealUpdateWithoutTasksInput, DealUncheckedUpdateWithoutTasksInput>
  }

  export type DealUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    company?: CompanyUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type UserIdentityCreateManyUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ActivityCreateManyContactInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    dealId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskCreateManyContactInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    dealId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type DealCreateManyContactInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    companyId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailCreateManyContactInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    dealId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityUpdateWithoutContactInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deal?: DealUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUpdateWithoutContactInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deal?: DealUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DealUpdateWithoutContactInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateManyWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailUpdateWithoutContactInput = {
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deal?: DealUpdateOneWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailUncheckedUpdateManyWithoutContactInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    dealId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactCreateManyCompanyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    jobTitle?: string | null
    leadSource?: string | null
    leadStatus?: string | null
    leadScore?: number
    tags?: ContactCreatetagsInput | string[]
    address?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
    website?: string | null
    notes?: string | null
    lastContacted?: Date | string | null
    owner?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type DealCreateManyCompanyInput = {
    id?: number
    name: string
    value: number
    currency?: string
    stage: string
    probability?: number | null
    contactId?: number | null
    expectedCloseDate?: Date | string | null
    actualCloseDate?: Date | string | null
    lossReason?: string | null
    priority: string
    notes?: string | null
    competitors?: DealCreatecompetitorsInput | string[]
    owner?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ContactUpdateWithoutCompanyInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUpdateManyWithoutContactNestedInput
    tasks?: TaskUpdateManyWithoutContactNestedInput
    deals?: DealUpdateManyWithoutContactNestedInput
    emails?: EmailUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    activities?: ActivityUncheckedUpdateManyWithoutContactNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutContactNestedInput
    deals?: DealUncheckedUpdateManyWithoutContactNestedInput
    emails?: EmailUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    leadSource?: NullableStringFieldUpdateOperationsInput | string | null
    leadStatus?: NullableStringFieldUpdateOperationsInput | string | null
    leadScore?: IntFieldUpdateOperationsInput | number
    tags?: ContactUpdatetagsInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastContacted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DealUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutDealsNestedInput
    lineItems?: LineItemUpdateManyWithoutDealNestedInput
    activities?: ActivityUpdateManyWithoutDealNestedInput
    tasks?: TaskUpdateManyWithoutDealNestedInput
    emails?: EmailUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    lineItems?: LineItemUncheckedUpdateManyWithoutDealNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutDealNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutDealNestedInput
    emails?: EmailUncheckedUpdateManyWithoutDealNestedInput
  }

  export type DealUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    probability?: NullableIntFieldUpdateOperationsInput | number | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    expectedCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCloseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lossReason?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: DealUpdatecompetitorsInput | string[]
    owner?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemCreateManyDealInput = {
    id?: number
    productName: string
    quantity: number
    unitPrice: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ActivityCreateManyDealInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    contactId?: number | null
    date?: Date | string
    durationMinutes?: number | null
    outcome?: string | null
    nextSteps?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type TaskCreateManyDealInput = {
    id?: number
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: string
    status: string
    contactId?: number | null
    aiGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type EmailCreateManyDealInput = {
    id?: number
    sender: string
    senderName?: string | null
    senderAvatar?: string | null
    subject: string
    content: string
    timestamp?: Date | string
    isRead?: boolean
    isStarred?: boolean
    isAIFlagged?: boolean
    folder?: string
    contactId?: number | null
    summary?: string | null
    sentiment?: string | null
    sentimentScore?: number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailCreatekeyPointsInput | string[]
    intent?: string | null
    suggestedActions?: EmailCreatesuggestedActionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LineItemUpdateWithoutDealInput = {
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemUncheckedUpdateWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LineItemUncheckedUpdateManyWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUpdateWithoutDealInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextSteps?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUpdateWithoutDealInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailUpdateWithoutDealInput = {
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    contact?: ContactUpdateOneWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmailUncheckedUpdateManyWithoutDealInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isAIFlagged?: BoolFieldUpdateOperationsInput | boolean
    folder?: StringFieldUpdateOperationsInput | string
    contactId?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    sentimentScore?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    keyPoints?: EmailUpdatekeyPointsInput | string[]
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: EmailUpdatesuggestedActionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
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