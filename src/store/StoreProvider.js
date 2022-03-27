import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    const [ query, setQuery ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ charactersView, setCharactersView ] = useState([])
    const [ charachterId, setCharacterId ] = useState(null) 

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery,
                status,
                setStatus,
                gender, 
                setGender,
                charactersView,
                setCharactersView,
                charachterId,
                setCharacterId
            }}
        >
            {children}
        </AppContext.Provider>
    )
}