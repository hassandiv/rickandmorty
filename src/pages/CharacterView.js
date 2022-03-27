import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER } from '../gqlSchemas/queries/character/getCharacter'
import Loader from '../components/Loader'
import Error from '../components/Error'
import CharacterLocation from '../components/characters/CharacterLocation'
import CharacterEpisodes from '../components/characters/CharacterEpisodes'
import styles from '../styles/CharacterView.module.css'

const CharacterView = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { data, error, loading } = useQuery(GET_CHARACTER, {
        variables: {
            id: Number(id) //e.g. 1 OR 2
        }
    })

    const redirect = () => {
        navigate('/')
    }

    return (
        <section className={styles.characterViewContainer}>
            {   loading ?
                    <Loader />
                :
                <React.Fragment>
                    {   error ? 
                            <Error error={error} />
                        :
                        <React.Fragment>
                            <div className={styles.characterViewWrapper}>
                            <p className={styles.name}>Hi, I'm <span>{data?.character?.name || ""}</span> . Nice to meet you.</p>
                            <div className={styles.detailsWrapper}>
                                <p>Type - <b>{data?.character?.type || "Not available"}</b></p>
                                <p>Status - <b>{data?.character?.status || "Not available"}</b></p>
                                <p>Sepecies - <b>{data?.character?.species || "Not available"}</b></p>
                                <p>Gender - <b>{data?.character?.gender || "Not available"}</b></p>
                            </div>
                            <CharacterLocation 
                                location={data?.character?.location}
                            /> 
                            <CharacterEpisodes 
                                episodes={data?.character?.episode}
                            />
                            <div className={styles.avatar}><img src={data?.character?.image} alt={data?.character?.name || "Not available"} /></div>
                            </div>
                            <button
                                onClick={redirect}
                            >
                                Go Back
                            </button>
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </section>
    )
}
export default CharacterView