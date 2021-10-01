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
  const [modeBegin, setModeBegin] = useState('date');
  const [showTimeBegin, setShowTimeBegin] = useState(false);
  const [showDateBegin, setShowDateBegin] = useState(false);

  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);

  const openDatetimePickerForBegin = () => {
    setModeBegin('date');
    setShowTimeBegin(true);
    setShowDateBegin(true);
  }

  const onChangeBegin = (event, selectedDate) => {
    console.log(event)
    const currentDate = selectedDate || dateBegin;

    if (Platform.OS === 'ios') {
      setShowBegin(false);
      setDateBegin(currentDate);
    }
    else {
      setDateBegin(currentDate);

      if (showDateBegin) {
        setModeBegin('time');
      }

      if (event.type == 'set' && modeBegin === 'time')
        setShowDateBegin(false);
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;

    if (Platform.OS === 'ios') {
      setShowEnd(currentDate);
    }
    else {
      setDateEnd(currentDate);

      if (modeEnd === 'date' && pressedOpenButton) {
        setModeEnd('time');
        setShowEnd(true);
      }
      else {
        setModeEnd('date');
        setShowEnd(false);
      }
    }

    setPressedOpenButton(false);
  };

  function formatDate(date) {
    return  ((dateBegin.getDate() )) 
            + "/" + ((dateBegin.getMonth() + 1)) 
            + "/" + dateBegin.getFullYear() 
            + "  " + dateBegin.getHours() 
            + ":" + dateBegin.getMinutes();
  }

  function getBeginDate() {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={dateBegin}
        mode='date'
        is24Hour={true}
        display='default'
        onChange={onChangeBegin}
      />
    );
  }

  /*useEffect(() => {
    if (!showBegin && !firstTime)
      setModeBegin('time');
    else
      setModeBegin('date');

    setFirstTime(false);
  }, [showBegin]);
*/
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
            value={formatDate(dateBegin)}
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

          {showDateBegin && (
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
            value={formatDate(dateEnd)}
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
            onTouchEnd={() => {setPressedOpenButton(true);setShowEnd(true);}}
          />
          {/*showEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateEnd}
              mode={modeEnd}
              is24Hour={true}
              display='default'
              onChange={onChangeEnd}
            />
          )*/}
        </Flex>
      </Flex>
      <Button backgroundColor={colors.secondary} width='90%' marginTop={10}>CREATE</Button>
    </Flex>
  );
}

export default CreateTaskScreen;
