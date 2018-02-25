import supertest from 'supertest';
import {omit} from 'lodash/fp';
import {Mockgoose} from 'mockgoose';
import mongoose from 'mongoose';
import Blog from '../src/models/blog';
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

const getBlogs = async(expect = 200) => (await api.get('/api/blogs').expect(expect)).body;
const postBlog = async(blog, expect = 201) => (await api.post('/api/blogs').send(blog).expect(expect)).body;
const deleteBlog = async(id, expect = 204) => api.delete(`/api/blogs/${id}`).expect(expect);
const updateBlog = async(id, data, expect = 201) => (await api.put(`/api/blogs/${id}`).send(data).expect(expect)).body;
const numBlogs = async() => (await Blog.find({})).length;

describe('Api', () => {
	beforeAll(async() => {
		await mockgoose.prepareStorage();
		mongoose.connect('mongodb://foobar');
	});

	afterEach(async() => {
		return mockgoose.helper.reset();
	});

	describe('GET /api/blogs', () => {
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

	describe('POST /api/blogs', () => {
		test('adds record correctly to db', async() => {
			const blog = createBlogs(1)[0];
			await postBlog(blog);
			const res = (await Blog.find({})).map(b => b.toJSON());
			expect(res.map(omit(['id']))).toEqual([blog]);
		});

		test('returns added record', async() => {
			const blog = createBlogs(1)[0];
			const res = await postBlog(blog);
			delete res.id;
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

	describe('DELETE /api/blogs/:id', () => {
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

	describe('PUT /api/blogs/:id', () => {
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
