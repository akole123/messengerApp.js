import React, { Fragment, useContext, useRef, useEffect } from 'react';
import AuthContext from '../authlist/authContext';
import videoIcon from '../icons/videochat.png';
import Phone from '../icons/phone.png';
import information from '../icons/information.png';
import Send from '../icons/send.png';
import Persona from '../icons/persona.jpg';

const ChatBox = () => {
    const messageEndRef = useRef(null);
    const text = useRef('');

    const authContext = useContext(AuthContext);
    const { user, sendingToUser, sendMessage, currentChat } = authContext;

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ block: 'end', behavior: "smooth" });
    }

    useEffect(() => {
    }, []);

    const sendText = e => {
        var sender = user._id;
        var receiver = sendingToUser._id;
        var message = text.current.value;
        var oppositeEnd = "false";
        var name = user.name;
        sendMessage({
            sender,
            receiver,
            message,
            oppositeEnd,
            name
        });
        oppositeEnd = "true";
        sender = sendingToUser._id;
        receiver = user._id
        sendMessage({
            sender,
            receiver,
            message,
            oppositeEnd,
            name
        });
        text.current.value = '';
        scrollToBottom();
    }

    const whaleGif = (
        <Fragment>
            <div className="top-bar">
                <h3>{sendingToUser.length !== 0 ? sendingToUser.name : `Find a friend to message`}</h3>
                <img src={Phone} alt="not found" />
                <img src={videoIcon} alt="not found" />
                <img src={information} alt="not found" />
            </div>
            <div className="center-grid">
                <div className="chatboxAndSend">
                    <div className="msg_container_base">
                        {currentChat !== null && currentChat.toString() !== 'undefined' && currentChat.length !== 0 && user !== null && currentChat.map ? currentChat.map(each => (
                            each.name === user.name ?
                                (<div className="row msg_container base_sent">
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_sent">
                                            <p>{each.message}</p>
                                        </div>
                                    </div>
                                    <div ref={messageEndRef}>
                                    </div>
                                </div>)
                                : (<div className="row msg_container base_receive">
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_receive">
                                            <p key={each._id}>{each.message}</p>
                                        </div>
                                    </div>
                                    <div ref={messageEndRef}>
                                    </div>

                                </div>)

                        )
                        ) : <Fragment>
                                <div ref={messageEndRef}>
                                </div>
                            </Fragment>}

                    </div>
                    <div className="input-box">
                    </div>
                </div>
                <div className="profile">
                </div>
            </div>
        </Fragment>

    );
    const chatBox = (
        <Fragment>
            <div className="top-bar">
                <h3>{sendingToUser.length !== 0 ? sendingToUser.name : `Find a friend to message`}</h3>
                <img src={Phone} alt="not found" />
                <img src={videoIcon} alt="not found" />
                <img src={information} alt="not found" />
            </div>
            <div className="center-grid">
                <div className="chatboxAndSend">
                    <div className="msg_container_base">
                        {currentChat !== null && currentChat.toString() !== 'undefined' && currentChat.length !== 0 && user !== null && currentChat.map ? currentChat.map(each => (
                            each.name === user.name ?
                                (<div className="row msg_container base_sent">
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_sent">
                                            <p>{each.message}</p>
                                        </div>
                                    </div>
                                    <div ref={messageEndRef}>
                                    </div>
                                </div>)
                                : (<div className="row msg_container base_receive">
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_receive">
                                            <p key={each._id}>{each.message}</p>
                                        </div>
                                    </div>
                                    <div ref={messageEndRef}>
                                    </div>

                                </div>)

                        )
                        ) : <Fragment>
                                <div ref={messageEndRef}>
                                </div>
                            </Fragment>}

                    </div>
                    <div className="input-box">
                        <div className="input-group">
                            <input type="text" ref={text} placeholder="Type a message..." />
                            <img src={Send} alt="not found" onClick={sendText} />
                        </div>
                    </div>
                </div>
                <div className="profile">
                    <div className="profilepic">
                        <img src={Persona} alt="not found" />
                    </div>

                    <h3>{sendingToUser.name}</h3>
                    <h3>{sendingToUser.email}</h3>
                </div>
            </div>
        </Fragment>
    );

    return (
        <div className="chatbox">
            {sendingToUser.length !== 0 && currentChat !== null && currentChat.toString() !== 'undefined' ? chatBox : whaleGif}
        </div>
    )
}

export default ChatBox
