import React from 'react';
import Container from '../../components/template/Container';
// import { useSelector } from 'react-redux';
import {
  Heading,
} from 'native-base';
import styles from './styles';
import { TasksPieChart } from './TasksPieChart';
import { TasksBarChart } from './TasksBarChart';
import { mockTasks } from './mockData';

//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const HistoryScreen = ({ route }) => {

  // const persistedCourses = useSelector(state => state.UserReducer.courses);
  // const persistedTasks = useSelector(state => state.UserReducer.tasks);  
  
  // const coursesView = getCoursesView(persistedCourses, persistedTasks);
  // const deadlines = getDeadlines(persistedTasks);

  return (
    <Container>
      <Heading style={styles.title}>This Semester</Heading>
      <TasksPieChart tasks={mockTasks}/>
      <TasksBarChart tasks={mockTasks}/>
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
    coursesView.push({name: course.name, total: totalTasks});
  }

  return coursesView
}