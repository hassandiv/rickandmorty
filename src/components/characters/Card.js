import React from "react"
import { Link } from 'react-router-dom'
import CharacterLocation from './CharacterLocation'
import CharacterEpisodes from "./CharacterEpisodes"
import styles from '../../styles/Card.module.css'

const Card = ({ character }) => {

    const checkStatus = character?.status === "Alive" ? styles.greenIcon : character?.status === "Dead" ? styles.redIcon : character?.status === "unknown" && styles.greyIcon

    // console.log('character', character)

    return (
        <article className={styles.card} id={character?.id}>
            <img src={character?.image} alt={character?.name} />
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h2>
                        <Link
                            to={`/character/${character?.id}`}
                        >
                            {character?.name}
                        </Link>
                    </h2>
                    <span className={styles.details}>
                        <span className={checkStatus}></span>
                        {character?.status} - {character?.species} - {character?.gender}
                    </span>
                </div>
                <CharacterLocation
                    location={character?.location}
                />
                <CharacterEpisodes
                    episodes={character?.episode}
                />
            </div>
        </article>
    )
}
export default Card