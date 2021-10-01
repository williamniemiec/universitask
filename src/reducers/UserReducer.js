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
      const task = action.payload.task;
      task.id = uuid();
      
      const tasks = initialState.tasks;
      tasks.push(task);

      return { ...initialState, tasks: tasks };
    case 'UPDATE_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    case 'INSERT_CATEGORY':
      return state;
    case 'UPDATE_CATEGORY':
      return state;
    case 'REMOVE_CATEGORY':
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
