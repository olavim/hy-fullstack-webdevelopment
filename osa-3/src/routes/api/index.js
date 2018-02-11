import express from 'express';
import getPersonsApi from './persons';

export default () => {
	const router = express.Router();
	router.use('/persons', getPersonsApi());

	return router;
};