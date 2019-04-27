import React, { Component } from 'react';
import classes from './Add.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Add extends Component {
    state = {
        form: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bit Title',
                },
                value: '',
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description',
                },
                value: '',
            },
            players: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 1, displayValue: '1' },
                        { value: 2, displayValue: '2' },
                    ]
                },
                value: '',
            }
        }
    }

    handleInputChange = (event, inputID) => {
        const updatedForm = {
            ...this.state.form
        };

        const updatedElement = {
            ...this.state.form[inputID]
        }

        updatedElement.value = event.target.value;
        updatedForm[inputID] = updatedElement;

        this.setState({ form: updatedForm });
    }

    handleForm = (event) => {
        event.preventDefault();
        
        const formData = {};

        for (let key in this.state.form) {
            formData[key] = this.state.form[key].value;
        }

        // axios post goes here...
        console.log(formData);
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            })
        }

        let form = (
            <form onSubmit={this.handleForm}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.handleInputChange(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">Add new Bit</Button>
            </form>
        );

        return (
            <div className={classes.Add}>
                <h1>Add new Bit</h1>
                {form}
            </div>
        )
    }
}

export default Add;