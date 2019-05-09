import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

class Navigation extends Component {

    render() {
        return (
            <ul className={classes.NavigationItems}>
                <NavLink exact to='/' activeClassName={classes.active} className={classes.NavigationItem}>Browse</NavLink>
                <NavLink exact to='/random' activeClassName={classes.active} className={classes.NavigationItem}>Random</NavLink>
                {this.props.isAuthenticated ? <NavLink exact to='/add' activeClassName={classes.active} className={classes.NavigationItem}>Add</NavLink> : null}
                {this.props.isAuthenticated
                    ? <NavLink exact to="/logout" activeClassName={classes.active} className={classes.NavigationItem}>Logout</NavLink>
                    : <NavLink exact to="/auth" activeClassName={classes.active} className={classes.NavigationItem}>Log In</NavLink>}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Navigation);