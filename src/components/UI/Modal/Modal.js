import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes['Modal-container']}>
                {props.children}
            </div>
        </div>
    );
}

export default modal;