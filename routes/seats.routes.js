const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getId);
router.post('/seats', SeatController.postNew);
router.put('/seats/:id', SeatController.putId);
router.delete('/seats/:id', SeatController.deleteId);



module.exports = router;
