import { gql } from "@apollo/client";
import client from "./graphQlClient";

function leagueService() {
  return {
    getAllLeagues,
    createLeague,
  };
}

const getAllLeagues = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
	        getAllLeagues {
            id,
            joinCode,
            isPrivate,
            leagueName,
            maxParticipants,
            users {
              username
            }
          }
        }
      `,
      fetchPolicy: "network-only",
    });
    return {
      status: 200,
      data: data.getAllLeagues || null,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

const createLeague = async (leagueName: string, isPrivate: boolean, maxParticipants: number) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateLeague($input: LeagueInput!) {
          createLeague(input: $input) {
            error {
              message
              code
              httpStatus
            }
            league {
              joinCode
            }
          }
        }
      `,
      variables: { input: { leagueName, isPrivate, maxParticipants } },
    });

    return {
      status: data.createLeague.error ? "error" : 200,
      error: data.createLeague.error || null,
      data: data.createLeague.league || null,
    };
  } catch (error) {
    return {
      status: "error",
      error: error,
    };
  }
};

export default leagueService;