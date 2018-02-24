import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenv.load();
	console.log('Loaded env');
}

const {MONGODB_URI, PORT} = process.env;

mongoose.connect(MONGODB_URI);

const Blog = mongoose.model('Blog', {
	title: String,
	author: String,
	url: String,
	likes: Number
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', async(request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

app.post('/api/blogs', async(request, response) => {
	const blog = new Blog(request.body);
	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});

export default Blog;
