import { LOGIN_SUCCESS, LOGOUT, FETCH_USER_SUCCESS } from '../actions/actions';

const initialState = {
    token: null,
    user: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            return {
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
