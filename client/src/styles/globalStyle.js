import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {margin: 0;padding: 0;border: none;background: none;font-size: 100%;font-family: 'Poppins', sans-serif;box-sizing: border-box;-webkit-tap-highlight-color: transparent;}
  ol,ul {list-style: none;} 
  em {font-size: normal;} 
  img {vertical-align: top;outline: none;}
  input,
  select,
  textarea,
  button {appearance: none;-webkit-appearance: none; outline: none;background: none;border: none;border-radius: 0;margin: 0;padding: 0;line-height: 1;}
  input:-webkit-autofill, 
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {background: transparent;background-clip: text;-webkit-background-clip: text; -webkit-text-fill-color: var(--bl-5);}
  textarea {resize: none;} 
  ::placeholder {font: inherit;}
  a {text-decoration: none;color: inherit;}
  a:visited {background: none;color:inherit;}
  a:active {background: none;color:inherit;}

  body {
    overflow-x: hidden; font-size: 16px; line-height: 1;
    font-family: 'Poppins', sans-serif,
    -apple-system, 
    BlinkMacSystemFont, 
    system-ui, 
    Roboto, 
    'Helvetica Neue', 
    'Segoe UI', 
    'Apple SD Gothic Neo', 
    'Noto Sans KR', 
    'Malgun Gothic', sans-serif;
    font-size: var(--fz-base);
    color: var(--bl-5);
  }
  .bodywrap {
    max-width: 1230px;
    width: 100%;
    padding: 80px 15px;
    margin: 0 auto;
    @media (max-width: 768px){
      padding: 30px 15px;
    }
  }
`;
export const SmBtn = styled.button`
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
  font-size: var(--fz-sm);
  border: ${props => props.border || '1px solid var(--mainbl)'};
  background: ${props => props.background || '#fff'};
  color: ${props => props.color || 'var(--mainbl)'};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverBg || 'var(--mainbl)'};
    color: ${props => props.hoverColor || '#fff'};
    transition: 0.4s;
  }
`;
export const Tab = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid var(--mainbl);
  > li {
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    background-color: var(--bl-1);
    color: var(--bl-2);
    cursor: pointer;
    &:nth-of-type(1) {
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #fff;
    }
    &:nth-of-type(2) {
      border-radius: 0 6px 6px 0;
    }
    &.active {
      background-color: var(--mainbl);
      color: #fff;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
  }
`;
