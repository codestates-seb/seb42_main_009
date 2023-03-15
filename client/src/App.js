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
// import { useIsLoginStore } from './Stores/loginStore';
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

function App() {
  // const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);

  // const kakaoLogin = () => {
  //   const location = useLocation();
  //   // const navigate = useNavigate();
  //   const KAKAO_CODE = location.search.split('=')[1];
  //   console.log(KAKAO_CODE);
  // };

  const authHandler = () => {
    console.log(localStorage.getItem('accessToken'));
    const expireAt = localStorage.getItem('accessToken_expiresAt');
    console.log(expireAt);
    if (moment(expireAt).diff(moment()) < 0) console.log('토큰 만료!!');

    axios
      .get(
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
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      });
  };

  useEffect(() => {
    // kakaoLogin();
    authHandler();
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
          <Route path="mypage" element={<MyPage />} />
          <Route path="item" element={<Item />} />
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="test" element={<Test />} />
          <Route path="mypharm" element={<MyPharm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
