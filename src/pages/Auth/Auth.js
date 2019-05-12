import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import FormControl from '../../components/UI/FormControl/FormControl';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getUpdatedFormState } from '../../components/UI/FormControl/utility/utility';


class Auth extends Component {
    state = {
        form: {
            name: {
                type: 'text',
                placeholder: 'Your Name',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                type: 'email',
                placeholder: 'Your Email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                type: 'password',
                placeholder: 'Your Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    }

    handleInputChange = (event, controlName) => {
        this.setState(this.setState(getUpdatedFormState(this.state, event.target.value || event.target.textContent, controlName)));
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.name.value, this.state.form.email.value, this.state.form.password.value, this.state.isSignup);
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
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
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error}</p>
            );
        }

        const redirect = this.props.isAuthenticated ? <Redirect to="/" /> : null;

        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>

                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthMode}>Switch to {this.state.isSignup ? 'SIGIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password, isSignup) => dispatch(actions.auth(name, email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);