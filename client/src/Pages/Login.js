import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import moment from 'moment';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';
import kakaoLoginImage from '../images/kakao_login_medium_narrow.png';
import naverLoginImage from '../images/naver_login.png';
import Input from '../components/Ui/Input';
import { HeaderBtn } from '../styles/s-header';

const Login = () => {
  const URI = process.env.REACT_APP_API_URL;
  const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_URL;
  const NAVER_AUTH_URL = process.env.REACT_APP_NAVER_URL;
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useLoginInfoStore(state => state);
  const { setIsLogin } = useIsLoginStore(state => state);
  const [errorMessage, setErrorMessage] = useState('');

  // Input 정보 처리
  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 로그인 요청 처리
  const loginRequestHandler = () => {
    const { id, password } = loginInfo;
    if (!id || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요.');
      return;
    }

    axios
      .post(`${URI}/pp/login`, loginInfo, {
        withCredentials: true,
      })
      .then(res => {
        setIsLogin(true);
        // data 확인
        console.log(res);
        // local storage에 token 저장
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem(
          'accessToken_expiresAt',
          res.data.accessToken_expiresAt,
        );
        localStorage.setItem(
          'refreshToken_expiresAt',
          res.data.refreshToken_expiresAt,
        );

        // 로그인 성공시 홈페이지 이동
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          'accessToken',
        )}`;
        setErrorMessage('');
        navigate('/');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('로그인에 실패했습니다.');
        if (err.response.status === 401) {
          navigate('/404');
        }
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem('isLogin')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="content justify-center flex flex-col stack-gray place-content-center h-screen items-center">
      <h1 className="font-semibold text-2xl mb-4">pharm palm에 로그인하세요</h1>

      <form className="loginForm my-1.5">
        <div className="flex flex-col w-full mb-4`">
          <Input
            id="id"
            type="text"
            placeholder="아이디"
            onChange={handleInputValue('id')}
          />
        </div>
        <div className="flex flex-col w-full mb-4`">
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputValue('password')}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <HeaderBtn
            className="my-3"
            width="100%"
            height="34px"
            marginLeft="0"
            type="button"
            onClick={() => {
              loginRequestHandler();
            }}
            style={{ background: 'var(--mainbl)' }}
          >
            로그인
          </HeaderBtn>
        </div>
        {errorMessage ? (
          <p className=" mb-4 font-medium text-xs text-red-600 text-right mr-2">
            {errorMessage}
          </p>
        ) : null}

        <div className="flex flex-row justify-between my-4">
          <Link
            className="inline-block items-end font-semibold text-sm hover:text-blue-800 ml-2"
            to="/signup"
          >
            아이디·비밀번호 찾기
          </Link>
          <Link
            className="inline-block items-end font-semibold text-sm hover:text-blue-800 mr-4"
            to="/signup"
          >
            회원가입
          </Link>
        </div>
      </form>
      <Link className="kakao-link" to={KAKAO_AUTH_URL}>
        <img src={kakaoLoginImage} alt="kakao-login" />
      </Link>
      <Link className="naver-link w-[183px] h-[45px] my-4" to={NAVER_AUTH_URL}>
        <img src={naverLoginImage} alt="naver-login" />
      </Link>
    </div>
  );
};

export default Login;
