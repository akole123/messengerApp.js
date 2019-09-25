// Can't use import in node common js
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routing/users'));
app.use('/api/auth', require('./routing/auth'));
app.use('/api/contacts', require('./routing/contacts'));
app.use('/api/chat', require('./routing/chat'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));