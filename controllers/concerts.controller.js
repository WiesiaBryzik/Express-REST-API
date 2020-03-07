const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json(err)
  }
};

exports.getId = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json(err);
  }
};


exports.getPerformer = async (req, res) => {

  try {
    const per = await Concert.find();

    if (!per) res.status(404).json({ message: 'Not found' });
    else {
      const performerArray = []
      for (let p of per) {
        if (p.performer === req.params.performer) {
          performerArray.push(p);
        }
      }
      res.json(performerArray);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.getGenre = async (req, res) => {

  try {
    const per = await Concert.find();

    if (!per) res.status(404).json({ message: 'Not found' });
    else {
      const genreArray = []
      for (let p of per) {
        if (p.genre === req.params.genre) {
          genreArray.push(p);
        }
      }
      res.json(genreArray);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.getDay = async (req, res) => {

  try {
    const per = await Concert.find();

    if (!per) res.status(404).json({ message: 'Not found' });
    else {
      const dayArray = []
      for (let p of per) {
        if (p.day === parseInt(req.params.day)) {
          dayArray.push(p);
        }
      }
      res.json(dayArray);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.getPrice = async (req, res) => {

  try {
    const per = await Concert.find();

    if (!per) res.status(404).json({ message: 'Not found' });
    else {
      const priceMin = parseInt(req.params.price_min);
      const priceMax = parseInt(req.params.price_max);

      const priceArray = []
      for (let p of per) {
        if ( p.price >= priceMin && p.price <= priceMax) {
          priceArray.push(p);
        }
      }
      res.json(priceArray);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
};










exports.postNew = async (req, res) => {

  try {

    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.putId = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await (Concert.findById(req.params.id));
    if (dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json({ message: 'OK' + ' updated dataBase:' + await Concert.find() });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteId = async (req, res) => {

  try {
    const dep = await (Concert.findById(req.params.id));
    if (dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' + ' deleted element' + dep + 'updated dataBase:' + await Concert.find() });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err);
  }
};