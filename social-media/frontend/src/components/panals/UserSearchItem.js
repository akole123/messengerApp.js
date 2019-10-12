import React, { Fragment } from 'react';

const UserSearchItem = ({ each, authContext }) => {
    const { name, email, _id } = each;
    const { user, updateUser, addChat } = authContext;


    const onClick = () => {
        if (!user.friends.includes(_id)) {
            user.friends.push(_id);
        } else {

        }
        var friends = user.friends;
        updateUser({
            friends
        });
        var sender = user._id;
        var receiver = each._id;
        addChat({
            sender,
            receiver
        });
        sender = each._id;
        receiver = user._id;
        addChat({
            sender,
            receiver
        });
    }

    return (
        <div className='userCard bg-light'>
            <div className="nameEmail">
                {name && (<div>{name}</div>)}
                {email && (<div>{email}</div>)}
            </div>
            <div className="friendsAdd">
                {_id !== user._id ? (user.friends.includes(_id) ?
                    (<Fragment>
                        <button className="btn btn-primary btn-sm">Friend</button>
                    </Fragment>)

                    : <div><button className="btn btn-primary btn-sm"
                        onClick={(onClick)}><i class="fas fa-user-plus"></i> Add To Friend</button></div>)
                    : <button className="btn btn-green btn-sm">Me</button>}
            </div>
        </div>
    )
}

export default UserSearchItem
