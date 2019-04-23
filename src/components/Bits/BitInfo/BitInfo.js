import React from 'react';
import classes from './BitInfo.module.css';
import Button from '../../UI/Button/Button';

const bitInfo = (props) => (
    <div className={classes['BitModal-container']}>
        <h1>{props.bit.game.title}</h1>
        <img src={unescape(props.bit.game.image)} />
        <p>players: {props.bit.players}</p>
        <p>difficult: {props.bit.difficult}</p>
        <p>rating: {props.bit.rating}</p>
        <Button clicked={props.hide}>Close</Button>
    </div>
);

export default bitInfo;