import React from 'react'
import Card from './Card'
import styles from '../../styles/CharactersResults.module.css'

const CharactersResults = ({ charactersResults }) => {

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {charactersResults?.map(character => 
                        <Card
                            key={character?.id}
                            character={character}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default CharactersResults