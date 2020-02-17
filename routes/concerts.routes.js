const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');


router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

// router.route('/concerts/random').get((req, res) => {
//     const random = db.concerts[Math.floor(Math.random() * db.concerts.length)];
//     res.json(random);
// });

router.route('/concerts/:id').get((req, res) => {
    const user = db.concerts.find(u => u.id == req.params.id)
    res.json(user);
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    id = uuidv4();
    const newElement = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
    db.concerts.push(newElement);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
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

router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;

    for (let element of db.concerts) {
        if (element.id == id) {
            db.concerts.splice(db.concerts.indexOf(element), 1);
        }
    }
    res.json({ message: 'OK' });
});

module.exports = router;
