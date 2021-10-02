import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

/*
 * courses: [{
 *   id: '-1',
 *   name: '',
 *   color: ''
 * }],
 * tasks: [{
 *   id: '-1',
 *   name: '',
 *   course: '-1',
 *   dateBegin: 0,
 *   dateEnd: 0
 * }]
 */
const initialState = {
  courses: [{}],
  tasks: [{}]  
};

export default (state=initialState, action) => {
  const currentMonth = new Date().getMonth();
  const tasks = state.tasks;
  let task;
  let newTaskList;
  let taskId;

  switch(action.type) {
    case 'INSERT_TASK':
      task = {
        id: uuid(),
        name: action.payload.name,
        course: action.payload.course,
        dateBegin: action.payload.dateBegin,
        dateEnd: action.payload.dateEnd
      }
      
      tasks.push(task);

      return { ...state, tasks: tasks };
    case 'UPDATE_TASK':
      taskId = action.payload.id;
      newTaskList = tasks.filter(task => task.id !== taskId);

      if (newTaskList.length === 0)
        return;
      
      task = {
        id: taskId,
        name: action.payload.name,
        course: action.payload.course,
        dateBegin: action.payload.dateBegin,
        dateEnd: action.payload.dateEnd
      }
      
      tasks.push(task);

      return { ...state, tasks: newTaskList };
    case 'REMOVE_TASK':
      taskId = action.payload.id;
      newTaskList = tasks.filter(task => task.id !== taskId);
      
      return { ...state, tasks: newTaskList };
    case 'INSERT_COURSE':
      let courses;

      if (!state.courses) {
        courses = [{
          id: uuid(),
          name: action.payload.name,
          color: action.payload.color
        }]
      }
      else {
        if (state.courses.find(c => c.name == action.payload.name) !== undefined)
          return state;

        const course = {
          id: uuid(),
          name: action.payload.name,
          color: action.payload.color
        }
        
        courses = state.courses;
        courses.push(course);
      }
      
      return { ...state, courses: courses };
    case 'UPDATE_COURSE':
      return state;
    case 'REMOVE_COURSE':
      const courseId = action.payload.id;
      const newCourseList = tasks.filter(c => c.id !== courseId);
      
      return { ...state, courses: newCourseList };
    case 'RESET_TASKS_MONTH':
      newTaskList = tasks.filter(task => task.begin.getMonth() === currentMonth);
      
      return { ...state, tasks: newTaskList };
    case 'RESET_TASKS_SEMESTER':
      newTaskList = tasks.filter(task => task.begin.getMonth() >= currentMonth + 6);
      
      return { ...state, tasks: newTaskList };
    case 'RESET':
      return initialState;
  }

  return state;
};
