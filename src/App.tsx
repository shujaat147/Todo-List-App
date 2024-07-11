import React, { useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

interface Task {
  id: number;
  priority: "high" | "medium" | "low";
  taskName: string;
  taskDetails: string;
  date: string;
  finished: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  const addTask = (task: Task) => {
    const newTask = { ...task, id: nextId };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  };

  const finishTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <div className="mt-3">
        <div className="row">
          <div className="col">
            <AddTask addTask={addTask} />
          </div>
          <div className="col">
            <TodoList
              tasks={tasks}
              finishTask={finishTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
