import React from "react";

interface Task {
  id: number;
  priority: "high" | "medium" | "low";
  taskName: string;
  taskDetails: string;
  date: string;
  finished: boolean;
}

interface TodoListProps {
  tasks: Task[];
  finishTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  finishTask,
  deleteTask,
}) => {
  const pendingTasksCount = tasks.filter((task) => !task.finished).length;

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-danger text-white";
      case "medium":
        return "bg-warning text-dark";
      case "low":
        return "bg-success text-dark";
      default:
        return "";
    }
  };

  const handleFinishTask = (id: number) => {
    finishTask(id);
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
  };

  return (
    <div className="bg-light p-3 border-3">
      <div className="row mb-4">
        <h1 className="text-primary col-8">Todo List</h1>
        <div className="col row justify-content-center align-items-center mx-3">
          <button type="button" className="btn btn-primary">
            Pending: <span className="badge badge-light bg-light text-dark">{pendingTasksCount}</span>
          </button>
        </div>
      </div>
      <hr />
      <table className="table table-bordered ">
        <tbody>
          {tasks.length==0 && <p>No Tasks Found</p>}
          {tasks.map((task, index) => (
            <tr
              key={task.id}
            >
              <td className="p-3"><button className={`btn px-2 text-white btn-sm rounded-circle ${getPriorityColor(task.priority)}`}><b>{index + 1}</b></button></td>
              <td>
                <b>{task.taskName}</b>
                <br />
                <small>{task.date}</small>
              </td>
              <td>{task.taskDetails}</td>
              <td>
              <button
                  className="btn text-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  &#10005;
                </button>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`finish-${task.id}`}
                    checked={task.finished}
                    onChange={() => handleFinishTask(task.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`finish-${task.id}`}
                  >
                    {task.finished ? "Finished" : "Finished"}
                  </label>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default TodoList;