import "styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "client/apollo/apolloClient";
import RouteGuard from "components/RouteGuard";
import { UserContextProvider } from "client/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </UserContextProvider>
    </ApolloProvider>
  );
}
