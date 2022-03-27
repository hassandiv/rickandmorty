import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import styles from '../styles/Header.module.css'

const Header = () => {

    const location = useLocation()

    return (
        <header className={location.pathname === "/" && "fixed-top"}>
            <Navbar bg="dark" variant="dark">
                <div className={styles.container}>
                    <Navbar.Brand className={styles.link}>
                        <Link to="/">Rick & Morty</Link>
                    </Navbar.Brand>
                    <Nav className={styles.link}>
                        <Link to="/">Home</Link>
                        <Link to="/favourite">Favourite</Link>
                    </Nav>
                </div>
            </Navbar>
        </header>
    )
}
export default Header