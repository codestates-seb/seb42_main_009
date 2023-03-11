import React, { useState } from 'react';
import styled from 'styled-components';
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

const ItemReview = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const reviewModalOpen = e => {
    e.stopPropagation();
    setReviewOpen(!reviewOpen);
  };
  return (
    <ReviewWrap>
      <ReviewBtn onClick={reviewModalOpen}>
        <FaPlus />
        <span>리뷰쓰기</span>
      </ReviewBtn>
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
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
    </ReviewWrap>
  );
};

export default ItemReview;
