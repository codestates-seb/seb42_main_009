import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { FieldSelectDown, TimeSelect } from '../styles/s-mypharmmodal';

const TimeInput = ({ timeTable, setTimeTable, objectKey }) => {
  const [startDate, setStartDate] = useState('');
  const [inputDisplay, setInputDisplay] = useState(true);

  const deleteBtn = () => {
    const copyTimeTable = { ...timeTable };
    delete copyTimeTable[objectKey];
    setTimeTable({
      ...copyTimeTable,
    });
    setInputDisplay(false);
  };

  useEffect(() => {
    const timeType = new Date(startDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    if (timeType !== 'Invalid Date') {
      setTimeTable({
        ...timeTable,
        [objectKey]: timeType,
      });
    }
  }, [startDate]);

  return (
    <div>
      {inputDisplay ? (
        <TimeSelect>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            required
          />
          <FieldSelectDown>
            <FaChevronDown />
          </FieldSelectDown>
          <button
            onClick={deleteBtn}
            className="time-delete"
            aria-label="button"
          >
            <FaTimes />
          </button>
        </TimeSelect>
      ) : null}
    </div>
  );
};

export default TimeInput;
