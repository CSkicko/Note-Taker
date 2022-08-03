const notesRouter = require('express').Router();
const fs = require('fs');

// Get the notes list when a get method is sent to /api/notes
notesRouter.get('/', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    return res.json(notes);
});

// Save the new note to the notes list when a post method is sent to /api/notes
notesRouter.post('/', (req, res) => {
    const newNote = req.body;

    // Read the current db file and set to notes list
    const currentNotes = fs.readFileSync('./db/db.json');
    let notesList = JSON.parse(currentNotes);

    // Set the ID for the new note
    let ids = [];
    let newId = 0;
    let unique = false;

    for (notes of notesList){
        ids.push(parseInt(notes.id));
        console.log(notes);
        console.log(ids);
    }

    while(!unique){
        newId ++;
        if(!ids.includes(newId)){
            unique = true;
        }
    }
    newNote.id = newId;

    // Add the new note to the list
    notesList.push(newNote);
    // Write the new notes list to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(notesList));
    // Provide a success message
    res.json(`Successfully updated notes list`);
});

notesRouter.delete('/:id', (req, res) => {
    // Obtain note id that the user wants to delete
    const noteId = req.params.id;
    // Obtain the current notes from the database
    const currentNotes = fs.readFileSync('./db/db.json');
    let notesList = JSON.parse(currentNotes);

    console.log(`Initial notes list ${notesList}`);
    // Filter the notes list to remove the note with the selected id
    notesList = notesList.filter(note => note.id != noteId);
    console.log(`New notes list ${notesList}`)

    fs.writeFileSync('./db/db.json', JSON.stringify(notesList));

    res.json(`Note deleted`);
})

module.exports = notesRouter;