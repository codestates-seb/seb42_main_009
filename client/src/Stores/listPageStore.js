import { create } from 'zustand';

const useListPageStore = create(set => ({
  listPage: 1,
  setListPage: state => set(() => ({ listPage: state })),
  setScrollPage: ()=>{
    set((state)=>({listPage: state.listPage + 1}))
  }
}));

const useListCurrentPageStore = create(set => ({
  listCurrentPage: 1,
  setListCurrentPage: state => set(() => ({ listCurrentPage: state })),
}));

export { useListPageStore, useListCurrentPageStore };
