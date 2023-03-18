import styled, { keyframes } from 'styled-components';

export const aosDown = keyframes`
  0% {opacity: 0; transform: translateY(-40px);}
  100% {opacity: 1; transform: translateY(0)}
`;
export const CmBanner = styled.div`
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
// Search.js
export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    font-size: var(--fz-md);
    padding-right: 20px;
  }
  input {
    width: 350px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--bl-2);
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    label {
      font-size: var(--fz-base);
      padding-right: 15px;
    }
    input {
      width: 250px;
      height: 34px;
    }
  }
`;
export const SearchBtn = styled.button`
  margin-left: 10px;
  height: 40px;
  width: 80px;
  border-radius: 6px;
  background-color: var(--mainbl);
  text-align: center;
  color: #fff;
`;
export const SearchSelBox=styled.div`
  position: relative;
  height: 40px;
  border: 1px solid var(--mainbl);
  border-radius: 6px;
  margin-right: 5px;
  background: var(--mainbl);
  color: #fff;
`;
export const SearchSelect = styled.select`
  width: 80px;
  height: 100%;
  padding: 0 25px 0 10px;
`;
export const SearchSelectDown = styled.span`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: var(--fz-sm);
`;