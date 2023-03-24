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

  // 차트에 들어갈 data 정제
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/pp/doses/info/${memberId}`)
        .then(res => {
          setMyPharmList(res.data);
          const resList = res.data;
          console.log(resList);
          const chartList = [];
          resList.forEach(item => {
            const tiemTableList = item.doseTimes.split(', ');
            tiemTableList.forEach(timeTable => {
              const timeTableNumber = Number(timeTable.slice(0, 2));
              console.log(chartData);
              chartList.push({
                x: item.medicineName,
                y: [timeTableNumber, timeTableNumber + 1],
              });
            });
          });
          setChartData(chartList);
          setMyPharmUpdate(false);
        })
        .catch(err => console.log(err));
    }, 500);
  }, [myPharmUpdate]);

  console.log(chartData);

  return (
    <>
      <Banner>
        <div>내 약 관리</div>
      </Banner>
      <div className="bodywrap">
        <PillAddBtn onClick={modalHandler}>약 추가하기</PillAddBtn>
        {modalOpen ? <MyPharmModal setModalOpen={setModalOpen} /> : null}

        <MyPillSection>
          {myPharmList.length === 0 ? (
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
              data: chartData,
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
