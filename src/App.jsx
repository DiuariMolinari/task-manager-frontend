import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Tasks from './components/tasks/Tasks';
import AddTask from './components/addTask/AddTask';
import Header from "./components/header/Header";
import TaskDetails from './components/taskDetails/TaskDetails';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar Programação",
      completed: false
    },
    {
      id: 2,
      title: "Ler livros",
      completed: true
    }
  ]);

  const handleTaskClick = (taskId) => {
    const newTaks = tasks.map(task => {
      if (task.id === taskId)
        return { ...task, completed: !task.completed };
      else
        return task;
    });

    setTasks(newTaks);
  }

  const handleAddTask = (taskTitle) => {
    const newTasks = [ ...tasks, 
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false
      }
    ];
    setTasks(newTasks);
  }

  const handleTaskRemove = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }
  return (
    <Router>
      <div className="container">
        <Header>Minhas Tarefas</Header>
        <Routes>
          <Route path="/" exact 
            element={
              <>
                <AddTask handleAddTask={handleAddTask} handleTaskClick={handleTaskClick} />
                <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskRemove={handleTaskRemove} />
              </>
            }
          />

          <Route path="/:taskTitle" exact 
            element={
              <>
                <TaskDetails />
              </>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;