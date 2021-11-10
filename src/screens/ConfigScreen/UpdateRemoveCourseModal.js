import React, { useRef } from 'react';
import {
  Button,
  Select,
  CheckIcon,
  Modal,
  FormControl
} from 'native-base';
import colors from '../../colors';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ColorPicker from 'react-native-wheel-color-picker';
import translate from '../../locales';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const UpdateRemoveCourseModal = ({
  show, onClose, courses, selectedCourse, setSelectedCourse, onRemoveCourse,
  onUpdateCourse, colorRef
}) => {

  const colorPicker = useRef(null);

  if (!courses)
    courses = [{
      id: '-1',
      name: '',
      color: '#ccc'
    }]

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

export default UpdateRemoveCourseModal;

const UpdateRemoveCourseModalHeader = () => (
  <Modal.Header>
    {translate('UPDATE_REMOVE_COURSE')}
  </Modal.Header>
);

const UpdateRemoveCourseModalBody = ({
  courses, selectedCourse, setSelectedCourse, colorRef, colorPicker
}) => {

  function getCourseColor(id) {
    const c = courses.find(c => c.id == id);

    return c ? c.color : '#cccccc';
  }

  return (
    <Modal.Body>
      <FormControl>
        <FormControl.Label>{translate('COURSE')}</FormControl.Label>
        <Select
          isDisabled={courses.length == 0}
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
        <FormControl.Label>{translate('COLOR')}</FormControl.Label>
        <ColorPicker
          ref={colorPicker}
          color={colorRef.current}
          onColorChange={newColor => colorRef.current = newColor}
        />
      </FormControl>
    </Modal.Body>
  );
}

const UpdateRemoveCourseModalFooter = ({ onRemoveCourse, onUpdateCourse }) => (
  <Modal.Footer>
    <Button.Group space={2}>
      <SecondaryButton onPress={onRemoveCourse}>
        {translate('REMOVE')}
      </SecondaryButton>
      <PrimaryButton onPress={onUpdateCourse}>
        {translate('UPDATE').toUpperCase()}
      </PrimaryButton>
    </Button.Group>
  </Modal.Footer>
);
