import { create } from 'zustand';

const useSearchTextStore = create(set => ({
  searchText: '',
  setSearchText: state => set(() => ({ searchText: state })),
}));

const useSearchSelectedStore = create(set => ({
  searchSelected: '',
  setSearchSelected: state => set(() => ({ searchSelected: state })),
}));

const useSearchApiStore = create(set => ({
  searchApi: '',
  setSearchApi: state => set(() => ({ searchApi: state })),
}));

export { useSearchTextStore, useSearchSelectedStore, useSearchApiStore };
