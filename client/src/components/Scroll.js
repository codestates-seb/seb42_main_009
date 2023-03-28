/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';
import {
  ContentList,
  ContentBox,
  ContentTit,
  ContentText,
  LikeCount,
} from '../styles/s-list';

const Scroll = ({
  URI,
  page,
  setPage,
  searchText,
  searchSelected,
  searchApi,
  totalPageCount,
  setTotalPageCount,
  windowSize,
  handleImageError,
  itemOnClickHandler,
  setScrollPage,
}) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageEnd = useRef();
  const loadMore = () => {
    setScrollPage(page + 1); // FIX: if 문 불필요해서 삭제
  };
  const fetchPins = async page => {
    if (searchText === '') {
      await axios
        .get(`${URI}/pp/medicines?page=${page}&size=6`)
        .then(res => {
          setTotalPageCount(res.data.pageInfo.totalPages);
          if (page === 1) {
            setPins(prev => [...res.data.data]);
          } else {
            setPins(prev => [...prev, ...res.data.data]);
          }
          setLoading(!(page === res.data.pageInfo.totalPages)); // FIX: setLoading 추가
        })
        .catch(err => console.log(err));
    } else {
      await axios
        .get(
          `${URI}/pp/medicines/${searchSelected}?${searchApi}=${searchText}&page=${page}&size=6`,
        )
        .then(res => {
          if (!res.data) {
            setPins([]);
          } else {
            setTotalPageCount(res.data.pageInfo.totalPages);
            if (page === 1) {
              setPins(prev => [...res.data.data]);
            } else {
              setPins(prev => [...prev, ...res.data.data]);
            }

            setLoading(!(page === res.data.pageInfo.totalPages));
          }
        })
        .catch(err => console.log(err));
    }
    // setLoading(true);
  };
  useEffect(() => {
    fetchPins(page);
  }, [page, searchText, searchSelected]);
  useEffect(() => {
    if (windowSize <= 768) {
      let observer;
      if (loading) {
        observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              loadMore();
            }
          },
          {
            threshold: 0.4,
          },
        );
        observer.observe(pageEnd.current);
      }
      return () => observer && observer.disconnect();
    }
  }, [loading]);

  return (
    <ContentList>
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
      {loading ? (
        <div ref={pageEnd} className="page-end">
          <span>{}</span>
          <span>{}</span>
          <span>{}</span>
        </div>
      ) : null}
    </ContentList>
  );
};

export default Scroll;
