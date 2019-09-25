import React, { Fragment, useContext, useEffect } from 'react';
import UserListContext from '../userlist/userlistContext';
import AuthContext from '../authlist/authContext';
import UserItem from './UserItem';
import { CSSTransition } from 'react-transition-group';
import Waiting from '../layout/Waiting'

const FriendList = () => {
    const userlistContext = useContext(UserListContext);
    const { getAllUsers, users } = userlistContext;

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers])

    const friends = (
        <Fragment>
            <div className='form-container welcomePage'>
                <h1>Your friends list will be here.</h1>
                <Waiting />
            </div>

        </Fragment>
    )

    return (
        <Fragment>
            {users !== null && user !== null && (user.friends === undefined || user.friends.length !== 0) ? users.map(each => (
                (typeof each !== 'undefined' &&
                    typeof user.friends !== 'undefined' &&
                    user.friends.includes(each._id) === true ?
                    <CSSTransition key={each._id} timeout={500} classNames="item">
                        <UserItem each={each} authContext={authContext} />
                    </CSSTransition> : <h1 key={each._id}></h1>)
            )) : friends}
        </Fragment>
    )
}

export default FriendList
