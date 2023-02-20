import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Comment Model */
export type Comment = {
  __typename?: 'Comment';
  commentAt: Scalars['DateTime'];
  id: Scalars['ID'];
  like: Array<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: Scalars['Boolean'];
  createPost?: Maybe<Post>;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  editComment: Scalars['Boolean'];
  editPost?: Maybe<Post>;
  likeOrUnlike: Scalars['Boolean'];
  likeOrUnlikeComment: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCommentPostArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreatePostArgs = {
  imageUrl: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  deletedUserId: Scalars['String'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String'];
  text: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEditPostArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationLikeOrUnlikeArgs = {
  postId: Scalars['String'];
};


export type MutationLikeOrUnlikeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  nextPage: Scalars['Float'];
  posts: Array<Post>;
};

/** Post Model */
export type Post = {
  __typename?: 'Post';
  allComments?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['DateTime'];
  creator: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Array<Scalars['String']>;
  likeUser?: Maybe<Array<Maybe<User>>>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Array<Comment>>;
  generateNewAccessToken: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};


export type QueryPostsArgs = {
  curPage: Scalars['Float'];
  perPage: Scalars['Float'];
};

/** User Model */
export type User = {
  __typename?: 'User';
  commentId: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likeCommentId: Array<Scalars['String']>;
  likePost: Array<Scalars['String']>;
  tokenVersion: Scalars['Float'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export type CommetResponseFragment = { __typename?: 'Comment', commentAt: any, id: string, postId: string, text: string, username: string, like: Array<string> };

export type ErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type PostResponseFragment = { __typename?: 'Post', allComments?: Array<string | null> | null, createdAt: any, id: string, title: string, imageUrl: Array<string>, likeUser?: Array<{ __typename?: 'User', id: string, username: string } | null> | null };

export type UserFragment = { __typename?: 'User', id: string, username: string, createdAt: any, likePost: Array<string>, commentId: Array<string>, likeCommentId: Array<string> };

export type UserResponseFragment = { __typename?: 'UserResponse', accessToken: string, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, createdAt: any, likePost: Array<string>, commentId: Array<string>, likeCommentId: Array<string> } | null };

export type CommentPostMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CommentPostMutation = { __typename?: 'Mutation', commentPost: boolean };

export type CreatePostMutationVariables = Exact<{
  imageUrl: Array<Scalars['String']> | Scalars['String'];
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', allComments?: Array<string | null> | null, createdAt: any, id: string, title: string, imageUrl: Array<string>, likeUser?: Array<{ __typename?: 'User', id: string, username: string } | null> | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditCommentMutationVariables = Exact<{
  text: Scalars['String'];
  username: Scalars['String'];
  commentId: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: boolean };

export type EditPostMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['String'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost?: { __typename?: 'Post', allComments?: Array<string | null> | null, createdAt: any, id: string, title: string, imageUrl: Array<string>, likeUser?: Array<{ __typename?: 'User', id: string, username: string } | null> | null } | null };

export type LikeOrUnlikeCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type LikeOrUnlikeCommentMutation = { __typename?: 'Mutation', likeOrUnlikeComment: boolean };

export type LikeOrUnlikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikeOrUnlikeMutation = { __typename?: 'Mutation', likeOrUnlike: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', accessToken: string, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, createdAt: any, likePost: Array<string>, commentId: Array<string>, likeCommentId: Array<string> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', accessToken: string, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, createdAt: any, likePost: Array<string>, commentId: Array<string>, likeCommentId: Array<string> } | null } };

export type DeleteUserMutationVariables = Exact<{
  deletedUserId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', commentAt: any, id: string, postId: string, text: string, username: string, like: Array<string> }> | null };

export type GenerateNewAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateNewAccessTokenQuery = { __typename?: 'Query', generateNewAccessToken: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, createdAt: any, likePost: Array<string>, commentId: Array<string>, likeCommentId: Array<string> } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', allComments?: Array<string | null> | null, createdAt: any, id: string, title: string, imageUrl: Array<string>, likeUser?: Array<{ __typename?: 'User', id: string, username: string } | null> | null } | null };

export type PostsQueryVariables = Exact<{
  curPage: Scalars['Float'];
  perPage: Scalars['Float'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, nextPage: number, posts: Array<{ __typename?: 'Post', allComments?: Array<string | null> | null, createdAt: any, id: string, title: string, imageUrl: Array<string>, likeUser?: Array<{ __typename?: 'User', id: string, username: string } | null> | null }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }> };

export const CommetResponseFragmentDoc = gql`
    fragment CommetResponse on Comment {
  commentAt
  id
  postId
  text
  username
  like
}
    `;
export const PostResponseFragmentDoc = gql`
    fragment PostResponse on Post {
  allComments
  createdAt
  id
  title
  likeUser {
    id
    username
  }
  imageUrl
}
    `;
export const ErrorsFragmentDoc = gql`
    fragment Errors on FieldError {
  field
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  createdAt
  likePost
  commentId
  likeCommentId
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...Errors
  }
  user {
    ...User
  }
  accessToken
}
    ${ErrorsFragmentDoc}
${UserFragmentDoc}`;
export const CommentPostDocument = gql`
    mutation CommentPost($text: String!, $postId: String!) {
  commentPost(text: $text, postId: $postId)
}
    `;

export function useCommentPostMutation() {
  return Urql.useMutation<CommentPostMutation, CommentPostMutationVariables>(CommentPostDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($imageUrl: [String!]!, $title: String!) {
  createPost(imageUrl: $imageUrl, title: $title) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: String!) {
  deleteComment(commentId: $commentId)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditCommentDocument = gql`
    mutation EditComment($text: String!, $username: String!, $commentId: String!) {
  editComment(text: $text, username: $username, commentId: $commentId)
}
    `;

export function useEditCommentMutation() {
  return Urql.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument);
};
export const EditPostDocument = gql`
    mutation EditPost($text: String!, $postId: String!) {
  editPost(text: $text, postId: $postId) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useEditPostMutation() {
  return Urql.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument);
};
export const LikeOrUnlikeCommentDocument = gql`
    mutation LikeOrUnlikeComment($commentId: String!) {
  likeOrUnlikeComment(commentId: $commentId)
}
    `;

export function useLikeOrUnlikeCommentMutation() {
  return Urql.useMutation<LikeOrUnlikeCommentMutation, LikeOrUnlikeCommentMutationVariables>(LikeOrUnlikeCommentDocument);
};
export const LikeOrUnlikeDocument = gql`
    mutation LikeOrUnlike($postId: String!) {
  likeOrUnlike(postId: $postId)
}
    `;

export function useLikeOrUnlikeMutation() {
  return Urql.useMutation<LikeOrUnlikeMutation, LikeOrUnlikeMutationVariables>(LikeOrUnlikeDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($password: String!, $username: String!) {
  register(password: $password, username: $username) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($deletedUserId: String!) {
  deleteUser(deletedUserId: $deletedUserId)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const CommentsDocument = gql`
    query Comments($postId: String!) {
  comments(postId: $postId) {
    ...CommetResponse
  }
}
    ${CommetResponseFragmentDoc}`;

export function useCommentsQuery(options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<CommentsQuery, CommentsQueryVariables>({ query: CommentsDocument, ...options });
};
export const GenerateNewAccessTokenDocument = gql`
    query GenerateNewAccessToken {
  generateNewAccessToken
}
    `;

export function useGenerateNewAccessTokenQuery(options?: Omit<Urql.UseQueryArgs<GenerateNewAccessTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<GenerateNewAccessTokenQuery, GenerateNewAccessTokenQueryVariables>({ query: GenerateNewAccessTokenDocument, ...options });
};
export const MeDocument = gql`
    query ME {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($postId: String!) {
  post(postId: $postId) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($curPage: Float!, $perPage: Float!) {
  posts(curPage: $curPage, perPage: $perPage) {
    hasMore
    posts {
      ...PostResponse
    }
    nextPage
  }
}
    ${PostResponseFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    createdAt
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};