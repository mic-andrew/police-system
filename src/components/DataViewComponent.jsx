import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const DataTableView = ({
  title,
  data,
  columns,
  searchFields,
  filterOptions,
  detailsRenderer,
  fetchData,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchData) {
      const loadData = async () => {
        setIsLoading(true);
        const fetchedData = await fetchData();
        setItems(fetchedData);
        setIsLoading(false);
      };
      loadData();
    } else {
      setItems(data);
    }
  }, [fetchData, data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = searchFields.some((field) =>
      item[field].toLowerCase().includes(search.toLowerCase())
    );
    const matchesFilters = Object.entries(filters).every(
      ([key, value]) => !value || item[key] === value
    );
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={handleSearch}
          />
        </div>
        {filterOptions.map((filter) => (
          <select
            key={filter.key}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filters[filter.key] || ""}
            onChange={(e) => handleFilter(filter.key, e.target.value)}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item[column.key]}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <MdClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            {detailsRenderer(selectedItem)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataTableView;
