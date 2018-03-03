import React from 'react';
import {shallow} from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
	it('renders content', () => {
		const blog = {
			title: 'titler ipsum',
			author: 'author ipsum',
			likes: 9000
		};

		const blogComponent = shallow(<SimpleBlog blog={blog}/>);
		const headerDiv = blogComponent.find('.header');
		const numLikesSpan = blogComponent.find('.num-likes');

		expect(headerDiv.text()).toContain(blog.title);
		expect(headerDiv.text()).toContain(blog.author);
		expect(numLikesSpan.text()).toContain(blog.likes);
	});

	it('calls onClick handler when button is pressed', () => {
		const mockHandler = jest.fn();
		const blogComponent = shallow(<SimpleBlog blog={{}} onClick={mockHandler}/>);
		const button = blogComponent.find('button');
		button.simulate('click');
		button.simulate('click');

		expect(mockHandler.mock.calls.length).toBe(2);
	});
});