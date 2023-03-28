import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import {
  useSearchTextStore,
  useSearchSelectedStore,
  useSearchApiStore,
  useSearchIsUpdateStore,
} from '../Stores/listSearchStore';
import {
  useListCurrentPageStore,
  useListPageStore,
} from '../Stores/listPageStore';
import {
  SearchBox,
  SearchSelBox,
  SearchBtn,
  SearchSelect,
  SearchSelectDown,
} from '../styles/s-top';

const Search = () => {
  const { setSearchText } = useSearchTextStore(state => state);
  const { setSearchSelected } = useSearchSelectedStore(state => state);
  const { setSearchApi } = useSearchApiStore(state => state);
  const { setSearchIsUpdate } = useSearchIsUpdateStore(state => state);
  const { setListPage } = useListPageStore(state => state);
  const { setListCurrentPage } = useListCurrentPageStore(state => state);
  const navigate = useNavigate();

  const [searchTxt, setSearchTxt] = useState('');
  const searchHandler = e => {
    const txt = e.target.value;
    setSearchTxt(txt);
  };
  const submitPageHandler = () => {
    setListCurrentPage(1);
    setListPage(1);
  };

  const selectHandler = e => {
    const selected = e.target.value;
    if (selected === 'name') {
      setSearchApi('medicineName');
    } else if (selected === 'ingredient') {
      setSearchApi('medicineIngredient');
    }
    setSearchSelected(selected);
    setSearchIsUpdate(true);
  };

  const searchSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchText(searchTxt);
      submitPageHandler();
      setSearchIsUpdate(true);
      navigate('/list');
    }
  };

  useEffect(() => {
    console.log('시작');
    setSearchText('');
    setSearchApi('medicineName');
    setSearchSelected('name');
    setSearchIsUpdate(false);
    setListCurrentPage(1);
    setListPage(1);
  }, []);

  return (
    <SearchBox>
      <label htmlFor="search">의약품 검색</label>
      <SearchSelBox>
        <SearchSelect onChange={selectHandler}>
          <option value="name">제품명</option>
          <option value="ingredient">성분</option>
        </SearchSelect>
        <SearchSelectDown>
          <FaChevronDown />
        </SearchSelectDown>
      </SearchSelBox>
      <input
        type="text"
        id="search"
        title="의약품 검색"
        value={searchTxt}
        onChange={searchHandler}
        onKeyDown={searchSubmit}
      />
      <SearchBtn
        onClick={e => {
          e.preventDefault();
          setSearchText(searchTxt);
          submitPageHandler();
          setSearchIsUpdate(true);
          navigate('/list');
        }}
      >
        검색
      </SearchBtn>
    </SearchBox>
  );
};

export default Search;
