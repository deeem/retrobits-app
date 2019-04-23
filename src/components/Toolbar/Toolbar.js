import React from 'react';
import classes from './Toolbar.module.css';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <Logo />
        <Navigation />
    </div>
)

export default toolbar;