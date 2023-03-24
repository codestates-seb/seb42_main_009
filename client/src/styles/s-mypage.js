import styled from 'styled-components';

export const Flexbox = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start;
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
    right: calc(100% + 10px);
    bottom: 30px;
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
      transform: none;
    }
  }
`;
export const ToggleWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    padding-left: 10px;
    &.toggle-checked {
      color: var(--mainbl);
      font-weight: 600;
    }
  }
`;
export const ToggleBox = styled.div`
  width: 50px;
  height: 34px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > .toggle-wrap {
    width: 100%;
    height: 24px;
    border-radius: 20px;
    background: var(--bl-2);
  }
  > .toggle-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    border: 2px solid var(--bl-2);
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.4s;
  }
  > .toggle-wrap.toggle-checked {
    background: var(--darkbl);
  }
  > .toggle-circle.toggle-checked {
    left: calc(100% - 24px);
    border-color: var(--mainbl);
    transition: 0.4s;
  }
`;
export const MypageWrap = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 768px) {
    display: block;
  }
`;
export const MypageContent = styled.div`
  width: calc(100% - 250px);
  padding-left: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    margin-top: 20px;
  }
`;
export const MypageTabContent = styled.div`
  margin-top: 30px;
  padding: 15px;
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;
export const MypageAlarm = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;
// MyPills.js
export const MyPillList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
export const MyPillItem = styled.li`
  width: calc((100% - (15px * 4)) / 5);
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 6px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  &:nth-of-type(5n) {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    width: calc((100% - (15px * 1)) / 2);
    &:nth-of-type(5n) {
      margin-right: 15px;
    }
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
`;
export const MyPill = styled.div`
  position: relative;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  padding: 5px;
`;
export const MyPillImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: none;
  &.grayscale {
    filter: grayscale(1);
  }
`;
export const MyPillEdit = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 6px;
  background-color: rgba(34, 34, 34, 0.56);
  opacity: 0;
  visibility: hidden;
  transition: 0.4s;
  > .edit-btn {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
  }
  ${MyPill}:hover & {
    opacity: 1;
    visibility: visible;
    transition: 0.4s;
  }
`;
export const MyPillTag = styled.p`
  margin-top: 5px;
  display: inline-block;
  padding: 3px 6px;
  border-radius: 30px;
  background-color: var(--mainbl);
  color: #fff;
  font-size: 10px;
`;
export const MyPillName = styled.div`
  position: relative;
  width: 100%;
  font-size: var(--fz-md);
  color: var(--nightbl);
  margin-top: 10px;
  > h3 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 20px;
  }
  > p {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    visibility: hidden;
    width: 100%;
    padding: 3px;
    background: var(--nightbl);
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
    line-height: 18px;
    word-break: break-all;
    transition: 0.4s;
  }
  ${MyPillItem}:hover & > p {
    opacity: 1;
    visibility: visible;
    transition: 0.4s;
    cursor: default;
  }
`;
export const PillAddBtn = styled.button`
  display: block;
  margin-bottom: 30px;
  width: 120px;
  height: 34px;
  border-radius: 6px;
  background: var(--mainbl);
  color: #fff;
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;
