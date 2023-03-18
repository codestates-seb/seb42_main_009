import styled from 'styled-components';

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
  display: flex; justify-content: flex-start; align-items: flex-start;
`;
export const MypageContent = styled.div`
  width: calc(100% - 250px);
  padding-left: 30px;
`;
export const MypageTabContent = styled.div`
  margin-top: 30px;
  padding: 15px;
`;
export const MypageAlarm =styled.div`
  position: relative;
  display: flex; justify-content: flex-start; align-items: center;
  margin-bottom: 30px;
`;
// MyPills.js
export const MyPillItem = styled.li`
  width: 150px;
  margin-right: 15px;
  padding: 15px;
  border-radius: 6px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  &:nth-of-type(6) {margin-right: 0;}
`;
export const MyPill = styled.div`
  position: relative;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  padding: 5px;
`;
export const MyPillImg = styled.img`
  width: 100%; height: auto; object-fit: cover;
  filter: none;
  &.grayscale {
    filter: grayscale(1);
  }
`;
export const MyPillEdit = styled.div`
  width: 100%; height: 100%;
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  border-radius: 6px;
  background-color: rgba(34,34,34,.56);
  opacity: 0; visibility: hidden; transition: .4s;
  > .edit-btn {
    position: absolute; z-index: 1;
    left: 50%; top: 50%; transform: translate(-50%,-50%); color: #fff; font-size: 24px;
  }
  ${MyPill}:hover & {
    opacity: 1; visibility: visible; transition: .4s;
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
    left: -2px; top: -2px;
    opacity: 0; visibility: hidden;
    width: 120px;
    padding: 3px; background: rgba(255,255,255,.4);
    border-radius: 6px;
    font-size: 12px; line-height: 18px;
    word-break: break-all;
    display: none;
  } 
  /* > h3 {
    position: absolute;
    left: 0; width: 100%; top: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  */

`;