import React from 'react'

const Error = ({ error }) => {

    return (
        <p className="text-white text-center">Internal Server Error! {error?.message}</p> 
    )
}

export default Error