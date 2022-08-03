const notesRouter = require('express').Router();
const fs = require('fs');

// Get the notes list when a get method is sent to /api/notes
notesRouter.get('/', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    return res.json(notes);
});

// Save the new note to the notes list when a post method is sent to /api/notes
notesRouter.post('/', (req, res) => {
    // Set the new note parameter equal to the body of the post request
    const newNote = req.body;
    // Read the current db file
    const currentNotes = fs.readFileSync('./db/db.json');
    // Initiate the new notes list by parsing the JSON data received 
    let notesList = JSON.parse(currentNotes);
    // Add the new note to the list
    notesList.push(newNote);
    // Write the new notes list to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(notesList));
    // Provide a success message
    res.json(`Successfully updated notes list`);
});

module.exports = notesRouter;