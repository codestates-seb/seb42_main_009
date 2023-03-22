import { create } from 'zustand';

const useMedicineListStore = create(set => ({
  medicineList: {},
  setMedicineList: state => set(() => ({ medicineList: state })),
}));

export { useMedicineListStore };
