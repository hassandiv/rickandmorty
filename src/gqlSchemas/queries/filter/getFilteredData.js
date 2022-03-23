import { gql } from '@apollo/client'

export const GET_FILTERED_DATA = gql`
    query GET_FILTERED_DATA( $name: String, $status: String, $gender: String ) { 
        characters: characters(filter: { name: $name, status: $status, gender: $gender }) {
            info {
                count
            }
            results {
                id
                name
                status
                species
                type
                gender
                image
            }
        }
        location(id: 1) {
            id
            name
        }
        episodesByIds(ids: [1, 2]) {
            id
            name
        }
    }
`