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
import {
  useListCurrentPageStore,
  useListPageStore,
} from '../Stores/listPageStore';
import Banner from '../components/Banner';
import Search from '../components/Search';
import Scroll from '../components/Scroll.js';

const List = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  const { searchText, setSearchText } = useSearchTextStore(state => state);
  const { searchSelected } = useSearchSelectedStore(state => state);
  const { searchIsUpdate, setSearchIsUpdate } = useSearchIsUpdateStore(
    state => state,
  );
  const { searchApi } = useSearchApiStore(state => state);
  const [itemList, setItemList] = useState([]);
  const { listPage, setListPage, setScrollPage } = useListPageStore(
    state => state,
  );
  const { listCurrentPage, setListCurrentPage } = useListCurrentPageStore(
    state => state,
  );
  const [totalLength, setTotalLength] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  const PER_PAGE = 16;
  const pageCount = Math.ceil(totalLength / PER_PAGE);
  const handlerPageClick = event => {
    setListCurrentPage(event.selected + 1);
    setSearchIsUpdate(true);
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };
  useEffect(() => {
    // FIX: async 삭제
    if (searchText === '') {
      axios // FIX: await 삭제
        .get(`${URI}/pp/medicines?page=${listCurrentPage}&size=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages); // FIX: setLoading 삭제
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (searchIsUpdate === true) {
        axios // FIX: await 삭제
          .get(
            `${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${listCurrentPage}&size=${PER_PAGE}`,
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

            setSearchIsUpdate(false);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    // 윈도우 사이즈 재기
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [listCurrentPage, searchText, searchApi, searchSelected]);

  const itemOnClickHandler = medicineId => {
    navigate(`/item/${medicineId}`);
  };

  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search />

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
            page={listPage}
            setPage={setListPage}
            setScrollPage={setScrollPage}
            searchText={searchText}
            searchSelected={searchSelected}
            searchApi={searchApi}
            totalPageCount={totalPageCount}
            setTotalPageCount={setTotalPageCount}
            windowSize={windowSize}
            handleImageError={handleImageError}
            itemOnClickHandler={itemOnClickHandler}
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
            forcePage={listCurrentPage - 1}
          />
        </Pagination>
      </div>
    </>
  );
};

export default List;
