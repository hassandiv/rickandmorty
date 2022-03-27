import { gql } from '@apollo/client'

export const GET_CHARACTER_EPISODES = gql`
    query GET_CHARACTER_EPISODES( $id: ID! ) { 
        episodesByIds(ids: [$id]) {
            id
            name
        }
    }
`