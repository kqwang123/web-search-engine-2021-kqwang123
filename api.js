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

app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));