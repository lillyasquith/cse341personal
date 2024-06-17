const express = require('express');
const router = express.Router();

const artistsController = require('../controllers/artists');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', artistsController.getAll);

router.get('/:id', artistsController.getSingle);

router.post('/', isAuthenticated, validation.saveArtist, artistsController.createArtist);

router.put('/:id', isAuthenticated, validation.saveArtist, artistsController.updateArtist);

router.delete('/:id', isAuthenticated, artistsController.deleteArtist);


module.exports = router;