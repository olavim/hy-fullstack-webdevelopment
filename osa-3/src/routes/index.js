import express from 'express';
import getApiRoutes from './api';
import getInfoRoutes from './info';

export default function(resources) {
	const router = express.Router();
	router.use('/api', getApiRoutes(resources));
	router.use('/info', getInfoRoutes(resources));
	return router;
}
