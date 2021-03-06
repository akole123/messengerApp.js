import React, { Fragment, useContext, useEffect, useRef } from 'react';
import UserListContext from '../userlist/userlistContext';
import AuthContext from '../authlist/authContext';
import UserSearchItem from '../panals/UserSearchItem';
import { CSSTransition } from 'react-transition-group';

const Users = (props) => {
    const text = useRef('');

    const userlistContext = useContext(UserListContext);
    const { users, getAllUsers, filtered, filterUsers, clearFilter }
        = userlistContext;

    const authContext = useContext(AuthContext);
    const { user, isAuthenticated } = authContext;

    useEffect(() => {
        getAllUsers();
        if (filtered === null) {
            text.current.value = '';
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const backToMessanger = e => {
        e.preventDefault();
        props.history.push('/');
    }


    const filtering = (
        <Fragment>
            <div className='searchFriends'>
                {filtered !== null && isAuthenticated === true ? filtered.map(each => (
                    (typeof each !== 'undefined' && typeof user.friends !== 'undefined' && <div key={each._id}><CSSTransition timeout={500} classNames="item">
                        <UserSearchItem each={each} authContext={authContext} />
                    </CSSTransition></div>)
                ))
                    : <h1>None</h1>}
            </div>
        </Fragment >
    );

    const noneFiltered = (
        <Fragment>
            <div className='searchFriends'>
                {users !== null && user !== null && isAuthenticated === true ?
                    users.map(each => (
                        (typeof each !== 'undefined' && typeof user.friends !== 'undefined' && <div classNames="item" key={each._id}><CSSTransition timeout={500} >
                            <UserSearchItem each={each} authContext={authContext} />
                        </CSSTransition></div>)
                    )) : <h1>None</h1>}
            </div>
        </Fragment>
    )
    const onChange = e => {
        if (text.current.value !== '') {
            filterUsers(e.target.value);
        } else {
            clearFilter();
            text.current.value = '';
        }
    }
    return (
        <Fragment>
            <div className="friendsPage">
                <div className="filterAndFriends">
                    <div>
                        <input ref={text} className="filterInput" type="text" placeholder="Filter Users..." onChange={onChange} />
                        <button className="btn btn-white fas fa-backward" onClick={backToMessanger}></button>
                    </div>

                    {text.current.value === '' ? noneFiltered : filtering}
                </div>
            </div>
        </Fragment>
    )
}

export default Users
