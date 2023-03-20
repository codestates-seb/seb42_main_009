/* eslint-disable */
import React, { useState } from 'react';
import { SmBtn } from '../styles/globalStyle';
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import {
  ReviewWrap,
  ReviewBtn,
  ReviewList,
  ReviewItem,
  ReviewContent,
  UserImage,
  UserInputs,
  ReviewModalBack,
  ReviewModal,
  ReviewModalBox,
  ReviewImage,
  ReviewText,
  ReviewMedSelect,
  ReviewSubmitBtn,
} from '../styles/s-item';

const ItemReview = () => {
  const [reviewAddOpen, setReviewAddOpen] = useState(false);
  const [reviewUpdateOpen, setReviewUpdateOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [reviewMedInput, setReviewMedInput] = useState('');
  const [reviewTags, setReviewTags] = useState([]);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: 'img/default_image.png',
  });
  const [reviewItem, setReviewItem] = useState({
    reviewImg: {},
    reviewText: '',
    reviewTag: '',
    reviewId: 0,
  });
  const [reviewList, setReviewList] = useState([
    {
      reviewImg: '',
      reviewText: `Enforce onClick is accompanied by at least one of the following:
                onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is
                important for users with physical disabilities who cannot use a
                mouse, AT compatibility, and screenreader users. This does not
                apply for interactive or hidden elements. Enforce onClick is
                accompanied by at least one of the following: onKeyUp,
                onKeyDown, onKeyPress. Coding for the keyboard is important for
                users with physical disabilities who cannot use a mouse, AT
                compatibility, and screenreader users. This does not apply for
                interactive or hidden elements. Enforce onClick is accompanied
                by at least one of the following: onKeyUp, onKeyDown,
                onKeyPress. Coding for the keyboard is important for users with
                physical disabilities who cannot use a mouse, AT compatibility,
                and screenreader users. This does not apply for interactive or
                hidden elements. Enforce onClick is accompanied by at least one
                of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the
                keyboard is important for users with physical disabilities who
                cannot use a mouse, AT compatibility, and screenreader users.
                This does not apply for interactive or hidden elements. Enforce
                onClick is accompanied by at least one of the following:
                onKeyUp, onKeyDown, onKeyPress. Coding for the keyboard is
                important for users with physical disabilities who cannot use a
                mouse, AT compatibility, and screenreader users. This does not
                apply for interactive or hidden elements. Enforce onClick is
                accompanied by at least one of the following: onKeyUp,
                onKeyDown, onKeyPress. Coding for the keyboard is important for
                users with physical disabilities who cannot use a mouse, AT
                compatibility, and screenreader users. This does not apply for
                interactive or hidden elements.`,
      reviewTag: '',
      reviewStretch: false,
    },
  ]);

  // Input 정보 처리
  const handleInputValue = key => e => {
    setReviewItem({ ...reviewItem, [key]: e.target.value });
  };

  const reviewAddModalOpen = e => {
    e.stopPropagation();
    setReviewAddOpen(!reviewAddOpen);
  };
  const reviewUpdateModalOpen = e => {
    e.stopPropagation();
    setReviewUpdateOpen(!reviewUpdateOpen);
  };

  const tagInputHandler = e => {
    const content = e.target.value;
    setReviewMedInput(content);
  };

  const tagDeleteHandler = id => {
    setReviewTags(reviewTags.filter((item, idx) => idx !== id));
  };

  const tagInputEnter = e => {
    if (e.key === 'Enter' || e.key === ',' || e.key === '+' || e.key === ' ') {
      setReviewTags([...reviewTags, reviewMedInput]);
      setReviewMedInput('');
    }
  };

  const moreReview = id => {
    setReviewList(reviewList =>
      reviewList.map((item, idx) =>
        idx === id ? { ...item, reviewStretch: !item.reviewStretch } : item,
      ),
    );
  };
  const initializeItem = () => {
    setReviewItem({
      reviewImg: {},
      reviewText: '',
      reviewTag: '',
      reviewStretch: false,
    });
    setImage({
      image_file: '',
      preview_URL: 'img/default_image.png',
    });
    setReviewMedInput('');
    setReviewTags([]);
  };

  const reviewAddHandler = () => {
    setReviewList([...reviewList, reviewItem]);
    console.log(reviewList);
    setReviewAddOpen(!reviewAddOpen);
    initializeItem();
  };

  const reviewDeleteHandler = id => {
    setReviewList(reviewList => reviewList.filter((item, idx) => idx !== id));
  };

  const reviewUpdateHandler = () => {
    setReviewList(reviewList =>
      reviewList.map((item, idx) => (idx === updateIndex ? reviewItem : item)),
    );
    setReviewUpdateOpen(!reviewUpdateOpen);
    initializeItem();
  };

  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setReviewItem({
        ...reviewItem,
        reviewImg: {
          image_file: e.target.files[0],
          preview_URL: fileReader.result,
        },
      });
    };
  };

  return (
    <ReviewWrap>
      <ReviewBtn onClick={reviewAddModalOpen}>
        <FaPlus />
        <span>리뷰쓰기</span>
      </ReviewBtn>
      {reviewList.map((item, idx) => {
        return (
          <ReviewList>
            <ReviewItem
              className={item.reviewStretch ? 'review-open review' : 'review'}
            >
              <div className="btn-wrap">
                <SmBtn
                  onClick={e => {
                    reviewUpdateModalOpen(e);
                    setUpdateIndex(idx);
                  }}
                >
                  수정
                </SmBtn>
                <SmBtn
                  background="var(--red-1)"
                  color="var(--red-2)"
                  border="1px solid var(--red-2)"
                  hoverBg="var(--red-2)"
                  hoverColor="var(--red-1)"
                  marginLeft="4px"
                  onClick={() => reviewDeleteHandler(idx)}
                >
                  삭제
                </SmBtn>
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
                    {item.reviewImg ? (
                      <img src={item.reviewImg.preview_URL} />
                    ) : null}

                    {item.reviewText}
                  </div>
                </UserInputs>
              </ReviewContent>
            </ReviewItem>
          </ReviewList>
        );
      })}
      {reviewAddOpen ? (
        <ReviewModalBack>
          <ReviewModal>
            <ReviewModalBox>
              <button
                onClick={e => {
                  reviewAddModalOpen(e);
                  initializeItem();
                }}
                className="close"
                aria-label="modal close"
              >
                <IoMdClose />
              </button>
              <ReviewImage>
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  onClick={e => (e.target.value = null)}
                />
                <img src={image.preview_URL} />
              </ReviewImage>
              <ReviewText
                maxLength={500}
                placeholder="복용 후기를 적어주세요."
                onChange={handleInputValue('reviewText')}
              ></ReviewText>
              <ReviewMedSelect>
                <input
                  type="text"
                  value={reviewMedInput}
                  onChange={tagInputHandler}
                  onKeyDown={tagInputEnter}
                />
                <div className="entered-med">
                  {reviewTags.map((item, idx) => {
                    return (
                      <p key={idx}>
                        <span>{item}</span>
                        <IoMdClose onClick={() => tagDeleteHandler(idx)} />
                      </p>
                    );
                  })}
                </div>
              </ReviewMedSelect>
              <ReviewSubmitBtn onClick={reviewAddHandler}>
                리뷰쓰기
              </ReviewSubmitBtn>
            </ReviewModalBox>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
      {reviewUpdateOpen ? (
        <ReviewModalBack>
          <ReviewModal>
            <ReviewModalBox>
              <button
                onClick={e => {
                  reviewAddModalOpen(e);
                  initializeItem();
                }}
                className="close"
                aria-label="modal close"
              >
                <IoMdClose />
              </button>
              <ReviewImage>
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  onClick={e => (e.target.value = null)}
                />
                <img src={image.preview_URL} />
              </ReviewImage>
              <ReviewText
                maxLength={500}
                placeholder="복용 후기를 적어주세요."
                onChange={handleInputValue('reviewText')}
              ></ReviewText>
              <ReviewMedSelect>
                <input
                  type="text"
                  value={reviewMedInput}
                  onChange={tagInputHandler}
                  onKeyDown={tagInputEnter}
                />
                <div className="entered-med">
                  {reviewTags.map((item, idx) => {
                    return (
                      <p key={idx}>
                        <span>{item}</span>
                        <IoMdClose onClick={() => tagDeleteHandler(idx)} />
                      </p>
                    );
                  })}
                </div>
              </ReviewMedSelect>
              <ReviewSubmitBtn onClick={reviewUpdateHandler}>
                수정하기
              </ReviewSubmitBtn>
            </ReviewModalBox>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
    </ReviewWrap>
  );
};

export default ItemReview;
