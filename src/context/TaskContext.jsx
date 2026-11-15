import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };

    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks((previousTasks) => [...previousTasks, savedTask]);
      });
  }

  // Toggle task completion
  function toggleComplete(id) {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedTask.completed }),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            task.id === id ? savedTask : task
          )
        );
      });
  }

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}