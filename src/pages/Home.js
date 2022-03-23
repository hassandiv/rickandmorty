import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from '../store/StoreProvider'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_DATA } from '../gqlSchemas/queries/home/getData'
import { GET_FILTERED_DATA } from '../gqlSchemas/queries/filter/getFilteredData'
import Filter from '../components/Filter'
import CharactersResults from '../components/CharactersResults'

const Home = () => {

    const { query } = useContext(AppContext)
    const { data, error } = useQuery(GET_FILTERED_DATA)

    const [ filteredData, setFilteredData ] = useState({})
    const [ getFilteredData, { loading } ] = useLazyQuery(GET_FILTERED_DATA, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setFilteredData(data ?? {})
            // setShowResultInfo(true)
        },
    })

    useEffect(() => {
        getFilteredData({
            variables: { // variables comes from our schema generally speaking in this case here GET_FILTERED_DATA_WITH_TOTAL_PAGES
                name: query,
                // after: null,
                // cityORareaORcompound: city && area && compound ? compound : city && area ? area : city && city,
                // typeORrooms: type && rooms ? rooms : type && type
            }
        })
    }, [])

    console.log('filteredData', filteredData)


    return (
        <React.Fragment>
            <Filter />
            <CharactersResults
                query={query}
                data={data?.characters?.results ?? []}
                filteredData={filteredData.characters?.results ?? []}
            />
        </React.Fragment>
    )
}
export default Home