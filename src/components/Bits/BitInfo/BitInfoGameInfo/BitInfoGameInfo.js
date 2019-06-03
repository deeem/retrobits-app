import React from 'react';
import classes from './BitInfoGameInfo.module.css';

const BitInfoGameInfo = (props) => {
    return (
        <div className={classes['game-info']}>
            <p>Platform: {props.platform}</p>
            <p>{props.description}</p>
        </div>
    )
}

export default BitInfoGameInfo;