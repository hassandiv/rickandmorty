import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppStore} from './store/StoreProvider'
import Header from './components/Header'
import Layout from './components/Layout'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import CharacterView from './pages/CharacterView'
import NotFound from './pages/404'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {
    return (
        <ApolloProvider client={client}>
            <AppStore>
                <Router>
                <Header/>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/favourite" element={<Favourite />} />
                            <Route path="/character/:id" element={<CharacterView />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                <Footer/>
                </Router>
            </AppStore>
        </ApolloProvider>
    )
}

export default App
