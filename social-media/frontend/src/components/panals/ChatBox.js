import React, { Fragment, useContext, useRef, useEffect } from 'react';
import AuthContext from '../authlist/authContext';
import WhaleLarger from '../layout/WhaleLarger';

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
            <div className='form-container welcomePage'>
                <h1>Find a friend to message</h1>
                <WhaleLarger />
            </div>
        </Fragment>

    );
    const chatBox = (
        <Fragment>
            <div className="panel-heading top-bar">
                <div className="col-md-8 col-xs-8">
                    <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span>{sendingToUser.length !== 0 ? sendingToUser.name : `Find a friend to message`}</h3>
                </div>
            </div>
            <div className="panel-body msg_container_base">

                {currentChat !== null && currentChat.toString() !== 'undefined' && currentChat.length !== 0 && user !== null && currentChat.map ? currentChat.map(each => (
                    each.name === user.name ?
                        (<div className="row msg_container base_sent">
                            <div className="col-md-10 col-xs-10">
                                <div className="messages msg_sent">
                                    <p>{each.message}</p>
                                </div>
                            </div>
                            <div className="col-md-2 col-xs-2 avatar">
                                <h4>{user !== null ?
                                    <p>{each.name}</p> : <p>None</p>}</h4>
                            </div>

                            <div ref={messageEndRef}>
                            </div>
                        </div>)
                        : (<div className="row msg_container base_receive">
                            <div className="col-md-2 col-xs-2 avatar">
                                <h4>{each !== null ?
                                    <p key={each._id}>{each.name}</p> : <p>Send a message...</p>}</h4>
                            </div>
                            <div className="col-md-10 col-xs-10">
                                <div className="messages msg_receive">
                                    <p key={each._id}>{each.message}</p>
                                </div>
                            </div>
                            <div ref={messageEndRef}>
                            </div>

                        </div>)

                )
                ) : <Fragment><h1>Send a message...</h1>
                        <div ref={messageEndRef}>
                        </div>
                    </Fragment>}
            </div>

            <div className="panel-footer">
                <div className="input-group">
                    <input id="btn-input" type="text" ref={text} className="input-sm chat_input" placeholder="Write your message here..." />
                    <button className="btn btn-primary btn-try btn-sm btn-sender" onClick={sendText}>Send</button>
                </div>
            </div>

        </Fragment>
    );

    return (
        <div>
            {sendingToUser.length !== 0 && currentChat !== null && currentChat.toString() !== 'undefined' ? chatBox : whaleGif}
        </div>
    )
}

export default ChatBox
