export const registerMutation = `
  mutation Register($password: String!, $username: String!){
    register(password: $password, username: $username) {
      errors {
        message
      }
      user {
        username
      }
    }
  }
`;


export const meQuery= `
  {
    me{
      username
    }
  }
`;
export const loginMutation = `
  mutation Login($password: String!, $username: String!){
    login(password: $password, username: $username) {
      errors {
        message
      }
      user {
        username
      }
    }
  }
`;

