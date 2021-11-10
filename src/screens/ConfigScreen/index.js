import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { Flex, Button } from 'native-base';
import colors from '../../colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import UpdateRemoveCourseModal from './UpdateRemoveCourseModal';
import Container from '../../components/template/Container';
import HeaderTitle from '../../components/template/HeaderTitle';
import translate from '../../locales';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const ConfigScreen = () => {

  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const color = useRef(colors.blur);
  let courses = useSelector(state => state.UserReducer.courses);

  if (!courses) {
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }];
  }

  return (
    <Container>
      <HeaderTitle>{translate('SETTINGS')}</HeaderTitle>
      <Flex 
        flex={1} 
        alignItems='center' 
        paddingTop={5} 
        style={{backgroundColor: 'white'}}
      >
        <UpdateRemoveCourseButton onPress={() => setShowModal(true)} />
        <UpdateRemoveCourseModal 
          show={showModal} 
          onClose={() => setShowModal(false)}
          courses={courses} 
          selectedCourse={course} 
          setSelectedCourse={setCourse} 
          onRemoveCourse={() => handleRemoveCourse(dispatch, setShowModal, navigation, 
                                                  course, setCourse, color)} 
          onUpdateCourse={() => handleUpdateCourse(dispatch, setShowModal, navigation, 
                                                  course, setCourse, color)} 
          colorRef={color}
        />
        <RemoveAllMonthTasksButton onPress={() => handleRemoveAllMonthTasks(dispatch, navigation)} />
        <RemoveAllSemesterTasksButton onPress={() => handleRemoveAllSemesterTasks(dispatch, navigation)} />
        <ResetButton onPress={() => handleReset(dispatch, navigation)} />
      </Flex>
    </Container>
  );
}

export default ConfigScreen;

const UpdateRemoveCourseButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    {translate('UPDATE_REMOVE_COURSE').toUpperCase()}
  </Button> 
);

const RemoveAllMonthTasksButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    {translate('REMOVE_ALL_MONTH_TASKS').toUpperCase()}
  </Button>
);

const RemoveAllSemesterTasksButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    {translate('REMOVE_ALL_SEMESTER_TASKS').toUpperCase()}
  </Button>
);

const ResetButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    {translate('RESET').toUpperCase()}
  </Button> 
);


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function handleRemoveCourse(dispatch, setShowModal, navigation, course, 
                            setCourse, colorRef) {
  Alert.alert(
    translate('WARN_DESTRUCTIVE_ACTION'),
    translate('CONFIRM_COURSE_REMOVE'),
    [
      {
        text: translate('CANCEL'),
        style: "cancel"
      },
      {
        text: translate('YES').toUpperCase(), 
        onPress: () => removeCourse(dispatch, setShowModal, navigation, course, 
                                    setCourse, colorRef)
      }
    ]
  ); 
}

function removeCourse(dispatch, setShowModal, navigation, course, setCourse, 
                      colorRef) {
  removePersistedCourse(dispatch, course);
  setShowModal(false);
  clearFields(setCourse, colorRef);
  goToHomeScreen(navigation);
}

function removePersistedCourse(dispatch, courseId) {
  dispatch({
    type: 'REMOVE_COURSE',
    payload: {
      id: courseId
    }
  });
}

function clearFields(setCourse, colorRef) {
  setCourse('');
  colorRef.current = colors.blur;
}

function goToHomeScreen(navigation) {
  navigation.navigate('HomeScreen', { new: true });
}

function handleUpdateCourse(dispatch, setShowModal, navigation, course, 
                            setCourse, colorRef) {
  updatePersistedCourse(dispatch, course, colorRef);
  setShowModal(false);
  clearFields(setCourse, colorRef);
}

function updatePersistedCourse(dispatch, courseId, colorRef) {
  dispatch({
    type: 'UPDATE_COURSE',
    payload: {
      id: courseId,
      color: colorRef.current
    }
  });
}

function handleRemoveAllMonthTasks(dispatch, navigation) {
  Alert.alert(
    translate('WARN_DESTRUCTIVE_ACTION'),
    translate('CONFIRM_MONTH_REMOVE_ALL'),
    [
      {
        text: translate('CANCEL'),
        style: "cancel"
      },
      {
        text: translate('YES').toUpperCase(), 
        onPress: () => resetMonthTasks(dispatch, navigation)
      }
    ]
  );
}

function resetMonthTasks(dispatch, navigation) {
  removePersistedTasksFromCurrentMonth(dispatch);
  goToHomeScreen(navigation);
}

function removePersistedTasksFromCurrentMonth(dispatch) {
  dispatch({
    type: 'RESET_TASKS_MONTH'
  });
}

function handleRemoveAllSemesterTasks(dispatch, navigation) {
  Alert.alert(
    translate('WARN_DESTRUCTIVE_ACTION'),
    translate('CONFIRM_SEMESTER_REMOVE_ALL'),
    [
      {
        text: translate('CANCEL'),
        style: "cancel"
      },
      {
        text: translate('YES').toUpperCase(), 
        onPress: () => resetSemesterTasks(dispatch, navigation)
      }
    ]
  );
}

function resetSemesterTasks(dispatch, navigation) {
  removePersistedTasksFromCurrentSemester(dispatch);
  goToHomeScreen(navigation);
}

function removePersistedTasksFromCurrentSemester(dispatch) {
  dispatch({
    type: 'RESET_TASKS_SEMESTER'
  });
}

function handleReset(dispatch, navigation) {
  Alert.alert(
    translate('WARN_DESTRUCTIVE_ACTION'),
    translate('CONFIRM_RESET'),
    [
      {
        text: translate('CANCEL'),
        style: "cancel"
      },
      {
        text: "YES", 
        onPress: () => reset(dispatch, navigation)
      }
    ]
  ); 
}

function reset(dispatch, navigation) {
  removeAllPersistedTasks(dispatch);
  goToHomeScreen(navigation);
}

function removeAllPersistedTasks(dispatch) {
  dispatch({
    type: 'RESET'
  });
}
