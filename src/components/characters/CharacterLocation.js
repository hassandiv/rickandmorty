import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER_LOCATION } from '../../gqlSchemas/queries/location/getLocation'
import Error from '../Error'
import styles from '../../styles/LocationEpisodes.module.css'

const CharacterLocation = ({ characterId }) => {

    const { data, error, loading } = useQuery(GET_CHARACTER_LOCATION, {
        variables: {
            id: characterId
        }
    })

    return (
        <div className={styles.locationEpisodes}>
            <span>Last known location:</span>
            {loading ?
                <small className="">Loading...</small>
                :
                <React.Fragment>
                    {error ?
                        <Error error={error} />
                        :
                        <a href="#">{data?.location?.name ?? "No location found."}</a>
                    }
                </React.Fragment>
            }
        </div>
    )
}
export default CharacterLocation