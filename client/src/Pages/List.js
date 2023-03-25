/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
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
  useSearchSelectedStore,
  useSearchTextStore,
} from '../Stores/listSearchStore';
import Banner from '../components/Banner';
import Search from '../components/Search';

const List = () => {
  const URI = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { searchText } = useSearchTextStore(state => state);
  const { searchSelected } = useSearchSelectedStore(state => state);
  const { searchApi } = useSearchApiStore(state => state);
  const [itemList, setItemList] = useState([]);
  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);

  const PER_PAGE = 16;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };

  useEffect(() => {
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


  // 무한스크롤
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageEnd = useRef()
  const loadMore=()=>{
    setPage(prev=>prev+1)
  }

  useEffect(()=>{
    const fetchPins = async page => {
      if(searchText===''){
        axios
        .get(`${URI}/pp/medicines?page=${page}&size=6`)
        .then(res=>{
          setPins(prev => [...prev, ...res.data.data]);
          console.log('성공')
        })
        .catch(err=>console.log(err))
      }else{
        axios
        .get(`${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${page}&size=6`)
        .then(res=>{
          setPage(0);
          console.log('검색어입력했을때성공했는지')
          if(!res.data){
            setPins([])
          }else{
            setPins(prev => [...prev, ...res.data.data]);
          }
        })
        .catch(err=>console.log(err))
      }
      setLoading(true);
    }
    fetchPins(page)
  },[page,searchText,searchSelected])
	useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);


  console.log(page)





  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search />
        <ContentList className='none-mo'>
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
        <ContentList className='none-pc'>

          {pins.map((item, idx) => (
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

          <div ref={pageEnd} style={{width:'100%', marginTop:'100px', height: '200px', background:'tomato'}} />
        </ContentList>
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
          />
        </Pagination>
      </div>
    </>
  );
};

export default List;
