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
  let courses = state.courses;
  let courseId;
  let taskId;
  let task;
  let newTaskList;
  let newCourseList;

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
      if (!state.courses) {
        courses = [{
          id: uuid(),
          name: action.payload.name,
          color: action.payload.color
        }]
      }
      else {
        if (courses.find(c => c.name == action.payload.name) !== undefined)
          return state;

        const course = {
          id: uuid(),
          name: action.payload.name,
          color: action.payload.color
        }
        
        courses.push(course);
      }
      
      return { ...state, courses: courses };
    case 'UPDATE_COURSE':
      courseId = action.payload.id;
      let updatedCourse = courses.find(c => c.id == courseId);

      if (updatedCourse !== undefined) {
        updatedCourse.color = action.payload.color;

        newCourseList = courses.filter(course => course.id !== courseId);
        newCourseList.push(updatedCourse);
        
        return { ...state, courses: newCourseList };
      }
    case 'REMOVE_COURSE':
      courseId = action.payload.id;
      newCourseList = courses.filter(c => c.id !== courseId);
      newTaskList = tasks.filter(t => t.course !== courseId);
      
      return { ...state, tasks: newTaskList, courses: newCourseList };
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
