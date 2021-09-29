import React, { useState, useEffect } from 'react';
import NoTasksMessage from './NoTasksMessage';
import Loading from './Loading';
import TaskList from './TaskList';

const tmp_list = [
  {id: '1', name: 'Assignment 2'}, 
  {id: '2', name: 'Exam'},
  {id: '3', name: 'Assignment 2'}, 
  {id: '4', name: 'Exam'},
  {id: '5', name: 'Assignment 2'}, 
  {id: '6', name: 'Exam'},
  {id: '7', name: 'Assignment 2'}, 
  {id: '8', name: 'Exam'},
]

const Task = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTasks(tmp_list);
    setLoading(false);
  }, []);

  if (loading)
    return <Loading />
  
  if (tasks.length === 0)
    return <NoTasksMessage />;

  return <TaskList tasks={tasks} setTasks={setTasks} />;
}

export default Task;
