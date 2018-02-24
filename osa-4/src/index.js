import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
	dotenv.load();
	console.log('Loaded env');
}

mongoose.connect(process.env.MONGODB_URI);

const server = app();
const port = process.env.PORT || 3003;

server.listen(port, () => {
	console.log(`Server running on port ${port}`)
});
