import { gql } from "@apollo/client";

export const GET_REPOSITORY = gql`
  query GetRepository($username: String!, $slug: String!) {
    repositories(username: $username, slug: $slug) {
      id
      name
      description
      slug
      createdAt
      updatedAt
    }
  }
`;
