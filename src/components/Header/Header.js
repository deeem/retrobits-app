import React from 'react';
import classes from './Header.module.css';
import Navigation from './Navigation/Navigation';
import siteLogo from '../../assets/images/iconfinder_space-invader_2981852.svg';

const Header = (props) => (
    <div className={classes.Header}>
        <div>
            <img src={siteLogo} alt="RetroBits Logo" />
        </div>
        <Navigation />
    </div>
)

export default Header;