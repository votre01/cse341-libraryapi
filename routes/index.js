const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'))

/*
router.get('/', (req, res) => {
  //#swagger.tags=['Welcome']
  res.send('Welcome to Universal Student Library');
});
*/

router.use('/books', require('./books'));
router.use('/students', require('./students'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {return next(err); }
    res.redirect('/');
  });
});


module.exports = router;