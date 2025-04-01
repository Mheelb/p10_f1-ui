import { gql } from "@apollo/client";
import client from "./graphQlClient";

function userService() {
  return {
    register,
    login,
    getAll,
  };
}

const register = async (username: string, email: string, password: string) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
          user {
            id
            username
            email
          }
        }
      }
    `,
    variables: { input: { username, email, password } },
  });

  return data.register.user;
};

const login = async (username: string, password: string) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          user {
            id
            username
            email
          }
        }
      }
    `,
    variables: { input: { username, password } },
  });

  return data.login.user;
};

const getAll = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
          username
          email
        }
      }
    `,
  });
    

  return data.users;
};

export default userService;