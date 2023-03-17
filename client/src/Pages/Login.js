import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import moment from 'moment';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';
import kakaoLoginImage from '../images/kakao_login_medium_narrow.png';
import Input from '../components/Ui/Input';

const REST_API_KEY = '46d7b3692a51eff3138a1580dccdd6c0';
const REDIRECT_URI = 'http://localhost:3000/login/oauth2/code/kakao';

const Login = () => {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useLoginInfoStore(state => state);
  const { setIsLogin } = useIsLoginStore(state => state);
  const [setErrorMessage] = useState('');

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // Input 정보 처리
  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 로그인 요청 처리
  const loginRequestHandler = () => {
    const { id, password } = loginInfo;
    if (!id || !password) {
      console.log('아이디와 비밀번호를 입력하세요');
      return;
    }

    axios
      .post(
        `http://ec2-3-38-166-142.ap-northeast-2.compute.amazonaws.com:8080/pp/login`,
        loginInfo,
        {
          withCredentials: true,
        },
      )
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
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
        navigate('/');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          setErrorMessage('로그인에 실패했습니다.');
          navigate('/404');
        }
      });
  };

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
          <button
            className="login-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              loginRequestHandler();
            }}
          >
            로그인
          </button>
        </div>

        <div className="flex flex-row justify-between">
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
    </div>
  );
};

export default Login;
