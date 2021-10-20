import React, { useState, useRef } from 'react';
import {
  Flex,
  Input,
  Heading, 
  Select,
  CheckIcon
} from 'native-base';
import colors from '../../colors';
import DateTimeSelector from '../../components/DateTimeSelector';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const TaskScreen = ({ route }) => {

  const task = buildTaskFromRoute(route, useSelector);

  const [name, setName] = useState(task.name);
  const [course, setCourse] = useState(task.course);

  const navigation = useNavigation();
  const dateBegin = useRef(new Date(task.dateBegin));
  const dateEnd = useRef(new Date(task.dateEnd));

  return (
    <Flex 
      flex={1} 
      alignItems='center' 
      paddingTop={5} 
      style={{backgroundColor: 'white'}}
    >
      <NameField name={name} setName={setName} />
      <CourseField course={course} />
      <DateRangeField dateBegin={dateBegin} dateEnd={dateEnd} />
      <PrimaryButton 
        width='90%' 
        marginTop={5} 
        onPress={() => handleChange(course, name, dateBegin, dateEnd, task.id, navigation)}
      >
        CHANGE
      </PrimaryButton> 
    </Flex>
  );
  
}

export default TaskScreen;

const NameField = ({ name, setName }) => (
  <Flex width='90%'>
    <Heading size='xs'>Name</Heading>
    <Input
      isDisabled={true}
      placeholder='Exam'
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
    />
  </Flex>
);

const CourseField = ({ course }) => {
  return (
    <Flex width='90%'>
      <Heading size='xs'>Course</Heading>
      <Flex width='100%' flexDirection='row'>
      <Select
          isDisabled={true}
          selectedValue={course.id}
          minWidth="200"
          width='100%'
          accessibilityLabel="Choose course"
          placeholder="Course"
          _selectedItem={{
            bg: colors.primary,
            endIcon: <CheckIcon size="5" />
          }}
          style={{
            backgroundColor: 'white',
          }}
          borderStyle='solid'
          borderWidth={1}
          borderLeftRadius={5}
          borderRightRadius={0}
          borderColor={course.color}
          borderLeftWidth={10}
          mb={5}
        >
          <Select.Item key={course.id} label={course.name} value={course.id} />  
        </Select>
      </Flex>
    </Flex>
  );
}

const DateRangeField = ({ dateBegin, dateEnd }) => (
  <Flex width='90%' flexDirection='row' justifyContent='space-between'>
    <BeginDateField dateBegin={dateBegin} />
    <EndDateField dateEnd={dateEnd} />
  </Flex>
);

const BeginDateField = ({ dateBegin }) => (
  <Flex width='45%'>
    <Heading size='xs'>Announcement date</Heading>
    <DateTimeSelector dateRef={dateBegin} monthFirst={false} isDisabled={true} />
  </Flex>
);

const EndDateField = ({ dateEnd }) => (
  <Flex width='45%'>
    <Heading size='xs'>Due date</Heading>
    <DateTimeSelector dateRef={dateEnd} monthFirst={false} isDisabled={true}  />
  </Flex>
);


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function buildTaskFromRoute(route, useSelector) {
  return {
    id: route.params.id,
    name: route.params.name,
    course: getCourseWithId(route.params.course, useSelector),
    dateBegin: route.params.dateBegin,
    dateEnd: route.params.dateEnd
  };
}

function getCourseWithId(courseId, useSelector) {
  const courses = useSelector(state => state.UserReducer.courses);
  
  return courses.filter(course => course.id === courseId)[0];
}

function handleChange(course, name, dateBeginRef, dateEndRef, id, navigation) {
  navigation.navigate('UpdateTaskScreen', { 
    id,
    courseColor: course.color,
    courseId: course.id,
    courseName: course.name, 
    name, 
    dateBegin: dateBeginRef.current.getTime(), 
    dateEnd: dateEndRef.current.getTime(), 
  });
}
