import React, { useEffect, useContext } from 'react'
import { AppContext } from '../store/StoreProvider'
import Card from "../components/characters/Card"
import styles from '../styles/Favourite.module.css'

const Favourite = () => {

    const { favourite, setFavourite } = useContext(AppContext)

    /* Gets the characters from the localStorage and store in favourite array */
    useEffect(() => {
        const favData = localStorage.getItem('favourite') 
        const parsedData = JSON.parse(favData)
        if (parsedData?.length > 0) {
            setFavourite(parsedData)
        }
    }, [])

    /* copy fav array before splicing characters */
    const removedFav = favourite ? [...favourite] : []

    /* Handle remove characters from favourite list/array */
    const handleRmv = favCharacter => {
        const character = favourite?.find(fav => fav?.id === favCharacter.id)
        if(!character) return
        const findIndex = favourite?.indexOf(character)
        if (findIndex > -1) {
            removedFav?.splice(findIndex, 1)
        }
        setFavourite(removedFav)
    }

    /* Update the localStorage with unChecked characters */
    useEffect(() => { 
        if (favourite) {
            localStorage.setItem('favourite', JSON.stringify(favourite))
        }
    }, [favourite])

    const isPlural = favourite?.length > 1 ? "s" : favourite?.length === 1 && ""
    
    return (
        <div className={styles.container}>
            <div className="mb-5">
                {   favourite?.length === 0 ?
                    <h5 className="text-white text-center">Add some characters to your favourite list :) </h5>
                    :
                    <h5 className="text-white text-center">
                        You have <b> {favourite?.length} character{isPlural} </b> added to your favourite list keep going :)
                    </h5>
                }
            </div>
            <div className={styles.row}>
                {favourite?.map(favCharacter =>
                        <Card
                            character={favCharacter}
                            key={favCharacter?.id}
                            handleRmv={() => handleRmv(favCharacter)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Favourite