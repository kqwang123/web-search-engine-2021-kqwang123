const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/book/:key', (req, res) => {
    // Reading isbn from the URL
    const key = req.params.key;

    // Searching books for the isbn
    if (key != "helloworld")
        // Sending 404 when not found something is a good practice
        res.status(403).send('{"error": "invalid key"}');
    
});

const setEditModal = (s) => {
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3001/frontend/${s}`, false);
    xhttp.send();

    const s = JSON.parse(xhttp.responseText);

    // Setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3001/frontend/${isbn}`;
}

loadBooks();

app.get('/frontend', (req, res) => {
    res.json(s);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));