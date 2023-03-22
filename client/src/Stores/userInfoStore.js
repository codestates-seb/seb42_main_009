import { create } from 'zustand';

const useUserInfoStore = create(set => ({
  userInfo: {
    name: '',
    email: '',
    gender: '',
    profileImg: '',
    memberId: 0,
    age: 0,
  },
  setUserInfo: state => set(() => ({ userInfo: state })),
}));

export { useUserInfoStore };
