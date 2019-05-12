export const validate = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const getUpdatedFormState = (state, event, inputID) => {
    const updatedForm = {
        ...state.form
    };

    const updatedElement = {
        ...state.form[inputID]
    }

    updatedElement.value = getValueFromTarget(state, event, inputID);
    updatedElement.valid = validate(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedForm[inputID] = updatedElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    return { form: updatedForm, formIsValid };
}

const getValueFromTarget = (state, event, inputID) => {

    switch (state.form[inputID].type) {
        case 'autocomplete': return event.target.textContent;
        case 'file': return event.target.files[0];
        default: return event.target.value;
    }
}

export const setSelectControlOptions = (state, options, inputID) => {
    const updatedForm = {
        ...state.form
    };

    const updatedElement = {
        ...state.form[inputID]
    }

    updatedElement.options = options;
    updatedForm[inputID] = updatedElement;

    return { form: updatedForm };
}

/**
 * Extract form data from state in key-value format for posting on server
 * @param {*} state 
 */
export const getFormData = (state) => {
    const formData = new FormData();

    for (let key in state.form) {

        switch (state.form[key].type) {
            case 'autocomplete':
                const found = state.form[key].options.find(option => option.displayValue === state.form[key].value);
                formData.append(key, found.value);
                break;

            case 'file':
                formData.append(key, state.form[key].value, state.form[key].value.name);
                
            default:
                formData.append(key, state.form[key].value);
        }
    }

    return formData;
}
