import "styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "client/apollo/apolloClient";
import RouteGuard from "components/RouteGuard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </ApolloProvider>
  );
}
