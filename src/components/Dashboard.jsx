import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./SideBar";
import Home from "./Home";
import ViewSuspects from "./ViewSuspects";
import CapturedSuspects from './CapturedSuspects';


function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-suspects" element={<ViewSuspects />} />
          <Route path="/captured-suspects" element={<CapturedSuspects />} />

        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
