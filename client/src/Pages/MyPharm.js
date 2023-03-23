import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import Banner from '../components/Banner';
import MyPharmModal from '../components/MyPharmModal';
import { useIsModalOpen } from '../Stores/pharmModalStore';
import {
  PillAddBtn,
  MyPillSection,
  DefaultNone,
  MyPillList,
  MyPharmAddDone,
} from '../styles/s-mypharm';
import { useMyPharmUpdateStore } from '../Stores/myPharmStore';

const MyPharm = () => {
  // memberId 추출
  const location = useLocation();
  const memberId = location.pathname.split('/')[2];

  const { modalOpen, setModalOpen } = useIsModalOpen(state => state);
  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const [myPharmList, setMyPharmList] = useState([]);
  const { myPharmUpdate, setMyPharmUpdate } = useMyPharmUpdateStore(
    state => state,
  );
  const [data] = useState([
    {
      doseId: 1,
      memberId,
      medicineId: 1,
      medicineName: '활명수',
      doseMount: '1개',
      doseNumber: 3,
      doseTimes: ['9:00', '13:00', '18:00'],
    },
    {
      doseId: 2,
      memberId,
      medicineId: 11,
      medicineName: '세나서트2밀리그람질정',
      doseMount: '2캡슐',
      doseNumber: 2,
      doseTimes: ['9:00', '18:00'],
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/pp/doses/info/${memberId}`)
        .then(res => {
          console.log(res.data);
          setMyPharmList(res.data);
          setMyPharmUpdate(false);
        })
        .catch(err => console.log(err));
    }, 500);
  }, [myPharmUpdate]);

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
              {myPharmList.map((item, idx) => (
                <li key={idx}>
                  <p>{idx + 1}</p>
                  <h3>{item.medicineName}</h3>
                  <div className="dose-info">
                    <span>{item.doseMount}</span>
                    <div className="dose-times">
                      {item.doseTimes.split(', ').map((v, i) => (
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
        <ApexCharts
          className="area-chart 복용시간"
          type="rangeBar"
          series={[
            {
              name: '시간표',
              data: [
                {
                  x: '활명수',
                  y: [9, 10.5],
                },
                {
                  x: '세나서트',
                  y: [13, 14.5],
                },
                {
                  x: '활명수',
                  y: [18, 19.5],
                },
                {
                  x: '세나서트',
                  y: [3, 4.5],
                },
              ],
            },
          ]}
          options={{
            chart: {
              height: 250,
              type: 'rangeBar',
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            xaxis: {
              type: 'category',
            },
          }}
        />
      </div>
    </>
  );
};

export default MyPharm;
