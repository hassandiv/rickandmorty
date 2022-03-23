import React, { useContext } from 'react'
import { AppContext } from '../store/StoreProvider'
import Card from './Card'
import styles from '../styles/CharactersResults.module.css'

const CharactersResults = ({ data, filteredData }) => {

    const { isSubmitted } = useContext(AppContext)

    const fetchResults = isSubmitted ? filteredData : data

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {   fetchResults?.length > 0 ? fetchResults?.map(character => 
                        <Card
                            key={character?.id}
                            character={character}
                            location={data?.location}
                        />
                    )
                :
                    <p>No search results found. Try a different search.</p>
                }
            </div>
        </div>
    )
}
export default CharactersResults