import { gql } from '@apollo/client'

export const GET_FILTERED_DATA = gql`
    query GET_FILTERED_DATA( $page: Int, $name: String, $status: String, $gender: String ) { 
        characters: characters(page: $page, filter: { name: $name, status: $status, gender: $gender }) {
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