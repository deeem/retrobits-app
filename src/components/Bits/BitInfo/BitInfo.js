import React from 'react';
import classes from './BitInfo.module.css';
import Button from '../../UI/Button/Button';

const bitInfo = (props) => (
    <div className={classes['bitinfo']}>

        <img className={classes['bitinfo__image']} src={unescape(props.bit.game.image)} />

        <h2 className={classes['bitinfo__title']}>{props.bit.title}</h2>

        <section className={classes['bitinfo__bit-description']}>
            <h3>Bit Description</h3>
            <p>{props.bit.game.description}</p>
        </section>


        <section className={classes['bitinfo__badges']}>
            <p>players: {props.bit.players}</p>
            <p>difficult: {props.bit.difficult}</p>
            <p>rating: {props.bit.rating}</p>
        </section>

        <Button clicked={props.hide}>Close</Button>

    </div>
);

export default bitInfo;