/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { FaPlus,FaInfoCircle } from "react-icons/fa";

const MyPharmWrap = styled.div`
  margin-top: 50px;
`;
const FieldSet = styled.div`
  margin-bottom: 30px;
`;
const FieldTitle = styled.h2`
  font-size: var(--fz-md);
  margin-bottom: 10px;
  font-weight: 600;
`;
const FieldBox = styled.div`
  position: relative; display: flex; justify-content: flex-start; align-items: center;
  background: var(--palebl); border-radius: 6px; padding: 15px 10px;
  label {
    width: 100px; text-align: center; font-weight: 600; color: var(--mainbl);
  }
`;
const FieldInput = styled.input`
  width: ${props=>props.width||'180px'};
  background: #fff;
  height: 34px;
  border-radius: 6px; padding: 0 10px; border: 1px solid var(--mainbl);
`;
const FieldTooltip = styled.div`
  position: relative; margin-left: 15px;
  color: var(--mainbl); font-size: 14px; cursor: pointer;
  > p {
    position: absolute;
  opacity: 0; visibility: hidden;
    left: calc(100% + 5px); top: 50%; transform: translateY(-50%); padding: 6px; border-radius: 6px; background: var(--nightbl); color: #fff;
  }
  &:hover p {
    opacity: 1; visibility: visible; width: max-content;
  }
`;

const MyPharmInput = () => {
  return (
    <MyPharmWrap>
      <FieldSet>
        <FieldTitle>현재 복용하고 있는 의약품의 이름을 입력해 주세요.</FieldTitle>
        <FieldBox>
          <label htmlFor='medicine_name'>약품명</label>
          <FieldInput type='text' id='medicine_name' />
          <FieldTooltip><FaInfoCircle/><p>복용 중인 약 이름을 입력하세요.</p></FieldTooltip>
        </FieldBox>
      </FieldSet>
      <FieldSet>
        
      </FieldSet>
    </MyPharmWrap>
  )
}

export default MyPharmInput