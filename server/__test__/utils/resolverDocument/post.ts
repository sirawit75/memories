export const postsQuery = `
query($curPage: Float!, $perPage: Float!){
  posts(curPage: $curPage, perPage: $perPage) {
    posts {
      title
    }
    hasMore
    nextPage
  }
}
`;


export const postQuery = `
query($postId: String!){
  post(postId: $postId) {
    id
    title
  }
}
`;

export const commentPostMutation = `
mutation($text: String!, $postId: String!){
  commentPost(text: $text, postId: $postId)
}
`;