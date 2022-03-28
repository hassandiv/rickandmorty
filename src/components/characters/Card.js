import React from "react"
import { useLocation, Link } from "react-router-dom"
import CharacterLocation from './CharacterLocation'
import CharacterEpisodes from "./CharacterEpisodes"
import styles from '../../styles/Card.module.css'

const Card = ({ character, handleRmv, handleChange }) => {

    const location = useLocation()

    const checkStatus = character?.status === "Alive" ? styles.greenIcon : character?.status === "Dead" ? styles.redIcon : character?.status === "unknown" && styles.greyIcon

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
                    {location.pathname === '/' ?
                        <input
                            type="checkbox"
                            alt="favourite"
                            className={`${character.checked ? styles.checkedIcon : styles.uncheckedIcon}` + ` ` + styles.iconPosition }
                            onChange={() => handleChange()}
                            checked={character.checked || false}
                        />
                        :
                        <input
                            type="checkbox"
                            alt="favourite"
                            className={`${styles.removeIcon}` + ` ` + styles.iconPosition}
                            onClick={() => handleRmv(handleRmv)}
                        />
                    }
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