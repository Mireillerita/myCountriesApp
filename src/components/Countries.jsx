import React, { useEffect, useState } from 'react';
import { CountriesSection } from '../styled-components/GeneralComponents';

const Countries = () => {
  const [listOfCountries, setListOfCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 50;

  const getCountries = async () => {
    setLoading(true);
    const response = await fetch(
      `https://restcountries.com/v3.1/all?limit=${countriesPerPage}&page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setListOfCountries(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CountriesSection>
      {/* Top part  */}
      <div id="top-section">
        <div>
          <h3>View Countries</h3>
          <p>Page {currentPage} of 5</p>
        </div>
        <select>
          <option value="">Select region</option>
        </select>
      </div>

      {/* List of countries */}
      <div
        id="countries"
        className="flex flex-wrap w-full justify-between md:gap-1"
      >
        {listOfCountries.map((country, index) => (
          <div key={index} className="w-5/12 md:w-1/5 mb-5">
            <img src={country.flags.svg} alt={country.flags.alt} />
            <p>{country.name.common}</p>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <p>{country.continents}</p>
          </div>
        ))}

        {loading && <p>Loading...</p>}

        {!loading && listOfCountries.length === 0 && (
          <p>No countries available</p>
        )}
      </div>

      {/* Pagination  */}
      <div id="pagination">
        {[...Array(5).keys()].map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </CountriesSection>
  );
};

export default Countries;
