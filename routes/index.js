const routes = require('express').Router();
const myController = require('../controllers');

// TESTING ROUTES
routes.get('/', myController.awesomeFn);

routes.get('/ttech', myController.tTech);

routes.get('/kodeT', myController.kodeT);

routes.get('/ttechJSON', myController.tTechFn);

routes.get('/awesomeNm', myController.awesomeNameFn);

// STUDENT ROUTES

// ROUTE: ALL STUDENTS (API LIST)
// routes.get('/students', myController.getAllStudents);

// REQUIRE: [routes\students.js]
routes.use('/students', require('./students'));

module.exports = routes;
