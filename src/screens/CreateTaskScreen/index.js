import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Flex,
  Input,
  Heading, 
  Button
} from 'native-base';
import colors from '../../colors';
import DateTimePicker from '@react-native-community/datetimepicker';

function CreateTaskScreen() {

  const [dateBegin, setDateBegin] = useState(new Date(1598051730000));
  const [formatedDateBegin, setFormatedDateBegin] = useState('');
  const [modeBegin, setModeBegin] = useState('date');
  const [showBegin, setShowBegin] = useState(false);

  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [formatedDateEnd, setFormatedDateEnd] = useState('');
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);

  function openDatetimePickerForBegin() {
    setModeBegin('date');
    setShowBegin(true);
  }

  function onChangeBegin(event, selectedDate) {
    const currentDate = selectedDate || dateBegin;

    if (Platform.OS === 'ios') {
      setShowBegin(false);
      setDateBegin(currentDate);
    }
    else {
      setDateBegin(currentDate);

      if (showBegin) {
        setModeBegin('time');
      }

      if (event.type == 'set' && modeBegin === 'time')
        setShowBegin(false);
    }
  }

  function openDatetimePickerForEnd() {
    setModeEnd('date');
    setShowEnd(true);
  }

  function onChangeEnd(event, selectedDate) {
    const currentDate = selectedDate || dateEnd;

    if (Platform.OS === 'ios') {
      setShowEnd(false);
      setDateEnd(currentDate);
    }
    else {
      setDateEnd(currentDate);

      if (showEnd) {
        setModeEnd('time');
      }

      if (event.type == 'set' && modeEnd === 'time')
        setShowEnd(false);
    }
  }

  function formatDate(date) {
    return  ((date.getDate() )) 
            + "/" + ((date.getMonth() + 1)) 
            + "/" + date.getFullYear() 
            + "  " + date.getHours() 
            + ":" + date.getMinutes();
  }

  useEffect(() => {
    setFormatedDateBegin(formatDate(dateBegin));
  }, [dateBegin]);

  useEffect(() => {
    setFormatedDateEnd(formatDate(dateEnd));
  }, [dateEnd]);

  return (
    <Flex flex={1} alignItems='center' paddingTop={5} style={{backgroundColor: 'white'}}>
      <Flex width='90%'>
        <Heading size='xs'>Name</Heading>
        <Input
          placeholder="Mavin"
          w={{
            md: "50%",
          }}
          style={{
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#cccccc',
            marginBottom: 20
          }}
        />
      </Flex>
      <Flex width='90%'>
        <Heading size='xs'>Course</Heading>
        <Flex width='100%' flexDirection='row'>
          <Input
            placeholder="Artificial Intelligence"
            w={{
              md: "50%",
              base: "88%"
            }}
            style={{
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#cccccc',
              marginBottom: 20
            }}
          />
          <Button 
          height={46} 
            _text={{
              color: "#1F2937",
              fontSize: 30
            }}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderColor: '#cccccc',
            }}
          >
            +
          </Button>
        </Flex>
      </Flex>
      <Flex width='90%' flexDirection='row'>
        <Flex width='50%'>
          <Heading size='xs'>Begin</Heading>
          <Input
            value={formatedDateBegin}
            w={{
              md: "50%",
            }}
            style={{
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#cccccc',
              marginBottom: 20,
              marginRight: 20
            }}
            showSoftInputOnFocus={false}
            onTouchEnd={() => openDatetimePickerForBegin()}
          />

          {showBegin && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateBegin}
              mode={modeBegin}
              is24Hour={true}
              display='default'
              onChange={onChangeBegin}
            />
          )}
        </Flex>
        <Flex width='50%'>
          <Heading size='xs'>End</Heading>
          <Input
            value={formatedDateEnd}
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
            onTouchEnd={() => openDatetimePickerForEnd()}
          />
          {showEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateEnd}
              mode={modeEnd}
              is24Hour={true}
              display='default'
              onChange={onChangeEnd}
            />
          )}
        </Flex>
      </Flex>
      <Button backgroundColor={colors.secondary} width='90%' marginTop={10}>CREATE</Button>
    </Flex>
  );
}

export default CreateTaskScreen;
