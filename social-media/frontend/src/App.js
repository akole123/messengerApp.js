import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Users from './components/pages/Users';
import Profile from './components/pages/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserListState from './components/userlist/UserListState';
import AuthState from './components/authlist/AuthState';
import ChatState from './components/chatlist/ChatState';
import './App.css';

const App = () => {
    return (
        <ChatState>
            <AuthState>
                <UserListState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/profile' component={Profile} />
                                <Route exact path='/users' component={Users} />
                            </Switch>
                        </Fragment>
                    </Router>
                </UserListState >
            </AuthState>
        </ChatState>
    );
}

export default App;
