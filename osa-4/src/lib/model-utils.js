import mongoose from 'mongoose';

export const getModel = (modelName, schemaObj) => {
	const schema = new mongoose.Schema(schemaObj);

	// Rename `_id` to `id` and remove `__v`
	schema.set('toJSON', {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) {
			delete ret._id;
		}
	});

	return mongoose.model(modelName, schema);
};
