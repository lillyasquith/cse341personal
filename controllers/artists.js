const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
    .getDatabase()
    .db()
    .collection('artists')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving artists:', error);
    res.status(500).json({ error: 'An error occurred while retrieving artists' });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    const artistId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('artists')
      .find({ _id: artistId })
      .toArray();

      if (result.length === 0) {
        res.status(404).json({ error: 'Artist not found' });
        return;
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error retrieving artist:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the artist' });
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
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