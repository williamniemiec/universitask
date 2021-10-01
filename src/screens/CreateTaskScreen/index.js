import React, { useState, useRef } from 'react';
import {
  Flex,
  Input,
  Heading, 
  Button,
  Select,
  CheckIcon
} from 'native-base';
import colors from '../../colors';
import PlusButton from '../../components/buttons/PlusButton';
import DateTimeSelector from '../../components/DateTimeSelector';
import { useDispatch, useSelector } from 'react-redux';

function CreateTaskScreen() {

  const [name, setName] = useState('');
  const [course, setCourse] = useState('1');

  const dispatch = useDispatch();
  const courses = useSelector(state => state.UserReducer.courses);

  const dateBegin = useRef(new Date());
  const dateEnd = useRef(new Date());

  function handleNewTask() {
    dispatch({
      type: 'INSERT_TASK',
      payload: {
        name: name,
        course: course,
        dateBegin: dateBegin,
        dateEnd: dateEnd
      }
    });
  }

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

  // TODO: estatico -> dinamico
  const CourseField = () => (
    <Flex width='90%'>
      <Heading size='xs'>Course</Heading>
      <Flex width='100%' flexDirection='row'>
      <Select
          selectedValue={course}
          minWidth="200"
          width='88%'
          accessibilityLabel="Choose course"
          placeholder="Course"
          _selectedItem={{
            bg: colors.secondary,
            endIcon: <CheckIcon size="5" />
          }}
          style={{
            backgroundColor: 'white',
          }}
          borderStyle='solid'
          borderWidth={1}
          borderLeftRadius={5}
          borderRightRadius={0}
          borderColor='#cccccc'
          mb={5}
          onValueChange={(itemValue) => setCourse(itemValue)}
        >
          <Select.Item label="UX Research" value="1" />
          <Select.Item label="Web Development" value="2" />
          <Select.Item label="Cross Platform Development" value="3" />
          <Select.Item label="UI Designing" value="4" />
          <Select.Item label="Backend Development" value="5" />
        </Select>
        <PlusButton onPress={() => alert('PRESSIONOU')} />
      </Flex>
    </Flex>
  );

  const DateRangeField = () => (
    <Flex width='90%' flexDirection='row' justifyContent='space-between'>
      <BeginDateField />
      <EndDateField />
    </Flex>
  );

  const BeginDateField = () => (
    <Flex width='45%'>
      <Heading size='xs'>Begin</Heading>
      <DateTimeSelector dateRef={dateBegin} monthFirst={false} />
    </Flex>
  );

  const EndDateField = () => (
    <Flex width='45%'>
      <Heading size='xs'>End</Heading>
      <DateTimeSelector dateRef={dateEnd} monthFirst={false} />
    </Flex>
  );

  const CreateButton = () => (
    <Button 
      backgroundColor={colors.secondary} 
      width='90%' 
      marginTop={5}
      onPress={handleNewTask}
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
