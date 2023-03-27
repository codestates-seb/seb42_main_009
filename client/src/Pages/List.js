/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { json, useNavigate } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';
import {
  ContentList,
  ContentBox,
  ContentTit,
  ContentText,
  LikeCount,
  Pagination,
} from '../styles/s-list';
import {
  useSearchApiStore,
  useSearchIsUpdateStore,
  useSearchSelectedStore,
  useSearchTextStore,
} from '../Stores/listSearchStore';
import Banner from '../components/Banner';
import Search from '../components/Search';
import Scroll from '../components/Scroll.js';

const List = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  const { searchText, setSearchText } = useSearchTextStore(state => state);
  const { searchSelected } = useSearchSelectedStore(state => state);
  const { searchIsUpdate } = useSearchIsUpdateStore(state => state);
  const { searchApi } = useSearchApiStore(state => state);
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  const PER_PAGE = 16;
  const pageCount = Math.ceil(totalLength / PER_PAGE);
  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };
  useEffect(() => {
    console.log(searchText);
    console.log(searchIsUpdate);

    // FIX: async 삭제
    if (searchText === '') {
      axios // FIX: await 삭제
        .get(`${URI}/pp/medicines?page=${currentPage}&size=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages); // FIX: setLoading 삭제
          setSearchText('');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (searchIsUpdate) {
        console.log('검색 성공');

        axios // FIX: await 삭제
          .get(
            `${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${currentPage}&size=${PER_PAGE}`,
          )
          .then(res => {
            // 검색한 아이템이 없으면, 빈 배열 출력
            if (!res.data) {
              setItemList([]);
              setTotalLength(0);
              setTotalPageCount(0);
            }
            // 검색한 아이템이 있으면, 해당 아이템 출력
            else {
              console.log(res);
              setItemList(res.data.data);
              setTotalLength(res.data.pageInfo.totalElements);
              setTotalPageCount(res.data.pageInfo.totalPages); // FIX: setLoading 삭제
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    // if (!searchIsUpdate) searchInitialize();

    // 윈도우 사이즈 재기
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [currentPage, searchText, searchApi, searchSelected]);

  const itemOnClickHandler = medicineId => {
    navigate(`/item/${medicineId}`);
  };

  const submitPageHandler = () => {
    setCurrentPage(1);
    setPage(1);
  };

  console.log(itemList);

  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search submitPageHandler={submitPageHandler} />

        {windowSize > 768 ? (
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
                  <FaRegThumbsUp /> <p>{item.medicineLike}</p>
                </LikeCount>
              </ContentBox>
            ))}
          </ContentList>
        ) : (
          <Scroll
            URI={URI}
            page={page}
            setPage={setPage}
            searchText={searchText}
            searchSelected={searchSelected}
            searchApi={searchApi}
            totalPageCount={totalPageCount}
            setTotalPageCount={setTotalPageCount}
            windowSize={windowSize}
            handleImageError={handleImageError}
          />
        )}

        {/* Pagination */}
        <Pagination>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlerPageClick}
            // 밑 props는 style을 위한 className 지정 해주는 역할
            containerClassName=""
            // containerClassName="pagination"
            subContainerClassName=""
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        </Pagination>
      </div>
    </>
  );
};

export default List;
