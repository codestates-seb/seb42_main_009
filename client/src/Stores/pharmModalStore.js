import { create } from 'zustand';

const useIsModalOpen = create(set => ({
  modalOpen: false,
  setModalOpen: state => set(() => ({ modalOpen: state })),
}));

export { useIsModalOpen };