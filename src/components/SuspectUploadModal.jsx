import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { uploadSuspectReq } from "../request";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const SuspectUploadModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("lastLocation", lastLocation);
    formData.append("country", country);
    formData.append("gender", gender);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const result = await uploadSuspectReq(formData);
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Suspect data uploaded successfully");
        onClose();
        // Reset form fields here if needed
      }
    } catch (error) {
      toast.error("An error occurred while uploading suspect data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <ReactLoading
                  type="spin"
                  color="#4B5563"
                  height={50}
                  width={50}
                />
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Upload Suspect Data
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Known Location"
                    value={lastLocation}
                    onChange={(e) => setLastLocation(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 inline-block"
                  >
                    Select Image(s)
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <h3 className="font-semibold mb-2">Selected Files:</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span className="truncate flex-1 mr-2">{file.name}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <LiaTimesSolid />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !name ||
                !age ||
                !lastLocation ||
                !country ||
                !gender ||
                images.length === 0
              }
              className={`mt-6 w-full py-2 px-4 rounded flex items-center justify-center ${
                !isLoading &&
                name &&
                age &&
                lastLocation &&
                country &&
                gender &&
                images.length > 0
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition duration-300`}
            >
              {isLoading ? (
                <ReactLoading
                  type="spin"
                  color="#ffffff"
                  height={20}
                  width={20}
                />
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Upload
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuspectUploadModal;
