// import { useIsLoginStore } from '../Stores/loginStore';

const Login = () => {
  //   const { setIsLogin } = useIsLoginStore(state => state);
  const str = 'error';

  return (
    <div className="content">
      <div>
        <h1>pharm palm에 로그인하세요</h1>
      </div>
      {str}
    </div>
  );
};

export default Login;
