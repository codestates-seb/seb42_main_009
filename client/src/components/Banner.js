import React from 'react';
import styled, { keyframes } from 'styled-components';

const aosDown = keyframes`
  0% {opacity: 0; transform: translateY(-40px);}
  100% {opacity: 1; transform: translateY(0)}
`;
const CmBanner = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 80px;
  background-color: var(--nightbl);
  background: linear-gradient(283deg, var(--nightbl) 0%, var(--mainbl) 100%);
  text-align: center;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.1em;
  > div {
    animation: ${aosDown} 1s forwards;
    text-shadow: var(--shadow);
  }
  @media (max-width: 768px) {
    margin-top: 50px;
    height: 140px;
    font-size: var(--fz-lg);
  }
`;

const Banner = ({ children }) => (
  <CmBanner>
    <div>{children}</div>
  </CmBanner>
);

export default Banner;
