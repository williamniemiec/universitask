import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import {
  Flex,
  Input,
  Heading, 
  Button
} from 'native-base';
import colors from '../../colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateUtils from '../../util/DateUtils';
import PlusButton from '../../components/buttons/PlusButton';
import DateTimeSelector from '../../components/DateTimeSelector';

function CreateTaskScreen() {

  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const dateBegin = useRef(new Date());
  const dateEnd = useRef(new Date());

  const NameField = () => (
    <Flex width='90%'>
      <Heading size='xs'>Name</Heading>
      <Input
        placeholder='Mavin'
        value={name}
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
        onChange={event => setName(event.target.value)}
      />
    </Flex>
  );

  const CourseField = () => (
    <Flex width='90%'>
      <Heading size='xs'>Course</Heading>
      <Flex width='100%' flexDirection='row'>
        <Input
          placeholder="Artificial Intelligence"
          value={course}
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
          onChange={event => setCourse(event.target.value)}
        />
        <PlusButton onPress={() => alert('PRESSIONOU')} />
      </Flex>
    </Flex>
  );

  const DateRangeField = () => (
    <Flex width='90%' flexDirection='row'>
      <BeginDateField />
      <EndDateField />
    </Flex>
  );

  const BeginDateField = () => (
    <Flex width='50%'>
      <Heading size='xs'>Begin</Heading>
      <DateTimeSelector dateRef={dateBegin} monthFirst={false} />
    </Flex>
  );

  const EndDateField = () => (
    <Flex width='50%'>
      <Heading size='xs'>End</Heading>
      <DateTimeSelector dateRef={dateEnd} monthFirst={false} />
    </Flex>
  );

  const CreateButton = () => (
    <Button 
      backgroundColor={colors.secondary} 
      width='90%' 
      marginTop={10}
    >
      CREATE
    </Button> 
  );

  return (
    <Flex 
      flex={1} 
      alignItems='center' 
      paddingTop={5} 
      style={{backgroundColor: 'white'}}
    >
      <NameField />
      <CourseField />
      <DateRangeField />
      <CreateButton />
    </Flex>
  );
}

export default CreateTaskScreen;
