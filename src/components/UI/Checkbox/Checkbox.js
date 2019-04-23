import React from 'react';
import classes from './Checkbox.module.css';

const checkbox = (props) => (
    <div className={classes.Checkbox}>
        <input
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.changed}
        />
        <span className={classes.Checkbox_title}>{props.value}</span>
    </div>
);

export default checkbox;