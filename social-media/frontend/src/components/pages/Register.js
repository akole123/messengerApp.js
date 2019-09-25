import React, { useState, useContext, useEffect, Fragment } from 'react';
import AuthContext from '../authlist/authContext';
import Whale from '../layout/Whale';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const { register, error, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/home');
        }
        if (error === 'User already exist') {
            alert(error, 'Danger');
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            alert("Password does not match")
        } else {
            register({
                name,
                email,
                password
            });
        }
    }

    return (
        <Fragment>
            <div className='grid-2'>
                <div className='form-container welcomePage'>
                    <h1>Create an account or login to continue.</h1>
                    <Whale />
                </div>
                <div className='form-container'>
                    <h1>Account Creation</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={onChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" value={email} onChange={onChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password2">Confirm password</label>
                            <input type="password" name="password2" value={password2} onChange={onChange} required />
                        </div>
                        <input type="submit" value="Register" className="btn btn-primary btn-block" />
                    </form>
                </div>
            </div>
        </Fragment>

    )
}

export default Register
