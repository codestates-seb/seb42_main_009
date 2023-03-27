import axios from 'axios';
import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const Chart = () => {
  console.log('차트 페이지');
  const [likesTop10, setLikesTop10] = useState({
    data: [],
    categories: [],
  });
  const [maleRegisterTop10, setMaleRegisterTop10] = useState({
    series: [],
    labels: [],
  });
  const [femaleRegisterTop10, setFemaleRegisterTop10] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    // 전체 좋아요 Top 10
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/medicines/likeDesc`)
      .then(res => {
        const resData = res.data;
        const top10Data = [];
        const top10Category = [];
        resData.forEach(element => {
          top10Data.push(element.medicineLike);
          top10Category.push(element.medicineName);
        });
        setLikesTop10({
          data: top10Data,
          categories: top10Category,
        });
      })
      .catch(err => console.log(err));

    // 남성 등록 약품 수 Top 10
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/doses/gender?gender=남성`)
      .then(res => {
        console.log(res, '남성 등록 약품 top10');
        const resData = res.data;
        const maleSeries = [];
        const maleLabels = [];
        resData.forEach(element => {
          maleSeries.push(element.count);
          maleLabels.push(element.medicineName);
        });
        setMaleRegisterTop10({
          series: maleSeries,
          labels: maleLabels,
        });
      })
      .catch(err => console.log(err));

    // 여성 등록 약품 수 Top 10
    axios
      .get(`${process.env.REACT_APP_API_URL}/pp/doses/gender?gender=여성`)
      .then(res => {
        console.log(res);
        const resData = res.data;
        const femaleSeries = [];
        const femaleLabels = [];
        resData.forEach(element => {
          femaleSeries.push(element.count);
          femaleLabels.push(element.medicineName);
        });
        setFemaleRegisterTop10({
          series: femaleSeries,
          labels: femaleLabels,
        });
      })
      .catch(err => console.log(err));
  }, []);

  console.log(likesTop10);
  console.log(maleRegisterTop10, femaleRegisterTop10);
  return (
    <>
      {/* 남성 */}
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <p className=" mt-40">남성 등록 의약품 Top 10</p>
          <ApexCharts
            className="top10 w-80 h-80"
            type="donut"
            series={maleRegisterTop10.series}
            options={{
              chart: {
                width: 200,
                type: 'donut',
              },
              labels: maleRegisterTop10.labels,
            }}
            width={400}
          />
        </div>

        {/* 여성 */}
        <div className="flex flex-col ml-20">
          <p className="mt-40">여성 등록 의약품 Top 10</p>
          <ApexCharts
            className="top10 w-80 h-80"
            type="donut"
            series={femaleRegisterTop10.series}
            options={{
              chart: {
                width: 200,
              },
              labels: femaleRegisterTop10.labels,
            }}
            width={400}
          />
        </div>
      </div>

      <div>
        <p>전체 좋아요 Top 10</p>
        <ApexCharts
          className="top10 w-500 h-80"
          type="bar"
          series={[
            {
              data: likesTop10.data,
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
              categories: likesTop10.categories,
            },
          }}
        />
      </div>
    </>
  );
};

export default Chart;
