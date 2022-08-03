const notes = require('express').Router();

notes.get('/', (req, res) => {
    console.log(`Request method: ${req.method}`)
})

module.exports = notes;