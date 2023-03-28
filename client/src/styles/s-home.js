import styled, { keyframes } from 'styled-components';

export const HomeWrap = styled.main`
  margin-top: 80px;
  .none-pc {
    display: none;
  }
  @media (max-width: 768px) {
    margin-top: 50px;
    overflow-x: hidden;
    .none-pc {
      display: block;
    }
  }
`;
export const HomeSectionLine = styled.div`
  position: absolute;
  z-index: -1;
  left: -20%;
  top: 0;
  width: 70%;
  height: 800px;
  background: ${props => props.background || 'var(--mainbl)'};
  transform: ${props => props.skew || 'skewX(-70deg);'};
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    left: 0;
  }
`;
export const HomeSectionBubble1 = styled.span`
  position: absolute;
  display: block;
  left: 20%;
  top: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: var(--palebl);
  z-index: -1;
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;
export const HomeSectionBubble2 = styled(HomeSectionBubble1)`
  left: 37%;
  top: 10%;
  width: 450px;
  height: 450px;
  background: var(--nightbl);
  z-index: -1;
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
    left: -30%;
  }
`;
export const Highlight = styled.em`
  font-style: normal;
  font-weight: 600;
  color: var(--mainbl);
`;
export const HomeSection = styled.section`
  position: relative;
  max-width: 1230px;
  width: 100%;
  padding: 0 15px;
  margin: 120px auto;
  @media (max-width: 768px) {
    padding: 50px 15px;
    max-width: 100%;
    overflow: hidden;
    margin: 0 auto;
  }
`;
export const SectionTit = styled.h2`
  position: relative;
  font-size: 30px;
  font-weight: 600;
  padding: 30px 0;
  margin-bottom: 50px;
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    left: 0;
    top: 0;
    height: 6px;
    background: var(--mainbl);
  }
  &.right {
    text-align: right;
  }
  &.right:after {
    right: 0;
    left: initial;
  }
  &.center {
    text-align: center;
  }
  &.center:after {
    left: 50%;
    right: initial;
    transform: translateX(-50%);
  }
  @media (max-width: 768px) {
    font-size: 24px;
    padding: 20px 0 0;
    &:after {
      width: 60px;
    }
    &.center {
      text-align: right;
    }
    &.center:after {
      left: initial;
      right: 0;
      transform: none;
    }
  }
`;
export const FlexWrap = styled.div`
  display: flex;
  justify-content: ${props => props.flexjc || 'space-between'};
  align-items: ${props => props.flexai || 'flex-start'};
  @media (max-width: 768px) {
    display: block;
  }
`;
export const FlexBox = styled.div`
  width: ${props => props.width || '50%'};
  order: ${props => props.order};
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
export const TextContainer = styled.div`
  padding: 30px 15px;
  border-radius: 12px;
  font-size: var(--fz-md);
  line-height: 1.3;
  font-weight: 600;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: var(--palebl);
  text-align: ${props => props.textAlign};
  h4 {
    font-size: var(--fz-lg);
    line-height: 2;
    font-weight: 600;
    color: var(--mainbl);
    margin-bottom: 30px;
  }
  p {
    line-height: 2;
  }
  @media (max-width: 768px) {
    h4 {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
`;
export const MainLinkBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 6px;
  background: var(--mainbl);
  color: #fff;
  display: block;
  margin-top: 20px;
  margin-left: ${props => props.marginLeft};
  &:hover {
    background: var(--darkbl);
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;
export const ScreenContainer = styled.div`
  padding: 10px;
  border-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
export const SectionReview = styled.section`
  padding: 120px 0;
  @media (max-width: 768px) {
    padding: 50px 15px;
  }
`;
export const HomeReview = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const textflowPc = keyframes`
  0% {transform: translateX(0);}
  100% {transform: translate(-20%);}
`;
export const textflowMo = keyframes`
  0% {transform: translateX(0);}
  100% {transform: translate(-90%);}
`;
export const ReviewRow = styled.ul`
  animation: ${textflowPc} 30s linear infinite;
  width: 200%;
  column-count: 8;
  column-gap: 30px;
  @media (max-width: 768px) {
    width: 450%;
    column-count: 5;
    animation: ${textflowMo} 40s linear infinite;
  }
`;
export const ReviewCard = styled.li`
  /* display: grid; */
  /* grid-template-rows: 1fr auto; */
  width: 100%;
  margin-bottom: 30px;
  break-inside: avoid;
  background: var(--palebl);
  border-radius: 12px;
  padding: 20px;
  &:nth-of-type(2n) {
    margin-left: 250px;
    margin-right: -250px;
  }
  @media (max-width: 768px) {
    &:nth-of-type(2n) {
      margin-left: 150px;
      margin-right: -150px;
    }
  }
`;
export const ReviewCardBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  > .imgbox {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > .reviewbox {
    width: calc(100% - 50px);
    padding-left: 15px;
    align-self: stretch;
    overflow: hidden;
    > span {
      display: block;
      width: 100%;
    }
    > .review-txt {
      width: 100%;
      font-size: var(--fz-base);
      line-height: 1.5;
      height: 40px;
      width: 100%;
      margin-top: 15px;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
`;
export const Footer = styled.footer`
  width: 100%;
  padding: 50px;
  background: var(--nightbl);
  .footer-nav {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    img {
      height: 60px;
      width: auto;
      object-fit: cover;
    }
    ul {
      padding: 10px 0 0 40px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      li {
        color: #fff;
        font-size: var(--fz-base);
        font-weight: 600;
        padding-right: 20px;
      }
    }
  }
  .footer-link {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    color: var(--palebl);
    p {
      margin-bottom: 20px;
      a {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          padding-left: 10px;
        }
      }
    }
    li {
      display: inline-block;
      padding-left: 15px;
    }
  }
  .copy {
    font-size: 11px;
    text-align: center;
    margin-top: 60px;
    color: var(--palebl);
    opacity: 0.8;
  }
  .none-pc {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 30px 15px;
    .footer-nav {
      display: block;
      img {
        margin: 0 auto;
      }
      ul {
        padding: 30px 0;
        justify-content: center;
        li {
          padding: 0 12px;
        }
      }
    }
    .footer-link {
      display: block;
      margin-top: 40px;
      text-align: center;
      p {
        margin-bottom: 10px;
        a {
          justify-content: center;
        }
      }
      li {
        padding-left: 0;
        padding-right: 15px;
      }
    }
    .copy {
      margin-top: 30px;
    }
    .none-pc {
      display: block;
      height: 60px;
      margin: 0 auto;
    }
    .none-mo {
      display: none;
    }
  }
`;
