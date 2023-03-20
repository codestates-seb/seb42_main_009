import React,{ useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Tab } from '../styles/globalStyle';
import Profile from '../components/Profile';
import Banner from '../components/Banner';
import MyPills from '../components/MyPills';
import MyPharmModal from '../components/MyPharmModal';
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
  PillAddBtn
} from '../styles/s-mypage';
import { ReviewList,ReviewItem,ReviewContent,UserImage,UserInputs } from '../styles/s-item';


const MyPage = () => {
  const [ curTab, setCurTab ] = useState(0);
  const [ toggleOn, setToggleOn ] = useState(false);
  const { modalOpen, setModalOpen } = useIsModalOpen(state => state);

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

  const tabArr = ['나의 의약품', '나의 리뷰'];
  const tabHandler = idx => {
    setCurTab(idx);
  };
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
  };
  const [rvList, setRvList]=useState([
    {
      reviewImg:'',
      reviewText:`nforce onClick is accompanied by at least one of the following:
      onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is
      important for users with physical disabilities who cannot use a
      mouse, AT compatibility, and screenreader users. This does not
      apply for interactive or hidden elements. Enforce onClick is
      accompanied by at least one of the following: onKeyUp,`,
      reviewTag:'',
      reviewStretch:false
    },
    {
      reviewImg:'',
      reviewText:'22222222',
      reviewTag:'',
      reviewStretch:false
    }
  ])
  const moreReview = id => {
    setRvList(reviewList =>
      reviewList.map((item, idx) =>
        idx === id ? { ...item, reviewStretch: !item.reviewStretch } : item,
      ),
    );
  };

  return (
    <>
      <Banner>
        <div>마이페이지</div>
      </Banner>
      <div className="bodywrap">
        <MypageWrap>
          <Profile/>
          <MypageContent>
            <Tab>
              {tabArr.map((item, idx) => (
                <li
                  onClick={() => tabHandler(idx)}
                  onKeyUp = {item.tabHandler}
                  onKeyDown = {item.tabHandler}
                  key={idx}
                  className={idx === curTab ? 'active tabmenu' : 'tabmenu'}
                  role='tab'
                >
                  {item}
                </li>
              ))}
            </Tab>
            { curTab===0 
              ? 
              <MypageTabContent>
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

                <PillAddBtn onClick={modalHandler}>약 추가하기</PillAddBtn>
                {
                  modalOpen 
                  ? <MyPharmModal setModalOpen={setModalOpen} />
                  : null
                }
                <MyPillList>
                  <MyPills/>
                  <MyPills/>
                  <MyPills/>
                  <MyPills/>
                  <MyPills/>
                  <MyPills/>
                  {/* {myPillCount.map((item,idx)=>(
                    <MyPills key={idx} objectKey={idx} />
                  ))} */}
                </MyPillList>
              </MypageTabContent>
              :
              <MypageTabContent>
                <ReviewList>
                  {
                    rvList.map((item,idx)=>(
                        <ReviewItem className={item.reviewStretch ? 'review-open review' : 'review'}>
                          <div className="btn-more" onClick={() => moreReview(idx)} role='presentation' >
                            {item.reviewStretch ? '닫기' : '더보기'}
                          </div>
                          <ReviewContent>
                            <UserImage>
                              <img src="https://picsum.photos/300/200" alt="user" />
                            </UserImage>
                            <UserInputs>
                              <span className="username">약먹기시러</span>
                              <span className="writedate">2023-09-13</span>
      
                              <div className='textarea'>
                                {
                                  item.reviewImg ? <img src={item.reviewImg.preview_URL} alt='dd' /> : null
                                }
                                
                                {item.reviewText}
                              </div>
                            </UserInputs>
                          </ReviewContent>
                        </ReviewItem>
                      )
                      )
                    }
                    </ReviewList>


              </MypageTabContent>
            }

          </MypageContent>
        </MypageWrap>
      </div>
    </>
  );
};

export default MyPage;
