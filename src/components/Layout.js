import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

const Layout= ({ children }) => {
    
    return(
        <React.Fragment>
            <Header/>
                <main className={styles.container}>
                    {children}
                </main>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout