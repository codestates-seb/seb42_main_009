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
  const [totalPageCount, setTotalPageCount] = useState(0);

  const PER_PAGE = 16;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };

  useEffect(() => async () => {
    if (searchText === '') {
      await axios
        .get(`${URI}/pp/medicines?page=${currentPage}&size=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setLoading(!(page === res.data.pageInfo.totalPages));
          console.log('dfasdfas >', res.data.pageInfo.totalPages)
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        console.log('검색 성공');
        console.log(searchText);
        await axios
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
            setItemList(res.data.data);
            setTotalLength(res.data.pageInfo.totalElements);
            setTotalPageCount(res.data.pageInfo.totalPages);
            setLoading(!(page === res.data.pageInfo.totalPages));
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
    console.log (totalPageCount)
    console.log (page)
    if (totalPageCount !== 0 && totalPageCount > page) {
      setPage(prev=>prev+1)
    }
  }
  const submitPageHandler=()=>{
    setCurrentPage(1)
    setPage(1)
  }
  useEffect(()=>{
    fetchPins(page)
  },[page,searchText,searchSelected])

  const fetchPins = async page => {
    if(searchText===''){
      console.log('aaaa >>> ', page)
      await axios
      .get(`${URI}/pp/medicines?page=${page}&size=6`)
      .then(res=>{
        setTotalPageCount(res.data.pageInfo.totalPages);
        if(page === 1) {
          setPins(prev => [...res.data.data]);
        } else {
          setPins(prev => [...prev, ...res.data.data]);
        }
        console.log('성공')
      })
      .catch(err=>console.log(err))
    }else{
      console.log('aaaa >>> ', page)
      console.log('aaaa >>> ', totalPageCount)
      await axios
      .get(`${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${page}&size=6`)
      .then(res=>{
        console.log('검색어입력했을때성공했는지')
        if(!res.data){
          setPins([])
        }else{
          console.log('fetchpin>>>', res.data.pageInfo.totalPages)
          setTotalPageCount(res.data.pageInfo.totalPages);
          if(page === 1) {
            setPins(prev => [...res.data.data]);
          } else {
            setPins(prev => [...prev, ...res.data.data]);
          }

          setLoading(!(page === res.data.pageInfo.totalPages));
        }
      })
      .catch(err=>console.log(err))
    }
    // setLoading(true);
  }

	useEffect(() => {
    let observer;
    if (loading) {
      observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      }, {
        threshold: 0.4,
      });
      observer.observe(pageEnd.current);
    }
    return () => observer && observer.disconnect();
  }, [loading]);


  console.log(page)





  return (
    <>
      <Banner>
        <div>의약품조회</div>
      </Banner>
      <div className="bodywrap">
        <Search submitPageHandler={submitPageHandler} />
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
            forcePage={currentPage-1}
          />
        </Pagination>
      </div>
    </>
  );
};

export default List;
