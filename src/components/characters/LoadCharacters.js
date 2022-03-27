import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import { AppContext } from '../../store/StoreProvider'
import { GET_FILTERED_DATA } from '../../gqlSchemas/queries/filter/getFilteredData'
import CharactersResults from './CharactersResults'
import styles from '../../styles/LoadMore.module.css'
import { Button } from 'react-bootstrap'

const LoadCharacters = ({ characters }) => {

    const { query, status, gender, setCharactersView, characterId } = useContext(AppContext)

    const queryToLowerCase = query?.toLowerCase()
    const statusToLowerCase = status?.toLowerCase()
    const genderToLowerCase = gender?.toLowerCase()

    console.log('query' , query)
    console.log('status' , status)
    console.log('gender' , gender)

    const [charactersResults, setCharactersResults] = useState(characters?.results ?? [])
    const [pageInfo, setPageInfo] = useState(characters?.info ?? {})
    const [page, setPage] = useState(1) //this will ensure two things: the first response is page 1 and on submitting the search form it will reset page to 1, because maybe we already loaded more items and page number has changed

    useEffect(() => {
        setCharactersResults(characters?.results) 
        setPageInfo(characters?.info)
    },  [characters?.results])

    console.log('page', page)

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

    const [ filterQuery, { loading } ] = useLazyQuery(GET_FILTERED_DATA, {
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
                    name: queryToLowerCase,
                    status: statusToLowerCase,
                    gender: genderToLowerCase,
                    page: page + 1 //by default page 1 is loaded by the api, so we setPage init state to 1, then load more page + 1 = 2 ...etc
                }
            })
        //}
    }

    useEffect(() => {
        //get characters for characterView page
        setCharactersView(charactersResults)
    }, [characters?.results, charactersResults, characterId])


    console.log('characterId', characterId)
    console.log('charactersResults', charactersResults)


    // useEffect(() => { i ++ to load to previous charachter view
    //     if(page) {
    //     loadMoreCharacters()
    //     }
    // }, [page])

    const { pages } = pageInfo || {}

    return (
        <React.Fragment>
            <CharactersResults
                charactersResults={charactersResults}
            />
            <div className={styles.loadMore}>
                {   page !== pages &&
                        <React.Fragment>
                            { loading ? 
                                <p>
                                    Loading...
                                </p>
                            : charactersResults?.length &&
                                <Button
                                    variant="light"
                                    onClick={() => loadMoreCharacters()}
                                >
                                    Load More
                                </Button>
                            }
                        </React.Fragment>
                    // :
                    // <p>No more characters found.</p>
                }
            </div>
        </React.Fragment>
    )
}
export default LoadCharacters