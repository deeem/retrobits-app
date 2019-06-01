import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => (
    <>
        <label className={classes.checkbox}>
            <input
                type="checkbox"
                name={props.name}
                value={props.value}
                onChange={props.changed}
                checked={props.isChecked}
            />
            {props.value}
        </label>
    </>
);

export default Checkbox;