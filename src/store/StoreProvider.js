import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    /* Filter queries for the characters schema */
    const [ query, setQuery ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ gender, setGender ] = useState('')

    /* Add characters to fav list */
    const [ favourite, setFavourite ] = useState([])
    const [ characterId, setCharacterId ] = useState('')

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery,
                status,
                setStatus,
                gender, 
                setGender,
                favourite,
                setFavourite,
                characterId,
                setCharacterId
            }}
        >
            {children}
        </AppContext.Provider>
    )
}