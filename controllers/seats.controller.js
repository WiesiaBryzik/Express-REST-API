const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch (err) {
      res.status(500).json(err)
    }
  };

  exports.getId = async (req, res) => {

    try {
      const dep = await Seat.findById(req.params.id);
      if (!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch (err) {
      res.status(500).json(err);
    }
  };

  exports.postNew = async (req, res) => {

    try {
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      req.io.emit('seatsUpdated', await Seat.find());
      res.json({ message: 'OK' });
  
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.putId = async (req, res) => {
    const { day, seat, client, email } = req.body;
  
    try {
      const dep = await (Seat.findById(req.params.id));
      if (dep) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } });
        res.json({ message: 'OK' + ' updated dataBase:' + await Seat.find() });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
      res.status(500).json(err);
    }
  };

  exports.deleteId = async (req, res) => {

    try {
      const dep = await (Seat.findById(req.params.id));
      if (dep) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' + ' deleted element' + dep + 'updated dataBase:' + await Seat.find() });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
      res.status(500).json(err);
    }
  };