import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

console.log("API_BASE_URL", process.env.API_BASE_URI);

const httpLink = createHttpLink({
  uri: process.env.API_BASE_URI || "http://host.docker.internal:3001/",
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;