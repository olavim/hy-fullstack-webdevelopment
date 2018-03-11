import axios from 'axios';

const httpClient = async (method, url, data) => {
	const token = localStorage.getItem('access_token');
	console.log(method, url);

	const res = await axios({
		url,
		method,
		data: method !== 'get' ? data : undefined,
		params: method === 'get' ? data : undefined,
		headers: token ? {Authorization: `Bearer ${token}`} : undefined
	});

	return res.data;
};

export default new Proxy(httpClient, {
	get: (target, name) => target.bind(target, name)
});
