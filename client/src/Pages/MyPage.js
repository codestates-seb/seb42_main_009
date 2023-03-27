import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FaInfoCircle } from 'react-icons/fa';
import { Tab } from '../styles/globalStyle';
import Profile from '../components/Profile';
import Banner from '../components/Banner';
import MyPills from '../components/MyPills';
import MyPharmModal from '../components/MyPharmModal';
import { Pagination } from '../styles/s-list';
import { useIsModalOpen } from '../Stores/pharmModalStore';
import {
  FieldTooltip,
  ToggleWrap,
  ToggleBox,
  MypageWrap,
  MypageContent,
  MypageTabContent,
  MypageAlarm,
  MyPillList,
  PillAddBtn,
  Flexbox
} from '../styles/s-mypage';
import {
  ReviewList,
  ReviewItem,
  ReviewContent,
  UserImage,
  UserInputs,
} from '../styles/s-item';
import { useMyPharmUpdateStore } from '../Stores/myPharmStore';
import defaultProfileImg from '../images/default_profileImg.png';

const MyPage = () => {
  const [curTab, setCurTab] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const { modalOpen, setModalOpen } = useIsModalOpen(state => state);

  // myPharm 변경 확인
  const { myPharmUpdate, setMyPharmUpdate } = useMyPharmUpdateStore(
    state => state,
  );

  // memberId 추출
  const location = useLocation();
  const memberId = location.pathname.split('/')[2];

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };
  // const [ myPillCount, setMyPillCount ] = useState([0]);

  // const addMyPillBtn=()=>{
  //   const myPillCountArr = [...myPillCount];
  //   let counter = myPillCountArr.slice(-1)[0];
  //   counter += 1;
  //   myPillCountArr.push(counter);
  //   setMyPillCount(myPillCountArr)
  // }

  // Pagination
  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);

  const PER_PAGE = 5;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };

  const [myPharmList, setMyPharmList] = useState([]);
  const [myReviewList, setMyReviewList] = useState([]);
  const tabArr = ['나의 의약품', '나의 리뷰'];
  const tabHandler = idx => {
    setCurTab(idx);
  };
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
  };
  // const [rvList, setRvList] = useState([
  //   {
  //     reviewImg: '',
  //     reviewText: `nforce onClick is accompanied by at least one of the following:
  //     onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is
  //     important for users with physical disabilities who cannot use a
  //     mouse, AT compatibility, and screenreader users. This does not
  //     apply for interactive or hidden elements. Enforce onClick is
  //     accompanied by at least one of the following: onKeyUp,`,
  //     reviewTag: '',
  //     reviewStretch: false,
  //   },
  //   {
  //     reviewImg: '',
  //     reviewText: '22222222',
  //     reviewTag: '',
  //     reviewStretch: false,
  //   },
  // ]);
  const moreReview = id => {
    setMyReviewList(reviewList =>
      reviewList.map((item, idx) =>
        idx === id ? { ...item, reviewStretch: !item.reviewStretch } : item,
      ),
    );
  };

  useEffect(() => {
    // 나의 의약품 정보 받아오기
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/doses/info/${memberId}`)
      .then(res => {
        console.log(res);
        setMyPharmList(res.data);
        setMyPharmUpdate(false);
      })
      .catch(err => {
        console.log(err);
      });

    // 나의 리뷰 데이터 받아오기
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/pp/reviews/members/${memberId}?page=${currentPage}&size=${PER_PAGE}`,
      )
      .then(res => {
        console.log(res);
        setMyReviewList(res.data.data);
        setTotalLength(res.data.pageInfo.totalElements);
      })
      .catch(err => {
        console.log(err);
      });
  }, [myPharmUpdate, currentPage]);

  return (
    <>
      <Banner>
        <div>마이페이지</div>
      </Banner>
      <div className="bodywrap">
        <MypageWrap>
          <Profile />
          <MypageContent>
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
            {curTab === 0 ? (
              <MypageTabContent>
                <Flexbox>
                  <PillAddBtn onClick={modalHandler}>약 추가하기</PillAddBtn>
                  <MypageAlarm>
                    <ToggleWrap>
                      <ToggleBox onClick={toggleHandler}>
                        <div
                          className={`toggle-wrap ${
                            toggleOn ? 'toggle-checked' : ''
                          }`}
                        >
                          {}
                        </div>
                        <div
                          className={`toggle-circle ${
                            toggleOn ? 'toggle-checked' : ''
                          }`}
                        >
                          {}
                        </div>
                      </ToggleBox>
                      <p className={toggleOn ? 'toggle-checked' : null}>
                        {toggleOn ? '알림 받기' : '알림 해제'}
                      </p>
                    </ToggleWrap>
                    <FieldTooltip>
                      <FaInfoCircle />
                      <p>복용 시간 알림을 받으려면 알림 받기로 설정하세요.</p>
                    </FieldTooltip>
                  </MypageAlarm>
                </Flexbox>
                {modalOpen ? (
                  <MyPharmModal setModalOpen={setModalOpen} />
                ) : null}

                <MyPillList>
                  {myPharmList.map((item, idx) => (
                    <MyPills
                      key={idx}
                      medicineName={item.medicineName}
                      doseId={item.doseId}
                    />
                  ))}
                </MyPillList>
              </MypageTabContent>
            ) : (
              <MypageTabContent>
                <ReviewList>
                  {myReviewList.map((item, idx) => (
                    <ReviewItem
                      key={idx}
                      className={
                        item.reviewStretch ? 'review-open review' : 'review'
                      }
                    >
                      <div
                        className="btn-more"
                        onClick={() => moreReview(idx)}
                        role="presentation"
                      >
                        {item.reviewStretch ? '닫기' : '더보기'}
                      </div>
                      <ReviewContent>
                        <UserImage>
                          <img
                            src={
                              !item.memberImg
                                ? defaultProfileImg
                                : item.memberImg
                            }
                            alt="user"
                          />
                        </UserImage>
                        <UserInputs>
                          <span className="username">{item.memberName}</span>
                          <span className="writedate">
                            {item.lastModifiedAt}
                          </span>

                          <div className="textarea">
                            {item.reviewImg ? (
                              <img src={item.reviewImg[0]} alt="dd" />
                            ) : null}

                            {item.reviewContent}
                          </div>
                        </UserInputs>
                      </ReviewContent>
                    </ReviewItem>
                  ))}
                </ReviewList>
                {/* Pagination */}
                <Pagination className='always'>
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
              </MypageTabContent>
            )}
          </MypageContent>
        </MypageWrap>
      </div>
    </>
  );
};

export default MyPage;
