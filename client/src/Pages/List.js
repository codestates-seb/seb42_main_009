import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import Banner from '../components/Banner';
import dummy from '../data/dummy.json';

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
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
`;
const ContentList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 50px;
`;
const ContentBox = styled.div`
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  width: calc((100% - 60px) / 4);
  margin-right: 20px;
  margin-bottom: 20px;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  border-radius: 6px;
  padding: 15px;
  height: 250px;
  background: var(--bl-1);
  > img {
    width: auto;
    height: 100px;
    object-fit: contain;
    margin: 0 auto;
  }
  @media (max-width: 930px) {
    width: calc((100% - 40px) / 3);
    &:nth-of-type(4n) {
      margin-right: 20px;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
    &:nth-of-type(3n) {
      margin-right: 20px;
    }
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
  &:hover {
    box-shadow: var(--shadow);
    transition: box-shadow 0.2s;
  }
`;

const List = () => {
  const [searchTxt, setSearchTxt] = useState('');

  return (
    <>
      <Banner />
      <div className="bodywrap">
        <SearchBox>
          <label htmlFor="search">의약품 검색</label>
          <input
            type="text"
            id="search"
            title="의약품 검색"
            value={searchTxt}
            onChange={setSearchTxt}
          />
        </SearchBox>
        <ContentList>
          {dummy.map((item, idx) => (
            <ContentBox key={idx}>
              <img src={item.itemImage} alt={item.itemName} />
              <h3>{item.itemName}</h3>
              <div>{item.efcyQesitm}</div>
              <span>
                <FaThumbsUp /> <FaRegThumbsUp />
              </span>
            </ContentBox>
          ))}
        </ContentList>
      </div>
    </>
  );
};

export default List;
