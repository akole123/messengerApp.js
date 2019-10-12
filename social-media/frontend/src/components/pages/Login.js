import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../authlist/authContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);

    const { login, error, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/home');
        }

        if (error === 'Invalid credentials') {
            alert(error, 'danger');
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login({
            email,
            password
        });
    }
    const { email, password } = user;

    return (
        <div>
            <form className="form-inline" onSubmit={onSubmit}>
                <li className="loginSpacing">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </li>
                <li className="loginSpacing">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </li >

                <li className="loginSpacing">
                    <label></label>
                    <button type="submit">Login</button>
                </li>
            </form>
        </div>
    )
}

export default Login
