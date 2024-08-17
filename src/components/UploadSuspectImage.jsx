import React from 'react';

import  { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

function UploadSuspectImage() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Upload Suspect Image</h2>
      <div className="max-w-md mx-auto">
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
          <FaUpload className="text-3xl mb-2" />
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
        {image && (
          <div className="mt-4">
            <p className="text-green-500">File selected: {image.name}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default UploadSuspectImage;
