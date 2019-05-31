import React from 'react';
import './Header.css';
import Navigation from './Navigation/Navigation';
import logoIcon from '../../assets/images/iconfinder_space-invader_2981852.svg';
import menuIcon from '../../assets/images/iconfinder_menu_309053.svg';

const Header = (props) => (
    <header class="main-header">
        <div class="nav-brand">
            <button
                class="toggle-button"
                onClick={props.toggleMobileNav}
            >
                <img src={menuIcon} />
            </button>
            <a href="#">
                <img src={logoIcon} />
            </a>
        </div>
        <Navigation />
    </header>
)

export default Header;