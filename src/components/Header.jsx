import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

const search = <FontAwesomeIcon icon={faSearch} color="#6c757d"/>;

function Header(props) {
    const [expanded, setExpanded] = useState(false);
    return (
        <React.Fragment>
            <div id={styles.logo} className="">PartsFinder</div>
            <div className={styles.menu_block}>
                <nav className={styles.top_menu}>
                    <ul className={`${"list-inline"} ${styles.list_menu}`}>
                        <li id="text_finder-btn" className="list-inline-item mx-4 font-weight-bold">
                            <NavLink to='/text_finder' activeClassName={styles.active_link}>Текстовый Поиск</NavLink>
                        </li>
                        <li id="image_finder-btn" className="list-inline-item mx-4 font-weight-bold">
                            <NavLink to='/image_finder' activeClassName={styles.active_link}>Поиск по
                                Изображению</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Header;