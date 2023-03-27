import { React, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './styles/variable.css';
import { GlobalStyle } from './styles/globalStyle';
import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';
import { useDiseasesTagsStore } from './Stores/diseasesTagsStore';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import List from './Pages/List';
import MyPage from './Pages/MyPage';
import Item from './Pages/Item';
import EditInfo from './Pages/EditInfo';
import Test from './Pages/Test';
import MyPharm from './Pages/MyPharm';
import Chart from './Pages/Chart';
import Auth from './Pages/Auth';
import PrivateRoute from './components/PrivateRoute';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);
  const { setDiseasesTags } = useDiseasesTagsStore(state => state);

  const navigate = useNavigate();

  const authHandler = () => {
    console.log(localStorage.getItem('accessToken'));
    const expireAt = localStorage.getItem('accessToken_expiresAt');

    console.log(expireAt);

    // refresh token
    if (moment(expireAt).diff(moment()) < 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/pp/tokens`,
          {},
          {
            headers: {
              Refresh: `${localStorage.getItem('refreshToken')}`,
              withCredentials: true,
            },
          },
        )
        .then(res => {
          console.log(res);
          // 로컬 스토리지에 새롭게 Access Token 저장
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem(
            'accessToken_expiresAt',
            res.data.accessToken_expiresAt,
          );
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }

    // access Token 검증
    setTimeout(() => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/pp/members/info`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              withCredentials: true,
            },
          },
        )
        .then(res => {
          console.log(res);
          setUserInfo(res.data.data);
          setIsLogin(true);
          sessionStorage.setItem('isLogin', true);
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.data));
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }, 500);
  };

  const kakaoAuthHandler = code => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/kakao/callback?code=${code}`)
      .then(res => {
        localStorage.setItem('KAKAO_accessToken', res.data.access_token);
        setTimeout(() => {
          axios
            .get(
              `${
                process.env.REACT_APP_API_URL
              }/auth/kakao/info?token=${localStorage.getItem(
                'KAKAO_accessToken',
              )}`,
              {},
              {
                headers: {
                  withCredentials: true,
                },
              },
            )
            .then(response => {
              console.log(response);
              setUserInfo({ ...response.data.data, socialLogin: true });
              sessionStorage.setItem('isLogin', true);
              sessionStorage.setItem(
                'userInfo',
                JSON.stringify({
                  ...response.data.data,
                  socialLogin: true,
                }),
              );
              setIsLogin(true);
              navigate(`/`);
            })
            .catch(err => {
              if (err.response) {
                console.log(err.response);
              }
            });
        });
      }, 500);
  };

  const naverAuthHandler = (code, state) => {
    console.log(code);
    console.log(state);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/naver/callback?code=${code}&state=${state}`,
      )
      .then(res => {
        localStorage.setItem('NAVER_accessToken', res.data.access_token);
        console.log(localStorage.getItem('NAVER_accessToken'));
        setTimeout(() => {
          axios
            .get(
              `${
                process.env.REACT_APP_API_URL
              }/auth/naver/info?token=${localStorage.getItem(
                'NAVER_accessToken',
              )}`,
              {},
              {
                headers: {
                  withCredentials: true,
                },
              },
            )
            .then(response => {
              console.log(response);
              setUserInfo({ ...response.data.data, socialLogin: true });
              setIsLogin(true);
              sessionStorage.setItem('isLogin', true);
              sessionStorage.setItem(
                'userInfo',
                JSON.stringify({
                  ...response.data.data,
                  socialLogin: true,
                }),
              );
              // setIsSocialLogin(true);
              navigate('/');
            })
            .catch(err => {
              if (err.response) {
                console.log(err.response);
              }
            });
        });
      }, 500);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    console.log(url.pathname);

    if (sessionStorage.getItem('isLogin')) {
      setIsLogin(true);
      setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    }

    if (url.pathname.indexOf('kakao') !== -1) {
      kakaoAuthHandler(authorizationCode);
    } else if (url.pathname.indexOf('naver') !== -1) {
      const authorizationState = url.searchParams.get('state');
      naverAuthHandler(authorizationCode, authorizationState);
    } else {
      authHandler();
    }

    // 질병 태그 전체 조회
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/diseases?page=1&size=200`)
      .then(res => setDiseasesTags(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <GlobalStyle />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="list" element={<List />} />
          <Route path="item/:itemId" element={<Item />} />
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="test" element={<Test />} />
          <Route
            exact
            path="mypage/:memberId"
            element={<PrivateRoute component={<MyPage />} />}
          />
          <Route
            exact
            path="mypharm/:memberId"
            element={<PrivateRoute component={<MyPharm />} />}
          />
          <Route path="chart" element={<Chart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
