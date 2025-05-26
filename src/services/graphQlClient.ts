import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:3001",
  credentials: "include",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:3001",
  cache: new InMemoryCache(),
});

export default client;