import React, {Component} from 'react';
import axios from 'axios';

const Country = ({name, capital, population, flag}) => (
  <div>
    <h2>{name}</h2>
    <p>capital: {capital}</p>
    <p>population: {population}</p>
    <img src={flag} alt={`the flag of ${name}`} width="180" height="110"/>
  </div>
);

const CountryList = ({countries, onSelectCountry}) => (
  <div>
    {countries.length <= 10 ?
      countries.map(c => (
        <div key={c.name} onClick={() => onSelectCountry(c.name)}>
          {c.name}
        </div>
      )) :
      'too many matches, specify another filter'}
  </div>
);

export default class App extends Component {
  state = {
    filter: '',
    data: []
  };

  async componentWillMount() {
    const {data} = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag');
    this.setState({data});
  }

  handleChangeFilter = evt => {
    this.setState({filter: evt.target.value});
  };

  handleSelectCountry = countryName => {
    this.setState({filter: countryName});
  };

  render() {
    const {data, filter} = this.state;
    const filteredData = data.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div>
        <div>
          find countries: <input onChange={this.handleChangeFilter} value={this.state.filter} />
        </div>
        <div>
          {filteredData.length > 1 &&
          <CountryList countries={filteredData} onSelectCountry={this.handleSelectCountry}/>}
          {filteredData.length === 1 &&
          <Country {...filteredData[0]}/>}
        </div>
      </div>
    );
  }
}
