import React from 'react'
import styles from '../../styles/LocationEpisodes.module.css'

const CharacterEpisodes = ({ episodes }) => {

    return (
        <div className={styles.locationEpisodes}>
            <span>First seen in:</span>
            <a href="#">{episodes?.[0]?.name || "Not available"}</a>
        </div>
    )
}
export default CharacterEpisodes