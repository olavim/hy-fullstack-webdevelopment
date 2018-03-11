import httpClient from '../lib/httpClient';

const baseUrl = '/api/users';

export const getAll = async () => {
	return httpClient.get(baseUrl);
};

export const get = async id => {
	return httpClient.get(`${baseUrl}/${id}`);
};

export const create = async data => {
	return httpClient.post(baseUrl, data);
};

export const remove = async id => {
	return httpClient.delete(`${baseUrl}/${id}`);
};

export const update = async ({id, blogs, ...rest}) => {
	return httpClient.put(`${baseUrl}/${id}`, {blogs: blogs.map(b => b.id), ...rest});
};
