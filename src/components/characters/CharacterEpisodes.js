import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER_EPISODES } from '../../gqlSchemas/queries/episodes/getEpisodes'
import Error from '../Error'
import styles from '../../styles/LocationEpisodes.module.css'

const CharacterEpisodes = ({ characterId }) => {

    const { data, error, loading } = useQuery(GET_CHARACTER_EPISODES, {
        variables: {
            id: characterId
        }
    })

    return (
        <div className={styles.locationEpisodes}>
            <span>First seen in:</span>
            {loading ?
                <small className="">Loading...</small>
                :
                <React.Fragment>
                    {error ?
                        <Error error={error} />
                        :
                        <a href="#">{data?.episodesByIds?.[0]?.name ?? "No episodes found."}</a>
                    }
                </React.Fragment>
            }
        </div>
    )
}
export default CharacterEpisodes