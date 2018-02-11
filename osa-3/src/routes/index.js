import express from 'express';
import getApiRoutes from './api';
import getInfoRoutes from './info';

export default () => {
	const router = express.Router();
	router.use('/api', getApiRoutes());
	router.use('/info', getInfoRoutes());
	return router;
};