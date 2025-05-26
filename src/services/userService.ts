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
              email
            }
            error {
              message
              code
            }
          }
        }
      `,
      variables: { input: { username, email, password } },
    });

    return {
      status: data.register.error ? "error" : 200,
      error: data.register.error || null,
      data: data.register.user || null,
    };
  } catch (error) {
    return {
      status: "error",
      error: error,
    };
  }
};

const login = async (email: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            error {
              httpStatus
              message
              code
            }
          }
        }
      `,
      variables: { input: { email, password } },
    });

    return {
      status: data.login.error ? "error" : 200,
      token: data.login.token || null,
      error: data.login.error || null,
    };
  } catch (error) {
    return {
      status: "error",
      error: error,
    };
  }
};

const getAll = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          getAllUsers {
            id
            username
            email
          }
        }
      `,
    });
    return {
      status: 200,
      data: data.getAllUsers || null,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

export default userService;