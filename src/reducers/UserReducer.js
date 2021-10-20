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
 * }],
 * done: [{
 *   id: '-1',
 *   name: '',
 *   course: '-1',
 *   dateBegin: 0,
 *   dateEnd: 0
 * }]
 */
const initialState = {
  courses: [],
  tasks: [],
  done: []
};

export default (state=initialState, action) => {

  switch(action.type) {
    case 'INSERT_TASK':
      return insertTask(action.payload, state);
    case 'UPDATE_TASK':
      return updateTask(action.payload, state);
    case 'REMOVE_TASK':
      return removeTask(action.payload, state);
    case 'INSERT_COURSE':
      return insertCourse(action.payload, state);
    case 'UPDATE_COURSE':
      return updateCourse(action.payload, state);
    case 'REMOVE_COURSE':
      return removeCourse(action.payload, state);
    case 'MARK_AS_DONE':
      return markAsDone(action.payload.id, state);
    case 'RESET_TASKS_MONTH':
      return removeTasksFromCurrentMonth(action.payload);
    case 'RESET_TASKS_SEMESTER':
      return removeTasksFromCurrentSemester(action.payload);
    case 'RESET':
      return removeAllTasks();
    default:
      return state;
  }
};

function insertTask(payload, state) {
  const tasks = state.tasks;
  const task = buildTaskFromPayload(payload, uuid());
  
  tasks.push(task);

  return { ...state, tasks: tasks };
}

function buildTaskFromPayload(payload, taskId)  {
  return {
    id: taskId,
    name: payload.name,
    course: payload.course,
    dateBegin: payload.dateBegin,
    dateEnd: payload.dateEnd
  }
}

function updateTask(payload, state) {
  const tasks = state.tasks;
  const newTaskList = tasks.filter(task => task.id !== payload.id);
  const task = buildTaskFromPayload(payload, payload.id);
  newTaskList.push(task);
    
  return { ...state, tasks: newTaskList };
}

function removeTask(payload, state) {
  const tasks = state.tasks;
  const newTaskList = tasks.filter(task => task.id !== payload.id);

  return { ...state, tasks: newTaskList };
}

function insertCourse(payload, state) {
  const course = buildCourseFromPayload(payload, uuid());
  let courses = state.courses;

  if (!hasAnyPersistedCourses(state)) {
    courses = [course]
  }
  else if (!hasPersistedCourseWithName(payload.name, state)){
    courses.push(course);
  }
  
  return { ...state, courses: courses };
}

function hasAnyPersistedCourses(state) {
  return state.courses;
}

function hasPersistedCourseWithName(name, state) {
  const courses = state.courses;

  return (courses.find(c => c.name == name) !== undefined);
}

function buildCourseFromPayload(payload, courseId)  {
  return {
    id: courseId,
    name: payload.name,
    color: payload.color
  }
}

function updateCourse(payload, state) {
  if (!hasPersistedCourseWithId(payload.id, state))
    return state;

  let updatedCourse = getPersistedCourseWithId(payload.id, state);
  updatedCourse.color = payload.color;

  const newCourseList = getPersistedCoursesWithoutId(payload.id, state);
  newCourseList.push(updatedCourse);
  
  return { ...state, courses: newCourseList };
}

function hasPersistedCourseWithId(id, state) {
  const courses = state.courses;

  return (courses.find(c => c.id == id) !== undefined);
}

function getPersistedCourseWithId(id, state) {
  const courses = state.courses;

  return courses.find(c => c.id == id);
}

function getPersistedCoursesWithoutId(id, state) {
  const courses = state.courses;

  return courses.filter(course => course.id !== id);
}

function removeCourse(payload, state) {
  const newCourseList = getPersistedCoursesWithoutId(payload.id, state);
  const newTaskList = getPersistedTasksWithoutCourseId(payload.id, state);
  
  return { ...state, tasks: newTaskList, courses: newCourseList };
}

function markAsDone(taskId, state) {
  if (!state.done)
    state.done = []

  const undoneTasks = state.tasks.filter(t => t.id != taskId);
  const doneTasks = state.done.push(getPersistedTaskWithId(taskId, state));

  return { ...state, tasks: undoneTasks, done: doneTasks };
}

function getPersistedTaskWithId(id, state) {
  const tasks = state.tasks;

  return tasks.find(task => task.id == id);
}

function getPersistedTasksWithoutCourseId(id, state) {
  const tasks = state.tasks;

  return tasks.filter(task => task.course !== id);
}

function removeTasksFromCurrentMonth(state) {
  const newTaskList = getPersistedTasksBeforeCurrentMonth(state);
      
  return { ...state, tasks: newTaskList };
}

function getPersistedTasksBeforeCurrentMonth(state) {
  const currentMonth = new Date().getMonth();
  const tasks = state.tasks;

  return tasks.filter(task => getTaskBeginDate(task).getMonth() < currentMonth);
}

function getTaskBeginDate(task) {
  return new Date(task.dateBegin);
}

function removeTasksFromCurrentSemester(state) {
  const newTaskList = getPersistedTasksBeforeCurrentSemester(state);
      
  return { ...state, tasks: newTaskList };
}

function getPersistedTasksBeforeCurrentSemester(state) {
  const currentMonth = new Date().getMonth();
  const tasks = state.tasks;

  return tasks.filter(task => getTaskBeginDate(task).getMonth() < currentMonth - 5);
}

function removeAllTasks() {
  return initialState;
}
