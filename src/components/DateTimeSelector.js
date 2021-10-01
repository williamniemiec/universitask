import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Flex,
  Input
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateUtils from '../util/DateUtils';

const DateTimeSelector = ({ dateRef, monthFirst=false, ...baseProps }) => {

  const [selectedDate, setSelectedDate] = useState(dateRef.current);
  const [formatedDate, setFormatedDate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  function openDateTimeSelector() {
    setMode('date');
    setShow(true);
  }

  function onChange(event, selectedDateTime) {
    const currentDate = selectedDateTime || selectedDate;

    if (Platform.OS === 'ios') {
      setShow(false);
      setSelectedDate(currentDate);
      setFormatedDate(DateUtils.formatDate(selectedDate, monthFirst));
    }
    else {
      setSelectedDate(currentDate);
      setFormatedDate(DateUtils.formatDate(selectedDate, monthFirst));

      if (show) 
        setMode('time');

      if (event.type == 'set' && mode === 'time') {
        setShow(false);
        dateRef.current = currentDate;
      }
    }
  }

  useEffect(() => {
    setFormatedDate(DateUtils.formatDate(dateRef.current, monthFirst));
  }, []);

  return (
    <Flex { ...baseProps }>
      <Input
        value={formatedDate}
        w={{
          md: "50%",
        }}
        style={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#cccccc',
          marginBottom: 20
        }}
        showSoftInputOnFocus={false}
        onTouchEnd={() => openDateTimeSelector()}
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </Flex>
  );
}

export default DateTimeSelector;
