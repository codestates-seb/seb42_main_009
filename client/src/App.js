import {
  BrowserRouter,
  Routes,
  Route,
  // useLocation,
  // useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './styles/variable.css';
import { GlobalStyle } from './styles/globalStyle';
import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';
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

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);

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
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }

    // access Token 검증
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
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      });
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
              setIsLogin(true);
            })
            .catch(err => {
              if (err.response) {
                console.log(err.response);
              }
            });
        });
      }, 500);
  };

  const naverAuthHandler = code => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/naver/callback?code=${code}`)
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
              setIsLogin(true);
              setUserInfo(response.data.response);
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
    if (url.pathname.indexOf('kakao') !== -1) {
      kakaoAuthHandler(authorizationCode);
    } else if (url.pathname.indexOf('naver') !== -1) {
      naverAuthHandler(authorizationCode);
    } else {
      authHandler();
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="list" element={<List />} />
          <Route path="item/:itemId" element={<Item />} />
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="test" element={<Test />} />
          <Route path="mypage/:memberId" element={<MyPage />} />
          <Route path="mypharm/:memberId" element={<MyPharm />} />
          <Route path="chart" element={<Chart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
