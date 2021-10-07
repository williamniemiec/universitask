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

  const UpdateRemoveCourseModal = ({ show, onClose, courses, selectedCourse, setSelectedCourse, onRemoveCourse, onUpdateCourse, colorRef }) => {
    
    const colorPicker = useRef(null);

    return (
      <Modal isOpen={show} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <UpdateRemoveCourseModalHeader />
          <UpdateRemoveCourseModalBody 
            courses={courses} 
            selectedCourse={selectedCourse} 
            setSelectedCourse={setSelectedCourse} 
            onRemoveCourse={onRemoveCourse} 
            onUpdateCourse={onUpdateCourse} 
            colorRef={colorRef}
            colorPicker={colorPicker}
          />
          <UpdateRemoveCourseModalFooter onRemoveCourse={onRemoveCourse} onUpdateCourse={onUpdateCourse} />
        </Modal.Content>
      </Modal>
    );
  }

  const UpdateRemoveCourseModalHeader = () => (
    <Modal.Header>
      Update / remove course
    </Modal.Header>
  );

  const UpdateRemoveCourseModalBody = ({ courses, selectedCourse, setSelectedCourse, onRemoveCourse, onUpdateCourse, colorRef, colorPicker }) => (
    <Modal.Body>
      <FormControl>
        <FormControl.Label>Course</FormControl.Label>
        <Select
          selectedValue={selectedCourse}
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
          borderColor={colorRef.current}
          borderLeftWidth={10}
          mb={5}
          onValueChange={(itemValue) => {
            setSelectedCourse(itemValue); 
            colorRef.current = getCourseColor(itemValue); 
          }}
        >
          {courses.map((c, index) => (
            <Select.Item key={c.id} label={c.name} value={c.id} />  
          ))}
        </Select>
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Color</FormControl.Label>
        <ColorPicker
          ref={colorPicker}
          color={colorRef.current}
          onColorChange={newColor => colorRef.current = newColor}
        />
      </FormControl>
    </Modal.Body>
  );

  const UpdateRemoveCourseModalFooter = ({ onRemoveCourse, onUpdateCourse })=> (
    <Modal.Footer>
      <Button.Group space={2}>
        <SecondaryButton onPress={onRemoveCourse}>
          Remove
        </SecondaryButton>
        <PrimaryButton onPress={onUpdateCourse}>
          UPDATE
        </PrimaryButton>
      </Button.Group>
    </Modal.Footer>
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
