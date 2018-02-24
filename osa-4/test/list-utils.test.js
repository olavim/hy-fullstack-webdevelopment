import * as listUtils from '../src/lib/list-utils';
import blogs from './fixtures/blogs';

test('dummy is called', () => {
	const result = listUtils.dummy([]);
	expect(result).toBe(1);
});

describe('total likes', () => {
	test('of an empty list is zero', () => {
		const total = listUtils.totalLikes([]);
		expect(total).toBe(0);
	});

	test('of a non-empty list is calculated correctly', () => {
		const total = listUtils.totalLikes(blogs);
		expect(total).toBe(36);
	});
});

describe('favourite blog', () => {
	test('of an empty list is null', () => {
		const fav = listUtils.favouriteBlog([]);
		expect(fav).toBe(null);
	});

	test('of a non-empty list is the blog with most likes', () => {
		const fav = listUtils.favouriteBlog(blogs);
		expect(fav).toEqual(blogs[2]);
	});
});

describe('most blogs', () => {
	test('returns null for of an empty list', () => {
		const most = listUtils.mostBlogs([]);
		expect(most).toBe(null);
	});

	test('returns correct author and number of blogs for a non-empty list', () => {
		const most = listUtils.mostBlogs(blogs);
		expect(most).toEqual({author: 'Robert C. Martin', blogs: 3});
	});
});