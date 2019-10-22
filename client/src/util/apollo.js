import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import absintheSocketLink from "./absinthe-socket-link"
import { split } from "apollo-link";
import { hasSubscription } from "@jumpn/utils-graphql";
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from '../constants'

const HTTP_URI = "http://localhost:4000/api";


const httpLink = split(
  operation => hasSubscription(operation.query),
  absintheSocketLink,
  new HttpLink({ uri: HTTP_URI })
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const createClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};