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
  try {
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
    return {
      status: 200,
      data: data.register.user,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  };
};

const login = async (email: string, password: string) => {
  try {
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
      variables: { input: { email, password } },
    });
    return {
      status: 200,
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      error: error
    };
  }
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