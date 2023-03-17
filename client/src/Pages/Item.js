import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import styled, { keyframes } from 'styled-components';
import Search from '../components/Search';
import Banner from '../components/Banner';
import ItemInfo from '../components/ItemInfo';
import ItemReview from '../components/ItemReview';
import { useMedicineItemStore } from '../Stores/medicineItemStore';

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  @media (max-width: 768px) {
    display: block;
    margin-top: 30px;
  }
`;
const ItemBox = styled.div`
  width: 30%;
  flex: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const likeClicked = keyframes`
  0% {opacity: 1; transform: translateY(0);}
  100% {opacity: 0; transform: translateY(-20px); }
`;
const ItemTitle = styled.div`
  height: 60px;
  border-bottom: 2px solid var(--mainbl);
  margin-bottom: 15px;
  > h3 {
    font-size: var(--fz-md);
    color: var(--mainbl);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const LikeWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 10px;
  > button {
    font-size: 20px;
    color: var(--mainbl);
    position: relative;
    > span {
      position: absolute;
      left: 0;
      top: -10px;
      font-size: 24px;
      opacity: 0;
    }
    &.liked span {
      animation: ${likeClicked} 1s forwards;
    }
  }
  > p {
    padding: 3px 0 0 5px;
    color: var(--mainbl);
  }
`;
const ItemOverview = styled.div`
  img {
    width: 90%;
    height: auto;
    object-fit: cover;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  ul {
    > li {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 15px;
      font-size: var(--fz-md);
      line-height: 24px;
      > span {
        position: relative;
        padding: 0 15px 0 10px;
        flex: none;
        white-space: nowrap;
        color: var(--mainbl);
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          background: var(--mainbl);
          width: 3px;
          height: 20px;
        }
      }
      @media (max-width: 768px) {
        font-size: var(--fz-base);
        line-height: 20px;
      }
    }
  }
`;
const ItemDetail = styled.div`
  width: 70%;
  padding-left: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`;
const Tab = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid var(--mainbl);
  > li {
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    background-color: var(--bl-1);
    color: var(--bl-2);
    cursor: pointer;
    &:nth-of-type(1) {
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #fff;
    }
    &:nth-of-type(2) {
      border-radius: 0 6px 6px 0;
    }
    &.active {
      background-color: var(--mainbl);
      color: #fff;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
  }
`;

const Item = () => {
  const [curTab, setCurTab] = useState(0);
  const [like, setLike] = useState(false);
  const { medicineItem, setMedicineItem, setLikeIncrease, setLikeDecrease } =
    useMedicineItemStore(state => state);

  const location = useLocation();
  const medicineId = location.pathname.split('/')[2];

  const tabArr = ['상세정보', '사용자리뷰'];
  const tabHandler = idx => {
    setCurTab(idx);
  };
  const likeHandler = () => {
    setLike(!like);
    if (like) {
      setLikeDecrease();
    } else {
      setLikeIncrease();
    }
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/medicines/${medicineId}`)
      .then(res => {
        console.log(res.data);
        setMedicineItem(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(medicineItem);

  return (
    <>
      <Banner>
        <div>aasfadsf</div>
      </Banner>
      <div className="bodywrap">
        <Search />
        <ItemWrap>
          <ItemBox>
            <ItemTitle>
              <LikeWrap>
                <button
                  onClick={likeHandler}
                  className={like ? 'like-btn liked' : 'like-btn'}
                >
                  {like ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  <span>
                    <BsFillBalloonHeartFill />
                  </span>
                </button>
                <p>{medicineItem.medicineLike}</p>
              </LikeWrap>
              <h3>{medicineItem.medicineName}</h3>
            </ItemTitle>
            <ItemOverview>
              <img
                src={medicineItem.medicineImg}
                alt={medicineItem.medicineName}
                onError={handleImageError}
              />
              <ul>
                <li>
                  <span>의약품명</span>
                  <div>{medicineItem.medicineName}</div>
                </li>
                <li>
                  <span>복용방법</span>
                  <div>{medicineItem.medicineUse}</div>
                </li>
              </ul>
            </ItemOverview>
          </ItemBox>

          <ItemDetail>
            <Tab>
              {tabArr.map((item, idx) => (
                <li
                  onClick={() => tabHandler(idx)}
                  onKeyUp={item.tabHandler}
                  onKeyDown={item.tabHandler}
                  key={idx}
                  className={idx === curTab ? 'active tabmenu' : 'tabmenu'}
                  role="tab"
                >
                  {item}
                </li>
              ))}
            </Tab>
            {curTab === 0 ? <ItemInfo /> : <ItemReview />}
          </ItemDetail>
        </ItemWrap>
      </div>
    </>
  );
};

export default Item;
