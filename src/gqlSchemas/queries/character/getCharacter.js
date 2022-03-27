import { gql } from '@apollo/client'
import LocationFragment from '../fragments/LocationFragment'
import EpisodeFragment from '../fragments/EpisodeFragment'

export const GET_CHARACTER = gql`
    query GET_CHARACTER( $id: ID! ) { 
        character( id: $id ) {
            id
            name
            status
            species
            type
            gender
            image
            created
            location {
                ...LocationFragment
            }
            episode {
                ...EpisodeFragment
            }
        }
    }
    ${LocationFragment}
    ${EpisodeFragment}
`