import { create } from 'zustand';

const useIsLoginStore = create(set => ({
  isLogin: false,
  setIsLogin: state => set(() => ({ isLogin: state })),
}));

const useIsSocialLoginStore = create(set => ({
  isSocialLogin: false,
  setIsSocialLogin: state => set(() => ({ isSocialLogin: state })),
}));

const useLoginInfoStore = create(set => ({
  loginInfo: {
    id: '',
    password: '',
  },
  setLoginInfo: state => set(() => ({ loginInfo: state })),
}));

export { useIsLoginStore, useLoginInfoStore, useIsSocialLoginStore };
