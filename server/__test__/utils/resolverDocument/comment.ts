export const commentsQuery = `
query($postId: String!){
  comments(postId: $postId) {
    text
  }
}
`;