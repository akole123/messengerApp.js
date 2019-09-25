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
            {isAuthenticated === true ? `Logged in as ${user.name}` : <h1>Null</h1>}
            <li>
                <Link to='/users'>Find friends</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
            <li>
                <Link to='/' onClick={logOut}>Logout</Link>
            </li>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <Login />
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <ul>
                <h1>
                    <Link to="/" className='fas fa-id-card-alt'> Messanger App</Link>
                </h1>
            </ul>
            <ul>
                {isAuthenticated ? userLink : guestLinks}
            </ul>
        </div>
    );
}

export default Navbar
