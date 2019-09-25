import React, { useReducer } from 'react';
import axios from 'axios';
import ChatContext from './chatContext';
import ChatReducer from './chatReducer';
import { ADD_CHAT, ADD_CHAT_FAIL } from '../types';

const ChatState = props => {
    const initialState = {
        error: null,
        currentChat: null,
        sendingTo: null
    };
    const [state, dispatch] = useReducer(ChatReducer, initialState);

    const addChat = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/chat', formData.req, config);
            dispatch({ type: ADD_CHAT, payload: res.data });
        } catch (err) {
            dispatch({ type: ADD_CHAT_FAIL, payload: err.response.data.msg });
        }
    }

    return (<ChatContext.Provider value={{
        error: state.error,
        currentChat: state.currentChat,
        sendingTo: state.sendingTo,
        addChat,
    }}>{props.children}</ChatContext.Provider>)

}


export default ChatState;
