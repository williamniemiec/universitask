import React, { useState, useLayoutEffect } from 'react';
import Container from '../../components/template/Container';
import { useSelector } from 'react-redux';
import {
  Heading, ScrollView,
} from 'native-base';
import styles from './styles';
import { TasksPieChart } from './TasksPieChart';
import { TasksBarChart } from './TasksBarChart';
import NoTasksMessage from '../../components/Task/NoTasksMessage';
import { mockTasks } from './mockData';
import HeaderTitle from '../../components/template/HeaderTitle';

//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const HistoryScreen = ({ route }) => {

  const [tasks, setTasks] = useState([]);
  const persistedCourses = useSelector(state => state.UserReducer.courses);
  const persistedTasks = useSelector(state => state.UserReducer.tasks);
  const persistedDoneTasks = useSelector(state => state.UserReducer.done);
  
  //const coursesView = getCoursesView(persistedCourses, persistedTasks);
  //const deadlines = getDeadlines(persistedTasks);


  useLayoutEffect(() => {
    if (persistedCourses.length == 0)
      return;
    
    setTasks(getTasksWithCoursesName(persistedTasks, persistedCourses));
    
    let i = setInterval(() => {
      setTasks(getTasksWithCoursesName(persistedTasks, persistedCourses));
    }, 2000);

    return () => clearInterval(i);
  }, []);

  if (persistedTasks.length === 0) {
    return (
      <Container>
        <NoTasksMessage />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <HeaderTitle>History</HeaderTitle>
        <Heading style={styles.title}>This Semester</Heading>
        {tasks.length > 0 && <TasksPieChart tasks={tasks} />}
        {tasks.length > 0 && <TasksBarChart tasks={tasks} />}
      </ScrollView>
    </Container>
  );
}

export default HistoryScreen;


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function getCoursesView(persistedCourses, persistedTasks) {
  let coursesView = [];

  for (let course of persistedCourses) {
    let totalTasks = persistedTasks.filter(t => t.course == course.id).length;
    coursesView.push({ name: course.name, total: totalTasks });
  }

  return coursesView
}

function getTasksWithCoursesName(tasks, courses) {
  let tasksWithCourseName = [];

  for (let task of tasks) {
    let viewTask = { ...task};
    viewTask.course = getCourseNameWithId(viewTask.course, courses);
    viewTask.dateBegin = new Date(viewTask.dateBegin);
    viewTask.dateEnd = new Date(viewTask.dateEnd);
    if (viewTask.course !== undefined)
      tasksWithCourseName.push(viewTask);
  }

  return tasksWithCourseName;
}

function getCourseNameWithId(id, courses) {
  return courses.filter(course => course.id == id)[0]
}
