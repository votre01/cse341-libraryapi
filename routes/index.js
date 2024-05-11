const router = require('express').Router();

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
  //#swagger.tags=['Welcome']
  res.send('Welcome to Universal Student Library');
});

router.use('/books', require('./books'));
router.use('/students', require('./students'));


module.exports = router;