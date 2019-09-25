import React, { useReducer } from 'react';
import axios from 'axios';
import UserListContext from './userlistContext';
import UserListReducer from './userlistReducer';
import { GET_USERS, USER_ERROR, FILTER_USERS, CLEAR_FILTER } from '../types';

const UserListState = props => {
    const initialState = {
        users: null,
        error: null,
        filtered: null
    };
    const [state, dispatch] = useReducer(UserListReducer, initialState);

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            dispatch({ type: GET_USERS, payload: res.data.user });
        } catch (err) {
            dispatch({ type: USER_ERROR, payload: err });
        }
    };
    const filterUsers = text => {
        dispatch({ type: FILTER_USERS, payload: text });
    }
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (<UserListContext.Provider value={{
        getAllUsers,
        users: state.users,
        error: state.error,
        filtered: state.filtered,
        filterUsers,
        clearFilter,
    }}>{props.children}</UserListContext.Provider>)
};

export default UserListState