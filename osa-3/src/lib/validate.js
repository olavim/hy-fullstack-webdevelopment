import _ from 'lodash';

export default function(resource, data) {
	const res = {};

	for (const [key, value] of _.entries(data)) {
		const field = resource.validation.fields.find(f => f.name === key);

		// Check that property is defined in validation
		if (!field || field.generated) {
			throw {status: 400, message: `invalid property: ${key}`}
		}

		// Check unique
		if (field.unique) {
			if (resource.data.some(r => r[key] === value)) {
				throw {status: 400, message: `unique constraint violation for property: ${key}`}
			}
		}

		switch (field.type) {
			case 'number':
				const num = parseFloat(value);
				if (isNaN(num)) {
					throw {status: 400, message: `invalid value for property ${key}: number expected`}
				}

				res[key] = num;
				break;
			default:
				res[key] = value;
		}
	}

	// Check required field existence
	for (const field of resource.validation.fields.filter(f => f.required)) {
		if (!res.hasOwnProperty(field.name)) {
			throw {status: 400, message: `missing required property: ${field.name}`};
		}
	}

	return res;
}