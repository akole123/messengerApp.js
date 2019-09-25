const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contact
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, type } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            type,
            //Because were using auth middleware for user
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

        //Make sure user's id is the same as the one in the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

        res.json(contact);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   PUT api/users/:id
// @desc    delete a contact 
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

        //Make sure user's id is the same as the one in the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: 'contact removed' });
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;