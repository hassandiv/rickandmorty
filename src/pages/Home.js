import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/StoreProvider'
import { useLazyQuery } from '@apollo/client'
import { GET_CHARACTERS } from '../gqlSchemas/queries/characters/getCharacters'
import Filter from '../components/home/Filter'
import Loader from '../components/Loader'
import Error from '../components/Error'
import ResultInfo from '../components/home/ResultInfo'
import LoadCharacters from '../components/characters/LoadCharacters'
import styles from '../styles/Home.module.css'

const Home = () => {

    const { query, status, gender } = useContext(AppContext)
    const [ characters, setCharacters ] = useState({})
    const [ showResultInfo, setShowResultInfo ] = useState(false)

    const [ filterQuery, { loading, error } ] = useLazyQuery(GET_CHARACTERS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setCharacters(data?.characters ?? {})
            setShowResultInfo(true)
        }
    })

    /* Get all characters before submitting request with filter */
    useEffect(() => {
        filterQuery({
            variables: {
                name: query,
                status: status,
                gender: gender
            }
        })
    }, [])

    return (
        <React.Fragment>
            <Filter
                filterQuery={filterQuery}
            />
            <div className={styles.contentWrapper}>
                {   loading ?
                        <Loader />
                    :
                    <React.Fragment>
                        {   error ? 
                                <Error error={error} />
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
        </React.Fragment>
    )
}
export default Home