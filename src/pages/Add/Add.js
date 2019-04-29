import React, { Component } from 'react';
import classes from './Add.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';

class Add extends Component {
    state = {
        form: {
            platforms: {
                elementType: 'select',
                elementConfig: {
                    options: [],
                },
                value: '',
            },
            games: {
                elementType: 'select',
                elementConfig: {
                    options: [],
                },
                value: '',
            },
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
            },
        }
    }

    handleInputChange = (event, inputID) => {

        this.updateInputValue(event.target.value, inputID);

        if (inputID === 'platforms') {
            this.fetchSelectOptions('games', 'http://127.0.0.1:8000/api/games?filter[platform]=' + this.state.form.platforms.value);
        }
    }

    handleForm = (event) => {
        event.preventDefault();

        const formData = {};

        for (let key in this.state.form) {
            formData[key] = this.state.form[key].value;
        }

        // axios post request goes here...
        console.log(formData);
    }

    componentDidMount() {
        this.fetchSelectOptions('platforms', 'http://127.0.0.1:8000/api/platforms');
    }

    fetchSelectOptions = (inputID, url) => {
        
        axios.get(url)
            .then(response => {
                let values = [];
                values.push({ value: 0, displayValue: '-- select option --'});
                let options = response.data.data;
                for (let key in options) {
                    values.push({ value: options[key].id, displayValue: options[key].title })
                }

                this.updateSelectOptions(values, inputID);
            });
    }

    updateInputValue = (value, inputID) => {
        const updatedForm = {
            ...this.state.form
        };

        const updatedElement = {
            ...this.state.form[inputID]
        }

        updatedElement.value = value;
        updatedForm[inputID] = updatedElement;

        this.setState({ form: updatedForm });
    }

    updateSelectOptions = (options, inputID) => {
        const updatedForm = {
            ...this.state.form
        };

        const updatedElement = {
            ...this.state.form[inputID]
        }

        const updatedElementConfig = {
            ...this.state.form[inputID].elementConfig
        }

        updatedElementConfig.options = options;
        updatedElement.elementConfig = updatedElementConfig;
        updatedForm[inputID] = updatedElement;

        this.setState({ form: updatedForm });
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