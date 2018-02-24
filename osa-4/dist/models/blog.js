'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modelUtils = require('../lib/model-utils');

exports.default = (0, _modelUtils.getModel)('Blog', {
	title: String,
	author: String,
	url: String,
	likes: Number
});
//# sourceMappingURL=blog.js.map