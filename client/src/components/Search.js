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
const SearchBtn = styled.button`
  margin-left: 10px;
  height: 40px; width: 80px; border-radius: 6px; background-color: var(--mainbl);
  text-align: center; color: #fff;
`;
const Search = () => {
  const URI=process.env.REACT_APP_API_URL
  const [searchTxt, setSearchTxt] = useState('');
  const searchHandler = e => {
    const txt = e.target.value;
    setSearchTxt(txt);
  };
  const searchSubmit = e => {
    if (e.key === 'Enter') {
      axios({
        method: 'post',
        url: `${URI}/pp/medicines`,
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
      <SearchBtn>검색</SearchBtn>
    </SearchBox>
  );
};

export default Search;
