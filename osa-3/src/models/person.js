import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	number: String
});

personSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	}
});

export default mongoose.model('Person', personSchema);