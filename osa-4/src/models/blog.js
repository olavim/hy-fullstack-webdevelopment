import {getModel} from '../lib/model-utils';

export default getModel('Blog', {
	title: {type: String, required: true},
	author: String,
	url: {type: String, required: true},
	likes: {type: Number, default: 0}
});
