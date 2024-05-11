const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);

// Register new book
router.post('/', validation.saveBook, booksController.addBook);

// Update book in database
router.put('/:id', validation.saveBook, booksController.updateBook);

// Delete book from database
router.delete('/:id', booksController.deleteBook);

module.exports = router;