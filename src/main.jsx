import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <App />
  </TaskProvider>
);