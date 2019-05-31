import React, { Component } from 'react';
import Header from '../Header/Header';
import MobileNav from '../MobileNav/MobileNav';

class Layout extends Component {
    state = {
        showMobileNav: false,
    }

    handleToggleMobileNav = () => {
        this.setState({ showMobileNav: !this.state.showMobileNav });
    }

    render() {
        return (
            <>
                <Header
                    isMobileNavVisible={this.state.showMobileNav}
                    toggleMobileNav={this.handleToggleMobileNav}
                />
                <MobileNav
                    visible={this.state.showMobileNav}
                    toggled={this.handleToggleMobileNav}
                />
                <>
                    {this.props.children}
                </>
            </>
        )
    }
}

export default Layout;