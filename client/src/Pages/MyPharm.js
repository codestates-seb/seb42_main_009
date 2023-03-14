/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import Banner from '../components/Banner'
import MyPharmInput from '../components/MyPharmInput';
import MyPharmList from '../components/MyPharmList';


const MyPharm = () => {
  return (
    <>
      <Banner><div>복용 약 관리</div></Banner>
      <div className='bodywrap'>
        <MyPharmInput/>
        <MyPharmList/>
        {/* <MyPharmWrap>
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
                <TimeInput/>
              </DateInput>
              <button aria-label='button'><FaPlus/></button>
            </InputBox>
          </FieldSet>
        </MyPharmWrap> */}
      </div>
    </>
  )
}

export default MyPharm