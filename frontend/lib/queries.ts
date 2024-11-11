import { gql } from "@apollo/client";

export const GET_REPOSITORY = gql`
  query GetRepository($username: String!, $slug: String!, $path: String = "") {
    repositories(username: $username, slug: $slug) {
      id
      name
      description
      slug
      gitUrl
      createdAt
      updatedAt
      tree(path: $path) {
        name
        type
        oid
        path
      }
      treeEntryDetails(path: $path) {
        path
        type
        file
        size
        msg
        name
        date
        oid
      }
      fileContent(path: $path)
    }
  }
`;
