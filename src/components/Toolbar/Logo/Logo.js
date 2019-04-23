import React from 'react';
import classes from './Logo.module.css';
import siteLogo from '../../../assets/images/iconfinder_space-invader_2981852.svg';

const logo = () => (
    <div className={classes.Logo}>
        <img src={siteLogo} alt="logo" />
    </div>
)

export default logo;