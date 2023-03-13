import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Banner from '../components/Banner'

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
const InputBox = styled.div`
  display: flex; justify-content: flex-start; align-items: center;
  background: var(--palebl); padding: 15px 0; border-radius: 6px; margin-bottom: 5px;
  label {
    font-size: var(--fz-base);
    flex: none;
    width: 100px;
    text-align: center;
  }
`;
const TextInput = styled.input`
  width: 300px; height: 40px; border: 1px solid var(--mainbl); border-radius: 6px; padding: 0 10px; background: #fff;
`;
const DateInput = styled.div`
  position: relative;
  span {
    position: absolute;
  }
  input {border: 1px solid var(--mainbl); height: 40px; border-radius: 6px; padding: 0 10px; background: #fff;}
`;


const MyPharm = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Banner><div>복용 약 관리</div></Banner>
      <div className='bodywrap'>
        <MyPharmWrap>
          <FieldSet>
            <FieldTitle>현재 복용하고 있는 의약품의 이름을 입력해 주세요.</FieldTitle>
            <InputBox>
              <label htmlFor='medicine_name'>약품명</label>
              <TextInput type='text' id='medicine_name' />
            </InputBox>
          </FieldSet>
          <FieldSet>
            <FieldTitle>현재 복용량과 복용 기간을 입력해 주세요.</FieldTitle>
            <InputBox>
              <label htmlFor='medicine_day'>1일 복용 횟수</label>
              <TextInput type='text' id='medicine_day' />
            </InputBox>
            <InputBox>
              <label htmlFor='medicine_count'>1회 복용량</label>
              <TextInput type='text' id='medicine_count' />
            </InputBox>
            <InputBox>
              <label htmlFor='medicine_time'>복용 시간</label>
              <DateInput>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </DateInput>
              <button aria-label='button'><FaPlus/></button>
            </InputBox>
          </FieldSet>
        </MyPharmWrap>
      </div>
    </>
  )
}

export default MyPharm