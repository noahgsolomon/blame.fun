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
const documents = {
    "\n    query GetData {\n      currentUser {\n        id\n        name\n        image\n        createdAt\n        updatedAt\n      }\n      environments {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  ": types.GetDataDocument,
    "\n  query GetEnvironment($id: ID!) {\n    environment(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      environmentFiles {\n        id\n        environmentId\n        filename\n        content\n        fileExtension\n        fileSize\n        updatedAt\n        createdAt\n      }\n    }\n  }\n": types.GetEnvironmentDocument,
    "\n  mutation RenameFile($id: ID!, $filename: String!) {\n    renameEnvironmentFile(id: $id, filename: $filename) {\n      environmentFile {\n        id\n        filename\n      }\n      errors\n    }\n  }\n": types.RenameFileDocument,
    "\n  mutation DeleteFile($id: ID!) {\n    deleteEnvironmentFile(id: $id) {\n      id\n      errors\n    }\n  }\n": types.DeleteFileDocument,
    "\n  mutation CreateInviteLink($environmentId: ID!, $code: String!) {\n    createInviteLink(environmentId: $environmentId, code: $code) {\n      invite {\n        id\n        code\n        environmentId\n      }\n      errors\n    }\n  }\n": types.CreateInviteLinkDocument,
    "\n  mutation AddNewFile(\n    $environmentId: ID!\n    $filename: String!\n    $content: String!\n    $fileExtension: String!\n  ) {\n    addNewFile(\n      environmentId: $environmentId\n      filename: $filename\n      content: $content\n      fileExtension: $fileExtension\n    ) {\n      id\n      errors\n    }\n  }\n": types.AddNewFileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetData {\n      currentUser {\n        id\n        name\n        image\n        createdAt\n        updatedAt\n      }\n      environments {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  "): (typeof documents)["\n    query GetData {\n      currentUser {\n        id\n        name\n        image\n        createdAt\n        updatedAt\n      }\n      environments {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEnvironment($id: ID!) {\n    environment(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      environmentFiles {\n        id\n        environmentId\n        filename\n        content\n        fileExtension\n        fileSize\n        updatedAt\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEnvironment($id: ID!) {\n    environment(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      environmentFiles {\n        id\n        environmentId\n        filename\n        content\n        fileExtension\n        fileSize\n        updatedAt\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RenameFile($id: ID!, $filename: String!) {\n    renameEnvironmentFile(id: $id, filename: $filename) {\n      environmentFile {\n        id\n        filename\n      }\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation RenameFile($id: ID!, $filename: String!) {\n    renameEnvironmentFile(id: $id, filename: $filename) {\n      environmentFile {\n        id\n        filename\n      }\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteFile($id: ID!) {\n    deleteEnvironmentFile(id: $id) {\n      id\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteFile($id: ID!) {\n    deleteEnvironmentFile(id: $id) {\n      id\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateInviteLink($environmentId: ID!, $code: String!) {\n    createInviteLink(environmentId: $environmentId, code: $code) {\n      invite {\n        id\n        code\n        environmentId\n      }\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInviteLink($environmentId: ID!, $code: String!) {\n    createInviteLink(environmentId: $environmentId, code: $code) {\n      invite {\n        id\n        code\n        environmentId\n      }\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddNewFile(\n    $environmentId: ID!\n    $filename: String!\n    $content: String!\n    $fileExtension: String!\n  ) {\n    addNewFile(\n      environmentId: $environmentId\n      filename: $filename\n      content: $content\n      fileExtension: $fileExtension\n    ) {\n      id\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation AddNewFile(\n    $environmentId: ID!\n    $filename: String!\n    $content: String!\n    $fileExtension: String!\n  ) {\n    addNewFile(\n      environmentId: $environmentId\n      filename: $filename\n      content: $content\n      fileExtension: $fileExtension\n    ) {\n      id\n      errors\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;