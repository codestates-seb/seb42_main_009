import styled from 'styled-components';

export const MyPharmWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 999;
`;
export const MyPharmModalWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 80vh;
  background: #fff;
  border-radius: 20px;
  padding: 0 30px 20px;
  .modal-close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 20px;
    margin-top: 30px;
    font-size: 26px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    padding: 0 10px 30px;
  }
`;
export const MyPharmModalBox = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  margin-top: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    opacity: 0;
  }
`;
export const FieldSet = styled.div`
  margin-bottom: 30px;
`;
export const FieldTitle = styled.h2`
  font-size: var(--fz-md);
  margin-bottom: 10px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: var(--fz-base);
  }
`;
export const FieldBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--palebl);
  border-radius: 6px;
  padding: 15px 10px;
  margin-bottom: 10px;
  > label {
    flex: none;
    line-height: 34px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80px;
    font-weight: 600;
    color: var(--mainbl);
    > button {
      color: var(--mainbl);
      margin-left: 7px;
    }
    @media (max-width: 768px) {
      width: 70px;
    }
  }
  > span {
    padding-left: 10px;
    line-height: 34px;
  }
`;
export const FieldInput = styled.input`
  background: #fff;
  height: 34px;
  font-size: var(--fz-base);
  border-radius: 6px;
  padding: 0 10px;
  border: 1px solid var(--mainbl);
  width: ${props => props.width || '80px'};
  @media (max-width: 768px) {
    width: ${props => props.mobileWidth} !important;
  }
`;
export const FieldSelect = styled.div`
  position: relative;
  > select {
    margin-left: 10px;
    border: 1px solid var(--mainbl);
    border-radius: 6px;
    height: 34px;
    background: #fff;
    padding: 0 25px 0 10px;
    font-size: var(--fz-base);
    line-height: 34px;
  }
`;
export const FieldSelectDown = styled.span`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: var(--fz-sm);
`;
export const FieldTooltip = styled.div`
  position: relative;
  margin-left: 15px;
  align-self: center;
  color: var(--nightbl);
  cursor: pointer;
  p {
    position: absolute;
    width: max-content;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
    background: var(--nightbl);
    color: #fff;
    padding: 5px;
    border-radius: 6px;
  }
  &:hover p {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 768px) {
    p {
      left: initial;
      right: 0;
      top: calc(100% + 10px);
      transform: none;
    }
  }
`;
export const Flexbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
export const MyPharmBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MyPharmSubmit = styled.button`
  width: 100px;
  height: 34px;
  background: ${props => props.background || 'var(--mainbl)'};
  border-radius: 6px;
  color: ${props => props.color || '#fff'};
  margin: 0 5px;
  &:hover {
    transition: 0.4s;
    transform: translateY(-3px);
    background: ${props => props.hoverBg || 'var(--darkbl)'};
    color: ${props => props.hoverColor || '#fff'};
  }
`;
export const TimeSelect = styled.div`
  position: relative;
  border-radius: 6px;
  height: 34px;
  width: 100px;
  border: 1px solid var(--mainbl);
  background: #fff;
  margin: 2px 25px 0 2px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  input {
    width: 100px;
    padding: 0 5px;
    cursor: pointer;
  }
  .time-delete {
    font-size: var(--fz-md);
    font-weight: 600;
    color: var(--mainbl);
    margin-left: 3px;
    align-self: flex-start;
  }
`;
export const SearchBtn = styled.button`
  flex: none;
  width: 55px;
  height: 34px;
  margin-left: 5px;
  background: var(--mainbl);
  color: #fff;
  border-radius: 6px;
`;
export const SearchList = styled.ul`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 10;
  left: 90px;
  top: calc(100% - 15px);
  background: #fff;
  min-width: 160px;
  border: 1px solid var(--mainbl);
  border-radius: 6px;
  padding: 10px;
  &.list-open {
    opacity: 1;
    visibility: visible;
  }
  > li {
    font-size: var(--fz-sm);
    line-height: 2;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    left: 80px;
  }
`;
