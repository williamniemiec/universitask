import React, { useState, useRef, useEffect } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  Flex,
  Input,
  Heading, 
  Select,
  CheckIcon,
  ScrollView
} from 'native-base';
import colors from '../../colors';
import PlusButton from '../../components/buttons/PlusButton';
import DateTimeSelector from '../../components/DateTimeSelector';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import CreateCourseModal from './CreateCourseModal';
import Container from '../../components/template/Container';
import HeaderTitle from '../../components/template/HeaderTitle';
import translate from '../../locales';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const CreateTaskScreen = ({refresh}) => {

  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [hasCourses, setHasCourses] = useState(false);
  const [updateCourses, setUpdateCourses] = useState(false);
  const [landscape, setLandscape] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dateBegin = useRef(new Date());
  const dateEnd = useRef(new Date());
  const color = useRef(colors.blur);
  let courses = useSelector(state => state.UserReducer.courses);

  if (!courses) {
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }];
  }

  function isLandscape() {
    const dim = Dimensions.get('screen');
      
    return (dim.width >= dim.height);
  }

  Dimensions.addEventListener('change', () => {
    setLandscape(isLandscape());
  });

  useEffect(() => {
    setHasCourses(courses.length > 0);
  }, [updateCourses]);

  return (
    <Container>
      <HeaderTitle>{translate('NEW_TASK')}</HeaderTitle>
      <ScrollView>
        <Flex 
          flex={1} 
          alignItems='center' 
          paddingTop={5}
          marginBottom={35}
          style={{backgroundColor: 'white'}}
        >
          <NameField name={name} setName={setName} />
          <CourseField 
            hasCourses={hasCourses}
            colorRef={color} 
            courses={courses} 
            course={course} 
            setCourse={setCourse} 
            handleNewCourse={() => setShowModal(true)}
            landscape={landscape}
          />
          <CreateCourseModal 
            show={showModal} 
            onClose={() => setShowModal(false)}
            courseName={courseName} 
            setCourseName={setCourseName} 
            onCreateCourse={() => handleNewCourse(dispatch, setShowModal, setCourse, 
                                                  courseName, setCourseName, color, 
                                                  setUpdateCourses)} 
            colorRef={color}
          />
          <DateRangeField dateBegin={dateBegin} dateEnd={dateEnd} />
          <PrimaryButton 
            width='90%' 
            marginTop={5} 
            onPress={() => handleNewTask(course, name, dateBegin, dateEnd, dispatch, 
                                        navigation, setName, setCourse, setCourseName, 
                                        color)}
          >
            {translate('CREATE').toUpperCase()}
          </PrimaryButton> 
        </Flex>
      </ScrollView>
    </Container>
  );
}

export default CreateTaskScreen;

const NameField = ({ name, setName }) => (
  <Flex width='90%'>
    <Heading size='xs'>{translate('NAME')}</Heading>
    <Input
      placeholder='Exam'
      value={name}
      w={{
        md: "100%",
      }}
      style={{
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#cccccc',
        marginBottom: 20
      }}
      autoFocus={true}
      onChangeText={setName}
    />
  </Flex>
);

const CourseField = ({ colorRef, courses, course, setCourse, handleNewCourse, hasCourses, landscape }) => {

  function getCourseColor(id) {
    const c = courses.find(c => c.id == id);

    return c ? c.color : '#cccccc';
  }

  return (
    <Flex width='90%'>
      <Heading size='xs'>{translate('COURSE')}</Heading>
      <Flex flexDirection='row'>
      <Select
          isDisabled={!hasCourses}
          selectedValue={course}
          minWidth="200"
          width={landscape ? '94%' : '86%'}
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
          borderColor={colorRef.current}
          borderLeftWidth={10}
          mb={5}
          onValueChange={(itemValue) => {setCourse(itemValue); colorRef.current = getCourseColor(itemValue)}}
        >
          {courses.map((c, index) => (
            <Select.Item key={c.id} label={c.name} value={c.id} />  
          ))}
        </Select>
        <PlusButton color={colors.secondary} onPress={handleNewCourse} />
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
    <Heading size='xs'>{translate('ANNOUNCEMENT_DATE')}</Heading>
    <DateTimeSelector dateRef={dateBegin} monthFirst={false} />
  </Flex>
);

const EndDateField = ({ dateEnd }) => (
  <Flex width='45%'>
    <Heading size='xs'>{translate('DUE_DATE')}</Heading>
    <DateTimeSelector dateRef={dateEnd} monthFirst={false} />
  </Flex>
);



//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function handleNewCourse(dispatch, setShowModal, setCourse, courseName, setCourseName, 
                         colorRef, setUpdateCourses) {
  if (!isValidName(courseName)) {
    displayInvalidCourseNameAlert();
    return;
  }

  setShowModal(false);
  persistCourse(dispatch, courseName, colorRef);
  clearModalFields(setCourse, setCourseName, colorRef);
  setUpdateCourses(true);
}

function isValidName(name) {
  return (name.trim().length !== 0);
}

function displayInvalidCourseNameAlert() {
  Alert.alert(
    translate('ERROR'),
    translate('COURSE_NAME_REQUIRED'),
    [
      {
        text: translate('OK').toUpperCase(),
        style: "cancel"
      }
    ]
  );
}

function persistCourse(dispatch, courseName, colorRef) {
  dispatch({
    type: 'INSERT_COURSE',
    payload: {
      name: courseName,
      color: colorRef.current
    }
  });
}

function clearModalFields(setCourse, setCourseName, colorRef) {
  setCourse('');
  setCourseName('');
  colorRef.current = colors.blur;
}

function handleNewTask(course, name, dateBeginRef, dateEndRef, dispatch, 
                       navigation, setName, setCourse, setCourseName, colorRef) {
  if (!isValidName(course)) {
    displayInvalidCourseAlert();
    return;
  }

  if (!isValidName(name)) {
    displayInvalidNameAlert();
    return;
  }

  if (taskStartsAfterDeadline(dateBeginRef, dateEndRef)) {
    displayInvalidDateAlert();
    return;
  }

  persistTask(dispatch, name, course, dateBeginRef, dateEndRef);
  clearFields(setName, setCourse, setCourseName, colorRef, dateBeginRef, dateEndRef);
  goToHomeScreen(navigation);
}

function displayInvalidCourseAlert() {
  Alert.alert(
    translate('ERROR'),
    translate('COURSE_REQUIRED'),
    [
      {
        text: translate('OK').toUpperCase(),
        style: "cancel"
      }
    ]
  );
}

function displayInvalidNameAlert() {
  Alert.alert(
    translate('ERROR'),
    translate('TASK_NAME_REQUIRED'),
    [
      {
        text: translate('OK').toUpperCase(),
        onPress: () => {},
        style: "cancel"
      }
    ]
  );
}

function taskStartsAfterDeadline(dateBeginRef, dateEndRef) {
  return (dateBeginRef.current.getTime() > dateEndRef.current.getTime());
}

function displayInvalidDateAlert() {
  Alert.alert(
    translate('ERROR'),
    translate('TASK_AFTER_DEADLINE'),
    [
      {
        text: translate('OK').toUpperCase(),
        onPress: () => {},
        style: "cancel"
      }
    ]
  );
}

function persistTask(dispatch, name, course, dateBeginRef, dateEndRef) {
  dispatch({
    type: 'INSERT_TASK',
    payload: {
      name: name,
      course: course,
      dateBegin: dateBeginRef.current.getTime(),
      dateEnd: dateEndRef.current.getTime()
    }
  });
}

function clearFields(setName, setCourse, setCourseName, colorRef, dateBeginRef, dateEndRef) {
  setName('');
  setCourse('');
  setCourseName('');
  colorRef.current = colors.blur;
  dateBeginRef.current = new Date();
  dateEndRef.current = new Date();
}

function goToHomeScreen(navigation) {
  navigation.navigate('HomeScreen', { new: true });
}
