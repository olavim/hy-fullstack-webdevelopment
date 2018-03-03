import jwtDecode from 'jwt-decode';

class Auth {
	constructor(apiUrl, httpClient) {
		this.apiUrl = apiUrl;
		this.httpClient = httpClient;
	}

	login = async({username, password}) => {
		const res = await this.httpClient.post(`${this.apiUrl}/login`, {username, password});
		localStorage.setItem('access_token', res.token);
	};

	logout = () => {
		localStorage.removeItem('access_token');
	};

	getTokenPayload = () => {
		return jwtDecode(localStorage.getItem('access_token'));
	};

	isAuthenticated = () => {
		return Boolean(localStorage.getItem('access_token'));
	};
}

export default Auth;
