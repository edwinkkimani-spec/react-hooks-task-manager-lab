
import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // GET: Fetch tasks from the backend
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  // POST: Add a new task
  function addTask(formData) {
    const newTask = {
      title: formData.title,
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
        setTasks((prev) => [...prev, savedTask]);
      });
  }

  // PATCH: Toggle task completion
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
      body: JSON.stringify({
        completed: updatedTask.completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? data : task
          )
        );
      });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook
export function useTasks() {
  return useContext(TaskContext);
}
