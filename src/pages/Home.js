import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from '../store/StoreProvider'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_DATA } from '../gqlSchemas/queries/home/getData'
import { GET_FILTERED_DATA } from '../gqlSchemas/queries/filter/getFilteredData'
import Filter from '../components/Filter'
import CharactersResults from '../components/CharactersResults'

const Home = () => {

    const { data, error } = useQuery(GET_FILTERED_DATA)
    const [ filteredData, setFilteredData ] = useState({})
    const [ filterQuery, { loading } ] = useLazyQuery(GET_FILTERED_DATA, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setFilteredData(data ?? {})
            // setShowResultInfo(true)
        },
    })


    return (
        <React.Fragment>
            <Filter 
                filterQuery={filterQuery}
            />
            <CharactersResults
                data={data?.characters?.results ?? []}
                filteredData={filteredData.characters?.results ?? []}
            />
        </React.Fragment>
    )
}
export default Home