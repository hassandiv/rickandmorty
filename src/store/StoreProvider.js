import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    /* Filter queries */
    const [ name, setName ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ gender, setGender ] = useState('')

    /* Add characters to fav list */
    const [ favourite, setFavourite ] = useState([])
    const [ characterId, setCharacterId ] = useState('')

    return (
        <AppContext.Provider
            value={{
                name,
                setName,
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