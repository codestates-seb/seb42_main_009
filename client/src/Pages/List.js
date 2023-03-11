import React from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import Banner from '../components/Banner';
import dummy from '../data/dummy.json';
import Search from '../components/Search';

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

const List = () => (
  <>
    <Banner>
      <div>의약품조회</div>
    </Banner>
    <div className="bodywrap">
      <Search />
      <ContentList>
        {dummy.map((item, idx) => (
          <ContentBox key={idx}>
            <img src={item.itemImage} alt={item.itemName} />
            <h3>{item.itemName}</h3>
            <div>{item.efcyQesitm}</div>
            <span>
              <FaRegThumbsUp /> 234
            </span>
          </ContentBox>
        ))}
      </ContentList>
    </div>
  </>
);

export default List;
