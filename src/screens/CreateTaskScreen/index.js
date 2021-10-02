import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Flex,
  Input,
  Heading, 
  Button,
  Select,
  CheckIcon,
  Modal,
  FormControl
} from 'native-base';
import colors from '../../colors';
import PlusButton from '../../components/buttons/PlusButton';
import DateTimeSelector from '../../components/DateTimeSelector';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ColorPicker from 'react-native-wheel-color-picker'
import { useNavigation } from '@react-navigation/native';

function CreateTaskScreen() {

  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState('');

  const dispatch = useDispatch();
  const courses = useSelector(state => state.UserReducer.courses);

  const dateBegin = useRef(new Date());
  const dateEnd = useRef(new Date());
  const colorPicker = useRef(null);
  const color = useRef(colors.secondary);
  const borderColorRef = useRef('#cccccc');

  const navigation = useNavigation();

  const CourseField = ({ course, setCourse, handleNewCourse, borderColorRef }) => {
    
    function getCourseColor(id) {
      const c = courses.find(c => c.id == id);

      return c ? c.color : '#cccccc';
    }

    return (
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
            borderColor={borderColorRef.current}
            borderLeftWidth={10}
            mb={5}
            onValueChange={(itemValue) => {setCourse(itemValue); borderColorRef.current = getCourseColor(itemValue)}}
          >
            {courses.map((c, index) => (
              <Select.Item key={c.id} label={c.name} value={c.id} />  
            ))}
          </Select>
          <PlusButton color={colors.primary} onPress={handleNewCourse} />
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
      <Heading size='xs'>Begin</Heading>
      <DateTimeSelector dateRef={dateBegin} monthFirst={false} />
    </Flex>
  );

  const EndDateField = ({ dateEnd }) => (
    <Flex width='45%'>
      <Heading size='xs'>End</Heading>
      <DateTimeSelector dateRef={dateEnd} monthFirst={false} />
    </Flex>
  );

  function handleOpenNewCourseModal() {
    setShowModal(true);
  }

  function handleNewCourse() {
    dispatch({
      type: 'INSERT_COURSE',
      payload: {
        name: courseName,
        color: color.current
      }
    });

    console.log("-----< New course >------")
    console.log(courseName)
    console.log(color.current)
    console.log("-------------------------")

    setShowModal(false);
  }

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
    
    console.log("-----< New task >-------")
    console.log(name)
    console.log(course)
    console.log(dateBegin.current)
    console.log(dateEnd.current)
    console.log("------------------------")

    navigation.navigate('HomeStack')
  }

  return (
    <Flex 
      flex={1} 
      alignItems='center' 
      paddingTop={5} 
      style={{backgroundColor: 'white'}}
    >
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
          onChangeText={e => setName(e)}
        />
      </Flex>
      <CourseField course={course} setCourse={setCourse} handleNewCourse={handleOpenNewCourseModal} borderColorRef={borderColorRef} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>New course</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input 
                value={courseName}
                placeholder='Artificial Intelligence'
                style={{
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#cccccc',
                  marginBottom: 20
                }}
                onChangeText={text => setCourseName(text)}
              />
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
              <SecondaryButton
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton onPress={handleNewCourse}>
                CREATE
              </PrimaryButton>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <DateRangeField dateBegin={dateBegin} dateEnd={dateEnd} />
      <Button 
        backgroundColor={colors.secondary} 
        width='90%' 
        marginTop={5}
        onPress={handleNewTask}
      >
        CREATE
      </Button> 
    </Flex>
  );
}

export default CreateTaskScreen;
