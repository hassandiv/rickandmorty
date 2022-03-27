import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    const [ query, setQuery ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ gender, setGender ] = useState('')

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery,
                status,
                setStatus,
                gender, 
                setGender
            }}
        >
            {children}
        </AppContext.Provider>
    )
}