/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useMedicineItemStore } from '../Stores/medicineItemStore';
import { useDiseasesTagsStore } from '../Stores/diseasesTagsStore';
import { useUserInfoStore } from '../Stores/userInfoStore';
import { SmBtn } from '../styles/globalStyle';
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { Pagination } from '../styles/s-list';
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
  const { medicineItem } = useMedicineItemStore(state => state);
  const { userInfo } = useUserInfoStore(sate => sate);
  const [isUpdate, setIsUpdate] = useState(false);
  const [reviewAddOpen, setReviewAddOpen] = useState(false);
  const [reviewUpdateOpen, setReviewUpdateOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [reviewMedInput, setReviewMedInput] = useState('');
  const [reviewTags, setReviewTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const { diseasesTags } = useDiseasesTagsStore(state => state);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: 'img/default_image.png',
  });
  const [reviewItem, setReviewItem] = useState({
    reviewImg: {},
    reviewContent: '',
    reviewTag: '',
    reviewId: 0,
  });
  const [reviewList, setReviewList] = useState([]);

  // Pagination
  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);

  const PER_PAGE = 5;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };

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
    if (content.length > 0) {
      setSearchTags(
        diseasesTags.filter(el => el.diseaseName.indexOf(content) !== -1),
      );
    }
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
      reviewContent: '',
      reviewTag: '',
      reviewStretch: false,
    });
    setImage({
      image_file: '',
      preview_URL: 'img/default_image.png',
    });
    setReviewMedInput('');
    setSearchTags([]);
    setReviewTags([]);
  };

  const reviewAddHandler = () => {
    const formData = new FormData();
    formData.append('reviewImage', reviewItem.reviewImg.image_file);
    formData.append('reviewContent', reviewItem.reviewContent);
    formData.append('reviewOtherMedicine', JSON.stringify(reviewTags));
    formData.append('memberId', userInfo.memberId);
    console.log(formData);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/pp/reviews/${medicineItem.medicineId}`,
        formData,
        {
          'Content-Type': 'multipart/form-data',
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
        setIsUpdate(true);
        setReviewAddOpen(!reviewAddOpen);
        initializeItem();
      })
      .catch(err => console.log(err));
  };

  const reviewDeleteHandler = id => {
    // setReviewList(reviewList =>
    //   reviewList.filter(item => item.reviewId !== id),
    // );
    axios
      .delete(`${process.env.REACT_APP_API_URL}/pp/reviews/${id}`)
      .then(res => {
        console.log(res);
        setIsUpdate(true);
      })
      .catch(err => console.log(err));
  };

  const reviewUpdateHandler = () => {
    // setReviewList(reviewList =>
    //   reviewList.map((item, idx) => (idx === updateIndex ? reviewItem : item)),
    // );

    const patchData = {
      reviewContent: reviewItem.reviewContent,
      reviewImg: reviewItem.reviewImg.preview_URL,
      reviewOtherMedicine: JSON.stringify(reviewTags),
    };
    console.log(patchData);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/pp/reviews/${updateIndex}`,
        patchData,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
        setIsUpdate(true);
        setReviewUpdateOpen(!reviewUpdateOpen);
        initializeItem();
      })
      .catch(err => console.log(err));
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

  const tagSearchClickHandler = content => {
    setReviewTags([...reviewTags, content]);
    setSearchTags([]);
    setReviewMedInput('');
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/pp/reviews/medicines/${medicineItem.medicineId}?page=${currentPage}&size=${PER_PAGE}`,
      )
      .then(res => {
        console.log(res);
        setReviewList(res.data.data);
        setTotalLength(res.data.pageInfo.totalElements);
        setIsUpdate(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentPage, isUpdate]);

  console.log(reviewTags);

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
              {item.memberId === userInfo.memberId ? (
                <div className="btn-wrap">
                  <SmBtn
                    onClick={e => {
                      reviewUpdateModalOpen(e);
                      setUpdateIndex(item.reviewId);
                      console.log(item.reviewId);
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
                    onClick={() => reviewDeleteHandler(item.reviewId)}
                  >
                    삭제
                  </SmBtn>
                </div>
              ) : null}
              <div className="btn-more" onClick={() => moreReview(idx)}>
                {item.reviewStretch ? '닫기' : '더보기'}
              </div>
              <ReviewContent>
                <UserImage>
                  <img src="https://picsum.photos/300/200" alt="user" />
                </UserImage>
                <UserInputs>
                  <span className="username">{item.memberName}</span>
                  <span className="writedate">{item.lastModifiedAt}</span>
                  <div>
                    {item.reviewImg ? <img src={item.reviewImg} /> : null}

                    {item.reviewContent}
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
                onChange={handleInputValue('reviewContent')}
              ></ReviewText>
              <ReviewMedSelect>
                <input
                  type="text"
                  value={reviewMedInput}
                  onChange={tagInputHandler}
                  onKeyDown={tagInputEnter}
                />
                <ul>
                  {searchTags.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => tagSearchClickHandler(item.diseaseName)}
                      >
                        {item.diseaseName}
                      </li>
                    );
                  })}
                </ul>
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
              <ReviewSubmitBtn
                onClick={reviewAddHandler}
                disabled={reviewItem.reviewContent === ''}
              >
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
                  reviewUpdateModalOpen(e);
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
                onChange={handleInputValue('reviewContent')}
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
                <ul>
                  {searchTags.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => tagSearchClickHandler(item.diseaseName)}
                      >
                        {item.diseaseName}
                      </li>
                    );
                  })}
                </ul>
              </ReviewMedSelect>
              <ReviewSubmitBtn
                onClick={reviewUpdateHandler}
                disabled={reviewItem.reviewContent === ''}
              >
                수정하기
              </ReviewSubmitBtn>
            </ReviewModalBox>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
      {/* Pagination */}
      <Pagination>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlerPageClick}
          // 밑 props는 style을 위한 className 지정 해주는 역할
          containerClassName=""
          // containerClassName="pagination"
          subContainerClassName=""
          activeClassName="active"
        />
      </Pagination>
    </ReviewWrap>
  );
};

export default ItemReview;
