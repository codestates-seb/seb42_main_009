import React,{useState} from 'react';
import styled from 'styled-components';
import { HeaderBtn } from '../styles/s-header';
import { SmBtn } from '../styles/globalStyle';

const ProfileWrap = styled.article`
  width: 250px;
  padding: 15px 15px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
  width: 150px;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--bl-2);
  > img {
    width: 100%;
    height: 100%;
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

const Profile = () => {
  const [ editMode, setEditMode ] = useState(false);
  const [ inputName, setInputName ]=useState("");

  const editModeHandler = () => {
    setEditMode(!editMode);
  };
  const editNameHandler=(e)=>{
    const newName = e.target.value
    setInputName(newName)
  }
  const editNameSubmit=(e)=>{
    if(e.key==='Enter'){
      setInputName(inputName)
    }
  }


  return (
    <div>
      {editMode ? (
        <ProfileWrap>
          <ProfileImg>
            <input type="file" />
          </ProfileImg>
          <ProfileContent>
            <ProfileItem>
              <li>
                <SmBtn>이름</SmBtn> <p><EditInput type="text" onChange={(e)=>editNameHandler(e)} onKeyDown={editNameSubmit} /></p>
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
            <img
              src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
              alt="ima"
            />
          </ProfileImg>
          <ProfileContent>
            <ProfileItem>
              <li>
                <SmBtn>이름</SmBtn> <p>{inputName}</p>{' '}
              </li>
              <li>
                <SmBtn>성별</SmBtn> <p>남성</p>{' '}
              </li>
              <li>
                <SmBtn>나이</SmBtn> <p>20대</p>{' '}
              </li>
            </ProfileItem>

            <HeaderBtn onClick={editModeHandler} width="70px">
              정보수정
            </HeaderBtn>
          </ProfileContent>
        </ProfileWrap>
      )}
    </div>
  );
};

export default Profile;
