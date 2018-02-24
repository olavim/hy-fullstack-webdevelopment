'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modelUtils = require('../lib/model-utils');

exports.default = (0, _modelUtils.getModel)('Blog', {
	title: { type: String, required: true },
	author: String,
	url: { type: String, required: true },
	likes: { type: Number, default: 0 }
});
//# sourceMappingURL=blog.js.map