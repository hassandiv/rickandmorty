import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import { AppContext } from '../../store/StoreProvider'
import { GET_CHARACTERS } from '../../gqlSchemas/queries/characters/getCharacters'
import CharactersResults from './CharactersResults'
import Loader from '../Loader'
import { Button } from 'react-bootstrap'
import styles from '../../styles/LoadMore.module.css'

const LoadCharacters = ({ characters }) => {

    const { query, status, gender } = useContext(AppContext)

    let queryLowerCase = query.toLowerCase()
    let statusLowerCase = status.toLowerCase()
    let genderLowerCase = gender.toLowerCase()

    const [charactersResults, setCharactersResults] = useState(characters?.results ?? [])
    const [pageInfo, setPageInfo] = useState(characters?.info ?? {})
    const [page, setPage] = useState(1) //this will ensure two things: the first response is page 1 and on submitting the search form it will reset page to 1, because maybe we already loaded more items and page number has changed

    useEffect(() => {
        setCharactersResults(characters?.results) 
        setPageInfo(characters?.info)
    },  [characters?.results])


    const setNewCharacters = (characters) => { //characters comes from line 49 setNewCharacters(data?.characters ?? {})
        if (!characters || !characters?.results) {
            return
        }

        /**
         * Concat the newly received post from client request to the existing posts, using setPostsData()
         * and also set the new pageInfo that contains the new endcursor, so that
         * when user clicks on loadmore again, next set of posts can be fetched again.
         * Same process if repeated to it gets concatenated everytime to the existing posts array.
         */

        const newCharachters = charactersResults.concat(characters?.results)
        setCharactersResults(newCharachters)
    }

    const [ filterQuery, { loading } ] = useLazyQuery(GET_CHARACTERS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => { //promise function will be called when request above is made
        /**
         * Call setPosts to concat the new set of posts to existing one and update pageInfo
         * that contains the cursor and the information about whether we have the next page.
         */
         setNewCharacters(data?.characters ?? {})
        }
    })

    const loadMoreCharacters = () => {
        setPage(page + 1)
        //if(page >= 1) {
            filterQuery({ //same data below + page goes into load more component or next and prev to keep the same filter results. page var doesnt stay here
                variables: {
                    name: queryLowerCase,
                    status: statusLowerCase,
                    gender: genderLowerCase,
                    page: page + 1 //by default page 1 is loaded by the api, so we setPage init state to 1, then load more page + 1 = 2 ...etc
                }
            })
        //}
    }

    const { pages } = pageInfo || {}

    return (
        <React.Fragment>
            <CharactersResults
                charactersResults={charactersResults}
            />
            <div className={styles.loadMore}>
                {   page !== pages && //only show loadmore button if current page not equal to total pages
                    <React.Fragment>
                        {   loading ? 
                                <Loader />
                        :   charactersResults?.length && //only show loadmore button if reults length > 0, if no results found hide button.
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