import { gql } from '@apollo/client'

export const GET_DATA = gql`
    query GET_DATA { 
        characters {
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