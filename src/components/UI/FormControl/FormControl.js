import React from 'react';
import classes from './FormControl.module.css';
import Autocomplete from './Autocomplete/Autocomplete';
import Select from './Select/Select';

const formControl = (props) => {
    let inputElement = null;

    const inputClasses = [classes.FormControlElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.type) {

        case 'text':
            inputElement = <input type="text" className={inputClasses.join(' ')}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            break;

        case 'email':
            inputElement = <input type="email" className={inputClasses.join(' ')}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            break;


        case 'password':
            inputElement = <input type="password" className={inputClasses.join(' ')}
                value={props.value}
                placeholder={props.placeholder}
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
                    options={props.options}
                    value={props.value}
                    changed={props.changed}
                    inputClasses={inputClasses}
                />
            )
            break;

        case 'autocomplete':
            inputElement = (
                <Autocomplete
                    suggestions={props.options.map(option => option.displayValue)}
                    value={props.value}
                    changed={props.changed}
                    inputClasses={inputClasses}
                />
            );
            break;

        case 'file':
            inputElement = (
                <input type="file" className={inputClasses.join(' ')}
                onChange={props.changed}
                />
            )
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

export default formControl;