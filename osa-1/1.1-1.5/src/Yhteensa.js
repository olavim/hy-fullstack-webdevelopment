import React from 'react';

export default ({osat}) => (
	<p>yhteensä {osat.reduce((summa, osa) => summa + osa.tehtavia, 0)} tehtävää</p>
);