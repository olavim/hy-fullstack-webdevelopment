import {Schema} from 'mongoose';
import {getModel} from '../lib/model-utils';

export default getModel('User', {
	username: {type: String, required: true},
	name: {type: String, required: true},
	passwordHash: {type: String, required: true},
	isAdult: {type: Boolean, required: true, default: true},
	blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}]
});
