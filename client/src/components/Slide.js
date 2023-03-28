/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperWrap = styled.section`
  width: 100%;
  height: 60vh;
  @media (max-width: 768px) {
    height: 80vh;
  }
`;
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  height: 100%;
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  background: var(--palebl);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    background: var(--nightbl);
  }
`;
const PrevButton = styled.button`
  position: absolute;
  z-index: 10;
  padding: 20px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 50px;
  color: var(--mainbl);
  @media (max-width: 768px) {
    padding: 0;
    font-size: 40px;
    color: #fff;
  }
`;
const NextButton = styled(PrevButton)`
  left: initial;
  right: 0;
`;
const SwiperContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SwiperContentBox = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
    width: 80%;
  }
`;
const SwiperImg = styled.div`
  position: relative;
  width: 50%;
  order: ${props => props.order};
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SwiperTxt = styled.div`
  width: 50%;
  position: relative;
  z-index: 10;
  order: ${props => props.order};
  &.right {
    text-align: right;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    color: #fff;
    &.right {
      text-align: left;
    }
  }
`;
const SwiperTxtTit = styled.h2`
  position: relative;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 30px;
  line-height: 1.4;
  padding-top: 30px;
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 6px;
    background: var(--mainbl);
    left: 0;
    top: 0;
  }
  ${SwiperTxt}.right &:after {
    left: initial;
    right: 0;
  }
  @media (max-width: 768px) {
    font-size: var(--fz-lg);
    padding-top: 15px;
    &:after {
      width: 60px;
      height: 4px;
      left: 0 !important;
      right: initial;
    }
  }
`;
const SwiperTxtBox = styled.div`
  p {
    font-size: var(--fz-md);
    line-height: 1.8;
  }
`;
const SwiperTxtBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 6px;
  background: var(--mainbl);
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: var(--darkbl);
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;

const Slide = ({ clickToScroll }) => {
  SwiperCore.use([Navigation]);
  SwiperCore.use([Autoplay]);
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperParams = {
    navigation: { prevEl: prevRef, nextEl: nextRef },
    onBeforeInit: swiper => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.activeIndex = mainImageIndex;
      swiper.navigation.update();
    },
    // autoplay : {delay: 3500, disableOnInteraction: false},
    loop: true,
    onSwiper: setSwiper,
    onSlideChange: e => setMainImageIndex(e.activeIndex),
  };

  return (
    <SwiperWrap className="slidewrapper">
      <StyledSwiper {...swiperParams} ref={setSwiper}>
        <StyledSwiperSlide>
          <SwiperContent>
            <SwiperContentBox>
              <SwiperImg order="2">
                <img src="/assets/slide1.png" alt="슬라이드 1" />
              </SwiperImg>
              <SwiperTxt order="1">
                <SwiperTxtTit>복용중인 약의 정보를 찾아보세요.</SwiperTxtTit>
                <SwiperTxtBox>
                  <p>제품명과 성분으로 복용 중인 약을 검색해보세요.</p>
                  <p>복용방법과 주의사항, 보관법까지 알려드려요.</p>
                </SwiperTxtBox>
                <SwiperTxtBtn aria-label="section1" onClick={clickToScroll}>
                  더 알아보기
                </SwiperTxtBtn>
              </SwiperTxt>
            </SwiperContentBox>
          </SwiperContent>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SwiperContent>
            <SwiperContentBox>
              <SwiperImg order="1">
                <img src="/assets/slide2.png" alt="슬라이드 2" />
              </SwiperImg>
              <SwiperTxt order="2" className="right">
                <SwiperTxtTit>
                  나의 의약품 복용 스케줄을 관리하고 <br />
                  알림을 받아보세요.
                </SwiperTxtTit>
                <SwiperTxtBox>
                  <p>내가 복용중인 의약품을 등록하면</p>
                  <p>복용 시간을 잊지 않도록 알림을 드려요.</p>
                </SwiperTxtBox>
                <SwiperTxtBtn aria-label="section2" onClick={clickToScroll}>
                  더 알아보기
                </SwiperTxtBtn>
              </SwiperTxt>
            </SwiperContentBox>
          </SwiperContent>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SwiperContent>
            <SwiperContentBox>
              <SwiperImg order="2">
                <img src="/assets/slide3.png" alt="슬라이드 3" />
              </SwiperImg>
              <SwiperTxt order="1">
                <SwiperTxtTit>
                  PharmPalm에서 인기 의약품을 <br />
                  한눈에 확인해보세요.{' '}
                </SwiperTxtTit>
                <SwiperTxtBox>
                  <p>pharmpalm 사용자가 많이 복용하는 의약품을</p>
                  <p>차트 데이터로 한눈에 확인할 수 있어요.</p>
                </SwiperTxtBox>
                <SwiperTxtBtn aria-label="section3" onClick={clickToScroll}>
                  더 알아보기
                </SwiperTxtBtn>
              </SwiperTxt>
            </SwiperContentBox>
          </SwiperContent>
        </StyledSwiperSlide>
        <PrevButton ref={prevRef}>
          <BsChevronLeft />
        </PrevButton>
        <NextButton ref={nextRef}>
          <BsChevronRight />
        </NextButton>
      </StyledSwiper>
    </SwiperWrap>
  );
};

export default Slide;
