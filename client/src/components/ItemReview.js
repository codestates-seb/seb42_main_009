/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SmBtn } from '../styles/globalStyle';
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

const ReviewWrap = styled.div`
  margin-top: 15px;
`;
const ReviewBtn = styled.button`
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
const ReviewList = styled.ul`
  margin-top: 15px;
`;
const ReviewItem = styled.li`
  position: relative;
  width: 100%; border-radius: 6px; background: var(--palebl); padding: 20px; margin-bottom: 10px;
  height: 120px;
  &.review-open {
    height: auto;
  }
  .btn-wrap {
    position: absolute; right: 10px; top: 15px;
  }
  .btn-more {
    position: absolute; right: 10px; bottom: 15px; color: var(--mainbl); font-weight: 600; cursor: pointer;
  }
`;
const ReviewContent = styled.div`
  display: flex; justify-content: flex-start; align-items: flex-start;
`;
const UserImage = styled.div`
  width: 50px; height: 50px; border-radius: 50%;
  flex: none; overflow: hidden; margin-top: 5px;
  > img {width: 100%; height: 100%; object-fit: cover;}
`;
const UserInputs = styled.div`
  width: calc(100% - 120px); margin-left: 10px;
  padding-top: 10px;
  .writedate {padding-left: 10px; color: var(--bl-2); font-size: var(--fz-sm);}
  div {
    width: 100%;
    margin-top: 15px; line-height: 20px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    ${ReviewItem}.review-open &{
      display: block;
      text-overflow: initial;
      -webkit-line-clamp: initial;
      overflow: visible;
    }
  }
`;



const ReviewModalBack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 9999;
`;
const ReviewModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 60vh;
  padding: 50px 20px;
  border-radius: 12px;
  background: #fff;
  > .close {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 24px;
    cursor: pointer;
  }
`;
const ReviewImage = styled.div`
  width: 100%; height: 100px;
  border: 1px dashed var(--bl-2);
  border-radius: 6px;
`;
const ReviewText = styled.textarea`
  margin-top: 15px;
  width: 100%; height: 130px; resize: none;
  border: 1px solid var(--mainbl);
  border-radius: 6px;
  padding: 10px;
  font-size: var(--fz-sm); line-height: 18px;
`;
const ReviewMedSelect = styled.div`
  margin-top: 15px;
  width: 100%;
  background: var(--bl-1);
  border-radius: 6px;
  padding: 10px;
  > input {
    border-bottom: 1px solid var(--mainbl);
  }
  .entered-med {
    display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap;
    margin-top: 15px;
  }
  p {
    display: flex; justify-content: flex-start; align-items: center;
    padding: 3px 4px 4px 6px; background: var(--lightbl); border-radius: 4px; margin-right: 4px;
    cursor: pointer;
    > span {padding-right: 4px;}
  }
`;


const ItemReview = () => {
  const [ reviewOpen, setReviewOpen ] = useState(false);
  const [ reviewMedInput, setReviewMedInput ] = useState("");
  const [ reviewStretch, setReviewStretch ] = useState(false)
  const reviewModalOpen = e => {
    e.stopPropagation();
    setReviewOpen(!reviewOpen);
  };
  const reviewInputHandler=(e)=>{
    const content=e.target.value
    setReviewMedInput(content)
  }
  const reviewInputEnter=(e)=>{
    if (e.key === ',') {
      setReviewMedInput("")
    }
  }
  const moreReview=()=>{
    setReviewStretch(!reviewStretch)
  }

  return (
    <ReviewWrap>
      <ReviewBtn onClick={reviewModalOpen}>
        <FaPlus />
        <span>리뷰쓰기</span>
      </ReviewBtn>

      <ReviewList>
        <ReviewItem className={reviewStretch?'review-open review':'review'}>
          <div className='btn-wrap'>
            <SmBtn>수정</SmBtn>
            <SmBtn background='var(--red-1)' color='var(--red-2)' border='1px solid var(--red-2)' hoverBg='var(--red-2)' hoverColor='var(--red-1)' marginLeft='4px'>삭제</SmBtn>
          </div>
          <div onClick={()=>moreReview()} className='btn-more'>{reviewStretch?'닫기':'더보기'}</div>
          <ReviewContent>
            <UserImage>
              <img src='https://picsum.photos/300/200' alt='user'/>
            </UserImage>
            <UserInputs>
              <span className='username'>약먹기시러</span>
              <span className='writedate'>2023-09-13</span>
              <div>
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
                Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. This does not apply for interactive or hidden elements.
              </div>
            </UserInputs>
          </ReviewContent>
        </ReviewItem>
      </ReviewList>

      {reviewOpen ? (
        <ReviewModalBack>
          <ReviewModal>
            <button
              onClick={reviewModalOpen}
              className="close"
              aria-label="modal close"
            >
              <IoMdClose />
            </button>
            <ReviewImage><input type='file' /></ReviewImage>
            <ReviewText maxLength={500} placeholder='복용 후기를 적어주세요.'></ReviewText>
            <ReviewMedSelect>
              <input type='text' value={reviewMedInput} onChange={reviewInputHandler} onKeyDown={reviewInputEnter} />
              <div className='entered-med'>
                <p><span>타이레놀</span><IoMdClose /></p>
                <p><span>아타치온정50밀리그램네모정</span><IoMdClose /></p>
              </div>
            </ReviewMedSelect>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
    </ReviewWrap>
  );
};

export default ItemReview;
