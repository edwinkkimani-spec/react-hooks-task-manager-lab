import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the provider mounts
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  // Add task
  function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };

    return fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks((prevTasks) => [...prevTasks, savedTask]);
      });
  }

  // Toggle task completion
  function toggleComplete(id) {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    return fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? updatedTask : task
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

// Custom hook
export function useTasks() {
  return useContext(TaskContext);
}