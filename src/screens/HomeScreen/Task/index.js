import React, { useState, useEffect } from 'react';
import NoTasksMessage from '../../../components/NoTasksMessage';
import Loading from '../../../components/template/Loading';
import TaskList from './TaskList';
import { useSelector } from 'react-redux';

const Task = ({ refresh }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const taskList = useSelector(state => state.UserReducer.tasks);
  const courseList = useSelector(state => state.UserReducer.courses);
  
  useEffect(() => {
    setLoading(true);
    setTasks([]);
    setTimeout(() => {
      setTasks(taskList);
      setLoading(false);
    }, 200);
  }, [taskList, refresh]);

  if (loading)
    return <Loading />;
  
  if (!courseList || tasks.length === 0)
    return <NoTasksMessage />;

  return <TaskList tasks={tasks} setTasks={setTasks} />;
}

export default Task;
