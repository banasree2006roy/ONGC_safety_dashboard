import { useNavigate } from "react-router-dom";
import NotificationCenter from "./NotificationCenter";

const Navbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className={`px-8 py-4 flex justify-between items-center shadow-lg ${user ? "bg-red-700 border-b border-red-900" : "bg-red-700 border-b border-red-900"}`}>

      {/* Left Side */}

      <div className="flex items-center gap-4">

        <img
          src="/ongc-logo-01.png"
          alt="ONGC Logo"
          className="w-12 h-12 rounded-lg bg-white p-1"
        />

        <div>

          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            ONGC AI SAFETY SYSTEM
          </h1>

          <p className="text-red-100 text-xs md:text-sm">
            Oil & Natural Gas Corporation Limited
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        <NotificationCenter />

        <div className="text-right">

          <p className="font-semibold">{user?.full_name}</p>

          <p className="text-sm text-red-100">{user?.role?.toUpperCase()}</p>

        </div>

        <button onClick={handleLogout} className="bg-black hover:bg-gray-900 px-5 py-2 rounded-xl transition">
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;