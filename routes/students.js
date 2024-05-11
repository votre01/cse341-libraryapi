const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getSingleStudent);

// Register new student
router.post('/', validation.saveStudent, studentsController.registerStudent);

// Update student in database
router.put('/:id', validation.saveStudent, studentsController.updateStudent);

// Delete student from database
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;