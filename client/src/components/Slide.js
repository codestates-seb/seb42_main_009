/* eslint-disable */
import React, { useRef,useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore,{ EffectFade, Navigation } from "swiper";
import { BsChevronLeft,BsChevronRight } from "react-icons/bs";
import 'swiper/css';
import "swiper/css/navigation";

const SwiperWrap = styled.div`
  width: 100%; height: calc(100vh - 80px);
  @media (max-width: 768px){
    height: calc(100vh - 50px);
  }
`;
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%; height: 100%;
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;  background: var(--palebl);
  display: flex; justify-content: center; align-items: center;
`;
const PrevButton = styled.button`
  position: absolute; z-index: 10; padding: 20px;
  left: 0; top: 50%; transform: translateY(-50%); font-size: 50px; color: var(--mainbl);
`;
const NextButton = styled(PrevButton)`
  left: initial; right: 0;
`;
const Slide = () => {
  SwiperCore.use ([Navigation]);
  const [swiper, setSwiper] = useState (null);
  const [mainImageIndex, setMainImageIndex] = useState (0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperParams = {
    navigation: {prevEl: prevRef, nextEl: nextRef},
    onBeforeInit: (swiper)=>{
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.activeIndex=mainImageIndex;
      swiper.navigation.update()
    },
    onSwiper: setSwiper,
    onSlideChange: (e)=>setMainImageIndex(e.activeIndex),
  }

  return (
    <SwiperWrap className='slidewrapper'>
      <StyledSwiper {...swiperParams} ref={setSwiper} modules={[EffectFade]} effect="fade" >
        <StyledSwiperSlide>Slide 1</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
        <PrevButton ref={prevRef}><BsChevronLeft/></PrevButton>
        <NextButton ref={nextRef}><BsChevronRight/></NextButton>
      </StyledSwiper>
    </SwiperWrap>
  )
}

export default Slide