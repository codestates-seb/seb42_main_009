import { create } from 'zustand';

const useUserInfoStore = create(set => ({
  userInfo: {
    memberName: '',
    id: '',
    memberGender: '',
    profileImg: '',
    memberId: 0,
    memberAge: 0,
  },
  setUserInfo: state => set(() => ({ userInfo: state })),
}));

export { useUserInfoStore };
