/* eslint-disable */
import React,{ useState } from 'react';
import Profile from '../components/Profile';
import styled from 'styled-components';
import { Tab } from '../styles/globalStyle';
import Banner from '../components/Banner';
import { FaInfoCircle } from 'react-icons/fa';
import { 
  FieldTooltip,
  ToggleWrap,
  ToggleBox,
  MypageWrap,
  MypageContent,
  MypageTabContent,
  MypageAlarm
} from '../styles/s-mypage';
import MyPills from '../components/MyPills';
import MyPharmModal from '../components/MyPharmModal';

const MyPillList = styled.ul`
  display: flex; justify-content: flex-start; align-items: center;
  flex-wrap: wrap;
`;

const MyPage = () => {
  const [curTab, setCurTab] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const [ myPillCount, setMyPillCount ] = useState([0]);
  const [ modalCall, setModalCall ] = useState(false)

  const modalOpenBtn=()=>{
    setModalCall(true)
  }

  const addMyPillBtn=()=>{
    const myPillCountArr = [...myPillCount];
    let counter = myPillCountArr.slice(-1)[0];
    counter += 1;
    myPillCountArr.push(counter);
    setMyPillCount(myPillCountArr)
  }



  const tabArr = ['나의 의약품', '나의 리뷰'];
  const tabHandler = idx => {
    setCurTab(idx);
  };
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
  };



  return (
    <>
      <Banner>
        <div>mypage</div>
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
            </MypageTabContent>


            <button onClick={addMyPillBtn}>내 약 더하기</button>
            {
              modalCall 
              ? <MyPharmModal/>
              : null
            }



            <MyPillList>
              {myPillCount.map((item,idx)=>(
                <MyPills key={idx} objectKey={idx} />
              ))}
            </MyPillList>

          </MypageContent>
        </MypageWrap>
      </div>
    </>
  );
};

export default MyPage;
