import dotenv from 'dotenv';
import mongoose from 'mongoose';
import getApp from './app';

if (process.env.NODE_ENV !== 'production') {
	dotenv.load();
	console.log('Loaded env');
}

mongoose.connect(process.env.MONGODB_URI);

const app = getApp();
const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});