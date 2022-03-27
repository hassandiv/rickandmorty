import React, { useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../store/StoreProvider'
import CharacterLocation from '../components/characters/CharacterLocation'
import CharacterEpisodes from '../components/characters/CharacterEpisodes'
import styles from '../styles/CharacterView.module.css'

const CharacterView = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { setCharacterId, characterId } = useContext(AppContext)

    useEffect(() => {
        setCharacterId(id)
    }, [id])

    const { charactersView } = useContext(AppContext)

    const characterDetails = charactersView?.filter(characterView => characterView?.id === id)

    const redirect = () => {
        navigate('/')
    }

    console.log('id view page', id)
    console.log('characterId view page', characterId)

    return (
        <section className={styles.characterViewContainer}>
            <div className={styles.characterViewWrapper}>
                {/* <div className={styles.fadeIn}> */}
                    <p className={styles.name}>Hi, I'm <span>{characterDetails?.[0]?.name}</span> . Nice to meet you.</p>
                    <div className={styles.detailsWrapper}>
                        <p className={styles.characterDetails}>Status - <b>{characterDetails?.[0]?.status}</b></p>
                        <p className={styles.characterDetails}>Sepecies - <b>{characterDetails?.[0]?.species}</b></p>
                        <p className={styles.characterDetails}>Gender - <b>{characterDetails?.[0]?.gender}</b></p>
                    </div>
                    {/* <div className={styles.characterLocation}> */}
                        <CharacterLocation 
                            characterId={id}
                        /> 
                        <CharacterEpisodes 
                            characterId={id}
                        />
                    {/* </div> */}
                    
                    {/* <p className={styles.category}>In category - {post?.categories?.map((category, index) => (
                        <b key={index}>{category}</b>
                    ))}
                    </p> */}
                    <div className={styles.avatar}><img src={characterDetails?.[0]?.image} alt={characterDetails?.[0]?.name} /></div>
                    {/* <div className={styles.projectImage}>
                        <img src={character?.image} alt={character?.name} />
                    </div> */}
                    
                {/* </div> */}
            </div>
            <button
                onClick={redirect}
            >
                Go Back
            </button>
            {/* <a href='/'>
                Go Back
            </a> */}
        </section>
    )
}
export default CharacterView