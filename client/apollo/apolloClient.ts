import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { BACKEND_ROUTER, BACKEND_URL_API } from "constants/constants";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = new HttpLink({
  uri: BACKEND_URL_API + BACKEND_ROUTER.GRAPHQL,
  // Additional options
});
const authLink = new ApolloLink((operation, forward) => {
  console.log(operation.getContext().blabla, 999);
  alert(operation.getContext().headers.auth);
  alert("we in the middleware" + JSON.stringify(forward));
  //see how to correctly type context with headers / token / auth

  operation.setContext((all: any) => {
    console.log(all, 666);
    return {
      headers: {
        auth: "rod", // however you get your token
        ...all.headers,
      },
    };
  });
  if (forward) return forward(operation);
  else return null;
});

//ESTO FUNCIONAAAAAAAAAAAAAAAAA, puedo pasar context
const authLink2 = setContext((_, { headers }) => {
  alert("2");
  return {
    blabla: "holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    headers: {
      ...headers,
      auth: "RODRIGO",
    },
  };
});
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  /* I think that if I add a specific middleware link I need to add myself an HTTPLink which contains the uri
   uri: BACKEND_URL_API + BACKEND_ROUTER.GRAPHQL, */
  //see https://www.apollographql.com/docs/react/api/link/introduction/#your-first-link-chain
  link: from([authLink2, authLink, httpLink]),
});

/* const authLink2 = setContext((_, { headers }) => {
  console.log(_, 666);
  const token = localStorage.getItem("id");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
}); */
