import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface TimeSeriesChartProps {
  data: any[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.map((item) => item[0]), 
    },
  };

  const series = [
    {
      name: 'Bookings',
      data: data.map((item) => parseFloat(item[1])), 
    },
  ];

  return (
    <div>
      <h2>Time Series Chart</h2>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
