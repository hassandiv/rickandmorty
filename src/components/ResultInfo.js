import React from 'react'

const ResultInfo = ({ totalResultCount }) => {

    const pluralOrSingular = totalResultCount === 1 ? 'character' : totalResultCount > 1 && 'characters'

    return (
        <p className="text-white text-center pb-3 fw-bold">
            {!totalResultCount ? 
                `No search results found. Try a different search.`
            : 
                `${totalResultCount} ${pluralOrSingular} found`
            }
        </p>
    )
}

export default ResultInfo