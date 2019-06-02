import React from 'react';
import classes from './BitInfoBadge.module.css';

const BitInfoBadge = (props) => {
    return (
        <div className={classes['badge']}>
            <img className={classes['badge__image']} src={props.icon} alt="badge icon"/>
            <span className={classes['badge__text']}>{props.text}</span>
        </div>
    )
}

export default BitInfoBadge;

