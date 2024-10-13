import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ColumnChartProps {
  data: any[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
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
      <h2>Column Chart</h2>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
