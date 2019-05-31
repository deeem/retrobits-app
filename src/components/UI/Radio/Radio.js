import React from 'react';
import classes from './Radio.module.css';

const Radio = (props) => (
    <>
        <label className={classes.checkbox}>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onChange={props.changed}
            />
            {props.value}
        </label>
    </>
);

export default Radio;