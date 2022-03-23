import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppStore = ({ children }) => {

    const [ query, setQuery ] = useState('')
    const [ status, setStatus ] = useState(undefined)
    const [ gender, setGender ] = useState(undefined)
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    return (
        <AppContext.Provider
            value={{
                query,
                setQuery,
                status,
                setStatus,
                gender, 
                setGender,
                isSubmitted,
                setIsSubmitted
            }}
        >
            {children}
        </AppContext.Provider>
    )
}