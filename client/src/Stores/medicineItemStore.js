import { create } from 'zustand';

const useMedicineItemStore = create(set => ({
  medicineItem: {
    medicineId: 0,
    medicineImg: '',
    medicineIngredient: '',
    medicineLike: 0,
    medicineName: '',
    medicineUse: '',
  },
  setMedicineItem: state => set(() => ({ medicineItem: state })),
  setLikeIncrease: () =>
    set(state => ({
      medicineItem: {
        ...state.medicineItem,
        medicineLike: state.medicineItem.medicineLike + 1,
      },
    })),
  setLikeDecrease: () =>
    set(state => ({
      medicineItem: {
        ...state.medicineItem,
        medicineLike: state.medicineItem.medicineLike - 1,
      },
    })),
}));

export { useMedicineItemStore };
