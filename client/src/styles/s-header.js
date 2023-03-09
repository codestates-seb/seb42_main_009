import styled from "styled-components";

export const HeaderWrap = styled.header`
  position: fixed;
  z-index: 900;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  box-shadow: rgba(34, 34, 34, 0.08) 0px 4px 12px;
  padding: 0 var(--gap-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    height: 50px;
    padding: 0 15px;
  }
`;
export const Flexbox = styled.div`
  position: relative;
  display: flex;
  justify-content: ${props => props.flexjc || 'flex-start'};
  align-items: ${props => props.flexai || 'center'};
`;
export const Logo = styled.div`
  cursor: pointer;
  flex: none;
  > img {
    width: auto;
    height: 60px;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    > img {
      height: 36px;
    }
  }
`;
export const Menu = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > li {
    position: relative;
    cursor: pointer;
    margin-left: 40px;
    font-weight: 600;
    white-space: nowrap;
    transition: 0.4s;
  }
  > li:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    bottom: -10px;
    background-color: var(--mainbl);
    opacity: 0;
    transition: 0.4s;
  }
  > li:hover {
    color: var(--mainbl);
    transition: 0.4s;
  }
  > li:hover:after {
    opacity: 1;
    transform: translateY(-5px);
    transition: 0.4s;
  }
  @media (max-width: 880px) {
    > li {
      margin-left: 15px;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const Search = styled.div`
  margin-right: 10px;
  height: 80px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > button {
    position: relative;
    z-index: 1;
    font-size: 30px;
    color: var(--mainbl);
    cursor: pointer;
    padding-right: 3px;
  }
  > input {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    height: 36px;
    border-radius: 6px;
    border: 1px solid transparent;
    padding: 0 40px 0 10px;
    opacity: 0;
    visibility: hidden;
    width: 0;
    transition: 0.4s;
  }
  &.active > input {
    opacity: 1;
    visibility: visible;
    width: 180px;
    transition: 0.4s;
    border-color: var(--bl-2);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const HeaderBtn = styled.button`
  width: ${props => props.width || '60px'};
  height: 30px;
  text-align: center;
  border-radius: 6px;
  background: ${props => props.background || 'var(--mainbl)'};
  color: ${props => props.color || '#fff'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.border || 'transparent'};
  margin-left: 5px;
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;
export const MobileBtn = styled.button`
  position: fixed;
  cursor: pointer;
  display: none;
  right: 15px;
  height: 50px;
  top: 0;
  z-index: 999;
  > div {
    position: relative;
    width: 20px;
    height: 14px;
    > span {
      position: absolute;
      height: 2px;
      width: 100%;
      background-color: var(--nightbl);
      left: 0;
      text-indent: -9999em;
      transition: 0.4s;
    }
    > span:nth-of-type(1) {
      top: 0;
    }
    > span:nth-of-type(2) {
      top: 50%;
    }
    > span:nth-of-type(3) {
      top: 100%;
    }
  }
  &.open > div span {
    background: #fff;
  }
  &.open > div span:nth-of-type(1) {
    top: 50%;
    transform: rotate(45deg);
    transition: 0.4s;
  }
  &.open > div span:nth-of-type(2) {
    opacity: 0;
  }
  &.open > div span:nth-of-type(3) {
    top: 50%;
    transform: rotate(-45deg);
    transition: 0.4s;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const PanelBg = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    z-index: 900;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.4s;
    background: var(--trans-bg);
    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
`;
export const Panel = styled.div`
  position: absolute;
  right: -100%;
  top: 0;
  bottom: 0;
  width: 60%;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s;
  background-color: var(--nightbl);
  transition: 0.4s;
  padding: 50px 15px;
  > .close {
    position: fixed;
  }
  &.open {
    right: 0;
    opacity: 1;
    visibility: visible;
  }
`;
export const PanelBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  > ${HeaderBtn} {
    margin-left: 10px;
  }
`;
export const PanelMenu = styled.ul`
  text-align: right;
  color: #fff;
  padding: 30px 0;
  font-size: var(--fz-md);
  > li {
    line-height: 40px;
  }
`;