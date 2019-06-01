import React from 'react';
import classes from './Radio.module.css';

const Radio = (props) => (
    <>
        <label className={classes.radio}>
            <input
                type="radio"
                name={props.name}
                onChange={props.changed}
            />
            {props.label}
        </label>
    </>
);

export default Radio;