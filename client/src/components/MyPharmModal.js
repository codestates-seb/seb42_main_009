import React, { useState } from 'react';
import { FaPlus, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {
  MyPharmWrap,
  MyPharmModalWrap,
  MyPharmModalBox,
  FieldSet,
  FieldTitle,
  FieldBox,
  FieldInput,
  FieldSelect,
  FieldSelectDown,
  FieldTooltip,
  Flexbox,
  MyPharmBtnWrap,
  MyPharmSubmit
} from '../styles/s-mypharmmodal';
import TimeInput from './TimeInput';

const MyPharmModal = ({ setModalOpen }) => {
  const [timeIpCount, setTimeIpCount] = useState([0]);
  const [timeTable, setTimeTable] = useState({});
  

  const timeTableArray = Object.values(timeTable);
  console.log(timeTableArray);
  const addTimeInput = () => {
    const timeArr = [...timeIpCount];
    let counter = timeArr.slice(-1)[0];
    counter += 1;
    timeArr.push(counter);
    setTimeIpCount(timeArr);
  };
  const modalCloseBtn = () => {
    setModalOpen(false);
  };


  return (
    <MyPharmWrap>
      <MyPharmModalWrap>
        <button
          className="modal-close"
          onClick={modalCloseBtn}
          onKeyDown={modalCloseBtn}
        >
          <IoMdClose />
        </button>
        <MyPharmModalBox>
          <FieldSet>
            <FieldTitle>
              현재 복용하고 있는 의약품의 이름을 입력해 주세요.
            </FieldTitle>
            <FieldBox>
              <label htmlFor="medicine_name">약품명</label>
              <FieldInput
                type="text"
                id="medicine_name"
                width="160px"
                required
              />
              <FieldTooltip>
                <FaInfoCircle />
                <p>복용 중인 약 이름을 입력하세요.</p>
              </FieldTooltip>
            </FieldBox>
          </FieldSet>
          <FieldSet>
            <FieldTitle>현재 복용량과 복용 기간을 입력해 주세요.</FieldTitle>
            <FieldBox>
              <label htmlFor="medicine_count">복용횟수</label>
              <FieldInput type="number" id="medicine_count" />
              <span>회</span>
              <FieldTooltip>
                <FaInfoCircle />
                <p>1일 복용 횟수를 입력하세요.</p>
              </FieldTooltip>
            </FieldBox>
            <FieldBox>
              <label htmlFor="medicine_dose">복용량</label>
              <FieldInput type="number" id="medicine_dose" />
              <FieldSelect>
                <select>
                  <option value="정">정</option>
                  <option value="포">포</option>
                  <option value="캡슐">캡슐</option>
                  <option value="cc">cc</option>
                  <option value="ml">ml</option>
                  <option value="g">g</option>
                </select>
                <FieldSelectDown>
                  <FaChevronDown />
                </FieldSelectDown>
              </FieldSelect>
              <FieldTooltip>
                <FaInfoCircle />
                <p>1회 복용시 용량을 입력하세요.</p>
              </FieldTooltip>
            </FieldBox>
            <FieldBox>
              <label htmlFor="medicine_time">
                복용시간
                <button onClick={addTimeInput}>
                  <FaPlus />
                </button>
              </label>
              <Flexbox>
                {timeIpCount.map((item, idx) => (
                  <TimeInput
                    key={idx}
                    objectKey={idx}
                    timeTable={timeTable}
                    setTimeTable={setTimeTable}
                  />
                ))}
              </Flexbox>
            </FieldBox>
          </FieldSet>
          <MyPharmBtnWrap>
            <MyPharmSubmit>추가하기</MyPharmSubmit>
            <MyPharmSubmit
              background="var(--red-1)"
              color="var(--red-2)"
              hoverBg="var(--red-2)"
            >
              삭제하기
            </MyPharmSubmit>
          </MyPharmBtnWrap>
        </MyPharmModalBox>
      </MyPharmModalWrap>
    </MyPharmWrap>
  );
};

export default MyPharmModal;
