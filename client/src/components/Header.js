import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { HeaderWrap,Flexbox,Logo,Menu,Search,ButtonWrap,HeaderBtn,MobileBtn,PanelBg,Panel,PanelBtn,PanelMenu } from '../styles/s-header';

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchOpen = () => {
    setSearchOn(!searchOn);
  };
  const tempLogin = () => {
    setIsLogin(!isLogin);
  };
  const panelOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const menu = ['의약품 조회', '내 약 관리', '복약루틴', 'NEWS'];

  return (
    <>
      <HeaderWrap>
        <Flexbox>
          <Logo onClick={tempLogin}>
            <img src="/pharmpalm.png" alt="pharm palm logo" />
          </Logo>
          <Menu>
            {menu.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </Menu>
        </Flexbox>
        <Flexbox flexjc="flex-end">
          <Search className={searchOn ? 'active' : null}>
            <input type="text" />
            <button onClick={searchOpen}>
              <BiSearchAlt />
            </button>
          </Search>
          {isLogin ? (
            <ButtonWrap>
              <HeaderBtn width="80px">My Page</HeaderBtn>
              <HeaderBtn
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
                onClick={() => navigate('/SignUp')}
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
              <HeaderBtn background="#fff" color="var(--mainbl)" width="80px">
                My Page
              </HeaderBtn>
              <HeaderBtn background="#fff" color="var(--mainbl)">
                Logout
              </HeaderBtn>
            </PanelBtn>
          ) : (
            <PanelBtn>
              <HeaderBtn background="#fff" color="var(--mainbl)">
                Login
              </HeaderBtn>
              <HeaderBtn background="#fff" color="var(--mainbl)">
                Join
              </HeaderBtn>
            </PanelBtn>
          )}
          <PanelMenu>
            {menu.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </PanelMenu>
        </Panel>
      </PanelBg>
    </>
  );
};

export default Header;
