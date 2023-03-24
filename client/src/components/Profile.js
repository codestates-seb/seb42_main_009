import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillImageFill } from 'react-icons/bs';
import { HeaderBtn } from '../styles/s-header';
import { SmBtn } from '../styles/globalStyle';
import { useUserInfoStore } from '../Stores/userInfoStore';

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
  const { userInfo } = useUserInfoStore(state => state);
  console.log('프로필 컴포넌트');
  console.log(userInfo);
  const [editMode, setEditMode] = useState(false);
  const [inputName, setInputName] = useState('');
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
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
  const editNameHandler = e => {
    const newName = e.target.value;
    setInputName(newName);
  };
  const editNameSubmit = e => {
    if (e.key === 'Enter') {
      setInputName(inputName);
    }
  };

  const genderCheck = gender => {
    if (gender === 'male' || gender === '남성') return '남성';
    return '여성';
  };

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
                    onChange={e => editNameHandler(e)}
                    onKeyDown={editNameSubmit}
                  />
                </p>
              </li>
              <li>
                <SmBtn>성별</SmBtn> <p>남성</p>
              </li>
              <li>
                <SmBtn>나이</SmBtn> <p>생일수정?/연령대따로?</p>
              </li>
            </ProfileItem>

            <HeaderBtn onClick={editModeHandler} width="70px">
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
    </div>
  );
};

export default Profile;
