import React, { useState, useEffect } from 'react';
import NoTasksMessage from './NoTasksMessage';
import Loading from './Loading';
import TaskList from './TaskList';
import { useSelector } from 'react-redux';

const Task = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const taskList = useSelector(state => state.UserReducer.tasks);

  useEffect(() => {
    setTasks(taskList);
    setLoading(false);
  }, []);

  if (loading)
    return <Loading />
  
  if (tasks.length === 0)
    return <NoTasksMessage />;

  return <TaskList tasks={tasks} setTasks={setTasks} />;
}

export default Task;
