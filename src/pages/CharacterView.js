import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/CharacterView.module.css'

const CharacterView = () => {

    const { state } = useLocation()
    const { character } = state

    const navigate = useNavigate()
    const redirect = () => {
        navigate('/')
    }

    return (
        <section className={styles.characterView}>
            <div className={styles.characterViewWidth}>
                {/* <div className={styles.fadeIn}> */}
                    <p className={styles.name}>Hi, I'm <span>{character?.name}</span> . Nice to meet you.</p>
                    <div className={styles.detailsWrapper}>
                        <p className={styles.characterDetails}>Status - <b>{character?.status}</b></p>
                        <p className={styles.characterDetails}>Sepecies - <b>{character?.species}</b></p>
                        <p className={styles.characterDetails}>Gender - <b>{character?.gender}</b></p>
                    </div>
                    {/* <p className={styles.category}>In category - {post?.categories?.map((category, index) => (
                        <b key={index}>{category}</b>
                    ))}
                    </p> */}
                    <div className={styles.avatar}><img src={character?.image} alt={character?.name} /></div>
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