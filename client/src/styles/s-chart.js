import styled from "styled-components";

export const BodyWrap = styled.div`
  max-width: 1330px;
  width: 100%;
  padding: 80px 15px 120px;
  margin: 0 auto;
  @media (max-width: 768px){
    padding: 30px 15px;
  }
`;
export const ChartTitle = styled.h2`
  position: relative;
  font-size: 30px;
  color: var(--nightbl);
  font-weight: 600;
  text-align: center;
  margin-bottom: 100px;
  @media (max-width: 768px){
    font-size: var(--fz-lg);
    margin-bottom: 30px;
  }
`;
export const ChartWrap = styled.section`
  display: flex; justify-content: space-between; align-items: flex-start;
  width: 100%;
  @media (max-width: 768px){
    display: block;
  }
`;
export const ChartBox = styled.div`
  width: calc(50% - 25px);
  padding: 15px;
  background: var(--palebl);
  border-radius: 12px;
  box-shadow: var(--shadow);
  h3 {
    font-size: var(--fz-lg); font-weight: 600; color: var(--nightbl);
    margin-bottom: 50px;
  }
  .apexcharts-legend {
    width: 25%;
  }
  @media (max-width: 768px){
    width: 100%;
    margin-bottom: 30px;
    h3 {
      margin-bottom: 30px; font-size: var(--fz-md);
    }
    .apexcharts-legend {
      width: 30%;
    }
  }
`;
export const BarChart = styled.div`
  width: 100%; margin-top: 80px;
  background: var(--palebl);
  padding: 20px; border-radius: 12px;
  > h2 {
    width: 100%;
    font-size: var(--fz-lg); font-weight: 600; color: var(--nightbl);
    margin-bottom: 50px;
  }
  @media (max-width: 768px){
    margin-top: 0;
    padding: 10px;
    > h2 {
      padding: 5px; font-size: var(--fz-md);
      margin-bottom: 20px;
    }
  }
`
export const OverBox = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 6px; background: transparent; border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    /* background: #7E8184; */
  }
  &::-webkit-scrollbar-thumb {
    background: #7E8184; border-radius: 6px;
  }
`;