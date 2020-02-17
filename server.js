const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(random);
});

app.get('/testimonials/:id', (req, res) => {
    const user = db.testimonials.find(u => u.id == req.params.id)
    res.json(user);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
        id = uuidv4();
    const newElement = { id: id, author: author, text: text };
    db.testimonials.push(newElement);
    res.json({ message: 'OK' });
  });

  app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const newElement = { id: id, author: author, text: text };
    
    for (let element of db.testimonials) {
        if (element.id == id) {
            db.testimonials.splice(db.testimonials.indexOf(element), 1, newElement);
        }
    }
    res.json({ message: 'OK' });
  });

  app.delete('/testimonials/:id', (req, res) => {
    const id = req.params.id;
    
    for (let element of db.testimonials) {
        if (element.id == id) {
            db.testimonials.splice(db.testimonials.indexOf(element), 1);
        }
    }
    res.json({ message: 'OK' });
  });

  app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
