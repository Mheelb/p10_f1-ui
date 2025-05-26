import { gql } from "@apollo/client";
import client from "./graphQlClient";

function leagueService() {
  return {
    getAllLeagues,
    createLeague,
    getUsersByLeague,
    getLeaguesByUserId, 
    addUserToLeague,
    getLeagueByJoinCode
  };
}

const getAllLeagues = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          publicLeagues {
            leagues {
              id
              leagueName
              maxParticipants
              isPrivate
              joinCode
              users {
                id
                username
                email
              }
            }
            httpStatus
          }
        }
      `,
      fetchPolicy: "network-only",
    });
    return {
      status: data.publicLeagues.httpStatus,
      data: data.publicLeagues.leagues || [],
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

const getUsersByLeague = async (leagueId: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          getMembersOfLeague(leagueId: "id_league") {
            members {
              id
              username
              email
            }
            httpStatus
          }
        }
      `,
      variables: { leagueId: leagueId },
      fetchPolicy: "network-only",
    });
    return {
      status: data.getMembersOfLeague.httpStatus,
      data: data.getMembersOfLeague.members || [],
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

const getLeaguesByUserId = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetLeaguesByUserId($userId: String!) {
          leaguesByUserId(input: { userId: $userId }) {
            id
            leagueName
            maxParticipants
            isPrivate
            joinCode
            users {
              id
              username
              email
            }
          }
        }
      `,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    return {
      status: data.leaguesByUserId ? 200 : "error",
      data: data.leaguesByUserId || [],
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

const getLeagueByJoinCode = async (joinCode: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetLeagueByJoinCode($joinCode: String!) {
          leagueByJoinCode(input: { joinCode: $joinCode }) {
            league {
              id
              leagueName
              maxParticipants
              isPrivate
              joinCode
              users {
                id
                username
                email
              }
            }
            error {
              message
              code
            }
            httpStatus
          }
        }
      `,
      variables: { joinCode },
      fetchPolicy: "network-only",
    });

    return {
      status: data.leagueByJoinCode.httpStatus,
      data: data.leagueByJoinCode.league || null,
      error: data.leagueByJoinCode.error || null,
    };
  } catch (error) {
    return {
      status: "error",
      data: null,
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

const addUserToLeague = async (leagueId: string, userId: string, admin: boolean = false) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation AddUserToLeague($input: AddUserToLeagueInput!) {
          addUserToLeague(input: $input) {
            league {
              id
              leagueName
              maxParticipants
              users {
                id
                username
                email
              }
            }
            httpStatus
          }
        }
      `,
      variables: { 
        input: { 
          leagueId, 
          userId, 
          admin 
        } 
      },
    });

    return {
      status: data.addUserToLeague.httpStatus,
      data: data.addUserToLeague.league,
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

export default leagueService;