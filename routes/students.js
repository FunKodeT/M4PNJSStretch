const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/index');
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getOneStudents);
router.post('/', StudentController.newStudents);
router.put('/:id', StudentController.updateStudents);
router.delete('/:id', StudentController.deleteStudents);
module.exports = router;
