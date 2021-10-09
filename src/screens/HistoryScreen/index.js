import React from 'react';
import Container from '../../components/template/Container';
import { useSelector } from 'react-redux';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const HistoryScreen = ({ route }) => {

  const persistedCourses = useSelector(state => state.UserReducer.courses);
  const persistedTasks = useSelector(state => state.UserReducer.tasks);  
  
  const coursesView = getCoursesView(persistedCourses, persistedTasks);
  const deadlines = getDeadlines(persistedTasks);

  return (
    <Container>
      
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

function getDeadlines(persistedTasks) {
  let deadlines = []

  for (let task of persistedTasks) {
    deadlines.push(task.dateEnd);
  }
  
  return deadlines;
}
