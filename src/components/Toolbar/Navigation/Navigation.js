import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const navigation = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavLink exact to='/' activeClassName={classes.active} className={classes.NavigationItem}>Browse</NavLink>
            <NavLink exact to='/random' activeClassName={classes.active} className={classes.NavigationItem}>Random</NavLink>
            <NavLink exact to='/add' activeClassName={classes.active} className={classes.NavigationItem}>Add</NavLink>
            <NavLink exact to='/auth' activeClassName={classes.active} className={classes.NavigationItem}>Auth</NavLink>
        </ul>
    );
}

export default navigation;