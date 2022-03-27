import React from 'react'
import styles from '../styles/Error.module.css'

const Error = ({ error }) => {

    return (
        <p className="text-white mb-0">Internal Server Error! {error?.message}</p> 
    )
}
export default Error