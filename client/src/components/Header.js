import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { BiSearchAlt } from 'react-icons/bi';
import { useIsLoginStore } from '../Stores/loginStore';
import {
  HeaderWrap,
  Flexbox,
  Logo,
  Menu,
  // Search,
  ButtonWrap,
  HeaderBtn,
  MobileBtn,
  PanelBg,
  Panel,
  PanelBtn,
  PanelMenu,
} from '../styles/s-header';
import { useUserInfoStore } from '../Stores/userInfoStore';

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useIsLoginStore(state => state);
  // const [searchOn, setSearchOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userInfo } = useUserInfoStore(state => state);
  // const searchOpen = () => {
  //   setSearchOn(!searchOn);
  // };
  const tempLogin = () => {
    // setIsLogin(!isLogin);
    navigate('/');
  };
  const panelOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuList = [
    { title: '의약품 조회', linkSrc: '/list' },
    { title: '내 약 관리', linkSrc: `/mypharm/${userInfo.memberId}` },
    { title: '차트데이터', linkSrc: '/chart' },
  ];
  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('KAKAO_accessToken');
    localStorage.removeItem('NAVER_accessToken');
    localStorage.removeItem('accessToken_expiresAt');
    localStorage.removeItem('refreshToken_expiresAt');
  };

  return (
    <>
      <HeaderWrap>
        <Flexbox>
          <Logo onClick={tempLogin}>
            <img src="/pharmpalm.png" alt="pharm palm logo" />
          </Logo>
          <Menu>
            {menuList.map((item, idx) => (
              <li key={idx}>
                <Link to={item.linkSrc}>{item.title}</Link>
              </li>
            ))}
          </Menu>
        </Flexbox>
        <Flexbox flexjc="flex-end">
          {/* <Search className={searchOn ? 'active' : null}>
            <input type="text" />
            <button onClick={searchOpen}>
              <BiSearchAlt />
            </button>
          </Search> */}
          {isLogin ? (
            <ButtonWrap>
              <HeaderBtn
                width="80px"
                onClick={() => navigate(`/mypage/${userInfo.memberId}`)}
              >
                My Page
              </HeaderBtn>
              <HeaderBtn
                onClick={() => logoutHandler()}
                border="var(--mainbl)"
                color="var(--mainbl)"
                background="#fff"
                hoberColor="#fff"
              >
                Logout
              </HeaderBtn>
            </ButtonWrap>
          ) : (
            <ButtonWrap>
              <HeaderBtn onClick={() => navigate('/login')}>Login</HeaderBtn>
              <HeaderBtn
                onClick={() => navigate('/signup')}
                border="var(--mainbl)"
                color="var(--mainbl)"
                background="#fff"
                hoberColor="#fff"
              >
                Join
              </HeaderBtn>
            </ButtonWrap>
          )}
        </Flexbox>
      </HeaderWrap>
      <MobileBtn onClick={panelOpen} className={mobileOpen ? 'open' : null}>
        <div>
          <span>_</span>
          <span>_</span>
          <span>_</span>
        </div>
      </MobileBtn>
      <PanelBg className={mobileOpen ? 'open' : null}>
        <Panel className={mobileOpen ? 'open' : null}>
          {isLogin ? (
            <PanelBtn>
              <HeaderBtn
                background="#fff"
                color="var(--mainbl)"
                width="80px"
                onClick={() => navigate(`/mypage/${userInfo.memberId}`)}
              >
                My Page
              </HeaderBtn>
              <HeaderBtn
                background="#fff"
                color="var(--mainbl)"
                onClick={() => logoutHandler()}
              >
                Logout
              </HeaderBtn>
            </PanelBtn>
          ) : (
            <PanelBtn>
              <HeaderBtn
                background="#fff"
                color="var(--mainbl)"
                onClick={() => {
                  panelOpen();
                  navigate('/login');
                }}
              >
                Login
              </HeaderBtn>
              <HeaderBtn
                background="#fff"
                color="var(--mainbl)"
                onClick={() => {
                  panelOpen();
                  navigate('/signup');
                }}
              >
                Join
              </HeaderBtn>
            </PanelBtn>
          )}
          <PanelMenu>
            {menuList.map((item, idx) => (
              <Link to={item.linkSrc}>
                <button key={idx} onClick={panelOpen}>
                  {item.title}
                </button>
              </Link>
            ))}
          </PanelMenu>
        </Panel>
      </PanelBg>
    </>
  );
};

export default Header;
