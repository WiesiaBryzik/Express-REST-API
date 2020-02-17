const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(random);
});

router.route('/testimonials/:id').get((req, res) => {
    const user = db.testimonials.find(u => u.id == req.params.id)
    res.json(user);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    id = uuidv4();
    const newElement = { id: id, author: author, text: text };
    db.testimonials.push(newElement);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
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

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;

    for (let element of db.testimonials) {
        if (element.id == id) {
            db.testimonials.splice(db.testimonials.indexOf(element), 1);
        }
    }
    res.json({ message: 'OK' });
});


module.exports = router;