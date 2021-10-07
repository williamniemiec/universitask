import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { Flex, Button } from 'native-base';
import colors from '../../colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import UpdateRemoveCourseModal from './UpdateRemoveCourseModal';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const ConfigScreen = () => {

  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const color = useRef(colors.secondary);
  const dispatch = useDispatch();
  let courses = useSelector(state => state.UserReducer.courses);

  if (!courses) {
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }];
  }

  return (
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
    UPDATE / REMOVE COURSE
  </Button> 
);

const RemoveAllMonthTasksButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    REMOVE ALL MONTH TASKS
  </Button>
);

const RemoveAllSemesterTasksButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    REMOVE ALL SEMESTER TASKS
  </Button>
);

const ResetButton = ({ onPress }) => (
  <Button 
    backgroundColor={colors.primary} 
    width='90%' 
    marginTop={5}
    onPress={onPress}
  >
    RESET
  </Button> 
);


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function handleRemoveCourse(dispatch, setShowModal, navigation, course, 
                            setCourse, colorRef) {
  Alert.alert(
    "Warning: destructive action",
    "Are you sure you want to remove this course? All tasks associated with"
    + "this course will also be removed!",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "YES", 
        onPress: () => removeCourse(dispatch, setShowModal, navigation, course, 
                                    setCourse, colorRef)
      }
    ]
  ); 
}

function removeCourse(dispatch, setShowModal, navigation, course, setCourse, 
                      colorRef) {
  dispatch({
    type: 'REMOVE_COURSE',
    payload: {
      id: course
    }
  });

  setShowModal(false);
  clearFields(setCourse, colorRef);
  navigation.navigate('HomeScreen', { new: true })
}

function clearFields(setCourse, colorRef) {
  setCourse('');
  colorRef.current = colors.secondary;
}

function handleUpdateCourse(dispatch, setShowModal, navigation, course, 
                            setCourse, colorRef) {
  dispatch({
    type: 'UPDATE_COURSE',
    payload: {
      id: course,
      color: colorRef.current
    }
  });

  setShowModal(false);
  clearFields(setCourse, colorRef);

  navigation.navigate('ConfigScreen');
}

function handleRemoveAllMonthTasks(dispatch, navigation) {
  Alert.alert(
    "Warning: destructive action",
    "Are you sure you want to remove all month tasks?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "YES", 
        onPress: () => resetMonthTasks(dispatch, navigation)
      }
    ]
  );
}

function resetMonthTasks(dispatch, navigation) {
  dispatch({
    type: 'RESET_TASKS_MONTH'
  });

  navigation.navigate('HomeScreen', { new: true });
}

function handleRemoveAllSemesterTasks(dispatch, navigation) {
  Alert.alert(
    "Warning: destructive action",
    "Are you sure you want to remove all semester tasks?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "YES", 
        onPress: () => resetSemesterTasks(dispatch, navigation)
      }
    ]
  );
}

function resetSemesterTasks(dispatch, navigation) {
  dispatch({
    type: 'RESET_TASKS_SEMESTER'
  });

  navigation.navigate('HomeScreen', { new: true });
}

function handleReset(dispatch, navigation) {
  Alert.alert(
    "Warning: destructive action",
    "Are you sure you want to remove all tasks?",
    [
      {
        text: "Cancel",
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
  dispatch({
    type: 'RESET'
  });

  navigation.navigate('HomeScreen', { new: true });
}
