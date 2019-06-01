import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => (
    <>
        <label className={classes.checkbox}>
            <input
                type="checkbox"
                name={props.name}
                onChange={props.changed}
                checked={props.isChecked}
            />
            {props.label}
        </label>
    </>
);

export default Checkbox;