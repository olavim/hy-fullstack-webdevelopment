'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
	_dotenv2.default.load();
	console.log('Loaded env');
}

const { MONGO_URL, MONGO_USER, MONGO_PASS } = process.env;
_mongoose2.default.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`);

const app = (0, _app2.default)();
const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map