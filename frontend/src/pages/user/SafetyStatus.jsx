import DashboardLayout from "../../components/common/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const SafetyStatus = () => {

  const [shift, setShift] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    if (!user) return;

    axios
      .get(
        `http://localhost:5000/api/shifts/${user.employee_id}`
      )
      .then((res) => {
        setShift(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        SAFETY STATUS
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Employee Info */}

        <div className="bg-slate-900 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold text-white">
            Employee Information
          </h2>

          <div className="mt-4 space-y-2 text-slate-900 dark:text-gray-300">

            <p>
              Name:
              {" "}
              {user?.full_name}
            </p>

            <p>
              Employee ID:
              {" "}
              {user?.employee_id}
            </p>

          </div>

        </div>

        {/* Current Assignment */}

        <div className="bg-slate-900 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold text-white">
            Current Assignment
          </h2>

          {shift ? (

            <div className="mt-4 space-y-2 text-slate-900 dark:text-gray-300">

              <p>
                Department:
                {" "}
                <span className="text-blue-400">
                  {shift.department}
                </span>
              </p>

              <p>
                Shift:
                {" "}
                <span className="text-green-400">
                  {shift.shift_type}
                </span>
              </p>

              <p>
                Project:
                {" "}
                {shift.project_name}
              </p>

              <p>
                Location:
                {" "}
                {shift.location}
              </p>

            </div>

          ) : (

            <p className="mt-4 text-yellow-400">
              No Assignment Found
            </p>

          )}

        </div>

        {/* Safety Score */}

        <div className="bg-slate-900 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold text-green-400">
            Safety Score
          </h2>

          <div className="mt-4">

            <p className="text-5xl font-bold text-green-500">
              96%
            </p>

          </div>

        </div>

        {/* PPE Compliance */}

        <div className="bg-slate-900 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold text-yellow-400">
            PPE Compliance
          </h2>

          <div className="mt-4">

            <p className="text-5xl font-bold text-yellow-500">
              100%
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default SafetyStatus;