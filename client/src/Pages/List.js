import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import Banner from '../components/Banner';
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
  margin: 15px 0 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--mainbl);
  font-weight: 500;
`;
const ContentText = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: var(--fz-sm);
  line-height: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
const LikeCount = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  color: var(--mainbl);
  > p {
    font-size: 12px;
    padding-top: 3px;
  }
`;

const List = () => {
  const URI = process.env.REACT_APP_API_URL;
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const getMedList = async () => {
      const items = await axios({
        method: 'get',
        url: `${URI}/pp/medicines?page=1&size=8`,
      });
      setItemList(items.data.data);
    };
    getMedList();
  }, []);
  console.log(itemList);


  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search />
        <ContentList>
          {itemList.map((item, idx) => (
            <ContentBox key={idx}>
              <img src={item.medicineImg} alt={item.medicineName} />
              <ContentTit>{item.medicineName}</ContentTit>
              <ContentText>{item.medicineUse}</ContentText>
              <LikeCount>
                <FaRegThumbsUp /> <p>234</p>
              </LikeCount>
            </ContentBox>
          ))}
        </ContentList>
      </div>
    </>
  );
};

export default List;
