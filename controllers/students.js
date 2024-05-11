const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStudents = (req, res) => {
  //#swagger.tags=['Students']
  mongodb
    .getDatabase()
    .db()
    .collection('students')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((students) => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(students)
    });
};

const getSingleStudent = (req, res) => {
  //#swagger.tags=['Students]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to find a student.');
  }
  const studentId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('students')
    .find({ _id: studentId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }      
    })
    .then(students => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(students[0])
    });
};

const registerStudent = async (req, res) => {
  //#swagger.tags=['Students']
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    institution: req.body.institution,
    major: req.body.major,
    birthDate: req.body.birthDate
  };
  const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the student");
  }
}

const updateStudent = async (req, res) => {
  //#swagger.tags=['Students']
  const studentId = new ObjectId(req.params.id);
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    institution: req.body.institution,
    major: req.body.major,
    birthDate: req.body.birthDate
  };
  const response = await mongodb.getDatabase().db().collection('students').replaceOne(
  {_id: studentId}, student);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the student");
  }
}

const deleteStudent = async (req, res) => {
  //#swagger.tags=['Students']
  const studentId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the student");
  }
}

module.exports = {
  getAllStudents,
  getSingleStudent,
  registerStudent,
  updateStudent,
  deleteStudent
}