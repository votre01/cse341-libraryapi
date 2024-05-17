const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getSingleStudent);

// Register new student
router.post('/', isAuthenticated, validation.saveStudent, studentsController.registerStudent);

// Update student in database
router.put('/:id', isAuthenticated, validation.saveStudent, studentsController.updateStudent);

// Delete student from database
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;