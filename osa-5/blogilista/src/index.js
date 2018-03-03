import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Auth from './lib/auth';
import httpClient from './lib/httpClient';
import App from './components/App';

const auth = new Auth(process.env.REACT_APP_API_URL, httpClient);

ReactDOM.render(
	<BrowserRouter>
		<App auth={auth}/>
	</BrowserRouter>,
	document.getElementById('root')
);
