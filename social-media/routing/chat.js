const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Chat = require('../models/Chat');
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('sender', 'Sender is required').not().isEmpty(),
    check('receiver', 'receiver is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { sender, receiver } = req.body;
        let chat = await Chat.findOne({ sender, receiver });
        if (chat) {
            console.log("Error user already exist");
            return res.status(400).json({ msg: 'User already exist' });
        };
        chat = new Chat({
            sender,
            receiver
        });
        await chat.save();
        res.json(chat);
    } catch (err) {
        if (err) throw err;
        res.status(500).send('Server Error');
    }
});

router.put('/', async (req, res) => {
    const { sender, receiver, message, oppositeEnd, name } = req.body;

    try {
        let chat = await Chat.findOne({ sender, receiver });
        if (!chat) {
            return res.status(400).json({ msg: 'There is no such relationship' });
        }

        if (message !== '' && oppositeEnd === "false") {
            const newMessage = { name, message };
            chat.chatLog.push(newMessage);
        } else if (message !== '' && oppositeEnd === "true") {
            const newMessage = { name, message };
            chat.chatLog.push(newMessage);
        }
        if (message === "Delete Chat") {
            chat.chatLog = [];
        }
        chat.save();
        res.json(chat.chatLog)
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;