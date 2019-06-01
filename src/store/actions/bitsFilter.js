import * as actionTypes from './actionTypes';

export const toggleFilter = (filter) => {
    return {
        type: actionTypes.TOGGLE_FILTER,
        filter: filter,
    }
}

export const toggleSortingRadio = (value) => {
    return {
        type: actionTypes.TOGGLE_SORTING_RADIO,
        value: value,
    }
}