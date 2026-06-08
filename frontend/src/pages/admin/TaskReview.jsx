import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/common/DashboardLayout";

const TaskReview = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {

    axios
      .get(
        "http://localhost:5000/api/tasks/pending/approvals"
      )
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const approveTask = async (taskId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/approve/${taskId}`
      );

      alert("Task Approved");

      fetchTasks();

    } catch (error) {

      console.error(error);

    }

  };

  const rejectTask = async (taskId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/reject/${taskId}`
      );

      alert("Task Rejected");

      fetchTasks();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        TASK REVIEW
      </h1>

      {tasks.length === 0 ? (

        <div className="bg-slate-900 p-6 rounded-2xl text-center text-gray-400">
          No Pending Approvals
        </div>

      ) : (

        <div className="grid gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-slate-900 p-6 rounded-2xl border border-red-900"
            >

              <h2 className="text-2xl font-semibold text-white">
                {task.task_title}
              </h2>

              <div className="mt-4 space-y-2 text-slate-900 dark:text-gray-300">

                <p>
                  Employee:
                  {" "}
                  {task.employee_id}
                </p>

                <p>
                  Project:
                  {" "}
                  {task.project_name}
                </p>

                <p>
                  Status:
                  {" "}
                  {task.status}
                </p>

                <p>
                  Approval:
                  {" "}
                  {task.admin_approval}
                </p>

              </div>

              <div className="mt-5 flex gap-4">

                <button
                  onClick={() =>
                    approveTask(task.id)
                  }
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectTask(task.id)
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </DashboardLayout>

  );
};

export default TaskReview;