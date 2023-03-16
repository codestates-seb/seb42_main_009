import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useSearchTextStore,
  useSearchSelectedStore,
  useSearchApiStore,
} from '../Stores/listSearchStore';

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
  height: 40px;
  width: 80px;
  border-radius: 6px;
  background-color: var(--mainbl);
  text-align: center;
  color: #fff;
`;
const Search = () => {
  const { setSearchText } = useSearchTextStore(state => state);
  const { setSearchSelected } = useSearchSelectedStore(state => state);
  const { setSearchApi } = useSearchApiStore(state => state);

  const [searchTxt, setSearchTxt] = useState('');
  const searchHandler = e => {
    const txt = e.target.value;
    setSearchTxt(txt);
  };
  const selectHandler = e => {
    const selected = e.target.value;
    if (selected === 'name') {
      setSearchApi('medicineName');
    } else if (selected === 'ingredient') {
      setSearchApi('medicineIngredient');
    }
    setSearchSelected(selected);
  };

  const searchSubmit = e => {
    if (e.key === 'Enter') {
      setSearchText(searchTxt);
    }
  };
  return (
    <SearchBox>
      <label htmlFor="search">의약품 검색</label>
      <select className="searchs" onChange={selectHandler}>
        <option value="name">제품명</option>
        <option value="ingredient">성분</option>
      </select>
      <input
        type="text"
        id="search"
        title="의약품 검색"
        value={searchTxt}
        onChange={searchHandler}
        onKeyDown={searchSubmit}
      />
      <SearchBtn
        onClick={() => {
          setSearchText(searchTxt);
        }}
      >
        검색
      </SearchBtn>
    </SearchBox>
  );
};

export default Search;
