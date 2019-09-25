import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { REGISTER_SUCCESS, USER_LOADED, LOGOUT, LOGIN_SUCCESS, UPDATE_USER, UPDATE_SENDTO, ADD_CHAT, SEND_MESSAGE, GET_CHAT_LOG, REMOVE_CHAT_LOG, REFRESH } from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        user: null,
        error: null,
        currentChat: null,
        sendingToUser: []
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: REFRESH })
        }
    };

    const updateUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put('/api/auth', formData, config);
            dispatch({ type: UPDATE_USER, payload: res.data });
        } catch (err) {
            dispatch({ type: REFRESH })
        }
    }
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: REFRESH })
        };
    };

    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: REFRESH })
        };
    };

    const logout = () => dispatch({ type: LOGOUT });

    const updateSendTo = newData => {
        dispatch({ type: UPDATE_SENDTO, payload: newData });
    };

    const addChat = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/chat', formData, config);
            dispatch({ type: ADD_CHAT, payload: res.data });
        } catch (err) {
            dispatch({ type: REFRESH })
        }
    }

    const sendMessage = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put('api/chat', formData, config);
            dispatch({ type: SEND_MESSAGE, payload: res.data });
        } catch (err) {
            dispatch({ type: REFRESH })
        }
    }
    const getChatLog = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put('api/chat', formData, config);
            dispatch({ type: GET_CHAT_LOG, payload: res.data });
        } catch (err) {
            dispatch({ type: REFRESH })
        }
    }
    const removeChatLog = () => {
        dispatch({ type: REMOVE_CHAT_LOG })
    }

    return (<AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        sendingToUser: state.sendingToUser,
        currentChat: state.currentChat,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        updateUser,
        updateSendTo,
        addChat,
        sendMessage,
        getChatLog,
        removeChatLog
    }}>{props.children}</AuthContext.Provider>)

};

export default AuthState;
