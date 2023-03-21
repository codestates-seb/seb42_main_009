import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {margin: 0;padding: 0;border: none;background: none;font-size: 100%;font-family: 'Poppins', sans-serif;box-sizing: border-box;-webkit-tap-highlight-color: transparent;}
  ol,ul {list-style: none;} 
  em {font-size: normal;} 
  img {vertical-align: top;outline: none;}
  input,
  select,
  textarea,
  button {appearance: none;-webkit-appearance: none;outline: none;background: none;border: none;border-radius: 0;margin: 0;padding: 0;line-height: 1;}
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
    max-width: 1530px;
    padding: 0 15px;
    width: 100%;
    margin: 80px auto 0;
  }
`;

