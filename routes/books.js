const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);

// Register new book
router.post('/', isAuthenticated, validation.saveBook, booksController.addBook);

// Update book in database
router.put('/:id', isAuthenticated, validation.saveBook, booksController.updateBook);

// Delete book from database
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;