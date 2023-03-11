import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/variable.css';
import { GlobalStyle } from './styles/globalStyle';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import List from './Pages/List';
import MyPage from './Pages/MyPage';
import Item from './Pages/Item';

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
