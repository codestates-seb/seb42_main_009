import React from 'react';
import styled from 'styled-components';
import { useMedicineItemStore } from '../Stores/medicineItemStore';

const ItemInfoTable = styled.ul`
  li {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > span {
      width: 100px;
      line-height: 20px;
      align-self: stretch;
      background: var(--lightbl);
      padding: 15px 10px;
      color: #fff;
      font-weight: 600;
      border-bottom: 1px solid #fff;
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
    > div {
      width: calc(100% - 100px);
      line-height: 20px;
      padding: 15px 10px;
      border-bottom: 1px solid var(--lightbl);
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
    @media (max-width: 768px) {
      font-size: var(--fz-sm);
    }
  }
`;

const Iteminfo = () => {
  const { medicineItem } = useMedicineItemStore(state => state);
  console.log(medicineItem);

  return (
    <ItemInfoTable>
      <li>
        <span>용법</span>
        <div>{medicineItem.medicineUse}</div>
      </li>
      <li>
        <span>주의사항</span>
        <div>{medicineItem.medicineDeposit}</div>
      </li>
      <li>
        <span>제조사</span>
        <div>{medicineItem.medicineEntp}</div>
      </li>
      <li>
        <span>보관법</span>
        <div>{medicineItem.medicineWarn}</div>
      </li>
      {/* <li>
        <span>성분,함량</span>
        <div>
          습기와 빛을 피해 실온에서 보관하십시오.습기와 빛을 피해 실온에서
          보관하십시오.습기와 빛을 피해 실온에서 보관하십시오.습기와 빛을 피해
          실온에서 보관하십시오.습기와 빛을 피해 실온에서 보관하십시오.습기와
          빛을 피해 실온에서 보관하십시오.습기와 빛을 피해 실온에서
          보관하십시오.
        </div>
      </li> */}
    </ItemInfoTable>
  );
};

export default Iteminfo;
