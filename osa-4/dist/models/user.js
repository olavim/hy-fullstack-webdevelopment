'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _modelUtils = require('../lib/model-utils');

exports.default = (0, _modelUtils.getModel)('User', {
	username: { type: String, required: true },
	name: { type: String, required: true },
	passwordHash: { type: String, required: true },
	isAdult: { type: Boolean, required: true, default: true },
	blogs: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});
//# sourceMappingURL=user.js.map