import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players_1: false,
    players_2: false,
    difficult_easy: false,
    difficult_normal: false,
    difficult_hard: false,
    rating_1: false,
    rating_2: false,
    rating_3: false,
    rating_4: false,
    rating_5: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_FILTER:
            return {
                ...state,
                [action.filter]: !state[action.filter]
            }

        default:
            return state;
    }
};

export default reducer;