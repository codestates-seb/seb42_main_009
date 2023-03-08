import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';

const Login = () => {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useLoginInfoStore(state => state);
  const { setIsLogin } = useIsLoginStore(state => state);
  const [setErrorMessage] = useState('');

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
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, loginInfo, {
        withCredentials: true,
      })
      .then(res => {
        setIsLogin(true);
        // data 확인
        console.log(res);
        // local storage에 token 저장
        localStorage.setItem('token', res.data.jwt);
        // 로그인 성공시 홈페이지 이동
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.jwt}`;
        navigate('/');
        setErrorMessage('');
        window.location.reload();
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage('로그인에 실패했습니다.');
          navigate('/404');
        }
      });
  };

  return (
    <div className="content justify-center flex flex-col stack-gray place-content-center h-screen items-center">
      <h1>pharm palm에 로그인하세요</h1>

      <form className="loginForm my-1.5">
        <div className="flex flex-col w-full mb-4`">
          <input
            id="id"
            type="text"
            placeholder="아이디"
            onChange={handleInputValue('id')}
          />
        </div>
        <div className="flex flex-col w-full mb-4`">
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputValue('password')}
          />
        </div>
        <div className="flex items-center justify-between">
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
      </form>
      <div>
        <Link
          className="inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800 ml-2"
          to="/signup"
        >
          아이디·비밀번호 찾기
        </Link>
        <Link
          className="inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800 ml-2"
          to="/signup"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
