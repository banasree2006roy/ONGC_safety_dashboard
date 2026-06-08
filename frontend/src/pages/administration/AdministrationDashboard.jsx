import DashboardLayout from "../../components/common/DashboardLayout";

import AnalyticsCards from "../../components/cards/AnalyticsCards";
import MonitoringSystem from "../../components/cards/MonitoringSystem";
import AlertEngine from "../../components/cards/AlertEngine";

const AdministrationDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-red-500">
          ADMINISTRATION DASHBOARD
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome,
          {" "}
          <span className="text-white font-semibold">
            {user?.full_name}
          </span>
        </p>

        <p className="text-gray-500 text-sm">
          Employee ID: {user?.employee_id}
          {" | "}
          Department: {user?.department}
        </p>

      </div>

      {/* Statistics */}

      <AnalyticsCards />

      {/* Administration Overview */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-900 p-6 rounded-2xl border border-red-900">
          <h2 className="text-xl font-bold text-red-400 mb-3">
            User Management
          </h2>

          <p className="text-gray-400">
            Manage employee accounts, access permissions,
            and department assignments.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-red-900">
          <h2 className="text-xl font-bold text-red-400 mb-3">
            Admin Management
          </h2>

          <p className="text-gray-400">
            Monitor admin activities and control
            operational permissions.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-red-900">
          <h2 className="text-xl font-bold text-red-400 mb-3">
            Risk Prediction
          </h2>

          <p className="text-gray-400">
            AI-based prediction of industrial risks,
            incidents, and unsafe conditions.
          </p>
        </div>

      </div>

      {/* Monitoring */}

      <MonitoringSystem />

      {/* Alert Engine */}

      <AlertEngine />

      {/* Reports */}

      <div className="mt-8 bg-slate-900 p-6 rounded-2xl border border-red-900">

        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Monthly Safety Reports
        </h2>

        <ul className="space-y-2 text-slate-900 dark:text-gray-300">

          <li>• Incident Reports</li>

          <li>• Worker Compliance Reports</li>

          <li>• PPE Usage Reports</li>

          <li>• Environmental Monitoring Reports</li>

          <li>• AI Safety Analytics Reports</li>

        </ul>

      </div>

    </DashboardLayout>

  );
};

export default AdministrationDashboard;