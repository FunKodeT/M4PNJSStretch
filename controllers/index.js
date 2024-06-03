const {mongo} = require('mongoose');
const mongodb = require('../db/connect');
// const ObjectID = require('mongodb').ObjectId;
const ObjectId = require('mongodb').ObjectId;

const awesomeFn = (req, res, next) => {
	res.send('Hello World!');
};

const tTech = (req, res, next) => {
	res.send('Tooele Tech is Awesome!');
};

const kodeT = (req, res, next) => {
	res.send('Hello there.');
};

const awesomeNameFn = (req, res, next) => {
	res.json('Awesome Name!');
};

const tTechFn = (req, res, next) => {
	res.json('Tooele Tech is Awesome!');
};

// GET STUDENTS: ALL
const getAllStudents = async (req, res) => {
	try {
		const result = await mongodb.getDB().db().collection('students').find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

// GET STUDENTS: ONE
const getOneStudents = async (req, res) => {
	try {
		const userID = new ObjectId(req.params.id);
		// const userID = static createFromTime(req.params.id)
		// const userID = new inputId(req.params.id);
		console.log(userID);
		const result = await mongodb
			.getDB()
			.db()
			.collection('students')
			.find({_id: userID});
		console.log(result);
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists[0]);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

// POST STUDENTS: NEW
const newStudents = async (req, res) => {
	try {
		const student = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			age: req.body.age,
			currentCollege: req.body.currentCollege,
		};
		const response = await mongodb
			.getDB()
			.db()
			.collection('students')
			.insertOne(student);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(
				response.error ||
					'Some error occured while creating new student.'
			);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// PATCH STUDENTS: ONE
const updateStudents = async (req, res) => {
	try {
		const userID = new ObjectId(req.params.id);
		// const userID = new inputId(req.params.id);
		const student = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			age: req.body.age,
			currentCollege: req.body.currentCollege,
		};
		const response = await mongodb
			.getDB()
			.db()
			.collection('students')
			.replaceOne({_id: userID}, student);
		if (response.acknowledged) {
			res.status(204).json(response);
		} else {
			res.status(500).json(
				response.error ||
					'Some error occurred while updating the student'
			);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// DELETE STUDENTS: ONE
const deleteStudents = async (req, res) => {
	try {
		const userID = new ObjectId(req.params.id);
		// const userID = new inputId(req.params.id);
		const response = await mongodb
			.getDB()
			.db()
			.collection('students')
			.deleteOne({_id: userID}, true);
		console.log(response);
		if (response.acknowledged) {
			res.status(200).send(response);
		} else {
			res.status(500).json(
				response.error ||
					'Some error occurred while deleting this student.'
			);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
module.exports = {
	awesomeFn,
	tTech,
	kodeT,
	awesomeNameFn,
	tTechFn,
	getAllStudents,
	getOneStudents,
	newStudents,
	updateStudents,
	deleteStudents,
};
