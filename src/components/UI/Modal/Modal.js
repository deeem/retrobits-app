import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] Will Update');
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                {this.props.show && <div className={classes['modal-container']} onClick={this.props.modalClosed}>
                    <div className={classes.modal}>
                        {this.props.children}
                    </div>
                </div>}
            </>
        );
    }
}

export default Modal;