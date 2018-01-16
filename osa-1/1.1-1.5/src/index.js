import React from 'react';
import ReactDOM from 'react-dom';
import Kurssi from './Kurssi';

const App = () => {
	const kurssi = {
		nimi: 'Half Stack -sovelluskehitys',
		osat: [
			{
				nimi: 'Reactin perusteet',
				tehtavia: 10
			},
			{
				nimi: 'Tiedonvälitys propseilla',
				tehtavia: 7
			},
			{
				nimi: 'Komponenttien tila',
				tehtavia: 14
			}
		]
	};

	return (
		<Kurssi nimi={kurssi.nimi} osat={kurssi.osat} />
	);
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);