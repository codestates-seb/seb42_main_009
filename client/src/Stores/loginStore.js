import { create } from 'zustand';

const useIsLoginStore = create(set => ({
  isLogin: false,
  setIsLogin: state => set(() => ({ isLogin: state })),
}));

const useLoginInfoStore = create(set => ({
  loginInfo: {
    email: '',
    password: '',
  },
  setLoginInfo: state => set(() => ({ loginInfo: state })),
}));

export { useIsLoginStore, useLoginInfoStore };
