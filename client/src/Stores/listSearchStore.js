import { create } from 'zustand';

const useListSearchStore = create(set => ({
  listSearch: '',
  setListSearch: state => set(() => ({ listSearch: state })),
}));

export { useListSearchStore };
