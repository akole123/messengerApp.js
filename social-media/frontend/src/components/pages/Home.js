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
        <div className='grid-2-3'>
            <div>
                <FriendList />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    )

    const registerPage = (
        <Register />
    )

    return (
        <ul>
            {isAuthenticated ? homePage : registerPage}
        </ul>

    )
}

export default Home
