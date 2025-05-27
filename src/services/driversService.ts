import { gql } from "@apollo/client";
import client from "./graphQlClient";

function driversService() {
  return {
    getAllDrivers
  };
}

const getAllDrivers = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            drivers {
              id
              name
              ecurie {
                id
                name
              }
              trigram
              picture
            }
          }
        `,
        fetchPolicy: "network-only",
      });
      return {
        status: data ? 200 : 404,
        data: data.drivers || [],
        error: null,
      };
    } catch (error) {
      return {
        status: "error",
        data: null,
        error: error,
      };
    }
  };


export default driversService;