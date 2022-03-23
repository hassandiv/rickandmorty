import React, { useEffect, useContext } from 'react'
import { AppContext } from '../store/StoreProvider'
import Card from './Card'
import styles from '../styles/CharactersResults.module.css'

const CharactersResults = ({ query, data, filteredData }) => {

    const fetchResults = query ? filteredData : data

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {fetchResults?.map(character => 
                    <Card
                        key={character?.id}
                        character={character}
                        location={data?.location}
                    />
                )}
            </div>
        </div>
    )
}
export default CharactersResults