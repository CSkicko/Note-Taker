const notesRouter = require('express').Router();
const notes = require('../db/db.json');

notesRouter.get('/', (req, res) => {
    console.log(notes);
    return res.json(notes);
})

module.exports = notesRouter;