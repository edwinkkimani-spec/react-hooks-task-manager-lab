
import { useRef, useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskList() {
  const { tasks, toggleComplete } = useTasks();

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTasks.map((task) => (
        <div key={task.id}>
          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
            }}
          >
            {task.title}
          </span>

          <button data-testid={task.id} onClick={() => toggleComplete(task.id)}>

            {task.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
