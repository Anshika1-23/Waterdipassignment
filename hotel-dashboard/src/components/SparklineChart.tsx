import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface SparklineChartProps {
  title: string;
  data: any[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ title, data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      sparkline: { enabled: true },
    },
    title: { text: title },
  };

  const series = [
    {
      data: data.map((item) => parseFloat(item[1])), 
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={100} />
    </div>
  );
};

export default SparklineChart;
