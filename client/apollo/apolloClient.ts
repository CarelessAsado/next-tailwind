import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND_ROUTER, BACKEND_URL_API } from "constants/constants";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: BACKEND_URL_API + BACKEND_ROUTER.GRAPHQL,
});
