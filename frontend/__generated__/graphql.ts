/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any };
};

export type CreateEnvironmentMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateEnvironmentMutation = {
  __typename?: "Mutation";
  createEnvironment: { __typename?: "CreateEnvironmentPayload"; id: string };
};

export type GetDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetDataQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "User";
    id: string;
    username: string;
    image?: string | null;
    createdAt: any;
    updatedAt: any;
  } | null;
  environments: Array<{
    __typename?: "Environment";
    id: string;
    name?: string | null;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type GetEnvironmentQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetEnvironmentQuery = {
  __typename?: "Query";
  environment?: {
    __typename?: "Environment";
    id: string;
    name?: string | null;
    createdAt: any;
    updatedAt: any;
    environmentFiles: Array<{
      __typename?: "EnvironmentFile";
      id: string;
      environmentId: number;
      filename?: string | null;
      content?: string | null;
      fileExtension?: string | null;
      fileSize?: number | null;
      updatedAt: any;
      createdAt: any;
    }>;
  } | null;
};

export type RenameFileMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  filename: Scalars["String"]["input"];
}>;

export type RenameFileMutation = {
  __typename?: "Mutation";
  renameEnvironmentFile: {
    __typename?: "RenameEnvironmentFilePayload";
    errors?: Array<string> | null;
    environmentFile?: {
      __typename?: "EnvironmentFile";
      id: string;
      filename?: string | null;
    } | null;
  };
};

export type DeleteFileMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteFileMutation = {
  __typename?: "Mutation";
  deleteEnvironmentFile: {
    __typename?: "DeleteEnvironmentFilePayload";
    id?: string | null;
    errors?: Array<string> | null;
  };
};

export type CreateInviteLinkMutationVariables = Exact<{
  environmentId: Scalars["ID"]["input"];
  code: Scalars["String"]["input"];
}>;

export type CreateInviteLinkMutation = {
  __typename?: "Mutation";
  createInviteLink: {
    __typename?: "CreateInviteLinkPayload";
    errors?: Array<string> | null;
    invite?: {
      __typename?: "Invite";
      id: string;
      code?: string | null;
      environmentId: number;
    } | null;
  };
};

export type AddNewFileMutationVariables = Exact<{
  environmentId: Scalars["ID"]["input"];
  filename: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
  fileExtension: Scalars["String"]["input"];
}>;

export type AddNewFileMutation = {
  __typename?: "Mutation";
  addNewFile: {
    __typename?: "AddNewFilePayload";
    id?: string | null;
    errors?: Array<string> | null;
  };
};

export type JoinEnvironmentMutationVariables = Exact<{
  code: Scalars["String"]["input"];
}>;

export type JoinEnvironmentMutation = {
  __typename?: "Mutation";
  joinEnvironment: {
    __typename?: "JoinEnvironmentPayload";
    id?: string | null;
  };
};

export const CreateEnvironmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateEnvironment" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createEnvironment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateEnvironmentMutation,
  CreateEnvironmentMutationVariables
>;
export const GetDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "environments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDataQuery, GetDataQueryVariables>;
export const GetEnvironmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEnvironment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environmentFiles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "environmentId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "filename" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileExtension" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEnvironmentQuery, GetEnvironmentQueryVariables>;
export const RenameFileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RenameFile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filename" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "renameEnvironmentFile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filename" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filename" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environmentFile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "filename" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RenameFileMutation, RenameFileMutationVariables>;
export const DeleteFileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteFile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteEnvironmentFile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const CreateInviteLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateInviteLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "environmentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createInviteLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "environmentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "environmentId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "invite" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "environmentId" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInviteLinkMutation,
  CreateInviteLinkMutationVariables
>;

/** Autogenerated return type of AddNewFile. */
export type AddNewFilePayload = {
  __typename?: "AddNewFilePayload";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

/** Autogenerated return type of CreateEnvironment. */
export type CreateEnvironmentPayload = {
  __typename?: "CreateEnvironmentPayload";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  id: Scalars["ID"]["output"];
};

/** Autogenerated return type of CreateInviteLink. */
export type CreateInviteLinkPayload = {
  __typename?: "CreateInviteLinkPayload";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  invite?: Maybe<Invite>;
};

/** Autogenerated return type of DeleteEnvironmentFile. */
export type DeleteEnvironmentFilePayload = {
  __typename?: "DeleteEnvironmentFilePayload";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type Environment = {
  __typename?: "Environment";
  createdAt: Scalars["ISO8601DateTime"]["output"];
  environmentFiles: Array<EnvironmentFile>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

export type EnvironmentFile = {
  __typename?: "EnvironmentFile";
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["ISO8601DateTime"]["output"];
  environmentId: Scalars["Int"]["output"];
  fileExtension?: Maybe<Scalars["String"]["output"]>;
  fileSize?: Maybe<Scalars["Int"]["output"]>;
  filename?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

export type Invite = {
  __typename?: "Invite";
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["ISO8601DateTime"]["output"];
  environmentId: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

/** Autogenerated return type of JoinEnvironment. */
export type JoinEnvironmentPayload = {
  __typename?: "JoinEnvironmentPayload";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addNewFile: AddNewFilePayload;
  createEnvironment: CreateEnvironmentPayload;
  createInviteLink: CreateInviteLinkPayload;
  deleteEnvironmentFile: DeleteEnvironmentFilePayload;
  joinEnvironment: JoinEnvironmentPayload;
  renameEnvironmentFile: RenameEnvironmentFilePayload;
};

export type MutationAddNewFileArgs = {
  content: Scalars["String"]["input"];
  environmentId: Scalars["ID"]["input"];
  fileExtension: Scalars["String"]["input"];
  filename: Scalars["String"]["input"];
};

export type MutationCreateInviteLinkArgs = {
  code: Scalars["String"]["input"];
  environmentId: Scalars["ID"]["input"];
};

export type MutationDeleteEnvironmentFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationJoinEnvironmentArgs = {
  code: Scalars["String"]["input"];
};

export type MutationRenameEnvironmentFileArgs = {
  filename: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
  environment?: Maybe<Environment>;
  environmentFiles: Array<EnvironmentFile>;
  environments: Array<Environment>;
  invite?: Maybe<Array<Invite>>;
  /** An example field added by the generator */
  testField: Scalars["String"]["output"];
};

export type QueryEnvironmentArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryEnvironmentFilesArgs = {
  environmentId: Scalars["ID"]["input"];
};

/** Autogenerated return type of RenameEnvironmentFile. */
export type RenameEnvironmentFilePayload = {
  __typename?: "RenameEnvironmentFilePayload";
  environmentFile?: Maybe<EnvironmentFile>;
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
};

export type User = {
  __typename?: "User";
  browserToken: Scalars["String"]["output"];
  createdAt: Scalars["ISO8601DateTime"]["output"];
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

export type CreateEnvironmentMutationFn = Apollo.MutationFunction<
  CreateEnvironmentMutation,
  CreateEnvironmentMutationVariables
>;

/**
 * __useCreateEnvironmentMutation__
 *
 * To run a mutation, you first call `useCreateEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnvironmentMutation, { data, loading, error }] = useCreateEnvironmentMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateEnvironmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEnvironmentMutation,
    CreateEnvironmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateEnvironmentMutation,
    CreateEnvironmentMutationVariables
  >(CreateEnvironmentDocument, options);
}
export type CreateEnvironmentMutationHookResult = ReturnType<
  typeof useCreateEnvironmentMutation
>;
export type CreateEnvironmentMutationResult =
  Apollo.MutationResult<CreateEnvironmentMutation>;
export type CreateEnvironmentMutationOptions = Apollo.BaseMutationOptions<
  CreateEnvironmentMutation,
  CreateEnvironmentMutationVariables
>;

/**
 * __useGetDataQuery__
 *
 * To run a query within a React component, call `useGetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDataQuery, GetDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDataQuery, GetDataQueryVariables>(
    GetDataDocument,
    options
  );
}
export function useGetDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuery, GetDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDataQuery, GetDataQueryVariables>(
    GetDataDocument,
    options
  );
}
export function useGetDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetDataQuery, GetDataQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetDataQuery, GetDataQueryVariables>(
    GetDataDocument,
    options
  );
}
export type GetDataQueryHookResult = ReturnType<typeof useGetDataQuery>;
export type GetDataLazyQueryHookResult = ReturnType<typeof useGetDataLazyQuery>;
export type GetDataSuspenseQueryHookResult = ReturnType<
  typeof useGetDataSuspenseQuery
>;
export type GetDataQueryResult = Apollo.QueryResult<
  GetDataQuery,
  GetDataQueryVariables
>;

/**
 * __useGetEnvironmentQuery__
 *
 * To run a query within a React component, call `useGetEnvironmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvironmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvironmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEnvironmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEnvironmentQuery,
    GetEnvironmentQueryVariables
  > &
    (
      | { variables: GetEnvironmentQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEnvironmentQuery, GetEnvironmentQueryVariables>(
    GetEnvironmentDocument,
    options
  );
}
export function useGetEnvironmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEnvironmentQuery,
    GetEnvironmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEnvironmentQuery, GetEnvironmentQueryVariables>(
    GetEnvironmentDocument,
    options
  );
}
export function useGetEnvironmentSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEnvironmentQuery,
        GetEnvironmentQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEnvironmentQuery,
    GetEnvironmentQueryVariables
  >(GetEnvironmentDocument, options);
}
export type GetEnvironmentQueryHookResult = ReturnType<
  typeof useGetEnvironmentQuery
>;
export type GetEnvironmentLazyQueryHookResult = ReturnType<
  typeof useGetEnvironmentLazyQuery
>;
export type GetEnvironmentSuspenseQueryHookResult = ReturnType<
  typeof useGetEnvironmentSuspenseQuery
>;
export type GetEnvironmentQueryResult = Apollo.QueryResult<
  GetEnvironmentQuery,
  GetEnvironmentQueryVariables
>;
export type RenameFileMutationFn = Apollo.MutationFunction<
  RenameFileMutation,
  RenameFileMutationVariables
>;

/**
 * __useRenameFileMutation__
 *
 * To run a mutation, you first call `useRenameFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFileMutation, { data, loading, error }] = useRenameFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useRenameFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RenameFileMutation,
    RenameFileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RenameFileMutation, RenameFileMutationVariables>(
    RenameFileDocument,
    options
  );
}
export type RenameFileMutationHookResult = ReturnType<
  typeof useRenameFileMutation
>;
export type RenameFileMutationResult =
  Apollo.MutationResult<RenameFileMutation>;
export type RenameFileMutationOptions = Apollo.BaseMutationOptions<
  RenameFileMutation,
  RenameFileMutationVariables
>;
export type DeleteFileMutationFn = Apollo.MutationFunction<
  DeleteFileMutation,
  DeleteFileMutationVariables
>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    options
  );
}
export type DeleteFileMutationHookResult = ReturnType<
  typeof useDeleteFileMutation
>;
export type DeleteFileMutationResult =
  Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<
  DeleteFileMutation,
  DeleteFileMutationVariables
>;
export type CreateInviteLinkMutationFn = Apollo.MutationFunction<
  CreateInviteLinkMutation,
  CreateInviteLinkMutationVariables
>;

/**
 * __useCreateInviteLinkMutation__
 *
 * To run a mutation, you first call `useCreateInviteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteLinkMutation, { data, loading, error }] = useCreateInviteLinkMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCreateInviteLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInviteLinkMutation,
    CreateInviteLinkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateInviteLinkMutation,
    CreateInviteLinkMutationVariables
  >(CreateInviteLinkDocument, options);
}
export type CreateInviteLinkMutationHookResult = ReturnType<
  typeof useCreateInviteLinkMutation
>;
export type CreateInviteLinkMutationResult =
  Apollo.MutationResult<CreateInviteLinkMutation>;
export type CreateInviteLinkMutationOptions = Apollo.BaseMutationOptions<
  CreateInviteLinkMutation,
  CreateInviteLinkMutationVariables
>;
export const AddNewFileDocument = gql`
  mutation AddNewFile(
    $environmentId: ID!
    $filename: String!
    $content: String!
    $fileExtension: String!
  ) {
    addNewFile(
      environmentId: $environmentId
      filename: $filename
      content: $content
      fileExtension: $fileExtension
    ) {
      id
      errors
    }
  }
`;
export type AddNewFileMutationFn = Apollo.MutationFunction<
  AddNewFileMutation,
  AddNewFileMutationVariables
>;

/**
 * __useAddNewFileMutation__
 *
 * To run a mutation, you first call `useAddNewFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewFileMutation, { data, loading, error }] = useAddNewFileMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *      filename: // value for 'filename'
 *      content: // value for 'content'
 *      fileExtension: // value for 'fileExtension'
 *   },
 * });
 */
export function useAddNewFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNewFileMutation,
    AddNewFileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddNewFileMutation, AddNewFileMutationVariables>(
    AddNewFileDocument,
    options
  );
}
export type AddNewFileMutationHookResult = ReturnType<
  typeof useAddNewFileMutation
>;
export type AddNewFileMutationResult =
  Apollo.MutationResult<AddNewFileMutation>;
export type AddNewFileMutationOptions = Apollo.BaseMutationOptions<
  AddNewFileMutation,
  AddNewFileMutationVariables
>;
export const JoinEnvironmentDocument = gql`
  mutation JoinEnvironment($code: String!) {
    joinEnvironment(code: $code) {
      id
    }
  }
`;
export type JoinEnvironmentMutationFn = Apollo.MutationFunction<
  JoinEnvironmentMutation,
  JoinEnvironmentMutationVariables
>;

/**
 * __useJoinEnvironmentMutation__
 *
 * To run a mutation, you first call `useJoinEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinEnvironmentMutation, { data, loading, error }] = useJoinEnvironmentMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useJoinEnvironmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinEnvironmentMutation,
    JoinEnvironmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    JoinEnvironmentMutation,
    JoinEnvironmentMutationVariables
  >(JoinEnvironmentDocument, options);
}
export type JoinEnvironmentMutationHookResult = ReturnType<
  typeof useJoinEnvironmentMutation
>;
export type JoinEnvironmentMutationResult =
  Apollo.MutationResult<JoinEnvironmentMutation>;
export type JoinEnvironmentMutationOptions = Apollo.BaseMutationOptions<
  JoinEnvironmentMutation,
  JoinEnvironmentMutationVariables
>;
