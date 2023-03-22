import React,{useEffect} from 'react'
import AOS from "aos";
import Slide from '../components/Slide';
import "aos/dist/aos.css";
import { 
  HomeWrap,HomeSection,SectSearch,SectTitle,

} from '../styles/s-home';

const Home = () => {
  useEffect(() => {
    AOS.init();
  })

  return (
    <HomeWrap>
      <Slide/>
      <HomeSection>
        <SectTitle data-aos="fade-down" data-aos-duration="2000">복용 중인 약 정보</SectTitle>
        <SectSearch>
          <div>약정보에 대한 설명</div>
          <div>카드로 약정보 요약보여주기+바로가기버튼</div>
        </SectSearch>

      </HomeSection>
    </HomeWrap>
  )
}

export default Home