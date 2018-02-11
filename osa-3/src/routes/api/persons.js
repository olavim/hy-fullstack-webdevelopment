import express from 'express';
import asyncHandler from 'express-async-handler';
import Person from '../../models/person';

const isValidId = id => id.match(/^[0-9a-fA-F]{24}$/);

export default () => {
	const router = express.Router();

	router.use('/:id', (req, res, next) => {
		if (!isValidId(req.params.id)) {
			throw {status: 400, message: 'invalid id'}
		}

		next();
	});

	router.get('/', asyncHandler(async(req, res) => {
		const persons = await Person.find();
		res.json(persons);
	}));

	router.get('/:id', asyncHandler(async(req, res) => {
		const {id} = req.params;
		const person = await Person.findById(id);

		if (!person) {
			throw {status: 404, message: 'record does not exist'}
		}

		res.json(person);
	}));

	router.delete('/:id', asyncHandler(async(req, res) => {
		const {id} = req.params;
		await Person.findByIdAndRemove(id);
		res.json({status: 'ok'});
	}));

	router.put('/:id', asyncHandler(async(req, res) => {
		const {id} = req.params;
		const person = await Person.findByIdAndUpdate(id, req.body, {new: true});
		res.json(person);
	}));

	router.post('/', asyncHandler(async(req, res) => {
		const person = new Person(req.body);
		const newPerson = await person.save();
		res.json(newPerson);
	}));

	return router;
}