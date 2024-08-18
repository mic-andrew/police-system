import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUserCircle,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getSuspectsReq } from "../request";
import { CORE_BACKEND_URL } from "../utils";

const CapturedSuspects = () => {
  const [suspects, setSuspects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ country: "", gender: "" });
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuspects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSuspectsReq();
      if (result.error) {
        setError(result.error);
      } else {
        setSuspects(result.filter((suspect) => suspect.located));
      }
    } catch (err) {
      setError("An error occurred while fetching suspects");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuspects();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const filteredSuspects = suspects?.filter(
    (suspect) =>
      suspect.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter.country ? suspect.country === filter.country : true) &&
      (filter.gender ? suspect.gender === filter.gender : true)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Suspect Database</h1>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search suspects..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <select
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter.country}
          onChange={(e) => handleFilter("country", e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="France">France</option>
        </select>
        <select
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter.gender}
          onChange={(e) => handleFilter("gender", e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : filteredSuspects.length === 0 ? (
        <div className="text-center text-gray-500">No suspects available</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time Located
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSuspects.map((suspect) => (
                <tr
                  key={suspect._id}
                  onClick={() => setSelectedSuspect(suspect)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {suspect.images &&
                  suspect.images.length > 0 &&
                  suspect.images[0].filename ? (
                    <img
                      src={`${CORE_BACKEND_URL}/uploads/${suspect.images[0].filename}`}
                      alt={suspect.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full rounded-full text-gray-300" />
                  )}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {suspect.age}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {suspect.lastLocation}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {suspect.country}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {suspect.gender}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(suspect.timeLocated).toLocaleString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedSuspect && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto"
          >
            <button
              onClick={() => setSelectedSuspect(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <MdClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Suspect Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaUserCircle className="text-gray-400 mr-3" size={24} />
                <span className="font-semibold">{selectedSuspect.name}</span>
              </div>
              <div className="flex items-center">
                <FaBirthdayCake className="text-gray-400 mr-3" size={24} />
                <span>{selectedSuspect.age} years old</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3" size={24} />
                <span>
                  {selectedSuspect.lastLocation}, {selectedSuspect.country}
                </span>
              </div>
              <div className="flex items-center">
                <FaVenusMars className="text-gray-400 mr-3" size={24} />
                <span>{selectedSuspect.gender}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CapturedSuspects;
