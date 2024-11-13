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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $attributes: UserInput!) {
    updateUser(id: $id, attributes: $attributes) {
      user {
        id
        name
        username
        bio
        location
        website
        twitter
        github
        avatar
        email
      }
    }
  }
`;
