const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    const user = db.find(u => u.id == req.params.id)
    res.json(user);
});

app.get('/testimonials/random', (req, res) => {
    const random = db[Math.floor(Math.random * db.length)];
    res.json(random);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
        id = uuidv4();
    const newElement = { id: id, author: author, text: text };
    db.push(newElement);
  });

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
