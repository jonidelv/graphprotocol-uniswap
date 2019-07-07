import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { uniswapUrl } from '../constants'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const queryUsersInfo = gql`
  query usersInfo($skip: Int) {
    users(first: 20, skip: $skip) {
      id
      exchangeBalances {
        id
        ethDeposited
        ethWithdrawn
        ethBought
        ethSold
        ethFeesPaid
      }
    }
  }
`

const client = new ApolloClient({
  uri: uniswapUrl,
  cache: new InMemoryCache(),
})

export default client
