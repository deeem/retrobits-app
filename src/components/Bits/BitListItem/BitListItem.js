import React from 'react';
import classes from './BitListItem.module.css';

const BitListItem = (props) => {
    return (
        <div className={classes.BitListItem}>
            <h5>{props.data.game.title}</h5>
            <p>{props.data.title}</p>
            <button onClick={props.click}>Show Bit</button>
        </div>
    )
}

export default BitListItem;