import { gql } from '@apollo/client'

export const GET_CHARACTER_LOCATION = gql`
    query GET_CHARACTER_LOCATION( $id: ID! ) { 
        location(id: $id) {
            name
        }
    }
`