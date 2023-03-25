import axios from 'axios';
import { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const Chart = () => {
  console.log('차트 페이지');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/doses/gender?gender=남성`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ApexCharts
        className="line-chart mt-20 w-80 h-80"
        type="line"
        series={[
          { name: '오늘의 기온', data: [19, 26, 20, 9] },
          { name: '내일의 기온', data: [30, 26, 34, 10] },
        ]}
        options={{
          chart: {
            height: 500,
            width: 500,
          },
        }}
      />
      <ApexCharts
        className="top10 w-80 h-80"
        type="donut"
        series={[44, 55, 13, 33]}
        options={{
          chart: {
            width: 200,
          },
        }}
      />
      <ApexCharts
        className="top10 w-80 h-80"
        type="bar"
        series={[
          {
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          },
        ]}
        options={{
          chart: {
            width: 200,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              'South Korea',
              'Canada',
              'United Kingdom',
              'Netherlands',
              'Italy',
              'France',
              'Japan',
              'United States',
              'China',
              'Germany',
            ],
          },
        }}
      />
      <ApexCharts
        className="area-chart w-80 h-80 복용시간"
        type="area"
        series={[
          {
            name: '남성',
            data: [31, 40, 28, 51, 42, 109, 100, 90, 80, 60, 50, 40],
          },
          {
            name: '여성',
            data: [11, 32, 45, 32, 34, 52, 41, 32, 78, 82, 4, 62],
          },
        ]}
        options={{
          chart: {
            height: 200,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'category',
            categories: [
              '06:00',
              '07:30',
              '09:00',
              '10:30',
              '12:00',
              '13:30',
              '15:00',
              '16:30',
              '18:00',
              '19:30',
              '21:00',
              '22:30',
              '24:00',
            ],
          },
          tooltip: {
            x: {
              format: 'HH:mm',
            },
          },
        }}
      />
      <div>차트페이지</div>
    </>
  );
};

export default Chart;
