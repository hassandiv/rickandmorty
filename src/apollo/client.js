import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const link = createHttpLink({
   // uri: `${process.env.NEXT_PUBLIC_WP}/graphql`,
   uri: `https://rickandmortyapi.com/graphql`,
})

const cache = new InMemoryCache({
    resultCaching: false,
})

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    }
}

const client = new ApolloClient({
    link,
    cache,
    defaultOptions
})
export default client