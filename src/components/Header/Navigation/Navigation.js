import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {

    render() {
        return (
            <nav class="main-nav">
                <ul class="main-nav__items">

                    <NavLink exact to="/" className="main-nav__item" activeClassName="main-nav__item--active">Explore</NavLink>
                    <NavLink exact to="/random" className="main-nav__item" activeClassName="main-nav__item--active">Random</NavLink>
                    {this.props.isAuthenticated ? <NavLink exact to='/add' className="main-nav__item" activeClassName="main-nav__item--active">Add</NavLink> : null}
                    {this.props.isAuthenticated
                        ? <NavLink exact to="/logout" className="main-nav__item" activeClassName="main-nav__item--active">Logout</NavLink>
                        : <NavLink exact to="/auth" className="main-nav__item" activeClassName="main-nav__item--active">Log In</NavLink>}

                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Navigation);