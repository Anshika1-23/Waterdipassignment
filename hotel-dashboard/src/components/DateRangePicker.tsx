import React from 'react';

interface DateRangePickerProps {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ setStartDate, setEndDate }) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value ? new Date(e.target.value) : null);
  };

  return (
    <div>
      <label>
        Start Date:
        <input type="date" onChange={handleStartDateChange} />
      </label>
      <label>
        End Date:
        <input type="date" onChange={handleEndDateChange} />
      </label>
    </div>
  );
};

export default DateRangePicker;
