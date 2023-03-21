import { create } from 'zustand';

const useMyPharmStore = create(set => ({
  myPharmItem: {
    doseId: 0,
    memberId: 0,
    medicineId: 0,
    medicineName: '',
    doseMount: '',
    doseNumber: 0,
    doseTimes: [],
  },
  setMyPharmItem: state => set(() => ({ myPharmItem: state })),
}));

export { useMyPharmStore };
