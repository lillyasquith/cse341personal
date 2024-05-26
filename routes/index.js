const router = require ('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send('Hello!')});

router.use('/artists', require('./artists'));

module.exports = router;