import { useRef, useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskList() {
  const { tasks, toggleComplete } = useTasks();

  const searchInput = useRef(null);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        ref={searchInput}
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>

          <button
            data-testid={task.id}
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;