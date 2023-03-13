import { create } from 'zustand';

const useUserInfoStore = create(set => ({
  userInfo: {},
  setUserInfo: state => set(() => ({ userInfo: state })),
}));

export { useUserInfoStore };
