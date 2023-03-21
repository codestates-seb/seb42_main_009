import styled from 'styled-components';

export const HomeWrap = styled.section`
  margin-top: 80px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;
export const HomeSection = styled.div`
  max-width: 1230px;
  width: 100%;
  padding: 120px 15px;
  margin: 0 auto;
`;
export const SectTitle = styled.h2`
  position: relative;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding: 30px 0;
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    height: 6px;
    background: var(--mainbl);
  }
`;
export const SectSearch = styled.div`
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  > div {
    width: calc(50% - 20px);
  }
`;
