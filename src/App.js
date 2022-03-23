import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import { AppStore} from './store/StoreProvider'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
    return (
        <ApolloProvider client={client}>
            <AppStore>
                <Home />
            </AppStore>
        </ApolloProvider>
    )
}

export default App
