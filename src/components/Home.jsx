import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaFileUpload,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";
import { MdSecurity, MdReport } from "react-icons/md";
import { BiCctv } from "react-icons/bi";
import { GiHandcuffs } from "react-icons/gi";
import SuspectUploadModal from "./SuspectUploadModal";

const ActionButton = ({ icon: Icon, text, onClick, extraClasses = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center justify-start w-full p-4 text-left border rounded-md bg-blue-50 hover:bg-blue-100 transition-colors ${extraClasses}`}
  >
    <Icon className="mr-3 text-gray-00" size={24} />
    <span className="text-lg">{text}</span>
  </motion.button>
);

const ActionSection = ({ title, children }) => (
  <div className="w-full md:w-1/3 p-3">
    <h2 className="text-xl font-bold mb-3 text-gray-700">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const ActionSelectionComponent = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Police End System Dashboard
      </h1>
      <div className="flex flex-wrap -mx-3">
        <ActionSection title="Suspect Management">
          <ActionButton
            icon={FaSearch}
            text="View Suspects"
            onClick={() => navigate("/dashboard/view-suspects")}
          />
          <ActionButton
            icon={FaUserPlus}
            text="Add New Suspect"
            onClick={() => {}}
          />
          <ActionButton
            icon={FaFileUpload}
            text="Upload Suspect Data"
            onClick={() => setIsModalOpen(true)}
          />
        </ActionSection>

        <ActionSection title="Investigation Tools">
          <ActionButton
            icon={BiCctv}
            text="CCTV Footage Analysis"
            onClick={() => {}}
          />
          <ActionButton
            icon={FaChartBar}
            text="Crime Statistics"
            onClick={() => {}}
          />
          <ActionButton
            icon={GiHandcuffs}
            text="Arrest Records"
            onClick={() => {}}
          />
        </ActionSection>

        <ActionSection title="Reports and Security">
          <ActionButton
            icon={FaClipboardList}
            text="Generate Reports"
            onClick={() => {}}
          />
          <ActionButton
            icon={MdSecurity}
            text="Security Clearance"
            onClick={() => {}}
          />
          <ActionButton
            icon={MdReport}
            text="Incident Reporting"
            onClick={() => {}}
          />
        </ActionSection>

        <SuspectUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={(formData) => {
            // Handle the form data upload here
            console.log("Uploading data:", formData);
            // You would typically send this data to your backend here
            // After successful upload, you might want to close the modal:
            // setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <ActionSelectionComponent />
    </motion.div>
  );
}

export default Home;
