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

export const STAR_REPOSITORY = gql`
  mutation StarRepository($repositoryId: ID!) {
    starRepository(repositoryId: $repositoryId) {
      repository {
        id
        starsCount
        isStarredByMe
      }
      errors
    }
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation UnstarRepository($repositoryId: ID!) {
    unstarRepository(repositoryId: $repositoryId) {
      repository {
        id
        starsCount
        isStarredByMe
      }
      errors
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username) {
      user {
        id
        followersCount
        isFollowedByMe
      }
      errors
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username) {
      user {
        id
        followersCount
        isFollowedByMe
      }
      errors
    }
  }
`;
