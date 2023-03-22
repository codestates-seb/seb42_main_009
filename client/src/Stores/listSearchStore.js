import { create } from 'zustand';

const useSearchTextStore = create(set => ({
  searchText: '',
  setSearchText: state => set(() => ({ searchText: state })),
}));

const useSearchSelectedStore = create(set => ({
  searchSelected: 'name',
  setSearchSelected: state => set(() => ({ searchSelected: state })),
}));

const useSearchApiStore = create(set => ({
  searchApi: 'medicineName',
  setSearchApi: state => set(() => ({ searchApi: state })),
}));

const useSearchIsUpdateStore = create(set => ({
  searchIsUpdate: '',
  setSearchIsUpdate: state => set(() => ({ searchIsUpdate: state })),
}));

export {
  useSearchTextStore,
  useSearchSelectedStore,
  useSearchApiStore,
  useSearchIsUpdateStore,
};
