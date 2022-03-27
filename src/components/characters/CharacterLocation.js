import React from 'react'
import styles from '../../styles/LocationEpisodes.module.css'

const CharacterLocation = ({ location }) => {

    return (
        <div className={styles.locationEpisodes}>
            <span>Last known location:</span>
            <a href="#">{location?.name || "Not available"}</a>
        </div>
    )
}
export default CharacterLocation