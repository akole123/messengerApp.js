import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../authlist/authContext';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, updateUser } = authContext;

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const [theUser, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email } = theUser;

    const onChange = e => setUser({ ...theUser, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateUser({
            name,
            email
        });
        alert("Your name and email has been updated.");
    }

    return (
        <div className="profile-grid">
            <div className="form-container">
                <h1>Update Profile</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="First and Last name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required />
                    </div>
                    <input type="submit" value="Update Profile" className="signup-button" />
                </form>
            </div>
        </div>
    )
}

export default Profile
