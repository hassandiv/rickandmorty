import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import { AppContext } from '../../store/StoreProvider'
import { GET_CHARACTERS } from '../../gqlSchemas/queries/characters/getCharacters'
import CharactersResults from './CharactersResults'
import Loader from '../Loader'
import { Button } from 'react-bootstrap'
import styles from '../../styles/LoadMore.module.css'

const LoadCharacters = ({ characters }) => {

    const { name, status, gender } = useContext(AppContext)

    const [charactersResults, setCharactersResults] = useState(characters?.results ?? [])
    const [pageInfo, setPageInfo] = useState(characters?.info ?? {})

    /* first response is page 1 and on submitting the search, reset page to 1 for our new results */
    const [page, setPage] = useState(1) 

    useEffect(() => {
        setCharactersResults(characters?.results) 
        setPageInfo(characters?.info)
    },  [characters?.results])

    /*
    * Concat the newly received characters from client request to the existing characters, using setNewCharacters()
    * when user clicks on loadmore again, next set of characters can be fetched again.
    * Same process if repeated to it gets concatenated everytime to the existing charactersResults array.
    */
    const setNewCharacters = (characters) => {
        if (!characters || !characters?.results) {
            return
        }
        const newCharachters = charactersResults.concat(characters?.results)
        setCharactersResults(newCharachters)
    }

    /* Getting the next page/set of characters and passing it to setNewCharacters() using LazyQuery manual loading on click loadmore */
    const [ filterQuery, { loading } ] = useLazyQuery(GET_CHARACTERS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setNewCharacters(data?.characters ?? {})
        }
    })

    /* loadmore characters with the same/current query */
    const loadMoreCharacters = () => {
        setPage(page + 1)
        filterQuery({ 
            variables: {
                name: name.toLowerCase(),
                status: status.toLowerCase(),
                gender: gender.toLowerCase(),
                page: page + 1
            }
        })
    }

    /* getting total pages */
    const { pages } = pageInfo || {}

    return (
        <React.Fragment>
            <CharactersResults
                charactersResults={charactersResults}
            />
            <div className={styles.loadMore}>
                {   page !== pages && charactersResults?.length &&
                    <React.Fragment>
                        { loading ? 
                            <Loader />
                            : 
                            <Button
                                variant="light"
                                onClick={() => loadMoreCharacters()}
                            >
                                Load More
                            </Button>
                        }
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default LoadCharacters