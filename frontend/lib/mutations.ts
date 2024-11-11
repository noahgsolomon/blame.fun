import { gql } from "@apollo/client";

export const CREATE_REPOSITORY = gql`
  mutation CreateRepository($attributes: RepositoryInput!) {
    createRepository(attributes: $attributes) {
      repository {
        id
        name
        description
        slug
        createdAt
        updatedAt
      }
    }
  }
`;
