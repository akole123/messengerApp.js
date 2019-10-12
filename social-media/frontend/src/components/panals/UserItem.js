import React from 'react';

const userItem = ({ each, authContext }) => {
    const { name, _id } = each;
    const { user, updateUser, updateSendTo, addChat, getChatLog, sendingToUser, removeChatLog } = authContext;


    // const onClick = () => {
    //     if (!user.friends.includes(_id)) {
    //         user.friends.push(_id);
    //     } else {

    //     }
    //     var friends = user.friends;
    //     updateUser({
    //         friends
    //     });
    //     var sender = user._id;
    //     var receiver = each._id;
    //     addChat({
    //         sender,
    //         receiver
    //     });
    //     sender = each._id;
    //     receiver = user._id;
    //     addChat({
    //         sender,
    //         receiver
    //     });
    // }

    const messageThem = () => {
        var i;
        for (i = 0; i < user.friends.length; i++) {
            if (user.friends[i] === _id) {
                updateSendTo(each);
            }
        }
        var sender = user._id;
        var receiver = each._id;
        getChatLog({
            sender,
            receiver
        });
    }

    const deleteThem = e => {
        var i;
        for (i = 0; i < user.friends.length; i++) {
            if (user.friends[i] === _id) {
                user.friends.splice(i, 1);
                var friends = user.friends;
                updateUser({
                    friends
                });
                if (sendingToUser.length !== 0) {
                    if (_id === sendingToUser._id) {
                        removeChatLog();
                    }
                }
            }
        }
    }
    return (
        <div className="eachfriendblock" onClick={(messageThem)}>
            <div className="list">
                <i className="fas fa-comment-dots fa-3x"></i>
                <div>{name}</div>
                <i className="fas fa-ellipsis-h" id="eachFriendEdit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteThem() }}></i>
            </div>
        </div >
    )
}

export default userItem
