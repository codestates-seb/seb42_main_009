import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    font-size: var(--fz-md);
    padding-right: 20px;
  }
  input {
    width: 350px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--bl-2);
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    label {
      font-size: var(--fz-base);
      padding-right: 15px;
    }
    input {
      width: 250px;
      height: 34px;
    }
  }
`;
const Search = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const searchHandler = e => {
    const txt = e.target.value;
    setSearchTxt(txt);
  };
  const searchSubmit = e => {
    if (e.key === 'Enter') {
      axios({
        method: 'post',
        url: 'http://localhost:3000',
      });
      setSearchTxt('');
    }
  };
  return (
    <SearchBox>
      <label htmlFor="search">의약품 검색</label>
      <input
        type="text"
        id="search"
        title="의약품 검색"
        value={searchTxt}
        onChange={searchHandler}
        onKeyDown={searchSubmit}
      />
    </SearchBox>
  );
};

export default Search;
