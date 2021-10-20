import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Flex,
  Input
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateUtils from '../util/DateUtils';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const DateTimeSelector = ({ dateRef, monthFirst=false, isDisabled=false, ...baseProps }) => {

  const [selectedDate, setSelectedDate] = useState(dateRef.current);
  const [formatedDate, setFormatedDate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFormatedDate(DateUtils.formatDate(dateRef.current, monthFirst));
  }, []);

  return (
    <Flex { ...baseProps }>
      <Input
        isDisabled={isDisabled}
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
        onTouchEnd={() => openDateTimeSelector(setMode, setShow)}
      />
      <DateTimePickerModal 
        show={show}
        selectedDate={selectedDate} 
        dateRef={dateRef} 
        setShow={setShow} 
        setSelectedDate={setSelectedDate} 
        setFormatedDate={setFormatedDate} 
        setMode={setMode} 
        monthFirst={monthFirst} 
        mode={mode}
        isDisabled={isDisabled}
      />
    </Flex>
  );
}

export default DateTimeSelector;

const DateTimePickerModal = ({ 
  show, selectedDate, dateRef, setShow, setSelectedDate, setFormatedDate, 
  setMode, monthFirst, mode, isDisabled
}) => {
  if (!show)
    return <></>;

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={selectedDate}
      mode={mode}
      is24Hour={true}
      display='default'
      disabled={isDisabled}
      onChange={(event, selection) => onChange(event, selection, selectedDate, 
                                               dateRef, show, setShow, setSelectedDate, 
                                               setFormatedDate, setMode, monthFirst, mode)}
    />
  );
}


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function openDateTimeSelector(setMode, setShow) {
  setMode('date');
  setShow(true);
}

function onChange(event, selectedDateTime, selectedDate, dateRef, show, setShow, 
                  setSelectedDate, setFormatedDate, setMode, monthFirst, mode) {
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
