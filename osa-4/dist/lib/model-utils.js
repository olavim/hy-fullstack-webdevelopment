'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getModel = exports.getModel = (modelName, schemaObj) => {
	const schema = new _mongoose2.default.Schema(schemaObj);

	// Rename `_id` to `id` and remove `__v`
	schema.set('toJSON', {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) {
			delete ret._id;
		}
	});

	return _mongoose2.default.model(modelName, schema);
};
//# sourceMappingURL=model-utils.js.map