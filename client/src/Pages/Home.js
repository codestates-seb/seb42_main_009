import React,{useEffect} from 'react'
import AOS from "aos";
import Slide from '../components/Slide';
import "aos/dist/aos.css";
import { 
  HomeWrap,HomeSectionLine,HomeSectionBubble1,HomeSectionBubble2,Highlight,HomeSection,SectionTit,FlexWrap,FlexBox,TextContainer,ScreenContainer
} from '../styles/s-home';

const Home = () => {
  useEffect(() => {
    AOS.init({disable: 'mobile'});
  },[])
  const clickToScroll=(e)=>{
    const anchor = e.target.getAttribute('aria-label')
    const targetSection = document.getElementById(anchor)
    if(targetSection){ 
      targetSection.scrollIntoView({behavior:'smooth'});
    }
  }

  return (
    <HomeWrap>
      <Slide clickToScroll={clickToScroll}/>
      <HomeSection id='section1'>
        <HomeSectionLine />
        <SectionTit data-aos="fade-down" data-aos-duration="2000">복용 중인 약 정보</SectionTit>
        <FlexWrap flexai='center'>
          <FlexBox order='2' data-aos="fade-down" data-aos-duration="2000" data-aos-delay="300" data-aos-once="true">
            <ScreenContainer>
              <img src='/assets/home1.png' alt='이미지' />
            </ScreenContainer>
          </FlexBox>
          <FlexBox order='1' width='45%' data-aos="fade-down" data-aos-duration="2000" data-aos-once="true">
            <TextContainer>
              <h4>제품명과 성분명으로 의약품을 검색해보세요.</h4>
              <p>용법과 주의사항, 보관법까지 한 번에 알려드려요.</p>
              <p>의약품을 사용해본 <Highlight>PharmPalm</Highlight> 이용자의 리뷰도 확인할 수 있어요.</p>
              <p>효과가 좋았던 의약품이라면 <Highlight>좋아요</Highlight>를 눌러보세요!</p>
            </TextContainer>
          </FlexBox>
        </FlexWrap>
      </HomeSection>
      <HomeSection id='section2'>
        <HomeSectionBubble1/>
        <HomeSectionBubble2/>
        <SectionTit className='right' data-aos="fade-down" data-aos-duration="2000" data-aos-once="true">복용 스케줄 관리</SectionTit>
        <FlexWrap>
          <FlexBox data-aos="fade-down" data-aos-duration="2000" data-aos-delay="300" data-aos-once="true">
            <ScreenContainer>
              <img src='/assets/home2.png' alt='이미지' />
            </ScreenContainer>
          </FlexBox>
          <FlexBox width='45%' data-aos="fade-down" data-aos-duration="2000" data-aos-once="true">
            <TextContainer textAlign='right'>
              <h4>복용 의약품을 등록하고, 알림을 받아보세요.</h4>
              <p>정기적으로 복용하는 의약품을 등록해보세요.</p>
              <p>설정해둔 시각에 맞춰 <Highlight>복용 알림</Highlight>을 보내드립니다.</p>
              <p><Highlight>나만의 시간표</Highlight>로 복용 스케줄을 확인할 수 있어요!</p> 
            </TextContainer>
          </FlexBox>
        </FlexWrap>
      </HomeSection>
      <HomeSection id='section3'>
      <SectionTit data-aos="fade-down" data-aos-duration="2000" data-aos-once="true">의약품 데이터별 차트</SectionTit>
        <FlexWrap>
          <FlexBox order='2' data-aos="fade-down" data-aos-duration="2000" data-aos-once="true">
            <ScreenContainer>
              <img src='/assets/home1.png' alt='이미지' />
            </ScreenContainer>
          </FlexBox>
          <FlexBox order='1' width='45%' data-aos="fade-down" data-aos-duration="2000" data-aos-delay="300" data-aos-once="true">
            <TextContainer>
              <h4>유저들이 많이 찾는 의약품을 한 눈에</h4>
              <p>성별, 연령별에 따라 분석된 <Highlight>의약품 통계</Highlight>를 차트로 확인해보세요.</p>
              <p><Highlight>PharmPalm</Highlight> 유저들이 선정한 효과 좋은 의약품 순위를 확인해보세요.</p>
              <p>실사용자가 작성한 <Highlight>신뢰도 높은 리뷰</Highlight>를 참고하세요!</p>
            </TextContainer>
          </FlexBox>
        </FlexWrap>
      </HomeSection>
    </HomeWrap>
  )
}

export default Home