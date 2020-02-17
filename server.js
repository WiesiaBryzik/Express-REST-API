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






  app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

// app.get('/concerts/random', (req, res) => {
//     const random = db.concerts[Math.floor(Math.random() * db.concerts.length)];
//     res.json(random);
// });

app.get('/concerts/:id', (req, res) => {
    const user = db.concerts.find(u => u.id == req.params.id)
    res.json(user);
});

app.post('/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
        id = uuidv4();
    const newElement = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
    db.concerts.push(newElement);
    res.json({ message: 'OK' });
  });

  app.put('/concerts/:id', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = req.params.id;
    const newElement = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
    
    for (let element of db.concerts) {
        if (element.id == id) {
            db.concerts.splice(db.concerts.indexOf(element), 1, newElement);
        }
    }
    res.json({ message: 'OK' });
  });

  app.delete('/concerts/:id', (req, res) => {
    const id = req.params.id;
    
    for (let element of db.concerts) {
        if (element.id == id) {
            db.concerts.splice(db.concerts.indexOf(element), 1);
        }
    }
    res.json({ message: 'OK' });
  });







  app.get('/seats', (req, res) => {
    res.json(db.seats);
});

// app.get('/seats/random', (req, res) => {
//     const random = db.seats[Math.floor(Math.random() * db.seats.length)];
//     res.json(random);
// });

app.get('/seats/:id', (req, res) => {
    const user = db.seats.find(u => u.id == req.params.id)
    res.json(user);
});

app.post('/seats', (req, res) => {
    const { day, seats, client, email } = req.body;
        id = uuidv4();
    const newElement = { id: id, day: day, seats: seats, client: client, email: email };
    db.seats.push(newElement);
    res.json({ message: 'OK' });
  });

  app.put('/seats/:id', (req, res) => {
    const { day, seats, client, email } = req.body;
    const id = req.params.id;
    const newElement = { id: id, day: day, seats: seats, client: client, email: email };
    
    for (let element of db.seats) {
        if (element.id == id) {
            db.seats.splice(db.seats.indexOf(element), 1, newElement);
        }
    }
    res.json({ message: 'OK' });
  });

  app.delete('/seats/:id', (req, res) => {
    const id = req.params.id;
    
    for (let element of db.seats) {
        if (element.id == id) {
            db.seats.splice(db.seats.indexOf(element), 1);
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
