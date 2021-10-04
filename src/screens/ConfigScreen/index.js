import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  Flex,
  Input, 
  Button,
  Select,
  CheckIcon,
  Modal,
  FormControl
} from 'native-base';
import colors from '../../colors';
import PlusButton from '../../components/buttons/PlusButton';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ColorPicker from 'react-native-wheel-color-picker'
import { useNavigation } from '@react-navigation/native';

function ConfigScreen() {

  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  let courses = useSelector(state => state.UserReducer.courses);

  if (!courses)
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }]

  const colorPicker = useRef(null);
  const color = useRef(colors.secondary);
  const borderColorRef = useRef('#cccccc');

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
    borderColorRef.current = '#cccccc';
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

  return (
    <Flex 
      flex={1} 
      alignItems='center' 
      paddingTop={5} 
      style={{backgroundColor: 'white'}}
    >
      <Button 
        backgroundColor={colors.secondary} 
        width='90%' 
        marginTop={5}
        onPress={() => setShowModal(true)}
      >
        UPDATE / REMOVE COURSE
      </Button> 
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Update / remove course</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Course</FormControl.Label>
              <Select
                selectedValue={course}
                minWidth="200"
                width='100%'
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
                borderColor={borderColorRef.current}
                borderLeftWidth={10}
                mb={5}
                onValueChange={(itemValue) => {setCourse(itemValue); borderColorRef.current = getCourseColor(itemValue); color.current = borderColorRef.current;}}
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
                color={color.current}
                onColorChange={newColor => color.current = newColor}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <SecondaryButton onPress={handleRemoveCourse}>
                Remove
              </SecondaryButton>
              <PrimaryButton onPress={handleUpdateCourse}>
                UPDATE
              </PrimaryButton>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button 
        backgroundColor={colors.secondary} 
        width='90%' 
        marginTop={5}
        onPress={handleRemoveAllMonthTasks}
      >
        REMOVE ALL MONTH TASKS
      </Button>
      <Button 
        backgroundColor={colors.secondary} 
        width='90%' 
        marginTop={5}
        onPress={handleRemoveAllSemesterTasks}
      >
        REMOVE ALL SEMESTER TASKS
      </Button>
      <Button 
        backgroundColor={colors.secondary} 
        width='90%' 
        marginTop={5}
        onPress={handleReset}
      >
        RESET
      </Button> 
    </Flex>
  );
}

export default ConfigScreen;
