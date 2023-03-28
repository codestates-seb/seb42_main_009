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

const useMyPharmUpdateStore = create(set => ({
  myPharmUpdate: false,
  setMyPharmUpdate: state => set(() => ({ myPharmUpdate: state })),
}));

const useMyPharmDoseId = create(set => ({
  myPharmDoseId: 0,
  setMyPharmDoseId: state => set(() => ({ myPharmDoseId: state })),
}));

export { useMyPharmStore, useMyPharmUpdateStore, useMyPharmDoseId };
