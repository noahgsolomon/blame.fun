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
      user {
        name
        username
        avatar
        location
        bio
      }
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

export const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    user(username: $username) {
      id
      name
      username
      avatar
      location
      bio
      twitter
      github
      website
      createdAt
    }
    repositories(username: $username) {
      id
      name
      description
      slug
      createdAt
      updatedAt
    }
    readmeContent: repositories(username: $username, slug: "readme.md") {
      fileContent(path: "README.md")
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      image
      createdAt
      updatedAt
      name
      email
      avatar
      bio
      location
      website
      twitter
      github
    }
  }
`;

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!) {
    repositories(username: $username) {
      id
      name
      description
      slug
      createdAt
      updatedAt
    }
  }
`;
