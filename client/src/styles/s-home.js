import styled from 'styled-components';

export const HomeWrap = styled.main`
  margin-top: 80px;
  .none-pc {display: none;}
  @media (max-width: 768px) {
    margin-top: 50px;
    overflow-x: hidden;
    .none-pc {display: block;}
  }
`;
export const HomeSectionLine = styled.div`
  position: absolute; z-index: -1;
  left: -20%; top: 0; width: 70%; height: 800px;
  background: ${props=>props.background||'var(--mainbl)'};
  transform: ${props=>props.skew||'skewX(-70deg);'};
  @media (max-width: 768px){
    width: 100%; height: 300px; left: 0;
  }
`;
export const HomeSectionBubble1 = styled.span`
  position: absolute; display: block; left: 20%; top: 0; width: 300px; height: 300px; border-radius: 50%;
  background: var(--palebl); z-index: -1;
  @media (max-width: 768px){
    width: 200px; height: 200px;
  }
`;
export const HomeSectionBubble2 = styled(HomeSectionBubble1)`
  left: 37%; top: 10%; width: 450px; height: 450px; background: var(--nightbl); z-index: -1;
  @media (max-width: 768px){
    width: 350px; height: 350px; left: -30%;
  }
`;
export const Highlight = styled.em`
  font-style: normal;
  font-weight: 600;
  color: var(--mainbl);
`;
export const HomeSection = styled.div`
  position: relative;
  max-width: 1230px;
  width: 100%;
  padding: 120px 15px;
  margin: 0 auto;
  @media (max-width: 768px){
    padding: 50px 15px;
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
  &.right {text-align: right;}
  &.right:after {
    right: 0;
    left: initial;
  }
  @media (max-width: 768px){
    font-size: 24px; padding: 20px 0 0;
    &:after {width: 60px;}
  }
`;
export const FlexWrap = styled.div`
  display: flex;
  justify-content: ${props=>props.flexjc||'space-between'};
  align-items: ${props=>props.flexai||'flex-start'};
  @media (max-width: 768px){
    display: block;
  }
`;
export const FlexBox = styled.div`
  width: ${props=>props.width||'50%'};
  order: ${props=>props.order};
  @media (max-width: 768px){
    width: 100%;
    margin-bottom: 20px;
  }
`;
export const TextContainer = styled.div`
  padding: 30px 15px;
  border-radius: 12px;
  font-size: var(--fz-md); line-height: 1.3; font-weight: 600;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: var(--palebl);
  text-align: ${props=>props.textAlign};
  h4 {font-size: var(--fz-lg); line-height: 2; font-weight: 600; color: var(--mainbl); margin-bottom: 30px;}
  p {line-height: 2;}
  @media (max-width: 768px){
    h4 {font-size: 18px;}
  }
`;
export const ScreenContainer = styled.div`
  padding: 10px; border-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;