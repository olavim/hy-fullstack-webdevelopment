'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const personSchema = new _mongoose2.default.Schema({
	name: { type: String, unique: true },
	number: String
});

personSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	}
});

exports.default = _mongoose2.default.model('Person', personSchema);
//# sourceMappingURL=person.js.map