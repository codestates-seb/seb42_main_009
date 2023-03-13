import {
  BrowserRouter,
  Routes,
  Route,
  // useLocation,
  // useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './styles/variable.css';
import { GlobalStyle } from './styles/globalStyle';
import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import List from './Pages/List';
import MyPage from './Pages/MyPage';
import Header from './components/Header';
import EditInfo from './Pages/EditInfo';
import Test from './Pages/Test';

function App() {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);

  // const kakaoLogin = () => {
  //   const location = useLocation();
  //   // const navigate = useNavigate();
  //   const KAKAO_CODE = location.search.split('=')[1];
  //   console.log(KAKAO_CODE);
  // };

  const authHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/members/userInfo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            withCredentials: true,
          },
        },
      )
      .then(res => {
        console.log(res);
        setIsLogin(true);
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
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
