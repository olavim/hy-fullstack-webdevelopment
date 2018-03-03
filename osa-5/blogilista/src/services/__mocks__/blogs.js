let runningId = 0;
const blogs = [];

for (let i = 0; i < 5; i++) {
	blogs.push({
		id: runningId,
		title: `title-${i}`,
		author: `author-${i}`,
		likes: 0,
		user: {
			username: `user-${i}`
		}
	});

	runningId++;
}

export const getAll = async() => {
	return blogs.slice();
};

export const create = async(data) => {
	data.id = runningId;
	data.likes = data.likes || 0;
	blogs.push(data);
	runningId++;
	return data;
};

export const remove = async(id) => {
	const index = blogs.findIndex(b => b.id === id);
	const removed = blogs[index];
	blogs.splice(index, 1);
	return removed;
};

export const update = async(data) => {
	const index = blogs.findIndex(b => b.id === id);
	blogs[index] = data;
	return data;
};

export const like = async({likes, ...rest}) => {
	return update({likes: likes + 1, ...rest});
};
