import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginReq } from "../request";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    setLoading(true);
    try {
      const response = await loginReq(data);
      const { success, message } = response ?? {};
      if (success) {
        console.log(message);
        toast.success(JSON.stringify(message));
        navigate("/dashboard");
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message ?? "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Police End System Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-500" />
              </span>
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ReactLoading
                  type="spin"
                  color="#ffffff"
                  height={20}
                  width={20}
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          {"Don't have an account?"}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
