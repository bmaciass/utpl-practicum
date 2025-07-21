/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTime: { input: any; output: any; }
  /** An arbitrary-precision Decimal type. */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AuthLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthLoginResponse = {
  __typename?: 'AuthLoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

/** Auth mutations */
export type AuthMutations = {
  __typename?: 'AuthMutations';
  login?: Maybe<AuthLoginResponse>;
  refresh?: Maybe<AuthRefreshResponse>;
};


/** Auth mutations */
export type AuthMutationsLoginArgs = {
  data: AuthLoginInput;
};


/** Auth mutations */
export type AuthMutationsRefreshArgs = {
  data: AuthRefreshInput;
};

export type AuthRefreshInput = {
  refreshToken: Scalars['String']['input'];
};

export type AuthRefreshResponse = {
  __typename?: 'AuthRefreshResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type CreateInstitutionDataInput = {
  area: InstitutionArea;
  level: InstitutionLevel;
  name: Scalars['String']['input'];
};

export type CreateUserDataInput = {
  dni: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Institution = {
  __typename?: 'Institution';
  active: Scalars['Boolean']['output'];
  area: InstitutionArea;
  id: Scalars['ID']['output'];
  level: InstitutionLevel;
  name: Scalars['String']['output'];
};

export enum InstitutionArea {
  Educacion = 'educacion'
}

export enum InstitutionLevel {
  Nacional = 'nacional'
}

/** Institution mutations */
export type InstitutionMutations = {
  __typename?: 'InstitutionMutations';
  create: Institution;
  update: Institution;
};


/** Institution mutations */
export type InstitutionMutationsCreateArgs = {
  data: CreateInstitutionDataInput;
};


/** Institution mutations */
export type InstitutionMutationsUpdateArgs = {
  data: UpdateInstitutionDataInput;
  where: UpdateInstitutionWhereInput;
};

/** Institution queries */
export type InstitutionQueries = {
  __typename?: 'InstitutionQueries';
  list: InstitutionsQueryResponse;
  one: Institution;
};


/** Institution queries */
export type InstitutionQueriesListArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringFilter>;
};


/** Institution queries */
export type InstitutionQueriesOneArgs = {
  id: Scalars['String']['input'];
};

export type InstitutionsQueryResponse = {
  __typename?: 'InstitutionsQueryResponse';
  records: Array<Institution>;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth?: Maybe<AuthMutations>;
  institution: InstitutionMutations;
  user: UserMutations;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  institution: InstitutionQueries;
  user: UserQueries;
};

export type StringFilter = {
  contains: Scalars['String']['input'];
  endsWith: Scalars['String']['input'];
  equals: Scalars['String']['input'];
  startsWith: Scalars['String']['input'];
};

export type UpdateInstitutionDataInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  area?: InputMaybe<InstitutionArea>;
  level?: InputMaybe<InstitutionLevel>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInstitutionWhereInput = {
  id: Scalars['String']['input'];
};

export type UpdateUserDataInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserWhereInput = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean']['output'];
  dni: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** User mutations */
export type UserMutations = {
  __typename?: 'UserMutations';
  create: User;
  update: User;
};


/** User mutations */
export type UserMutationsCreateArgs = {
  data: CreateUserDataInput;
};


/** User mutations */
export type UserMutationsUpdateArgs = {
  data: UpdateUserDataInput;
  where: UpdateUserWhereInput;
};

/** User queries */
export type UserQueries = {
  __typename?: 'UserQueries';
  list: UsersQueryResponse;
  one?: Maybe<User>;
};


/** User queries */
export type UserQueriesListArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringFilter>;
};


/** User queries */
export type UserQueriesOneArgs = {
  id: Scalars['String']['input'];
};

export type UsersQueryResponse = {
  __typename?: 'UsersQueryResponse';
  records: Array<User>;
};

export type CreateInstitution_UseSaveInstitutionMutationVariables = Exact<{
  data: CreateInstitutionDataInput;
}>;


export type CreateInstitution_UseSaveInstitutionMutation = { __typename?: 'Mutation', institution: { __typename?: 'InstitutionMutations', create: { __typename?: 'Institution', id: string, name: string, area: InstitutionArea, level: InstitutionLevel, active: boolean } } };

export type GetInstitutions_UseGetInstitutionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetInstitutions_UseGetInstitutionQuery = { __typename?: 'Query', institution: { __typename?: 'InstitutionQueries', one: { __typename?: 'Institution', id: string, name: string, area: InstitutionArea, level: InstitutionLevel, active: boolean } } };

export type GetInstitutions_UseInstitutionListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInstitutions_UseInstitutionListQuery = { __typename?: 'Query', institution: { __typename?: 'InstitutionQueries', list: { __typename?: 'InstitutionsQueryResponse', records: Array<{ __typename?: 'Institution', id: string, name: string }> } } };

export type UpdateInstitution_UseSaveInstitutionMutationVariables = Exact<{
  data: UpdateInstitutionDataInput;
  where: UpdateInstitutionWhereInput;
}>;


export type UpdateInstitution_UseSaveInstitutionMutation = { __typename?: 'Mutation', institution: { __typename?: 'InstitutionMutations', update: { __typename?: 'Institution', id: string, name: string, area: InstitutionArea, level: InstitutionLevel, active: boolean } } };

export type CreateUser_UseCreateUserMutationVariables = Exact<{
  data: CreateUserDataInput;
}>;


export type CreateUser_UseCreateUserMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', create: { __typename?: 'User', id: string, name: string, firstName: string, lastName: string, dni: string, active: boolean } } };

export type GetUsers_UseGetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUsers_UseGetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', one?: { __typename?: 'User', id: string, name: string, dni: string, firstName: string, lastName: string, active: boolean } | null } };

export type UpdateUser_UseUpdateUserMutationVariables = Exact<{
  data: UpdateUserDataInput;
  where: UpdateUserWhereInput;
}>;


export type UpdateUser_UseUpdateUserMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', update: { __typename?: 'User', id: string, name: string, firstName: string, lastName: string, dni: string, active: boolean } } };

export type GetUsers_UseUserListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsers_UseUserListQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', list: { __typename?: 'UsersQueryResponse', records: Array<{ __typename?: 'User', id: string, name: string, active: boolean }> } } };


export const CreateInstitution_UseSaveInstitutionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInstitution_useSaveInstitution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInstitutionDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<CreateInstitution_UseSaveInstitutionMutation, CreateInstitution_UseSaveInstitutionMutationVariables>;
export const GetInstitutions_UseGetInstitutionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInstitutions_useGetInstitution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<GetInstitutions_UseGetInstitutionQuery, GetInstitutions_UseGetInstitutionQueryVariables>;
export const GetInstitutions_UseInstitutionListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInstitutions_useInstitutionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInstitutions_UseInstitutionListQuery, GetInstitutions_UseInstitutionListQueryVariables>;
export const UpdateInstitution_UseSaveInstitutionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInstitution_useSaveInstitution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInstitutionDataInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInstitutionWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"institution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInstitution_UseSaveInstitutionMutation, UpdateInstitution_UseSaveInstitutionMutationVariables>;
export const CreateUser_UseCreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser_useCreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUser_UseCreateUserMutation, CreateUser_UseCreateUserMutationVariables>;
export const GetUsers_UseGetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers_useGetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsers_UseGetUserQuery, GetUsers_UseGetUserQueryVariables>;
export const UpdateUser_UseUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser_useUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDataInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUser_UseUpdateUserMutation, UpdateUser_UseUpdateUserMutationVariables>;
export const GetUsers_UseUserListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers_useUserList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsers_UseUserListQuery, GetUsers_UseUserListQueryVariables>;