import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    const [ query, setQuery ] = useState('')

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery
            }}
        >
            {children}
        </AppContext.Provider>
    )
}