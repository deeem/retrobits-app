import React from 'react';
import classes from './Input.module.css';
import Autocomplete from './Autocomplete/Autocomplete';

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
                <select className={inputClasses.join(' ')} value={props.value}
                    onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option =>
                            <option key={option.value} value={option.value}>{option.displayValue}</option>)
                    }
                </select>)
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