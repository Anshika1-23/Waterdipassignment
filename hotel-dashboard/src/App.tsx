import React, { useState, useEffect } from 'react';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import DateRangePicker from './components/DateRangePicker';
import { ApexOptions } from 'apexcharts';
import csvData from './hotel_bookings_1000.csv';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvData);
      const text = await response.text();
      const parsedData = text.split('\n').map((row) => row.split(','));
      setData(parsedData.slice(1)); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter((row) => {
        const date = new Date(row[0]); 
        return date >= startDate && date <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, startDate, endDate]);

  return (
    <div className="App">
      <h1>Hotel Bookings Dashboard</h1>
      <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      <TimeSeriesChart data={filteredData} />
      <ColumnChart data={filteredData} />
      <SparklineChart title="Sparklines" data={filteredData} />
    </div>
  );
};

export default App;
