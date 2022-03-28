import React, { useContext } from 'react'
import { AppContext } from '../store/StoreProvider'
import { useQuery } from '@apollo/client'
import { GET_CHARACTERS } from '../gqlSchemas/queries/characters/getCharacters'
import Filter from '../components/home/Filter'
import Loader from '../components/Loader'
import Error from '../components/Error'
import ResultInfo from '../components/home/ResultInfo'
import LoadCharacters from '../components/characters/LoadCharacters'
import styles from '../styles/Home.module.css'

const Home = () => {

    /* Search filter by name AND OR status AND OR gender */
    const { query } = useContext(AppContext)
    const { name, status, gender } = query

    const { data, error, loading } = useQuery(GET_CHARACTERS, {
        notifyOnNetworkStatusChange: true,
        variables: {
            name: name.toLowerCase(),
            status: status.toLowerCase(),
            gender: gender.toLowerCase(),
            val: 'apollo-link-de'
        },
        context: {
            debounceKey: '2',
            debounceTimeout: 800,
        }
    })

    return (
        <React.Fragment>
            <Filter />
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
                                    totalResultCount={data?.characters?.info?.count}
                                    isLoading={loading}
                                />
                                <LoadCharacters
                                    characters={data?.characters ?? {}}
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