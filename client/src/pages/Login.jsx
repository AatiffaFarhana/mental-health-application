import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      login(res.data.token , res.data.user);

      alert("Login Successful!");

      navigate("/");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#0f172a]">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-6"
          required
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;