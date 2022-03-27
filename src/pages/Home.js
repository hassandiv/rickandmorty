import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_FILTERED_DATA } from '../gqlSchemas/queries/filter/getFilteredData'
import Filter from '../components/Filter'
import LoadCharacters from '../components/characters/LoadCharacters'
import ResultInfo from '../components/ResultInfo'
import styles from '../styles/Home.module.css'

const Home = () => {

    const [ characters, setCharacters ] = useState({})
    const [ showResultInfo, setShowResultInfo ] = useState(false)
    const [ filterQuery, { loading, error } ] = useLazyQuery(GET_FILTERED_DATA, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setCharacters(data?.characters ?? {})
            setShowResultInfo(true)
        }
    })

    return (
        <div className={styles.container}>
            <Filter
                filterQuery={filterQuery}
            />
            <div className={styles.contentWrapper}>
                {   loading ?
                        <p className="text-white text-center mb-0">Loading...</p>
                    :
                    <React.Fragment>
                        {   error ? 
                                <p className="text-white text-center mb-0">Internal Server Error! {error?.message}</p> 
                            :
                            <React.Fragment>
                                <ResultInfo
                                    totalResultCount={characters?.info?.count}
                                    showResultInfo={showResultInfo}
                                />
                                <LoadCharacters
                                    characters={characters ?? {}}
                                />
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </div>
        </div>
    )
}
export default Home