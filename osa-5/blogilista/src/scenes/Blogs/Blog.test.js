import React from 'react';
import {shallow} from 'enzyme';
import Blog from './Blog';

describe.only('<Blog />', () => {
	const blog = {
		title: 'titler ipsum',
		author: 'author ipsum',
		likes: 9000,
		user: {
			username: 'user ipsum'
		}
	};

	it('only renders title and author when not expanded', () => {
		const blogComponent = shallow(<Blog blog={blog} onLike={() => {}} onDelete={() => {}} deletable={true}/>);

		expect(blogComponent.text()).toContain(blog.title);
		expect(blogComponent.text()).toContain(blog.author);
		expect(blogComponent.text()).not.toContain(blog.likes);
		expect(blogComponent.text()).not.toContain(blog.user.username);
	});

	it('renders everything when expanded', () => {
		const blogComponent = shallow(<Blog blog={blog} onLike={() => {}} onDelete={() => {}} deletable={true}/>);
		blogComponent.simulate('click');
		blogComponent.update();
		expect(blogComponent.text()).toContain(blog.title);
		expect(blogComponent.text()).toContain(blog.author);
		expect(blogComponent.text()).toContain(blog.likes);
		expect(blogComponent.text()).toContain(blog.user.username);
	});
});