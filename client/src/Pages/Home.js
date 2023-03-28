import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { BsGithub } from 'react-icons/bs';
import Slide from '../components/Slide';
import 'aos/dist/aos.css';
import {
  HomeWrap,
  HomeSectionLine,
  HomeSectionBubble1,
  HomeSectionBubble2,
  Highlight,
  HomeSection,
  SectionTit,
  FlexWrap,
  FlexBox,
  TextContainer,
  ScreenContainer,
  MainLinkBtn,
  SectionReview,
  HomeReview,
  ReviewRow,
  ReviewCard,
  ReviewCardBox,
  Footer,
} from '../styles/s-home';
import { Flexbox } from '../styles/s-header';

const Home = () => {
  const URI = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [reviewArr, setReviewArr] = useState([]);

  useEffect(() => {
    AOS.init({ disable: 'mobile' });
    axios
      .get(`${URI}/pp/reviews/random`)
      .then(res => {
        setReviewArr(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const clickToScroll = e => {
    const anchor = e.target.getAttribute('aria-label');
    const targetSection = document.getElementById(anchor);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HomeWrap>
        <Slide clickToScroll={clickToScroll} />
        <HomeSection id="section1">
          <HomeSectionLine />
          <SectionTit data-aos="fade-down" data-aos-duration="2000" data-aos-once="true" >
            복용 중인 약 정보
          </SectionTit>
          <FlexWrap flexai="center">
            <FlexBox
              order="2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="200"
              data-aos-once="true"
            >
              <ScreenContainer>
                <img src="/assets/home1.png" alt="이미지" />
              </ScreenContainer>
            </FlexBox>
            <FlexBox
              order="1"
              width="45%"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              <TextContainer>
                <h4>제품명과 성분명으로 의약품을 검색해보세요.</h4>
                <p>용법과 주의사항, 보관법까지 한 번에 알려드려요.</p>
                <p>
                  의약품을 사용해본 <Highlight>PharmPalm</Highlight> 이용자의
                  리뷰도 확인할 수 있어요.
                </p>
                <p>
                  효과가 좋았던 의약품이라면 <Highlight>좋아요</Highlight>를
                  눌러보세요!
                </p>
                <MainLinkBtn onClick={() => navigate('/list')}>
                  바로가기
                </MainLinkBtn>
              </TextContainer>
            </FlexBox>
          </FlexWrap>
        </HomeSection>
        <HomeSection id="section2">
          <HomeSectionBubble1 />
          <HomeSectionBubble2 />
          <SectionTit
            className="right"
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            복용 스케줄 관리
          </SectionTit>
          <FlexWrap flexai="center">
            <FlexBox
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <ScreenContainer>
                <img src="/assets/home2.png" alt="이미지" />
              </ScreenContainer>
            </FlexBox>
            <FlexBox
              width="45%"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              <TextContainer textAlign="right">
                <h4>복용 의약품을 등록하고, 알림을 받아보세요.</h4>
                <p>정기적으로 복용하는 의약품을 등록해보세요.</p>
                <p>
                  설정해둔 시각에 맞춰 <Highlight>복용 알림</Highlight>을
                  보내드립니다.
                </p>
                <p>
                  <Highlight>나만의 시간표</Highlight>로 복용 스케줄을 확인할 수
                  있어요!
                </p>
                <MainLinkBtn
                  onClick={() => navigate('/mypharm')}
                  marginLeft="auto"
                >
                  바로가기
                </MainLinkBtn>
              </TextContainer>
            </FlexBox>
          </FlexWrap>
        </HomeSection>
        <HomeSection id="section3">
          <SectionTit
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            의약품 데이터별 차트
          </SectionTit>
          <FlexWrap flexai="center">
            <FlexBox
              order="2"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              <ScreenContainer>
                <img src="/assets/home3.png" alt="이미지" />
              </ScreenContainer>
            </FlexBox>
            <FlexBox
              order="1"
              width="45%"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <TextContainer>
                <h4>유저들이 많이 찾는 의약품을 한 눈에</h4>
                <p>
                  성별, 연령별에 따라 분석된 <Highlight>의약품 통계</Highlight>
                  를 차트로 확인해보세요.
                </p>
                <p>
                  <Highlight>PharmPalm</Highlight> 유저들이 선정한 효과 좋은
                  의약품 순위를 확인해보세요.
                </p>
                <p>
                  실사용자가 작성한 <Highlight>신뢰도 높은 리뷰</Highlight>를
                  참고하세요!
                </p>
                <MainLinkBtn onClick={() => navigate('/chart')}>
                  바로가기
                </MainLinkBtn>
              </TextContainer>
            </FlexBox>
          </FlexWrap>
        </HomeSection>
      </HomeWrap>

      <SectionReview>
        <SectionTit
          className="center"
          data-aos="fade-down"
          data-aos-duration="2000"
          data-aos-once="true"
        >
          PharmPalm 리뷰
        </SectionTit>
        <HomeReview>
          <ReviewRow>
            {reviewArr.map((item, idx) => (
              <ReviewCard key={idx}>
                <ReviewCardBox>
                  <div className="imgbox">
                    <img
                      src={
                        item.memberImg
                          ? item.memberImg
                          : `https://picsum.photos/300/200`
                      }
                      alt={`${item.memberName} 리뷰`}
                    />
                  </div>
                  <div className="reviewbox">
                    <span>{item.memberName}</span>
                    <div className="review-txt">{item.reviewContent}</div>
                  </div>
                </ReviewCardBox>
              </ReviewCard>
            ))}
          </ReviewRow>
        </HomeReview>
      </SectionReview>

      <Footer>
        <FlexWrap>
          <Flexbox className="footer-nav">
            <img className="none-mo" src="/logo2.png" alt="logo" />
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/list">의약품 조회</Link>
              </li>
              <li>
                <Link to="/mypharm">내 약 관리</Link>
              </li>
              <li>
                <Link to="/chart">차트데이터</Link>
              </li>
            </ul>
          </Flexbox>
          <img className="none-pc" src="/logo2.png" alt="logo" />
          <Flexbox className="footer-link">
            <p>
              <Link
                to="https://github.com/codestates-seb/seb42_main_009"
                target="_blank"
              >
                <BsGithub /> <span>pharmpalm github</span>
              </Link>
            </p>
            <ul>
              <li>
                <Link to="https://github.com/hunjeong93" target="_blank">
                  곽훈정
                </Link>
              </li>
              <li>
                <Link to="https://github.com/yeojin15" target="_blank">
                  김여진
                </Link>
              </li>
              <li>
                <Link to="https://github.com/jin-yeong-kim" target="_blank">
                  김진영
                </Link>
              </li>
              <li>
                <Link to="https://github.com/RaYul18" target="_blank">
                  심라율
                </Link>
              </li>
              <li>
                <Link to="https://github.com/leechiyun" target="_blank">
                  이치윤
                </Link>
              </li>
            </ul>
          </Flexbox>
        </FlexWrap>
        <p className="copy">Copyright 2023. pharmpalm all rights reserved.</p>
      </Footer>
    </>
  );
};

export default Home;
