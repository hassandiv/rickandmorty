import React, { useEffect, useContext, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../store/StoreProvider'
import Card from './Card'
import styles from '../../styles/CharactersResults.module.css'

const CharactersResults = ({ charactersResults }) => {

    const navigate = useNavigate()
    const { favourite, setFavourite, characterId, setCharacterId } = useContext(AppContext)
    const [rmvLastItem, setRmvLastItem] = useState(false)

    /* reload component with favourite characters to keep it checked all the time */
    const refreshData = () => { 
        navigate("/")
    }

    /*
    * add checked false to characters array
    * on reloading the component with favourite depend array, update our checked characters to be true - character.checked = true
    */
    useEffect(() => {
		charactersResults?.forEach(character => { character.checked = false })
		//below just after browser refreshed
		charactersResults?.filter(character => { 
			if (favourite?.find(favCharacter => favCharacter?.id === character?.id)) {
				refreshData()
				character.checked = true
			}
		})
	}, [favourite])

    /* handle character checkbox - checked / unchecked */
	const handleOnChange = character => {
        charactersResults?.filter(char => {
            if (char?.id === character?.id) {
				char.checked = !char.checked
			}
		})
		setCharacterId(character?.id)
	}

    /* copy fav array before splicing characters */
	const copyFavCharacters = favourite ? [...favourite] : []

	useEffect(() => {
        if (characterId) {
           toggleChecked()
		}
	}, [characterId])

    /* splice from array copyFavCharacters / push to array copyFavCharacters */
    const toggleChecked = () => {
		const character = charactersResults?.find(character => character?.id === characterId)
		const favCharacter = favourite?.find(fav => fav?.id === characterId)
		if (!character) return

		const findIndexBefore = favourite?.indexOf(character)
		const findIndexAfter = favourite?.indexOf(favCharacter)

		if (findIndexBefore > -1) {
			copyFavCharacters?.splice(findIndexBefore, 1)
        }
		else if (favCharacter) {
			copyFavCharacters?.splice(findIndexAfter, 1)
		}
		else {
			copyFavCharacters?.push(character)
		}

        /* Update the favourite array with pushed or spliced from copyFavCharacters array */
        setFavourite(copyFavCharacters)
		setCharacterId('')

		if (favourite?.length === 1) { //rmv last 1
			setRmvLastItem(true)
		}
	}

    /* Set fav characters to localStorage */
	useEffect(() => {
		if (favourite?.length > 0) {
			localStorage.setItem('favourite', JSON.stringify(favourite))
		}
		if (favourite?.length === 0 && rmvLastItem) { //rmv last 1
			const clearFav = favourite?.splice(0)
			localStorage.setItem('favourite', JSON.stringify(clearFav))
		}
	}, [favourite, rmvLastItem])

    /* Get fav characters from localStorage and update favourite array*/
	useEffect(() => {
		const favData = localStorage.getItem('favourite') 
		const parsedData = JSON.parse(favData)
		setFavourite(parsedData)
	}, [])

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {charactersResults?.map(character => 
                        <Card
                            key={character?.id}
                            character={character}
                            handleChange={() => handleOnChange(character)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default CharactersResults