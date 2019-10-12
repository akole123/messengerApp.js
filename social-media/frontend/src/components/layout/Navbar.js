import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../authlist/authContext';
import Login from '../pages/Login';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { logout, isAuthenticated, user } = authContext;

    const logOut = e => {
        logout();
        window.location.reload();
    }
    const userLink = (
        <Fragment>
            <div className="loggedInNav">
                {isAuthenticated === true ? `Welcome ${user.name}` : <h1>Null</h1>}
                <Link to='/users'>Find Friends</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/' onClick={logOut}>Logout</Link>
            </div>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <Login />
        </Fragment >
    );

    return (
        <div className="navigation">
            <h1>
                <Link to="/" className='fas fa-id-card-alt'></Link>
            </h1>
            {isAuthenticated ? userLink : guestLinks}
        </div>
    );
}

export default Navbar
