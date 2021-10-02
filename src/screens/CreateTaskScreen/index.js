import React, { useState, useRef } from 'react';
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

function CreateTaskScreen() {

  const [name, setName] = useState('');
  const [course, setCourse] = useState('1');
  const [showModal, setShowModal] = useState(false);
  //const [courseName, setCourseName] = useState('');

  const dispatch = useDispatch();
  const courses = useSelector(state => state.UserReducer.courses);

  const dateBegin = useRef(new Date());
  const dateEnd = useRef(new Date());
  const colorPicker = useRef(null);
  const color = useRef(colors.secondary);
  const courseName = useRef('');

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

  function handleNewCourse() {
    setShowModal(true);
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
        <PlusButton color={colors.primary} onPress={handleNewCourse} />
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

  const NewCourseModal = () => (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>New course</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input 
              value={courseName.current}
              placeholder='Artificial Intelligence'
              style={{
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderLeftRadius: 5,
                borderColor: '#cccccc',
                marginBottom: 20
              }}
              onChangeText={t => courseName.current = t}
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
            <PrimaryButton 
              onPress={() => {
                console.log('Name: ', courseName.current);
                console.log('Color: ', color);
                setShowModal(false)
              }}
            >
              CREATE
            </PrimaryButton>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
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
      <NewCourseModal />
      <DateRangeField />
      <CreateButton />
    </Flex>
  );
}

export default CreateTaskScreen;
