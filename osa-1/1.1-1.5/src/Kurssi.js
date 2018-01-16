import React from 'react';
import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

export default ({nimi, osat}) => (
	<div>
		<Otsikko teksti={nimi}/>
		<Sisalto osat={osat}/>
		<Yhteensa osat={osat}/>
	</div>
);