import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { uniswapUrl } from '../constants'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const queryUsersInfo = gql`
  query usersInfo($skip: Int) {
    users(first: 25, skip: $skip) {
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

export const queryUserTransactions = gql`
  query userTransactions($user: Bytes!) {
    transactions(where: { user: $user }) {
      id
      user
      ethAmount
      tokenAddress
      tokenAmount
      tokenSymbol
    }
  }
`

const apolloClient = new ApolloClient({
  uri: uniswapUrl,
  cache: new InMemoryCache(),
})

export default apolloClient
