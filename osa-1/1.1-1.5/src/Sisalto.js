import React from 'react';
import Osa from './Osa';

export default ({osat}) => (
	<div>{osat.map(osa => <Osa key={osa.nimi} osa={osa}/>)}</div>
);