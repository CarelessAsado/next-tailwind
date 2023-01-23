import { ApolloClient, FetchResult, from, InMemoryCache } from "@apollo/client";
import { BACKEND_ROUTER, BACKEND_URL_API } from "constants/constants";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LoginUserMutation } from "client/generated/graphql";
import { getTokenLStorage } from "client/utils/localStorage";

const httpLink = new HttpLink({
  uri: BACKEND_URL_API + BACKEND_ROUTER.GRAPHQL,
  // Additional options
});

function isLoginUserMutation(obj: any): obj is LoginUserMutation {
  return obj.loginUser !== undefined;
}
/*  REST OF THE INFO INSIDE APOLLO AUTHLINK
  /* READ CONTEXT PASSED FROM ANOTHER LINK
  alert(operation.getContext().blabla);
  alert(operation.getContext().headers.auth); */
//alert("we in the middleware" + JSON.stringify(forward));
//see how to correctly type context with headers / token / auth

/*  */
const authLink = new ApolloLink((operation, forward) => {
  alert("we in link");
  const token = getTokenLStorage();

  if (token) {
    operation.setContext((all: any) => {
      console.log(all, 666);
      alert("getting token");
      return {
        headers: {
          auth: token,
          ...all.headers,
        },
      };
    });
  }
  return forward(operation).map((response) => {
    //its useless setting the context.headers on return from a specific operation because on the next operation that context is gone. I have to set it on the REQUEST
    /*  alert("BACK UP THE LINK CHAIN");
    console.log(response);
    if (isLoginUserMutation(response.data)) {
      const { accessToken } = response.data.loginUser;
      alert(accessToken);
      operation.setContext((all: any) => {
        console.log(all, 888);
        return {
          headers: {
             ...all.headers, 
            auth: accessToken, // however you get your token
          },
        };
      });
    } */

    return response;
  });
});

//ESTO FUNCIONAAAAAAAAAAAAAAAAA, puedo pasar context de 2 maneras entonces
/* const authLink2 = setContext((_, { headers }) => {
  alert("FIRST LINK, set context");
  return {
    blabla: "holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    headers: {
      ...headers,
      auth: "RODRIGO",
    },
  };
}); */
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  /* I think that if I add a specific middleware link I need to add myself an HTTPLink which contains the uri
   uri: BACKEND_URL_API + BACKEND_ROUTER.GRAPHQL, */
  //see https://www.apollographql.com/docs/react/api/link/introduction/#your-first-link-chain
  link: from([authLink, httpLink]),
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
