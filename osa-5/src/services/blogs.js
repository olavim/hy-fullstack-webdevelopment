import httpClient from '../lib/httpClient';

const baseUrl = '/api/blogs';

export const getAll = async() => {
	return httpClient.get(baseUrl);
};

export const create = async(data) => {
	return httpClient.post(baseUrl, data);
};

export const remove = async(id) => {
	return httpClient.delete(`${baseUrl}/${id}`);
};

export const update = async({id, user, ...rest}) => {
	return httpClient.put(`${baseUrl}/${id}`, {user: user.id, ...rest});
};

export const like = async({likes, ...rest}) => {
	return update({likes: likes + 1, ...rest});
};
