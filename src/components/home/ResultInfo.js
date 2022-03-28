import React from 'react'

const ResultInfo = ({ totalResultCount, isLoading }) => {

    const isPlural = totalResultCount > 1 ? "s" : totalResultCount === 1 && ""

    return (
        <p className={`${isLoading ? "d-none" : "d-block" } text-white text-center pb-3 fw-bold`}>
            { !totalResultCount ?
                "No search results found. Try a different search."
                :
                `${totalResultCount} character${isPlural} found`
            }
        </p>
    )
}

export default ResultInfo