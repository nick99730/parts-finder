import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopyright} from '@fortawesome/free-regular-svg-icons'
import styles from './Footer.module.css';

const copyright = <FontAwesomeIcon icon={faCopyright} />;


function Footer() {
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.footer_div} font-weight-bold`}>
            {copyright} PartsFinder 2021
        </div>
    )
}

export default Footer;