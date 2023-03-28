import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  SignUpWrap,
  SignUpBox,
  Logo,
  InputList,
  InputItem,
  RadioBox,
  LinktoLogin,
  SignUpBtn,
} from '../styles/s-auth';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState('');
  const [username, setUsername] = useState('');
  const [birth, setbirth] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const strValid = str => {
    if (str === '') return true;
    return false;
  };

  // Email 유효성 검사 함수
  const isValidEmail = str => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return regex.test(str);
  };

  const register = () => {
    if (!username || !userId || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      return;
    }
    if (!isValidEmail(userId)) {
      setErrorMessage('Email 형식에 맞게 입력해주세요');
      return;
    }
    if (password !== passwordChecked) {
      setErrorMessage('비밀번호가 다릅니다');
      return;
    }
    axios
      .post(
        `http://ec2-3-38-166-142.ap-northeast-2.compute.amazonaws.com:8080/pp/members`,
        {
          memberEmail: userId,
          memberName: username,
          memberPwd: password,
          memberAge: birth,
          memberGender: gender,
        },
      )
      .then(res => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', res.data);
        setErrorMessage('');
        navigate('/login');
      })
      .catch(err => {
        // Handle error.
        console.log('An error occurred:', err.response);
        if (err.response.status === 406) {
          setErrorMessage(err.response.data.message);
          console.log(errorMessage);
        } else {
          navigate('/404');
        }
      });
  };

  return (
    <SignUpWrap>
      <Link to="/">
        <Logo>
          <img src="/pharmpalm.png" alt="로고" />
        </Logo>
      </Link>
      <SignUpBox>
        <InputList>
          <InputItem>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              onChange={e => setUserId(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="password_check">비밀번호확인</label>
            <input
              type="password"
              id="password_check"
              onChange={e => setPasswordChecked(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              onChange={e => setUsername(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="birth">생년월일</label>
            <input
              type="date"
              id="birth"
              onChange={e => setbirth(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="gender">성별</label>
            <RadioBox>
              <input
                type="radio"
                id="male_link"
                value="남성"
                name="gender"
                onClick={e => setGender(e.target.value)}
              />
              <label htmlFor="male_link">남자</label>
            </RadioBox>
            <RadioBox>
              <input
                type="radio"
                id="female_link"
                value="여성"
                name="gender"
                onClick={e => setGender(e.target.value)}
              />
              <label htmlFor="female_link">여자</label>
            </RadioBox>
          </InputItem>
          {errorMessage ? (
            <p className=" mb-4 font-medium text-xs text-red-600">
              {errorMessage}
            </p>
          ) : null}
          <LinktoLogin>
            이미 가입하셨나요? <Link to="/login">로그인</Link>{' '}
          </LinktoLogin>
          <SignUpBtn
            type="submit"
            onClick={() => {
              register();
            }}
            disabled={
              strValid(userId) ||
              strValid(password) ||
              strValid(passwordChecked) ||
              strValid(username) ||
              strValid(birth) ||
              strValid(gender)
            }
          >
            회원가입
          </SignUpBtn>
        </InputList>
      </SignUpBox>
    </SignUpWrap>
  );
};

export default SignUp;
