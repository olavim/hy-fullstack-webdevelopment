import getApp from './app';

const resources = {
	persons: {
		validation: {
			fields: [
				{
					name: 'name',
					type: 'string',
					required: true,
					unique: true
				},
				{
					name: 'number',
					type: 'string',
					required: true
				},
				{
					name: 'id',
					generated: true
				}
			]
		},
		data: [
			{
				name: 'Arto Hellas',
				number: '040-123456',
				id: 1
			},
			{
				name: 'Martti Tienari',
				number: '040-123456',
				id: 2
			},
			{
				name: 'Arto Järvinen',
				number: '040-123456',
				id: 3
			},
			{
				name: 'Lea Kutvonen',
				number: '040-123456',
				id: 4
			}
		]
	}
};

const app = getApp(resources);

app.listen(3001, () => {
	console.log('Server listening on port 3001');
});