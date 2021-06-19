import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "https://tmdb.apps.quintero.io",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
  defaultOptions: defaultOptions,
});

export default client;
