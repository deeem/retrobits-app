import React from 'react';
import classes from './Input.module.css';
import Autocomplete from './Autocomplete/Autocomplete';
import Select from './Select/Select';

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {

        case 'input':
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case 'select':
            inputElement = (
                <Select
                    options={props.elementConfig.options}
                    value={props.value}
                    changed={props.changed}
                    inputClasses={inputClasses}
                />
            )
            break;
        case 'autocomplete':
            inputElement = (
                <Autocomplete
                    suggestions={props.elementConfig.options.map(option => option.displayValue)}
                    value={props.value}
                    changed={props.changed}
                    inputClasses={inputClasses}
                />
            );
            break;

        default:
            inputElement = <input className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;