/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {\n    institution {\n      create (data: $data) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": typeof types.CreateInstitution_UseSaveInstitutionDocument,
    "\n  query GetInstitutions_useGetInstitution ($id: String!) {\n    institution {\n      one (id: $id) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": typeof types.GetInstitutions_UseGetInstitutionDocument,
    "\n  query GetInstitutions_useInstitutionList {\n    institution {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetInstitutions_UseInstitutionListDocument,
    "\n  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {\n    institution {\n      update (data: $data, where: $where) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": typeof types.UpdateInstitution_UseSaveInstitutionDocument,
    "\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": typeof types.CreateUser_UseCreateUserDocument,
    "\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n": typeof types.GetUsers_UseGetUserDocument,
    "\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": typeof types.UpdateUser_UseUpdateUserDocument,
    "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          active\n        }\n      }\n    }\n  }\n": typeof types.GetUsers_UseUserListDocument,
};
const documents: Documents = {
    "\n  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {\n    institution {\n      create (data: $data) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.CreateInstitution_UseSaveInstitutionDocument,
    "\n  query GetInstitutions_useGetInstitution ($id: String!) {\n    institution {\n      one (id: $id) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.GetInstitutions_UseGetInstitutionDocument,
    "\n  query GetInstitutions_useInstitutionList {\n    institution {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetInstitutions_UseInstitutionListDocument,
    "\n  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {\n    institution {\n      update (data: $data, where: $where) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.UpdateInstitution_UseSaveInstitutionDocument,
    "\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": types.CreateUser_UseCreateUserDocument,
    "\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n": types.GetUsers_UseGetUserDocument,
    "\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": types.UpdateUser_UseUpdateUserDocument,
    "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          active\n        }\n      }\n    }\n  }\n": types.GetUsers_UseUserListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {\n    institution {\n      create (data: $data) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {\n    institution {\n      create (data: $data) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInstitutions_useGetInstitution ($id: String!) {\n    institution {\n      one (id: $id) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetInstitutions_useGetInstitution ($id: String!) {\n    institution {\n      one (id: $id) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInstitutions_useInstitutionList {\n    institution {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetInstitutions_useInstitutionList {\n    institution {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {\n    institution {\n      update (data: $data, where: $where) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {\n    institution {\n      update (data: $data, where: $where) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          active\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          active\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;