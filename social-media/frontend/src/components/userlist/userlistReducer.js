import { GET_USERS, USER_ERROR, FILTER_USERS, CLEAR_FILTER } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case FILTER_USERS:
            return {
                ...state,
                filtered: state.users.filter(user => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return user.name.match(regex) || user.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state;
    }
}