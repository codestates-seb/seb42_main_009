import { create } from 'zustand';

const useIsModalOpen = create(set => ({
  modalOpen: false,
  setModalOpen: state => set(() => ({ modalOpen: state })),
}));

const useUpdateModalOpen = create(set => ({
  updateModalOpen: false,
  setUpdateModalOpen: state => set(() => ({ updateModalOpen: state })),
}));

export { useIsModalOpen, useUpdateModalOpen };
