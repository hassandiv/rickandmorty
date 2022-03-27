import { gql } from '@apollo/client'
import LocationFragment from '../fragments/LocationFragment'
import EpisodeFragment from '../fragments/EpisodeFragment'

export const GET_CHARACTERS = gql`
    query GET_CHARACTERS( $page: Int, $name: String, $status: String, $gender: String ) { 
        characters: characters( page: $page, filter: { name: $name, status: $status, gender: $gender } ) {
            info {
                count
                pages
            }
            results {
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
    }
    ${LocationFragment}
    ${EpisodeFragment}
`