import * as actionTypes from '../actions/actionTypes';

const initialState = {
    filter_players_1: false,
    filter_players_2: false,
    filter_difficult_easy: false,
    filter_difficult_normal: false,
    filter_difficult_hard: false,
    filter_rating_1: false,
    filter_rating_2: false,
    filter_rating_3: false,
    filter_rating_4: false,
    filter_rating_5: false,
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