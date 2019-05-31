import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Backdrop from '../UI/Backdrop/Backdrop';
import './MobileNav.css';

class MobileNav extends Component {

    render() {
        let navClasses = ['mobile-nav'];
        if (this.props.visible) {
            navClasses.push('open');
        }

        return (
            <>
                <Backdrop
                    show={this.props.visible}
                    clicked={this.props.toggled}
                />
                <nav class={navClasses.join(' ')}>
                    <ul class="mobile-nav__items">
                        <NavLink exact to="/" className="mobile-nav__item" activeClassName="mobile-nav__item--active">Explore</NavLink>
                        <NavLink exact to="/random" className="mobile-nav__item" activeClassName="mobile-nav__item--active">Random</NavLink>
                        {this.props.isAuthenticated ? <NavLink exact to='/add' className="mobile-nav__item" activeClassName="mobile-nav__item--active">Add</NavLink> : null}
                        {this.props.isAuthenticated
                            ? <NavLink exact to="/logout" className="mobile-nav__item" activeClassName="mobile-nav__item--active">Logout</NavLink>
                            : <NavLink exact to="/auth" className="mobile-nav__item" activeClassName="mobile-nav__item--active">Log In</NavLink>}
                    </ul>
                </nav>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(MobileNav);