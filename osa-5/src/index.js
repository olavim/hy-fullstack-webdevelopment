import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './lib/auth';
import httpClient from './lib/httpClient';
import App from './components/App';

const auth = new Auth(process.env.REACT_APP_API_URL, httpClient);

ReactDOM.render(<App auth={auth}/>, document.getElementById('root'));
