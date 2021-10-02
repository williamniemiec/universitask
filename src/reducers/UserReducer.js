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
  const tasks = state.tasks;

  switch(action.type) {
    case 'INSERT_TASK':
      const task = {
        id: uuid(),
        name: action.payload.name,
        course: action.payload.course,
        dateBegin: action.payload.dateBegin,
        dateEnd: action.payload.dateEnd
      }
      
      tasks.push(task);

      return { ...state, tasks: tasks };
    case 'UPDATE_TASK':
      return state;
    case 'REMOVE_TASK':
      const taskId = action.payload.id;
      const newTaskList = tasks.filter(task => task.id !== taskId);
      
      return { ...state, tasks: newTaskList };
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
