import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import { Tab } from '../styles/globalStyle';
import {
  ItemWrap,
  ItemBox,
  ItemTitle,
  LikeWrap,
  ItemOverview,
  ItemDetail,
} from '../styles/s-item';
import { useMedicineItemStore } from '../Stores/medicineItemStore';
import Search from '../components/Search';
import Banner from '../components/Banner';
import ItemInfo from '../components/ItemInfo';
import ItemReview from '../components/ItemReview';
import { useUserInfoStore } from '../Stores/userInfoStore';

const Item = () => {
  const [curTab, setCurTab] = useState(0);
  const [like, setLike] = useState(false);
  const { userInfo } = useUserInfoStore(state => state);
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
    const postData = {
      memberId: userInfo.memberId,
      medicineId,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/pp/heart`, postData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const handleImageError = e => {
    e.target.src = '/pharmpalm.png';
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/medicines/${medicineId}`)
      .then(res => {
        setMedicineItem(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Banner>
        <div>의약품 정보</div>
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
                  <span>성분</span>
                  <div>{medicineItem.medicineIngredient}</div>
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
