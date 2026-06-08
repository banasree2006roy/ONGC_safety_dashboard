import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/common/DashboardLayout";

const MyTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    if (!user) {
      setLoading(false);
      return;
    }

    axios
      .get(
        `http://localhost:5000/api/tasks/${user.employee_id}`
      )
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Task Fetch Error:", err);
        setLoading(false);
      });

  }, []);

  const startTask = async (taskId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/start/${taskId}`
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

    }

  };

  const completeTask = async (taskId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/complete/${taskId}`
      );

      alert(
        "Completion Request Sent To Admin"
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold text-red-500 mb-8">
          MY TASKS
        </h1>

        {loading ? (

          <div className="bg-slate-900 border border-red-900 rounded-2xl p-6 text-center text-white">
            Loading Tasks...
          </div>

        ) : tasks.length === 0 ? (

          <div className="bg-slate-900 border border-red-900 rounded-2xl p-6 text-center text-gray-400">
            No Tasks Assigned
          </div>

        ) : (

          <div className="grid gap-6">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="bg-slate-900 border border-red-900 rounded-2xl p-6 shadow-lg"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-semibold text-white">
                    {task.task_title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      task.priority === "High"
                        ? "bg-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-600"
                        : "bg-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>

                </div>

                <div className="mt-4 space-y-2 text-slate-900 dark:text-gray-300">

                  <p>
                    <span className="font-semibold text-white">
                      Project:
                    </span>{" "}
                    {task.project_name}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Deadline:
                    </span>{" "}
                    {task.deadline}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Status:
                    </span>{" "}
                    {task.status}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Admin Approval:
                    </span>{" "}
                    {task.admin_approval || "Pending"}
                  </p>

                </div>

                <div className="mt-6 flex gap-4">

                  <button
                    onClick={() => startTask(task.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  >
                    Start Task
                  </button>

                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    Mark Complete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );
};

export default MyTasks;