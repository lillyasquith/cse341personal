const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('artists').find();
  result.toArray().then((artists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(artists);
  });
};

const getSingle = async (req, res) => {
  const artistId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('artists')
    .find({ _id: artistId });
  result.toArray().then((artists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(artists[0]);
  });
};

const createArtist = async (req, res) => {
  const artist = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    period: req.body.period,
    year: req.body.year
    };
  const response = await mongodb
  .getDatabase()
  .db()
  .collection('artists')
  .insertOne(artist);
  if (response.acknowledged) {
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error || 'Some error occured while updating the artist');
  }
};

const updateArtist = async (req, res) => {
const artistId = new ObjectId(req.params.id);
const artist = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  nationality: req.body.nationality,
  period: req.body.period,
  year: req.body.year
  };
  const response = await mongodb
  .getDatabase()
  .db()
  .collection('artists')
  .replaceOne({_id: artistId}, artist);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'Some error occured while updating the artist');
  }
};

const deleteArtist = async (req, res) => {
const artistId = new ObjectId(req.params.id);
const response = await mongodb
 .getDatabase()
 .db()
 .collection('artists')
 .deleteOne({_id: artistId});
 if (response.deletedCount > 0) {
    res.status(200).send();
 }
 else {
    res.status(500).json(response.error || 'Some error occured while updating the artist');
 }
}


module.exports = {
  getAll, 
  getSingle, 
  createArtist,
  updateArtist,
  deleteArtist
};