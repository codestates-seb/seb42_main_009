/* eslint-disable */
import React, { useState } from 'react';
import { 
  ReviewItem,ReviewContent,UserImage,UserInputs
} from '../styles/s-item';

const Review = () => {
  const [ reviewImg, setReviewImg ] = useState({})
  const [ reviewText, setReviewText ] = useState('');
  const [ reviewTag, setReviewTag ] = useState('');
  const [ reviewStretch, setReviewStretch ] = useState(false);
  const [ reviewDate, setReviewDate ] = useState('22-01-01')


  return (
  <ReviewItem className={item.reviewStretch ? 'review-open review' : 'review'}>
    <div className="btn-wrap">
      <SmBtn onClick={e => {reviewUpdateModalOpen(e); setUpdateIndex(idx);}}>수정</SmBtn>
      <SmBtn
        background="var(--red-1)"
        color="var(--red-2)"
        border="1px solid var(--red-2)"
        hoverBg="var(--red-2)"
        hoverColor="var(--red-1)"
        marginLeft="4px"
        onClick={() => reviewDeleteHandler(idx)}
      >삭제</SmBtn>
    </div>

    <div className="btn-more" onClick={() => moreReview(idx)}>
      {item.reviewStretch ? '닫기' : '더보기'}
    </div>
    <ReviewContent>

      <UserImage>
        <img src="https://picsum.photos/300/200" alt="user" />
      </UserImage>

      <UserInputs>
        <span className="username">약먹기시러</span>
        <span className="writedate">2023-09-13</span>
        <div>
          {item.reviewImg ? <img src={item.reviewImg.preview_URL} /> : null}
          {item.reviewText}
        </div>
      </UserInputs>
    </ReviewContent>
  </ReviewItem>
  )
}

export default Review