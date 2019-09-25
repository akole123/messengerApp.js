import React, { Fragment, useContext, useEffect } from 'react';
import UserListContext from '../userlist/userlistContext';
import AuthContext from '../authlist/authContext';
import UserItem from './UserItem';
import { CSSTransition } from 'react-transition-group';

const AllUser = () => {
    const userlistContext = useContext(UserListContext);
    const { users, getAllUsers } = userlistContext;

    const authContext = useContext(AuthContext);
    const { user, isAuthenticated } = authContext;

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            {users !== null && user !== null && isAuthenticated === true ? users.map(each => (
                (typeof each !== 'undefined' && typeof user.friends !== 'undefined' && user.friends.includes(each._id) === false ? <CSSTransition key={each._id} timeout={500} classNames="item">
                    <UserItem each={each} authContext={authContext} />
                </CSSTransition> : <h1 key={each._id}></h1>)
            )) : <h1>Null</h1>}
        </Fragment>
    )
}

export default AllUser

