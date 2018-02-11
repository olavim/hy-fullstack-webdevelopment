import express from 'express';
import asyncHandler from 'express-async-handler';
import Person from '../models/person';

export default () => {
	const router = express.Router();

	router.get('/', asyncHandler(async(req, res) => {
		const numPersons = await Person.count({});
		res.render('info', {
			numPersons: numPersons,
			time: new Date().toString()
		});
	}));

	return router;
};