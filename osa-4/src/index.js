import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/user';
import app from './app';

(async() => {
	if (process.env.NODE_ENV !== 'production') {
		dotenv.load();
		console.log('Loaded env');
	}

	mongoose.connect(process.env.MONGODB_URI);

	// For testing purposes.
	if (process.env.NODE_ENV === 'development' && !(await User.findOne({username: 'superuser'}))) {
		const passwordHash = await bcrypt.hash('foofum', 10);
		const superuser = new User({username: 'superuser', name: 'Superman', passwordHash});
		await superuser.save();
	}

	const server = app();
	const port = process.env.PORT || 3003;

	server.listen(port, () => {
		console.log(`Server running on port ${port}`)
	});
})();