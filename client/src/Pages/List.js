import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
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
const ContentTit = styled.h3`
  font-size: var(--fz-base);
  margin: 10px 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const LikeCount = styled.div`
  position: absolute;
  right: 10px; bottom: 10px; display: flex; justify-content: flex-end; align-items: center;
`;

const List = () => {
  const URI = process.env.REACT_APP_API_URL;
  const [ itemList, setItemList ] = useState([]);
  // const [ itemCount, setItemCount ] = useState(8)

  useEffect(()=>{
    const getItemList=async()=>{
      const initItems = await axios.get(`${URI}/pp/medicines`)
      setItemList(initItems)
    }
    getItemList()
  },[])
  console.log(itemList)

  return (
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
              <ContentTit>{item.itemName}</ContentTit>
              <div>{item.efcyQesitm}</div>
              <LikeCount>
                <FaRegThumbsUp /> 234
              </LikeCount>
            </ContentBox>
          ))}
        </ContentList>
      </div>
    </>
  )
}

export default List;
