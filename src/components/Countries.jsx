import React, { useEffect, useState } from 'react';
import { CountriesSection } from '../styled-components/GeneralComponents'

const countries = [
  {
    name: 'Afghanistan',
    code: 'AF',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg'
  },
  {
    name: 'Albania',
    code: 'AL',
    flag: 'https://flagcdn.com/al.svg'
  }
];

const Countries = () => {
  const [listOfCountries, setListOfCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(data[0]);
      setListOfCountries(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getCountries();
  },[]);

  return (
    <CountriesSection>
      {/* Top part  */}
      <div id='top-section'>
        <div>
          <h3>View Countries</h3>
          <p>Page 1 of 5</p>
        </div>
        <select>
          <option value="">Select region</option>
        </select>
      </div>

      {/* List of countries */}
      <div id='countries' className='flex flex-wrap w-full justify-between md:gap-1'>
        {listOfCountries.length > 0 && listOfCountries.map((country, index) => {
          return (
            <div key={index} className='w-5/12 md:w-1/5 mb-5'>
              <img src={country.flags.svg} alt={country.flags.alt} />
              <p>{country.name.common}</p>
              <p>{country.capital}</p>
              <p>{country.population}</p>
              <p>{country.continents}</p>
            </div>
          )
        })}

        {loading && <p>Loading...</p>}

        {(!loading && listOfCountries.length === 0) && <p>No countries available</p>}

        {/* Using Ternary operators */}
        {/* {listOfCountries.length > 0
          ? 
            listOfCountries.length > 0 && listOfCountries.map((country, index) => {
              return (
                <div key={index}>
                  <img src={country.flag} alt={country.name} />
                  <p>{country.name}</p>
                </div>
              )
            })
          : <p>No countries available</p>
        } */}

      </div>

      {/* Pagination  */}
      <div id='pagination'>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
      </div>
    </CountriesSection>
  )
}

export default Countries