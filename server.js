// Import express
const express = require ('express');
const app = express ();

const PORT = 3001;

const fs = require ('fs');
const path = require ('path');

const allNotes = require('./db/db.json')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) =>{
    res.json(allNotes.slice(1));
});

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Fallback route
app.get('*', (req, red) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
}); 

//create new note
function createNewNote(body, notesArray){
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
        notesArray[0]++;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/bd.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

//tell server to listen
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);