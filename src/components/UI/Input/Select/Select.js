import React, { Component } from 'react';

class Select extends Component {

    state = {
        value: null,
    }

    handleOnChange = (event) => {
        this.setState({value: event.target.value});
        this.props.changed(event);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldOptions = this.props.options.map(option => option.displayValue);
        const newOptions = nextProps.options.map(option => option.displayValue);

        if (JSON.stringify(oldOptions) === JSON.stringify(newOptions) 
            && this.state.value === nextState.value) {
            return false;
        }
        
        return true;
    }

    render() {
        
        return (
            <select className={this.props.inputClasses.join(' ')} value={this.props.value}
                onChange={this.handleOnChange}>
                {
                    this.props.options.map(option =>
                        <option key={option.value} value={option.value}>{option.displayValue}</option>)
                }
            </select>
        )
    }
}

export default Select;