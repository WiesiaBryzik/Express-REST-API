const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');


router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

// router.route('/seats/random').get((req, res) => {
//     const random = db.seats[Math.floor(Math.random() * db.seats.length)];
//     res.json(random);
// });

router.route('/seats/:id').get((req, res) => {
    const user = db.seats.find(u => u.id == req.params.id)
    res.json(user);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
            id = uuidv4();
    for (let element of db.seats) {
        if (element.day == day && element.seat == seat) {
            return res.status(409).send({ message: 'The slot is already taken...' });
        } else {            
            const newElement = { id: id, day: day, seat: seat, client: client, email: email };
            db.seats.push(newElement);
            return res.json({ message: 'OK' });
        }
    }
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = req.params.id;
    const newElement = { id: id, day: day, seat: seat, client: client, email: email };

    for (let element of db.seats) {
        if (element.id == id) {
            db.seats.splice(db.seats.indexOf(element), 1, newElement);
        }
    }
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;

    for (let element of db.seats) {
        if (element.id == id) {
            db.seats.splice(db.seats.indexOf(element), 1);
        }
    }
    res.json({ message: 'OK' });
});


module.exports = router;
