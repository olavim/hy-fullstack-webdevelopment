import {getModel} from '../lib/model-utils';

export default getModel('Blog', {
	title: String,
	author: String,
	url: String,
	likes: Number
});
