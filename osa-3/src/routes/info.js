import express from 'express';

export default function(resources) {
	const router = express.Router();

	router.get('/', (req, res) => {
		res.render('info', {
			numPersons: resources.persons.length,
			time: new Date().toString()
		});
	});

	return router;
}