import express from 'express';
import getApiRoutes from './api';

export default () => {
	const router = express.Router();
	router.use('/api', getApiRoutes());
	return router;
};