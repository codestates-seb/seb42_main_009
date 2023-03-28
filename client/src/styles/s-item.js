import styled, { keyframes } from 'styled-components';

// ItemInfo.js
export const ItemInfoTable = styled.ul`
  li {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > span {
      width: 100px;
      line-height: 20px;
      align-self: stretch;
      background: var(--lightbl);
      padding: 15px 10px;
      color: #fff;
      font-weight: 600;
      border-bottom: 1px solid #fff;
      &:last-of-type {
        border-color: var(--mainbl);
      }
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
    > div {
      width: calc(100% - 100px);
      align-self: stretch;
      line-height: 20px;
      padding: 15px 10px;
      border-bottom: 1px solid var(--lightbl);
      word-break: keep-all;
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
    @media (max-width: 768px) {
      font-size: var(--fz-sm);
    }
  }
`;
// ItemReview.js
export const ReviewWrap = styled.div`
  margin-top: 15px;
`;
export const ReviewBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 7px;
  height: 30px;
  color: var(--mainbl);
  background: var(--bl-1);
  border-radius: 6px;
  > span {
    padding-left: 5px;
    font-weight: 600;
  }
  &:hover {
    background: var(--mainbl);
    color: #fff;
    transition: 0.4s;
  }
  @media (max-width: 768px) {
    background: var(--mainbl);
    color: #fff;
  }
`;
export const ReviewList = styled.ul`
  margin-top: 15px;
`;
export const ReviewItem = styled.li`
  position: relative;
  width: 100%;
  border-radius: 6px;
  background: var(--palebl);
  padding: 20px;
  margin-bottom: 10px;
  height: 120px;
  overflow: hidden;
  &.review-open {
    height: auto;
  }
  .btn-wrap {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .btn-more {
    position: absolute;
    right: 10px;
    bottom: 15px;
    color: var(--mainbl);
    font-weight: 600;
    cursor: pointer;
  }
`;
export const ReviewContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const UserImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex: none;
  overflow: hidden;
  margin-top: 5px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const UserInputs = styled.div`
  width: calc(100% - 120px);
  margin-left: 10px;
  padding-top: 10px;
  img {
    width: auto;
    height: 50px;
    object-fit: cover;
    margin-bottom: 15px;
    ${ReviewItem}.review-open & {
      max-width: 60%;
      height: auto;
    }
  }
  .writedate {
    padding-left: 10px;
    color: var(--bl-2);
    font-size: var(--fz-sm);
  }
  div {
    width: 100%;
    margin-top: 15px;
    line-height: 20px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    ${ReviewItem}.review-open & {
      display: block;
      text-overflow: initial;
      -webkit-line-clamp: initial;
      overflow: visible;
    }
  }
`;
export const ReviewModalBack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 9999;
`;
export const ReviewModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 70vh;
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    height: 60vh;
  }
`;
export const ReviewModalBox = styled.div`
  position: relative;
  padding: 40px 10px;
  height: 100%;
  overflow: auto;
  > .close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 24px;
    cursor: pointer;
  }
`;
export const ReviewImage = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  padding: 10px;
  border: 1px dashed var(--bl-2);
  border-radius: 6px;
  overflow: auto;
  > label {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    color: var(--mainbl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 30px;
    > span {
      font-size: var(--fz-base);
      padding-top: 10px;
      line-height: 1.2;
    }
  }
  > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  &.uploaded > label {
    opacity: 0;
  }
`;
export const ReviewText = styled.textarea`
  margin-top: 15px;
  width: 100%;
  height: 130px;
  resize: none;
  border: 1px solid var(--mainbl);
  border-radius: 6px;
  padding: 10px;
  font-size: var(--fz-sm);
  line-height: 18px;
`;
export const ReviewMedSelect = styled.div`
  margin-top: 15px;
  width: 100%;
  background: var(--bl-1);
  border-radius: 6px;
  padding: 10px;
  > input {
    border-bottom: 1px solid var(--mainbl);
  }
  .entered-med {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;
  }
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 4px 4px 6px;
    background: var(--lightbl);
    border-radius: 4px;
    margin-right: 4px;
    cursor: pointer;
    > span {
      padding-right: 4px;
    }
  }
`;
export const ReviewSubmitBtn = styled.button`
  width: ${props => props.width || '120px'};
  height: ${props => props.height || '34px'};
  text-align: center;
  border-radius: 6px;
  background: ${props => props.background || 'var(--mainbl)'};
  color: ${props => props.color || '#fff'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.border || 'transparent'};
  margin: 20px auto 0;
  display: block;
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;

// Item.js
export const likeClicked = keyframes`
  0% {opacity: 1; transform: translateY(0);}
  100% {opacity: 0; transform: translateY(-20px); }
`;
export const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 80px;
  @media (max-width: 768px) {
    display: block;
    margin-top: 30px;
  }
`;
export const ItemBox = styled.div`
  width: 30%;
  flex: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ItemTitle = styled.div`
  height: 60px;
  border-bottom: 2px solid var(--mainbl);
  margin-bottom: 15px;
  > h3 {
    font-size: var(--fz-md);
    color: var(--mainbl);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export const LikeWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 10px;
  > button {
    font-size: 20px;
    color: var(--mainbl);
    position: relative;
    > span {
      position: absolute;
      left: 0;
      top: -10px;
      font-size: 24px;
      opacity: 0;
    }
    &.liked span {
      animation: ${likeClicked} 1s forwards;
    }
  }
  > p {
    padding: 3px 0 0 5px;
    color: var(--mainbl);
  }
`;
export const ItemOverview = styled.div`
  img {
    width: 90%;
    height: auto;
    object-fit: cover;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  ul {
    > li {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 15px;
      font-size: var(--fz-md);
      line-height: 24px;
      > span {
        position: relative;
        padding: 0 15px 0 10px;
        flex: none;
        width: 80px;
        white-space: nowrap;
        color: var(--mainbl);
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          background: var(--mainbl);
          width: 3px;
          height: 20px;
        }
      }
      > div {
        width: calc(100% - 80px);
        word-break: keep-all;
      }
      @media (max-width: 768px) {
        font-size: var(--fz-base);
        line-height: 20px;
      }
    }
  }
`;
export const ItemDetail = styled.div`
  width: 70%;
  padding-left: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`;
