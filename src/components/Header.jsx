import React, {useState} from 'react';
import styles from './Header.module.css';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

function Header() {
    const [expanded, setExpanded] = useState(false);
    return (
        <React.Fragment>
            <Navbar expand="lg"  expanded={expanded} bg="dark" variant="dark">
                <Navbar.Brand className="mr-5" id={styles.logo_title}>PartsFinder<img id={styles.logo} alt="logo" src={process.env.PUBLIC_URL + '/logo.png'} /> </Navbar.Brand>
                <Navbar.Toggle className={styles.nav_toggle_btn} onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink onClick={() => setExpanded(!expanded)} className={`${styles.list_menu} font-weight-bold`} activeClassName={styles.active_link} to="/text_finder">ТЕКСТОВЫЙ ПОИСК</NavLink>
                        <NavLink onClick={() => setExpanded(!expanded)} className={`${styles.list_menu} font-weight-bold`} activeClassName={styles.active_link} to="/image_finder">ПОИСК ПО ИЗОБРАЖЕНИЮ</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;