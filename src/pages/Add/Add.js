import React, { Component } from 'react';
import classes from './Add.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-retrobits';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHanlder';
import { getUpdatedFormState, setSelectControlOptions, getFormData } from '../../components/UI/Input/utility/utility';

class Add extends Component {
    state = {
        form: {
            platforms: {
                elementType: 'select',
                elementConfig: {
                    options: [],
                },
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            games: {
                elementType: 'select',
                elementConfig: {
                    options: [],
                },
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bit Title',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            players: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 1, displayValue: '1' },
                        { value: 2, displayValue: '2' },
                    ]
                },
                value: 1,
                validation: {},
                valid: true,
                touched: false,
            },
        },
        formIsValid: false,
    }

    handleInputChange = (event, inputID) => {
        this.setState(getUpdatedFormState(this.state, event.target.value, inputID));

        // fetch games for selected platform
        if (inputID === 'platforms') {
            this.fetchGamesSelectControlOptions('games', '/api/games?filter[platform]=' + this.state.form.platforms.value);
        }
    }

    handleForm = (event) => {
        event.preventDefault();

        const formData = getFormData(this.state);

        // axios post request goes here...
        console.log(formData);
    }

    componentDidMount() {
        this.fetchGamesSelectControlOptions('platforms', '/api/platforms');
    }

    fetchGamesSelectControlOptions = (inputID, url) => {
        axios.get(url)
            .then(response => {
                let values = [];
                values.push({ value: 0, displayValue: '-- select option --' });
                let options = response.data.data;
                for (let key in options) {
                    values.push({ value: options[key].id, displayValue: options[key].title })
                }

                this.setState(setSelectControlOptions(this.state, values, inputID));
            })
            .catch(error => {
                console.error(error);
            });
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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Add new Bit</Button>
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

export default withErrorHandler(Add, axios);