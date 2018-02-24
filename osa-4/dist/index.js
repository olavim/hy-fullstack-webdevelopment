'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
	_dotenv2.default.load();
	console.log('Loaded env');
}

_mongoose2.default.connect(process.env.MONGODB_URI);

const server = (0, _app2.default)();
const port = process.env.PORT || 3003;

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map