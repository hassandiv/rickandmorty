import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client'
import DebounceLink from 'apollo-link-debounce'

/* default debounce for all requests "mutation or query" - unless changed individually within every request  */
const DEFAULT_DEBOUNCE_TIMEOUT = 1000

const link = ApolloLink.from([
    new DebounceLink(DEFAULT_DEBOUNCE_TIMEOUT),
    new HttpLink({ uri: `https://rickandmortyapi.com/graphql` })
])

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