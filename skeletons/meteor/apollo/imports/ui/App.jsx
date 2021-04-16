import React from 'react';
import { InMemoryCache, ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http'
// import { MeteorAccountsLink } from 'meteor/apollo'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
{{! CONTAINER_IMPORT !}}

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const link = ApolloLink.from([
  // MeteorAccountsLink(),
  new BatchHttpLink({
    uri: '/graphql'
  })
]);

const client = new ApolloClient({
  uri: '/graphql',
  cache,
  link,
});

export const App = () => (
  <ApolloProvider client={client}>
    <{{! CONTAINER !}}>
      <h1>Welcome to {{! NAME !}}!</h1>
      <Hello/>
      <Info/>
    </{{! CONTAINER !}}>
  </ApolloProvider>
);
