import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component }) {
  return sessionStorage.getItem('isLogin') ? (
    Component
  ) : (
    <Navigate to="/" {...alert('로그인 후 이용해주세요.')} />
  );
}

export default PrivateRoute;
