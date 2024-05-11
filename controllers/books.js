const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = (req, res) => {
  //#swagger.tags=['Books']
  mongodb
    .getDatabase()
    .db()
    .collection('books')
    .find()
    .toArray((err, books) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((books) => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(books)
    });
};

const getSingleBook = (req, res) => {
  //#swagger.tags=['Books]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to find a book.');
  }
  const bookId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('books')
    .find({ _id: bookId })
    .toArray((err, books) => {
      if (err) {
        res.status(400).json({ message: err });
      }      
    })
    .then(books => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(books[0])
    });
};

const addBook = async (req, res) => {
  //#swagger.tags=['Books']
  const book = {
    bookTitle: req.body.bookTitle,
    author: req.body.author,
    year: req.body.year,
    isbn: req.body.isbn,
  };
  const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while adding the book");
  }
}

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookId = new ObjectId(req.params.id);
  const book = {
    bookTitle: req.body.bookTitle,
    author: req.body.author,
    year: req.body.year,
    isbn: req.body.isbn,
  };
  const response = await mongodb.getDatabase().db().collection('books').replaceOne(
  {_id: bookId}, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the book");
  }
}

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id: bookId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the book");
  }
}

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook
}