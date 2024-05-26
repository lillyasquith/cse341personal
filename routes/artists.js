const express = require('express');
const router = express.Router();

const artistsController = require('../controllers/artists');

router.get('/', artistsController.getAll);

router.get('/:id', artistsController.getSingle);

router.post('/', artistsController.createArtist);

router.put('/:id', artistsController.updateArtist);

router.delete('/:id', artistsController.deleteArtist);

module.exports = router;