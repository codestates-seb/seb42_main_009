import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsLoginStore } from '../Stores/loginStore';

function PrivateRoute({ component: Component }) {
  const { isLogin } = useIsLoginStore(state => state);
  return isLogin ? (
    Component
  ) : (
    <Navigate to="/" {...alert('로그인 후 이용해주세요.')} />
  );
}

export default PrivateRoute;
