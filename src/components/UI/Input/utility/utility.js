export const validate = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}

export const getUpdatedFormState = (state, value, inputID) => {
    const updatedForm = {
        ...state.form
    };

    const updatedElement = {
        ...state.form[inputID]
    }

    updatedElement.value = value;
    updatedElement.valid = validate(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedForm[inputID] = updatedElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    return { form: updatedForm, formIsValid };
}

export const setSelectControlOptions = (state, options, inputID) => {
    const updatedForm = {
        ...state.form
    };

    const updatedElement = {
        ...state.form[inputID]
    }

    const updatedElementConfig = {
        ...state.form[inputID].elementConfig
    }

    updatedElementConfig.options = options;
    updatedElement.elementConfig = updatedElementConfig;
    updatedForm[inputID] = updatedElement;

    return { form: updatedForm };
}

/**
 * Extract form data from state in key-value format for posting on server
 * @param {*} state 
 */
export const getFormData = (state) => {
    const formData = {};

    for (let key in state.form) {
        formData[key] = state.form[key].value;
    }

    return formData;
}