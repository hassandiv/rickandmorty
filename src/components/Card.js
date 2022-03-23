import React from "react"
import styles from '../styles/Card.module.css'

const Card = ({ character, location }) => {

    const checkStatus = character?.status === "Alive" ? styles.greenIcon : character?.status === "Dead" ? styles.redIcon : character?.status === "unknown" && styles.greyIcon

    return (
        <article className={styles.card}>
            <img src={character?.image} alt={character?.name} />
            <div className={styles.cardContent}>
                <div>
                    <h2><a href="#">{character?.name}</a></h2>
                    <span className={styles.status}>
                        <span className={checkStatus}></span>
                        {character?.status} - {character?.species}
                    </span>
                </div>
                <div className={styles.cardSection}>
                    <span>Last known location:</span>
                    <a href="#">{location?.name}</a>
                </div>
                <div className={styles.cardSection}>
                    <span>First seen in:</span>
                    <a href="#">{location?.name}</a>
                </div>
            </div>
        </article>
    )
}
export default Card