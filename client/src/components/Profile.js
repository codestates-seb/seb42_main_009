import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillImageFill } from 'react-icons/bs';
import { HeaderBtn } from '../styles/s-header';
import { SmBtn } from '../styles/globalStyle';
import { useUserInfoStore } from '../Stores/userInfoStore';
import { useIsLoginStore, useIsSocialLoginStore } from '../Stores/loginStore';

const ProfileWrap = styled.article`
  width: 250px;
  padding: 15px 15px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ProfileContent = styled.div`
  position: relative;
  > ${HeaderBtn} {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
const ProfileImg = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--bl-2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
  }
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
  &.uploaded > label {
    opacity: 0;
  }
  > img {
    width: 90%;
    height: auto;
    object-fit: cover;
  }
`;
const ProfileItem = styled.ul`
  width: 100%;
  margin-top: 15px;
  > li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-left: 10px;
    }
  }
`;
const EditInput = styled.input`
  width: 80px;
  border-bottom: 1px solid var(--bl-2);
`;
const DefaultProfile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bl-1);
  font-size: 60px;
  color: var(--mainbl);
`;

const Profile = () => {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setIsSocialLogin } = useIsSocialLoginStore(state => state);
  const { userInfo, setUserInfo } = useUserInfoStore(state => state);
  const [changedInfo, setChangedInfo] = useState({
    name: '',
    gender: '',
    age: '0-9',
  });
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
  // memberId 추출
  const location = useLocation();
  const memberId = location.pathname.split('/')[2];

  const navigate = useNavigate();

  const initializeChange = () => {
    setChangedInfo({
      name: '',
      gender: '',
      age: '0-9',
    });
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
    };
  };

  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  const submitHandler = () => {
    // const formData = new FormData();
    // formData.append('reviewContent', reviewItem.reviewContent);
    // formData.append('reviewImage', reviewItem.reviewImg.image_file);
    // formData.append('reviewOtherMedicine', JSON.stringify(reviewTags));
    // formData.append('memberId', userInfo.memberId);

    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}/pp/reviews/${medicineItem.medicineId}`,
    //     formData,
    //     {
    //       'Content-Type': 'multipart/form-data',
    //       withCredentials: true,
    //     },
    //   )
    //   .then(res => {
    //     console.log(res);
    //     setIsUpdate(true);
    //     setReviewAddOpen(!reviewAddOpen);
    //     initializeItem();
    //   })
    //   .catch(err => console.log(err));

    const patchData = {
      memberName: changedInfo.name,
      memberGender: changedInfo.gender,
      memberAge: changedInfo.age,
    };
    const formData = new FormData();
    formData.append('memberName', changedInfo.name);
    formData.append('memberGender', changedInfo.gender);
    formData.append('memberAge', changedInfo.age);
    formData.append('memberImage', image.preview_URL);
    console.log(patchData);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/pp/members/${memberId}`,
        formData,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
        // 입력값 초기화
        setChangedInfo({});
      })
      .catch(err => console.log(err));
    initializeChange();
  };

  // Input 정보 처리
  const handleInputValue = key => e => {
    setChangedInfo({ ...changedInfo, [key]: e.target.value });
  };
  const editInputSubmit = key => e => {
    if (e.key === 'Enter') {
      setChangedInfo({ ...changedInfo, [key]: e.target.value });
    }
  };
  const genderCheck = gender => {
    if (gender === 'male' || gender === '남성') return '남성';
    return '여성';
  };

  // 회원 삭제 Handler
  const deleteProfileHandler = e => {
    e.preventDefault();
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/pp/members/withdraw/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              withCredentials: true,
            },
          },
        )
        .then(() => {
          localStorage.clear();
          setIsLogin(false);
          setIsSocialLogin(false);
          setUserInfo({});
          alert('그동안 이용해주셔서 감사합니다.');
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  console.log(changedInfo);

  return (
    <div>
      {editMode ? (
        <ProfileWrap>
          <ProfileImg className={image.preview_URL ? 'uploaded' : null}>
            <label htmlFor="imageUpload">
              <BsFillImageFill />
              <span>클릭해서 업로드</span>
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={saveImage}
              onClick={e => e.target.value === null}
            />
            {image.preview_URL ? (
              <img src={image.preview_URL} alt="프로필이미지" />
            ) : null}
          </ProfileImg>
          <ProfileContent>
            <ProfileItem>
              <li>
                <SmBtn>이름</SmBtn>{' '}
                <p>
                  <EditInput
                    type="text"
                    onChange={handleInputValue('name')}
                    onKeyDown={editInputSubmit('name')}
                  />
                </p>
              </li>
              <li>
                <SmBtn>성별</SmBtn>{' '}
                <p>
                  <input
                    type="radio"
                    id="남성"
                    name="gender"
                    value="남성"
                    onClick={handleInputValue('gender')}
                  />
                  <label htmlFor="남성">남성</label>
                </p>
                <p>
                  <input
                    type="radio"
                    id="여성"
                    name="gender"
                    value="여성"
                    onClick={handleInputValue('gender')}
                  />
                  <label htmlFor="여성">여성</label>
                </p>
              </li>
              <li>
                <SmBtn>나이</SmBtn>
                <p>
                  <select id="age" name="age" onClick={handleInputValue('age')}>
                    <option value="0-9" checked>
                      10세 미만
                    </option>
                    <option value="10-19">10대</option>
                    <option value="20-29">20대</option>
                    <option value="30-39">30대</option>
                    <option value="40-49">40대</option>
                    <option value="50-59">50대</option>
                    <option value="60-">60세 이상</option>
                  </select>
                </p>
              </li>
            </ProfileItem>

            <HeaderBtn
              onClick={() => {
                editModeHandler();
                submitHandler();
              }}
              disabled={
                changedInfo.name === '' ||
                changedInfo.gender === '' ||
                changedInfo.age === ''
              }
              width="70px"
            >
              수정완료
            </HeaderBtn>
          </ProfileContent>
        </ProfileWrap>
      ) : (
        <ProfileWrap>
          <ProfileImg>
            {image.preview_URL ? (
              <img src={image.preview_URL} alt="내 프로필" />
            ) : (
              <DefaultProfile>
                <BsFillImageFill />
              </DefaultProfile>
            )}
          </ProfileImg>
          <ProfileContent>
            <ProfileItem>
              <li>
                <SmBtn>이름</SmBtn> <p>{userInfo.memberName}</p>{' '}
              </li>
              <li>
                <SmBtn>성별</SmBtn> <p>{genderCheck(userInfo.memberGender)}</p>{' '}
              </li>
              <li>
                <SmBtn>나이</SmBtn> <p>{userInfo.memberAge}</p>{' '}
              </li>
            </ProfileItem>
            {!userInfo.socialLogin ? (
              <HeaderBtn onClick={editModeHandler} width="70px">
                정보수정
              </HeaderBtn>
            ) : null}
          </ProfileContent>
        </ProfileWrap>
      )}
      <button className="mt-4" onClick={deleteProfileHandler}>
        회원탈퇴
      </button>
    </div>
  );
};

export default Profile;
