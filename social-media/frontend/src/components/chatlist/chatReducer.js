import { ADD_CHAT, ADD_CHAT_FAIL } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case ADD_CHAT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return false
    }
}