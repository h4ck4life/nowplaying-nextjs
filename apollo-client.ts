import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://tmdb.apps.quintero.io",
  cache: new InMemoryCache({
    resultCaching: false
  }),
});

export default client;
