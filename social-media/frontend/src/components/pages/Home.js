import React, { useContext, useEffect } from 'react';
import FriendList from '../panals/FriendList';
import ChatBox from '../panals/ChatBox';
import AuthContext from '../authlist/authContext';
import Register from './Register';

const Home = () => {
    const authContext = useContext(AuthContext);

    const { loadUser, isAuthenticated } = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            loadUser();
        }
    }, [loadUser, isAuthenticated]);

    const homePage = (
        <div className='homepage'>
            <div className="friendslist">
                <FriendList />
            </div>
            <ChatBox />
        </div>
    )

    const registerPage = (
        <Register />
    )

    return (
        <div>
            {isAuthenticated ? homePage : <div className="registration-grid"> {registerPage} </div>}
        </div>

    )
}

export default Home
