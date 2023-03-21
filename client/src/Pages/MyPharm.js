import { React, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import MyPharmModal from '../components/MyPharmModal';
import { useMyPharmStore } from '../Stores/myPharmStore';
import { useIsModalOpen } from '../Stores/pharmModalStore';
import {
  PillAddBtn,
  MyPillSection,
  DefaultNone,
  MyPillList,
  MyPharmAddDone,
} from '../styles/s-mypharm';

const MyPharm = () => {
  const { modalOpen, setModalOpen } = useIsModalOpen(state => state);
  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const [data, setData] = useState([
    {
      doseId: 1,
      memberId: 1,
      medicineId: 1,
      medicineName: '활명수',
      doseMount: '1개',
      doseNumber: 3,
      doseTimes: ['9:00', '13:00', '18:00'],
    },
    {
      doseId: 2,
      memberId: 1,
      medicineId: 11,
      medicineName: '세나서트2밀리그람질정',
      doseMount: '2캡슐',
      doseNumber: 2,
      doseTimes: ['9:00', '18:00'],
    },
  ]);
  const { myPharmItem } = useMyPharmStore(state => state);
  console.log(myPharmItem);

  useEffect(() => {
    setData([...data]);
  }, []);

  // myPharmItem

  console.log(data);
  return (
    <>
      <Banner>
        <div>내 약 관리</div>
      </Banner>
      <div className="bodywrap">
        <PillAddBtn onClick={modalHandler}>약 추가하기</PillAddBtn>
        {modalOpen ? <MyPharmModal setModalOpen={setModalOpen} /> : null}

        <MyPillSection>
          {data.length === 0 ? (
            <DefaultNone>복용하고 있는 약을 입력해주세요.</DefaultNone>
          ) : (
            <MyPillList>
              {data.map((item, idx) => (
                <li key={idx}>
                  <p>{item.doseId}</p>
                  <h3>{item.medicineName}</h3>
                  <div className="dose-info">
                    <span>{item.doseMount}</span>
                    <div className="dose-times">
                      {item.doseTimes.map((v, i) => (
                        <span key={i}>{v}</span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </MyPillList>
          )}
        </MyPillSection>
        <MyPharmAddDone>내 약 추가 완료</MyPharmAddDone>
      </div>
    </>
  );
};

export default MyPharm;
