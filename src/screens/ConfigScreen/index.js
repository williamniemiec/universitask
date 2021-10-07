import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import {
  Flex,
  Button,
  Select,
  CheckIcon,
  Modal,
  FormControl
} from 'native-base';
import colors from '../../colors';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ColorPicker from 'react-native-wheel-color-picker'
import { useNavigation } from '@react-navigation/native';
import UpdateRemoveCourseModal from './UpdateRemoveCourseModal';

function ConfigScreen() {

  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const color = useRef(colors.secondary);
  const dispatch = useDispatch();
  let courses = useSelector(state => state.UserReducer.courses);

  if (!courses)
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }]

  
  function removeCourse() {
    dispatch({
      type: 'REMOVE_COURSE',
      payload: {
        id: course
      }
    });

    setShowModal(false);
    clearFields();
    navigation.navigate('HomeScreen', { new: true })
  }

  function clearFields() {
    setCourse('');
    color.current = colors.secondary;
  }

  function handleRemoveCourse() {
    Alert.alert(
      "Warning: destructive action",
      "Are you sure you want to remove this course? All tasks associated with this course will also be removed!",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "YES", 
          onPress: () =>removeCourse()
        }
      ]
    ); 
  }

  function handleUpdateCourse() {
    dispatch({
      type: 'UPDATE_COURSE',
      payload: {
        id: course,
        color: color.current
      }
    });

    setShowModal(false);
    clearFields();

    navigation.navigate('ConfigScreen');
  }

  function getCourseColor(id) {
    const c = courses.find(c => c.id == id);

    return c ? c.color : '#cccccc';
  }

  function handleRemoveAllMonthTasks() {
    Alert.alert(
      "Warning: destructive action",
      "Are you sure you want to remove all month tasks?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "YES", 
          onPress: () =>resetMonthTasks()
        }
      ]
    );
  }

  function resetMonthTasks() {
    dispatch({
      type: 'RESET_TASKS_MONTH'
    });

    navigation.navigate('HomeScreen', { new: true });
  }

  function handleRemoveAllSemesterTasks() {
    Alert.alert(
      "Warning: destructive action",
      "Are you sure you want to remove all semester tasks?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "YES", 
          onPress: () =>resetSemesterTasks()
        }
      ]
    );
  }

  function resetSemesterTasks() {
    dispatch({
      type: 'RESET_TASKS_SEMESTER'
    });

    navigation.navigate('HomeScreen', { new: true });
  }

  function reset() {
    dispatch({
      type: 'RESET'
    });

    navigation.navigate('HomeScreen', { new: true });
  }

  function handleReset() {
    Alert.alert(
      "Warning: destructive action",
      "Are you sure you want to remove all tasks?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "YES", 
          onPress: () =>reset()
        }
      ]
    ); 
  }

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
        onRemoveCourse={handleRemoveCourse} 
        onUpdateCourse={handleUpdateCourse} 
        colorRef={color}
      />
      <RemoveAllMonthTasksButton onPress={handleRemoveAllMonthTasks} />
      <RemoveAllSemesterTasksButton onPress={handleRemoveAllSemesterTasks} />
      <ResetButton onPress={handleReset} />
    </Flex>
  );
}

export default ConfigScreen;
