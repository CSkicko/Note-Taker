const express = require('express');

// Import the code for the notes router
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;