import React, { Component } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { RemoveCustomer } from './RemoveCustomer'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://10.0.2.2:3000/graphql',
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      
        <ApolloProvider client={client}>
          <RemoveCustomer />
        </ApolloProvider>
      
    )
  }
}
