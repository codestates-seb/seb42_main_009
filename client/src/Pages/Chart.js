import ApexCharts from 'react-apexcharts';

const Chart = () => {
  console.log('차트 페이지');
  return (
    <>
      <ApexCharts
        className="line-chart"
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
      <div>차트페이지</div>
    </>
  );
};

export default Chart;
