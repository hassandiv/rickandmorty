import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppStore} from './store/StoreProvider'
import Home from './pages/Home'
import CharacterView from './pages/CharacterView'
import NotFound from './pages/404'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
    return (
        <ApolloProvider client={client}>
            <AppStore>
                <Router>
                {/* <Header/> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/character/:id" element={<CharacterView />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                {/* <Footer/> */}
                </Router>
            </AppStore>
        </ApolloProvider>
    )
}

export default App
