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

export type GetDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetDataQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "User";
    id: string;
    name: string;
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

export type Environment = {
  __typename?: "Environment";
  createdAt: Scalars["ISO8601DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** An example field added by the generator */
  testField: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
  environments: Array<Environment>;
  /** An example field added by the generator */
  testField: Scalars["String"]["output"];
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
