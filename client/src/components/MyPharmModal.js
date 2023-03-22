import React, { useState } from 'react';
import axios from 'axios';
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
  MyPharmSubmit,
  SearchList,
} from '../styles/s-mypharmmodal';
import TimeInput from './TimeInput';
import { useSearchTextStore } from '../Stores/listSearchStore';
import { useMyPharmStore } from '../Stores/myPharmStore';

const MyPharmModal = ({ setModalOpen }) => {
  const URI = process.env.REACT_APP_API_URL;

  // myPharm Store
  const { myPharmItem, setMyPharmItem } = useMyPharmStore(state => state);

  // 타임테이블
  const [timeIpCount, setTimeIpCount] = useState([0]);
  const [timeTable, setTimeTable] = useState({});
  const timeTableArray = Object.values(timeTable);
  // 약이름찾기
  const { setSearchText } = useSearchTextStore(state => state);
  const [searchTxt, setSearchTxt] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  // 보낼데이터
  const [doseNumber, setDoseNumber] = useState(0);
  const [doseMount, setDoseMount] = useState('');
  const [doseOption, setDoseOption] = useState('정');
  const [medicineId, setMedicineId] = useState(0);
  const doseNumberHandler = e => {
    setDoseNumber(parseInt(e.target.value, 10));
  };
  const doseMountHandler = e => {
    setDoseMount(e.target.value);
  };
  const doseOptionHandler = e => {
    setDoseOption(e.target.value);
  };

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

  const searchHandler = e => {
    const txt = e.target.value;
    setSearchTxt(txt);
  };
  const searchSubmit = async e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setListOpen(true);
      setSearchText(searchTxt);
      await axios
        .get(
          `${URI}/pp/medicines/name?medicineName=${searchTxt}&page=1&size=12`,
        )
        .then(res => {
          const searchMedicine = res.data.data.map(item => {
            const newObj = {};
            return {
              ...newObj,
              medicineId: item.medicineId,
              medicineName: item.medicineName,
            };
          });
          setSearchResult(searchMedicine);
        })
        .catch(err => console.log(err));
    }
  };
  const listSelect = (e, id) => {
    const selected = e.target.textContent;
    setMedicineId(id);
    setSearchTxt(selected);
    setListOpen(false);
  };

  // 추가하기
  const doseSubmit = () => {
    const myDose = {
      memberId: 1,
      medicineId,
      doseMount: `${doseMount}${doseOption}`,
      doseNumber,
      doseTimes: timeTableArray.join(','),
    };
    setMyPharmItem({
      medicineId,
      medicineName: searchTxt,
      doseMount: `${doseMount}${doseOption}`,
      doseNumber,
      doseTimes: timeTableArray,
    });
    axios
      .post(`${process.env.REACT_APP_API_URL}/pp/doses`, myDose, {
        withCredentials: true,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log(myDose);
    console.log(myPharmItem);
    modalCloseBtn();
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
                value={searchTxt}
                onChange={searchHandler}
                onKeyDown={searchSubmit}
                required
              />
              <SearchList className={listOpen ? 'list-open' : null}>
                {searchResult.map(item => (
                  <li
                    role="presentation"
                    onClick={e => listSelect(e, item.medicineId)}
                    onKeyDown={e => listSelect(e, item.medicineId)}
                    key={item.medicineId}
                    medId={item.medicineId}
                  >
                    {item.medicineName}
                  </li>
                ))}
              </SearchList>
              <FieldTooltip>
                <FaInfoCircle />
                <p>복용 중인 약 이름을 입력하세요.</p>
              </FieldTooltip>
            </FieldBox>
          </FieldSet>
          <FieldSet>
            <FieldTitle>현재 복용량과 복용 기간을 입력해 주세요.</FieldTitle>
            <FieldBox>
              <label htmlFor="medicine_number">복용횟수</label>
              <FieldInput
                type="number"
                id="medicine_number"
                value={doseNumber}
                onChange={doseNumberHandler}
              />
              <span>회</span>
              <FieldTooltip>
                <FaInfoCircle />
                <p>1일 복용 횟수를 입력하세요.</p>
              </FieldTooltip>
            </FieldBox>
            <FieldBox>
              <label htmlFor="medicine_mount">복용량</label>
              <FieldInput
                type="number"
                id="medicine_mount"
                value={doseMount}
                onChange={doseMountHandler}
              />
              <FieldSelect>
                <select onChange={doseOptionHandler}>
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
            <MyPharmSubmit
              onClick={doseSubmit}
              disabled={searchTxt === '' || doseMount === '' || doseNumber <= 0}
            >
              추가하기
            </MyPharmSubmit>
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
