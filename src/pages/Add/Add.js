import React, { Component } from 'react';
import classes from './Add.module.css';
import FormControl from '../../components/UI/FormControl/FormControl';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-retrobits';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHanlder';
import { getUpdatedFormState, setSelectControlOptions, getFormData } from '../../components/UI/FormControl/utility/utility';

class Add extends Component {
    state = {
        form: {
            platform: {
                type: 'select',
                options: [],
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            game: {
                type: 'autocomplete',
                options: [],
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            title: {
                type: 'text',
                placeholder: 'Bit Title',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            description: {
                type: 'textarea',
                placeholder: 'Description',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            players: {
                type: 'select',
                options: [
                    { value: 1, displayValue: '1' },
                    { value: 2, displayValue: '2' },
                ],
                value: 1,
                validation: {},
                valid: true,
                touched: false,
            },
            savefile: {
                type: 'file',
                value: '',
                validation: {},
                valid: true,
                toched: false,
            }
        },
        formIsValid: false,
    }

    handleInputChange = (event, inputID) => {
        this.setState(getUpdatedFormState(this.state, event, inputID));

        // fetch games for selected platform
        if (inputID === 'platform') {
            this.fetchOptionsForControl('game', '/api/games?filter[platform]=' + event.target.value);
        }
    }

    handleForm = (event) => {
        event.preventDefault();

        const formData = getFormData(this.state);

        // axios post request goes here...
        console.log(formData);

        axios.post('/api/bits', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchOptionsForControl('platform', '/api/platforms');
    }

    fetchOptionsForControl = (inputID, url) => {
        axios.get(url)
            .then(response => {
                let values = [];
                // todo: set input value in state instead of creating new option that acts as default
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
                    <FormControl
                        key={formElement.id}
                        type={formElement.config.type}
                        placeholder={formElement.config.placeholder}
                        options={formElement.config.options}
                        value={formElement.config.value}
                        changed={(event) => this.handleInputChange(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                )
                )}

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