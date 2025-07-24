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
    "\n  mutation CreateInstitutionalPlan_useCreateInstitutionalPlan ($data: CreateInstitutionalPlanDataInput!) {\n    institutionalPlan {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": typeof types.CreateInstitutionalPlan_UseCreateInstitutionalPlanDocument,
    "\n  mutation CreateProgram_useCreateProgram ($data: CreateProgramDataInput!) {\n    program {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": typeof types.CreateProgram_UseCreateProgramDocument,
    "\n  query GetPrograms_useGetProgram ($id: String!) {\n    program {\n      one (id: $id) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": typeof types.GetPrograms_UseGetProgramDocument,
    "\n  query GetProgramList_useProgramList {\n    program {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetProgramList_UseProgramListDocument,
    "\n  mutation UpdateProgram_useUpdateProgram ($data: UpdateProgramDataInput!, $where: UpdateProgramWhereInput!) {\n    program {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": typeof types.UpdateProgram_UseUpdateProgramDocument,
    "\n  mutation CreateProject_useCreateProject ($data: CreateProjectDataInput!) {\n    project {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": typeof types.CreateProject_UseCreateProjectDocument,
    "\n  query GetProjects_useGetProject ($id: String!) {\n    project {\n      one (id: $id) {\n        id\n        name\n        description\n        status\n        programId\n        responsibleId\n        active\n      }\n    }\n  }\n": typeof types.GetProjects_UseGetProjectDocument,
    "\n  query GetProjectList_useProjectList ($programId: String!) {\n    project {\n      list (programId: $programId) {\n        records {\n          id\n          name\n          programId\n        }\n      }\n    }\n  }\n": typeof types.GetProjectList_UseProjectListDocument,
    "\n  mutation UpdateProject_useUpdateProject ($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {\n    project {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": typeof types.UpdateProject_UseUpdateProjectDocument,
    "\n  mutation ProjectGoal_useCreateProjectGoal ($data: CreateProjectGoalDataInput!) {\n    projectGoal {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": typeof types.ProjectGoal_UseCreateProjectGoalDocument,
    "\n  query ProjectGoal_useGetProjectGoal ($id: String!) {\n    projectGoal {\n      one (id: $id) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n": typeof types.ProjectGoal_UseGetProjectGoalDocument,
    "\n  query ProjectGoal_useProjectGoalList ($projectId: String!) {\n    projectGoal {\n      list (projectId: $projectId) {\n        records {\n          id\n          name\n          projectId\n        }\n      }\n    }\n  }\n": typeof types.ProjectGoal_UseProjectGoalListDocument,
    "\n  mutation ProjectGoal_useUpdateProjectGoal ($data: UpdateProjectGoalDataInput!, $where: UpdateProjectGoalWhereInput!) {\n    projectGoal {\n      update (data: $data, where: $where) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n": typeof types.ProjectGoal_UseUpdateProjectGoalDocument,
    "\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": typeof types.CreateUser_UseCreateUserDocument,
    "\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n": typeof types.GetUsers_UseGetUserDocument,
    "\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": typeof types.UpdateUser_UseUpdateUserDocument,
    "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          firstName\n          lastName\n          active\n        }\n      }\n    }\n  }\n": typeof types.GetUsers_UseUserListDocument,
};
const documents: Documents = {
    "\n  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {\n    institution {\n      create (data: $data) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.CreateInstitution_UseSaveInstitutionDocument,
    "\n  query GetInstitutions_useGetInstitution ($id: String!) {\n    institution {\n      one (id: $id) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.GetInstitutions_UseGetInstitutionDocument,
    "\n  query GetInstitutions_useInstitutionList {\n    institution {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetInstitutions_UseInstitutionListDocument,
    "\n  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {\n    institution {\n      update (data: $data, where: $where) {\n        id\n        name\n        area\n        level\n        active\n      }\n    }\n  }\n": types.UpdateInstitution_UseSaveInstitutionDocument,
    "\n  mutation CreateInstitutionalPlan_useCreateInstitutionalPlan ($data: CreateInstitutionalPlanDataInput!) {\n    institutionalPlan {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": types.CreateInstitutionalPlan_UseCreateInstitutionalPlanDocument,
    "\n  mutation CreateProgram_useCreateProgram ($data: CreateProgramDataInput!) {\n    program {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": types.CreateProgram_UseCreateProgramDocument,
    "\n  query GetPrograms_useGetProgram ($id: String!) {\n    program {\n      one (id: $id) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": types.GetPrograms_UseGetProgramDocument,
    "\n  query GetProgramList_useProgramList {\n    program {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetProgramList_UseProgramListDocument,
    "\n  mutation UpdateProgram_useUpdateProgram ($data: UpdateProgramDataInput!, $where: UpdateProgramWhereInput!) {\n    program {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": types.UpdateProgram_UseUpdateProgramDocument,
    "\n  mutation CreateProject_useCreateProject ($data: CreateProjectDataInput!) {\n    project {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": types.CreateProject_UseCreateProjectDocument,
    "\n  query GetProjects_useGetProject ($id: String!) {\n    project {\n      one (id: $id) {\n        id\n        name\n        description\n        status\n        programId\n        responsibleId\n        active\n      }\n    }\n  }\n": types.GetProjects_UseGetProjectDocument,
    "\n  query GetProjectList_useProjectList ($programId: String!) {\n    project {\n      list (programId: $programId) {\n        records {\n          id\n          name\n          programId\n        }\n      }\n    }\n  }\n": types.GetProjectList_UseProjectListDocument,
    "\n  mutation UpdateProject_useUpdateProject ($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {\n    project {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n": types.UpdateProject_UseUpdateProjectDocument,
    "\n  mutation ProjectGoal_useCreateProjectGoal ($data: CreateProjectGoalDataInput!) {\n    projectGoal {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n": types.ProjectGoal_UseCreateProjectGoalDocument,
    "\n  query ProjectGoal_useGetProjectGoal ($id: String!) {\n    projectGoal {\n      one (id: $id) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n": types.ProjectGoal_UseGetProjectGoalDocument,
    "\n  query ProjectGoal_useProjectGoalList ($projectId: String!) {\n    projectGoal {\n      list (projectId: $projectId) {\n        records {\n          id\n          name\n          projectId\n        }\n      }\n    }\n  }\n": types.ProjectGoal_UseProjectGoalListDocument,
    "\n  mutation ProjectGoal_useUpdateProjectGoal ($data: UpdateProjectGoalDataInput!, $where: UpdateProjectGoalWhereInput!) {\n    projectGoal {\n      update (data: $data, where: $where) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n": types.ProjectGoal_UseUpdateProjectGoalDocument,
    "\n  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {\n    user {\n      create (data: $data) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": types.CreateUser_UseCreateUserDocument,
    "\n  query GetUsers_useGetUser ($id: String!) {\n    user {\n      one (id: $id) {\n        id\n        name\n        dni\n        firstName\n        lastName\n        active\n      }\n    }\n  }\n": types.GetUsers_UseGetUserDocument,
    "\n  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {\n    user {\n      update (data: $data, where: $where) {\n        id\n        name\n        firstName\n        lastName\n        dni\n        active\n      }\n    }\n  }\n": types.UpdateUser_UseUpdateUserDocument,
    "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          firstName\n          lastName\n          active\n        }\n      }\n    }\n  }\n": types.GetUsers_UseUserListDocument,
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
export function graphql(source: "\n  mutation CreateInstitutionalPlan_useCreateInstitutionalPlan ($data: CreateInstitutionalPlanDataInput!) {\n    institutionalPlan {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInstitutionalPlan_useCreateInstitutionalPlan ($data: CreateInstitutionalPlanDataInput!) {\n    institutionalPlan {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProgram_useCreateProgram ($data: CreateProgramDataInput!) {\n    program {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProgram_useCreateProgram ($data: CreateProgramDataInput!) {\n    program {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPrograms_useGetProgram ($id: String!) {\n    program {\n      one (id: $id) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPrograms_useGetProgram ($id: String!) {\n    program {\n      one (id: $id) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProgramList_useProgramList {\n    program {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProgramList_useProgramList {\n    program {\n      list {\n        records {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProgram_useUpdateProgram ($data: UpdateProgramDataInput!, $where: UpdateProgramWhereInput!) {\n    program {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProgram_useUpdateProgram ($data: UpdateProgramDataInput!, $where: UpdateProgramWhereInput!) {\n    program {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject_useCreateProject ($data: CreateProjectDataInput!) {\n    project {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject_useCreateProject ($data: CreateProjectDataInput!) {\n    project {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjects_useGetProject ($id: String!) {\n    project {\n      one (id: $id) {\n        id\n        name\n        description\n        status\n        programId\n        responsibleId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProjects_useGetProject ($id: String!) {\n    project {\n      one (id: $id) {\n        id\n        name\n        description\n        status\n        programId\n        responsibleId\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjectList_useProjectList ($programId: String!) {\n    project {\n      list (programId: $programId) {\n        records {\n          id\n          name\n          programId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProjectList_useProjectList ($programId: String!) {\n    project {\n      list (programId: $programId) {\n        records {\n          id\n          name\n          programId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProject_useUpdateProject ($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {\n    project {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject_useUpdateProject ($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {\n    project {\n      update (data: $data, where: $where) {\n        id\n        name\n        description\n        responsibleId\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ProjectGoal_useCreateProjectGoal ($data: CreateProjectGoalDataInput!) {\n    projectGoal {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ProjectGoal_useCreateProjectGoal ($data: CreateProjectGoalDataInput!) {\n    projectGoal {\n      create (data: $data) {\n        id\n        name\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProjectGoal_useGetProjectGoal ($id: String!) {\n    projectGoal {\n      one (id: $id) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectGoal_useGetProjectGoal ($id: String!) {\n    projectGoal {\n      one (id: $id) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProjectGoal_useProjectGoalList ($projectId: String!) {\n    projectGoal {\n      list (projectId: $projectId) {\n        records {\n          id\n          name\n          projectId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectGoal_useProjectGoalList ($projectId: String!) {\n    projectGoal {\n      list (projectId: $projectId) {\n        records {\n          id\n          name\n          projectId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ProjectGoal_useUpdateProjectGoal ($data: UpdateProjectGoalDataInput!, $where: UpdateProjectGoalWhereInput!) {\n    projectGoal {\n      update (data: $data, where: $where) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ProjectGoal_useUpdateProjectGoal ($data: UpdateProjectGoalDataInput!, $where: UpdateProjectGoalWhereInput!) {\n    projectGoal {\n      update (data: $data, where: $where) {\n        id\n        name\n        status\n        projectId\n        active\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          firstName\n          lastName\n          active\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers_useUserList {\n    user {\n      list {\n        records {\n          id\n          name\n          firstName\n          lastName\n          active\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;