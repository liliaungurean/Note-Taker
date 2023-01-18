const express = require ('express');
const app = express ();

const PORT = process.env.PORT || 3001;

const fs = require ('fs');
const path = require ('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) =>{
    res.json(allNotes.slice(1));
});

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get()