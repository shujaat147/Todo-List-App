import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  priority: z.enum(["high", "medium", "low"], {
    errorMap: () => ({ message: "Select a valid priority!" }),
  }),
  taskName: z.string().min(3, "Task name must be at least 3 characters"),
  taskDetails: z
    .string()
    .max(400, "Task details must be less than 400 characters")
    .min(3),
  date: z.string().refine((val) => new Date(val) > new Date("1999-12-31"), {
    message: "Date must be greater than December 31, 1999",
  }),
});

interface Task {
  id: number;
  priority: "high" | "medium" | "low";
  taskName: string;
  taskDetails: string;
  date: string;
  finished: boolean;
}

interface AddTaskProps {
  addTask: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'medium',
      taskName: '',
      taskDetails: '',
      date: '',
    },
  });

  const submitHandler = (data: Task) => {
    const formattedDate = new Date(data.date).toLocaleDateString("en-GB");
    const task: Task = {
      ...data,
      date: formattedDate,
    };
    addTask(task);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-light p-3 border-3"
    >
      <div className="input-group">
        <button
          type="submit"
          className="btn btn-lg rounded-circle border border-primary"
          style={{
            backgroundColor: "transparent",
            color: "#0d6efd",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#0d6efd";
            (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#0d6efd";
          }}
        >
          +
        </button>

        <h1 className="text-primary mb-0 px-3">Add Your Task</h1>
      </div>
      <hr />
      <div className="form-group mb-3">
        <div className="input-group">
          <span className="input-group-text">Task:</span>
          <select {...register("priority")} className="form-select pe-0 mx-0">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="text"
            {...register("taskName")}
            className="form-control flex-grow-1"
            placeholder="Enter Task Name..."
            autoComplete="off"
          />
        </div>

        {errors.priority && (
          <p className="text-danger">{errors.priority.message}</p>
        )}
        {errors.taskName && (
          <p className="text-danger">{errors.taskName.message}</p>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="taskDetails">Task Details:</label>
        <textarea
          {...register("taskDetails")}
          className="form-control"
          id="taskDetails"
          placeholder="Enter Task Details..."
          rows={3}
        ></textarea>
        {errors.taskDetails && (
          <p className="text-danger">{errors.taskDetails.message}</p>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="date">Deadline:</label>
        <input
          type="date"
          {...register("date")}
          className="form-control"
          id="date"
        />
        {errors.date && <p className="text-danger">{errors.date.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary px-4 mb-4">
        Submit
      </button>
    </form>
  );
};

export default AddTask;
