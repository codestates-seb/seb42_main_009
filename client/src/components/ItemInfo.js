import React from 'react';
import { ItemInfoTable } from '../styles/s-item';
import { useMedicineItemStore } from '../Stores/medicineItemStore';

const Iteminfo = () => {
  const { medicineItem } = useMedicineItemStore(state => state);

  return (
    <ItemInfoTable>
      <li>
        <span>용법</span>
        <div>{medicineItem.medicineUse}</div>
      </li>
      <li>
        <span>주의사항</span>
        <div>{medicineItem.medicineWarn}</div>
      </li>
      <li>
        <span>제조사</span>
        <div>{medicineItem.medicineEntp}</div>
      </li>
      <li>
        <span>보관법</span>
        <div>{medicineItem.medicineDeposit}</div>
      </li>
    </ItemInfoTable>
  );
};

export default Iteminfo;
