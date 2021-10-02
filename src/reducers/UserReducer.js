import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const initialState = {
  /*courses: [{
    id: '-1',
    name: '',
    color: ''
  }],
  tasks: [{
    id: '-1',
    name: '',
    course: '-1',
    dateBegin: 0,
    dateEnd: 0
  }]*/
  courses: [],
  tasks: []  
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'INSERT_TASK':
      const task = {
        id: uuid(),
        name: action.payload.name,
        course: action.payload.course,
        dateBegin: action.payload.dateBegin,
        dateEnd: action.payload.dateEnd
      }
      const tasks = state.tasks;
      tasks.push(task);

      return { ...state, tasks: tasks };
    case 'UPDATE_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    case 'INSERT_COURSE':
      if (state.courses.find(c => c.name == action.payload.name) !== undefined)
        return state;

      const course = {
        id: uuid(),
        name: action.payload.name,
        color: action.payload.color
      }
      
      const courses = state.courses;
      courses.push(course);

      return { ...state, courses: courses };
    case 'UPDATE_COURSE':
      return state;
    case 'REMOVE_COURSE':
      return state;
    case 'RESET_TASKS_MONTH':
      return state;
    case 'RESET_TASKS_YEAR':
      return state;
    case 'RESET':
      return state;
  }

  return state;
};
