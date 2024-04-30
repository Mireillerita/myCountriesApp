import React, { useState } from 'react';
import Countries from '../components/Countries';
import { SectionHolder } from '../styled-components/GeneralComponents';
import Pagination from '../components/Pagination';

const Home = () => {
  const [searchParams, setSearchParams] = useState({ page: 1 });

  return (
    <div className="flex flex-col items-center">
      <SectionHolder>
        <Countries />
      </SectionHolder>
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Home;
