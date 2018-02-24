import supertest from 'supertest';
import {Mockgoose} from 'mockgoose';
import mongoose from 'mongoose';
import Blog from '../src/models/blog';
import app from '../src/app';

const mockgoose = new Mockgoose(mongoose);
const api = supertest(app());

describe('GET /api/blogs', () => {
	beforeAll(async() => {
		await mockgoose.prepareStorage();
		mongoose.connect('mongodb://foobar');
	});

	afterEach(async() => {
		return mockgoose.helper.reset();
	});

	test('returns empty list when db is empty', async() => {
		const res = await api.get('/api/blogs').expect(200);
		expect(res.body).toEqual([]);
	});

	test('returns all records when db contains blogs', async() => {
		const blogObjs = [
			{
				title: 'test1',
				author: 'tester1',
				url: 'test1.com',
				likes: 1
			},
			{
				title: 'test2',
				author: 'tester2',
				url: 'test2.com',
				likes: 2
			}
		];

		await Blog.create(blogObjs);

		const res = await api.get('/api/blogs').expect(200);
		const blogs = res.body.map(blog => {
			delete blog.id;
			return blog;
		});
		expect(blogs).toEqual(blogObjs);
	});
}, 120000);


describe('POST /api/blogs', () => {
	beforeAll(async() => {
		await mockgoose.prepareStorage();
		mongoose.connect('mongodb://foobar');
	});

	afterEach(async() => {
		return mockgoose.helper.reset();
	});

	test('adds record correctly to db', async() => {
		const blogObj = {
			title: 'test1',
			author: 'tester1',
			url: 'test1.com',
			likes: 1
		};

		await api.post('/api/blogs').send(blogObj).expect(201);
		const blogs = (await Blog.find({})).map(blog => {
			const json = blog.toJSON();
			delete json.id;
			return json;
		});
		expect(blogs).toEqual([blogObj]);
	});

	test('returns added record', async() => {
		const blogObj = {
			title: 'test1',
			author: 'tester1',
			url: 'test1.com',
			likes: 1
		};

		const {body} = await api.post('/api/blogs').send(blogObj).expect(201);
		delete body.id;
		expect(body).toEqual(blogObj);
	});

	test('likes defaults to 0 if not provided', async() => {
		const blogObj = {
			title: 'test1',
			author: 'tester1',
			url: 'test1.com'
		};

		const {body} = await api.post('/api/blogs').send(blogObj).expect(201);
		expect(body.likes).toBe(0);
	});

	test('returns 400 Bad Request if title or url not provided', async() => {
		await api.post('/api/blogs').send({title: 'test'}).expect(400);
		await api.post('/api/blogs').send({url: 'test'}).expect(400);
		await api.post('/api/blogs').send({title: 'test', url: 'test'}).expect(201);
	});
}, 120000);
