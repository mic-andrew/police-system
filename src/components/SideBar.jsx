import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserSecret, FaUpload } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/dashboard${path}` ? "bg-gray-700" : "";
  };

  return (
    <div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Police End System
      </h2>
      <nav>
        <Link
          to="/dashboard"
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive(
            ""
          )}`}
        >
          <FaHome className="inline-block mr-2" /> Home
        </Link>
        <Link
          to="/dashboard/view-suspects"
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive(
            "/view-suspects"
          )}`}
        >
          <FaUserSecret className="inline-block mr-2" /> View Suspects
        </Link>
        <Link
          to="/dashboard/upload-suspect"
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive(
            "/upload-suspect"
          )}`}
        >
          <FaUpload className="inline-block mr-2" /> Upload Suspect Image
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
