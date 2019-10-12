import React, { Fragment, useContext, useEffect, useRef } from 'react';
import UserListContext from '../userlist/userlistContext';
import AuthContext from '../authlist/authContext';
import UserItem from './UserItem';
import { CSSTransition } from 'react-transition-group';
const FriendList = () => {
    const text = useRef('');

    const userlistContext = useContext(UserListContext);
    const { getAllUsers, users, filtered, filterUsers, clearFilter } = userlistContext;

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    useEffect(() => {
        getAllUsers();
        if (filtered === null) {
            text.current.value = '';
        }
    }, [getAllUsers])

    const onChange = e => {
        if (text.current.value !== '') {
            console.log(text.current.value);
            filterUsers(e.target.value);
        } else {
            clearFilter();
            text.current.value = '';
        }
        console.log(filtered);
    }

    const friends = (
        <Fragment>
            <div className='form-container welcomePage'>
                <h1>Unable to find friend</h1>
            </div>

        </Fragment>
    )
    const filteredFriends = (
        <Fragment>
            {filtered !== null && user !== null && filtered.length !== 0 ? filtered.map(each => (
                (typeof each !== "undefined" && typeof user.friends !== 'undefined ' && user.friends.includes(each._id) === true ?
                    <CSSTransition key={each._id} timeout={500} classNames="item">
                        <UserItem each={each} authContext={authContext} />
                    </CSSTransition> : <h1 key={each._id}></h1>)
            )) : friends}
        </Fragment>
    );
    const nonFilteredFriends = (
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
    );


    return (
        <Fragment>
            <div className="friendslistnav">
                <div className="chat-title">
                    <h3>Chats</h3>
                    <i className="fas fa-cog fa-1.5x"></i>
                    <i className="fas fa-edit fa-1.5x"></i>
                </div>
                <div className="friendsfilter">
                    <i className="fas fa-search"></i>
                    <input ref={text} className="fas fa-search" type="text" placeholder="Search Messanger" onChange={onChange} />
                </div>

                <div>
                    {text.current.value === '' ? nonFilteredFriends : filteredFriends}
                </div>
            </div>
        </Fragment>
    )
}

export default FriendList
