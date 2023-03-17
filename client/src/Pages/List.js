import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';

import {
  useSearchApiStore,
  useSearchSelectedStore,
  useSearchTextStore,
} from '../Stores/listSearchStore';
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
  const { searchText } = useSearchTextStore(state => state);
  const { searchSelected } = useSearchSelectedStore(state => state);
  const { searchApi } = useSearchApiStore(state => state);
  const navigate = useNavigate();

  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);

  const PER_PAGE = 8;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };

  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };

  useEffect(() => {
    // const getMedList = async () => {
    //   const items = await axios({
    //     method: 'get',
    //     url: `${URI}/pp/medicines?page=3&size=8`,
    //   });
    //   setItemList(items.data.data);
    // };
    // getMedList();
    if (searchText === '') {
      axios
        .get(`${URI}/pp/medicines?page=${currentPage}&size=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('검색 성공');
      console.log(searchText);
      axios
        .get(
          `${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${currentPage}&size=${PER_PAGE}`,
        )
        .then(res => {
          // 검색한 아이템이 없으면, 빈 배열 출력
          if (!res.data) {
            setItemList([]);
            setTotalLength(0);
          }
          // 검색한 아이템이 있으면, 해당 아이템 출력
          else {
            setItemList(res.data.data);
            setTotalLength(res.data.pageInfo.totalElements);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [currentPage, searchText, searchSelected]);

  const itemOnClickHandler = medicineId => {
    navigate(`/item/${medicineId}`);
    // window.location.reload();
  };

  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search />
        <ContentList>
          {itemList.map((item, idx) => (
            <ContentBox
              key={idx}
              onClick={() => itemOnClickHandler(item.medicineId)}
            >
              <img
                src={item.medicineImg}
                alt={item.medicineName}
                onError={handleImageError}
              />
              <ContentTit>{item.medicineName}</ContentTit>
              <ContentText>{item.medicineUse}</ContentText>
              <LikeCount>
                <FaRegThumbsUp /> <p>234</p>
              </LikeCount>
            </ContentBox>
          ))}
        </ContentList>
        {/* Pagination */}
        <div className="flex justify-center pt-5 ">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlerPageClick}
            // 밑 props는 style을 위한 className 지정 해주는 역할
            containerClassName="flex space-x-2 p-2 m-4 text-center"
            // containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </>
  );
};

export default List;
