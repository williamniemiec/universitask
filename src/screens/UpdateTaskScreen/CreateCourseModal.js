import React, { useRef } from 'react';
import {
  Input,
  Button,
  Modal,
  FormControl
} from 'native-base';
import colors from '../../colors';
import PrimaryButton from '../../components/PrimaryButton';
import ColorPicker from 'react-native-wheel-color-picker'


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const CreateCourseModal = ({ show, onClose, courseName, setCourseName, 
                             onCreateCourse, colorRef }) => {

  const colorPicker = useRef(null);

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <CreateCourseModalHeader />
        <CreateCourseModalBody
          courseName={courseName}
          setCourseName={setCourseName}
          colorRef={colorRef}
          colorPicker={colorPicker}
        />
        <CreateCourseModalFooter onCreateCourse={onCreateCourse} />
      </Modal.Content>
    </Modal>
  );
}

export default CreateCourseModal;

const CreateCourseModalHeader = () => (
  <Modal.Header>
    New course
  </Modal.Header>
);

const CreateCourseModalBody = ({ courseName, setCourseName, colorRef, colorPicker }) => {
  return (
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
          color={colorRef.current}
          onColorChange={newColor => colorRef.current = newColor}
        />
      </FormControl>
    </Modal.Body>
  );
}

const CreateCourseModalFooter = ({ onCreateCourse }) => (
  <Modal.Footer>
    <Button.Group space={1}>
      <PrimaryButton onPress={onCreateCourse}>
        CREATE
      </PrimaryButton>
    </Button.Group>
  </Modal.Footer>
);
