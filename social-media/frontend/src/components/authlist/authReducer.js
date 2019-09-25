import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGOUT, LOGIN_SUCCESS, UPDATE_USER, UPDATE_SENDTO, ADD_CHAT, SEND_MESSAGE, GET_CHAT_LOG, REMOVE_CHAT_LOG, REFRESH } from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                user: action.payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case UPDATE_USER:
            return {
                ...state
            }
        case UPDATE_SENDTO:
            return {
                ...state,
                sendingToUser: action.payload
            }
        case ADD_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case SEND_MESSAGE:
        case GET_CHAT_LOG:
            return {
                ...state,
                currentChat: action.payload
            }
        case REMOVE_CHAT_LOG:
            return {
                ...state,
                sendingToUser: [],
                currentChat: null
            }
        case REFRESH:
            return {
                ...state
            }
        default:
            return state;
    }
}