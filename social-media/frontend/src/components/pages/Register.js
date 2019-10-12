import React, { useState, useContext, useEffect, Fragment } from 'react';
import AuthContext from '../authlist/authContext';

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
            <div className="late-reg">
                <h1>Create a New Account</h1>
                <h2>No verification needed, its easy</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="First and Last name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" placeholder="New Password" value={password} onChange={onChange} required minLength="6" />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password2" placeholder="Comfirm password" value={password2} onChange={onChange} required />
                    </div>
                    <input type="submit" value="Sign Up" className="signup-button" />
                </form>
            </div>
        </Fragment>

    )
}

export default Register
