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
            <ul className="list">
                {name && (<li><i className="fas fa-address-book"></i>{name}</li>)}
                {email && (<li><i className="fas fa-envelope-open"></i>{email}</li>)}
            </ul>
            <ul>
                {_id !== user._id ? (user.friends.includes(_id) ?

                    (<Fragment>
                        <button className="btn btn-primary btn-sm">Friend</button>
                    </Fragment>)

                    : <button className="btn btn-dark btn-sm"
                        onClick={(onClick)}> Add To Friend</button>)
                    : <button className="btn btn-green btn-sm">Me</button>}
            </ul>
        </div>
    )
}

export default UserSearchItem
