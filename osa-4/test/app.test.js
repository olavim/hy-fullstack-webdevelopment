import supertest from 'supertest';
import {omit} from 'lodash/fp';
import {Mockgoose} from 'mockgoose';
import mongoose from 'mongoose';
import Blog from '../src/models/blog';
import User from '../src/models/user';
import app from '../src/app';

const mockgoose = new Mockgoose(mongoose);
const api = supertest(app());

const createBlogs = num => {
	const blogs = [];
	for (let i = 0; i < num; i++) {
		blogs.push({
			title: `test${i}`,
			author: `test${i}`,
			url: `test${i}`,
			likes: i
		})
	}
	return blogs;
};

const createUsers = num => {
	const users = [];
	for (let i = 0; i < num; i++) {
		users.push({
			username: `test${i}`,
			name: `test${i}`,
			password: `test${i}`,
			isAdult: i % 2 === 0
		})
	}
	return users;
};

const getBlogs = async(expect = 200) => (await api.get('/api/blogs')).body;
const postBlog = async(blog, expect = 201) => (await api.post('/api/blogs').send(blog).expect(expect)).body;
const deleteBlog = async(id, expect = 204) => api.delete(`/api/blogs/${id}`).expect(expect);
const updateBlog = async(id, data, expect = 201) => (await api.put(`/api/blogs/${id}`).send(data).expect(expect)).body;
const numBlogs = async() => (await Blog.find({})).length;

const getUsers = async(expect = 200) => (await api.get('/api/users').expect(expect)).body;
const postUser = async(user, expect = 201) => (await api.post('/api/users').send(user).expect(expect)).body;

describe('/api', () => {
	let testUser;

	beforeAll(async() => {
		await mockgoose.prepareStorage();
		mongoose.connect('mongodb://foobar');
	});

	beforeEach(async() => {
		await mockgoose.helper.reset();

		const user = new User({
			username: 'superuser',
			name: 'Superman',
			passwordHash: 'ok'
		});

		const savedUser = await user.save();

		process.env.TEST_USER = JSON.stringify({
			id: savedUser.id,
			username: savedUser.username,
			name: savedUser.name
		});

		testUser = {
			isAdult: savedUser.isAdult,
			username: savedUser.username,
			name: savedUser.name
		};
	});

	describe('/blogs', () => {
		describe('GET /', () => {
			test('returns empty list when db is empty', async() => {
				const res = await getBlogs();
				expect(res).toEqual([]);
			});

			test('returns all records when db contains blogs', async() => {
				const blogs = createBlogs(2);
				await Blog.create(blogs);
				const res = await getBlogs();
				expect(res.map(omit(['id']))).toEqual(blogs);
			});
		});

		describe('POST /', () => {
			test('adds record correctly to db', async() => {
				const blog = createBlogs(1)[0];
				await postBlog(blog);
				const res = (await Blog.find({}, {user: 0})).map(b => b.toJSON());
				expect(res.map(omit(['id']))).toEqual([blog]);
			});

			test('returns added record', async() => {
				const blog = createBlogs(1)[0];
				const res = await postBlog(blog);
				delete res.id;
				delete res.user;
				expect(res).toEqual(blog);
			});

			test('likes defaults to 0 if not provided', async() => {
				const blog = createBlogs(1).map(omit(['likes']))[0];
				const res = await postBlog(blog);
				expect(res.likes).toBe(0);
			});

			test('returns 400 Bad Request if title or url not provided', async() => {
				await postBlog({title: 'test'}, 400);
				await postBlog({url: 'test'}, 400);
				await postBlog({title: 'test', url: 'test'});
			});
		});

		describe('DELETE /:id', () => {
			test('deletes record correctly from db', async() => {
				const blog = createBlogs(1)[0];
				const {id} = await postBlog(blog);
				await deleteBlog(id);
				expect(await numBlogs()).toBe(0);
			});

			test('deleting non-existent record returns 204', async() => {
				await deleteBlog('41224d776a326fb40f000001');
				expect(await numBlogs()).toBe(0);
			});

			test('deleting with bad id returns 400', async() => {
				await deleteBlog('foo', 400);
			});
		});

		describe('PUT /:id', () => {
			test('updates record correctly', async() => {
				const blog = createBlogs(1)[0];
				const {id} = await postBlog(blog);
				const newBlog = await updateBlog(id, {likes: 100});
				expect(newBlog.id).toBe(id);
				expect(newBlog.likes).toBe(100);
			});

			test('updating non-existent record returns 404', async() => {
				await updateBlog('41224d776a326fb40f000001', {likes: 100}, 404);
			});

			test('updating with bad id returns 400', async() => {
				await updateBlog('foo', {likes: 100}, 400);
			});
		});
	}, 120000);

	describe('/users', () => {
		const sortUsers = (a, b) => a.username.localeCompare(b.username);

		describe('GET /', () => {
			test('returns empty list when db is empty', async() => {
				await User.remove({});
				const res = await getUsers();
				expect(res).toEqual([]);
			});

			test('returns all records when db contains users', async() => {
				const users = createUsers(2);
				await Promise.all(users.map(u => postUser(u)));
				const res = await getUsers();
				expect(res.map(omit(['id', 'blogs'])).sort(sortUsers)).toEqual(users.concat(testUser).map(omit(['password'])).sort(sortUsers));
			});
		});

		describe('POST /', () => {
			test('adds record correctly to db', async() => {
				const user = createUsers(1)[0];
				await postUser(user);
				const res = (await User.find({}, {passwordHash: 0, blogs: 0})).map(u => u.toJSON());
				expect(res.map(omit(['id']))).toEqual([omit(['passwordHash'])(testUser), omit(['password'])(user)]);
			});

			test('returns saved user', async() => {
				const user = createUsers(1)[0];
				const savedUser = await postUser(user);
				expect(omit(['id', 'passwordHash', 'blogs'])(savedUser)).toEqual(omit(['password'])(user));
			});

			test('saves a hashed password', async() => {
				const user = createUsers(1)[0];
				await postUser(user);
				const savedUser = (await User.find({}))[0];
				const passwordEqual = user.password === savedUser.passwordHash;
				expect(passwordEqual).toBe(false);
			});

			test('too short password returns 400', async() => {
				const user = createUsers(1)[0];
				user.password = 'fo';
				await postUser(user, 400);
			});

			test('duplicate username returns 400', async() => {
				const users = createUsers(2);
				users[1].username = users[0].username;
				await postUser(users[0]);
				await postUser(users[1], 400);
			});

			test('user is adult by default', async() => {
				const user = createUsers(1)[0];
				delete user.isAdult;
				await postUser(user);
				const res = await getUsers();
				expect(res[0].isAdult).toBe(true);
			});
		});
	}, 120000);
});