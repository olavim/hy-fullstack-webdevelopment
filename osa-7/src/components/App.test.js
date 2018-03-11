import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import App from './App';
import Login from '../scenes/Login';
import Blogs, {Blog} from '../scenes/Blogs';

jest.mock('../services/blogs');

describe.only('<App />', () => {
	const getAuth = (isAuthenticated, getTokenPayload, login, logout) => ({
		isAuthenticated: jest.fn(() => isAuthenticated),
		getTokenPayload: jest.fn(() => getTokenPayload),
		login: jest.fn(() => login),
		logout: jest.fn(() => logout)
	});

	describe('when user is logged out', () => {
		it('redirects to login page', () => {
			const auth = getAuth(false);

			const appComponent = mount(
				<MemoryRouter initialLocations={['/']}>
					<App auth={auth}/>
				</MemoryRouter>
			);

			expect(appComponent.find(Login)).toHaveLength(1);
		});
	});

	describe('when user is logged in', () => {
		it('does not redirect to login page', () => {
			const auth = getAuth(true, {username: 'winner'});

			const appComponent = mount(
				<MemoryRouter initialLocations={['/']}>
					<App auth={auth}/>
				</MemoryRouter>
			);

			expect(appComponent.find(Blogs)).toHaveLength(1);
		});

		it('renders blogs', () => {
			const auth = getAuth(true, {username: 'winner'});

			const appComponent = mount(
				<MemoryRouter initialLocations={['/']}>
					<App auth={auth}/>
				</MemoryRouter>
			);

			// `Blogs` has an async componentDidMount - wait for it to finish
			setImmediate(() => {
				appComponent.update();
				expect(appComponent.find(Blog)).toHaveLength(5);
			});
		});
	});
});
