import { create } from 'zustand';

const useMyPharmListStore = create(set => ({
  myPharmList: [],
  setMyPharmList: state => set(() => ({ myPharmList: state })),
}));

export { useMyPharmListStore };
