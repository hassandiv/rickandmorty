// import React from 'react'
// import { useQuery } from '@apollo/client'
// import { GET_DATA } from '../gqlSchemas/queries/home/getData'
// import { Container, Row } from 'react-bootstrap'
// import Card from '../components/Card'

// const Tab = () => {

//     const { data, loading, error } = useQuery(GET_DATA)

//     const fetchData = data?.characters?.results

//     console.log('results', data?.characters?.results)
//     console.log('info', data?.characters?.info)

//     return (
//         <Container fluid>
//             <Row>
//                 {fetchData?.map(character => 
//                     <Card
//                         key={character?.id}
//                         character={character}
//                     />
//                 )}
//             </Row>
//         </Container>
//     )
// }
// export default Tab