import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    /* Filter queries */
    const [ query, setQuery ] = useState({
        name: '',
        status: '',
        gender: ''
    })

    /* Add characters to fav list */
    const [ favourite, setFavourite ] = useState([])
    const [ characterId, setCharacterId ] = useState('')

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery,
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