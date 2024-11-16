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
      starsCount
      isStarredByMe
      stargazers {
        id
        username
        avatar
        name
        bio
      }
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
      starsCount
      isStarredByMe
    }
  }
`;

export const SEARCH_FILES = gql`
  query SearchFiles($username: String!, $slug: String!, $query: String!) {
    repositories(username: $username, slug: $slug) {
      id
      searchFiles(query: $query) {
        path
        type
        file
        size
        msg
        name
        date
        oid
      }
    }
  }
`;

export const GET_USER_STARRED_REPOSITORIES = gql`
  query GetUserStarredRepositories($username: String!) {
    starredRepositories(username: $username) {
      id
      name
      description
      slug
      starsCount
      isStarredByMe
      updatedAt
    }
  }
`;
