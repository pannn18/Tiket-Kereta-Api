"use client";

import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/helper/api";
import { storeCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa"; // <-- ICON

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await axiosInstance.post(`/auth`, {
        username,
        password,
      });

      if (response.data.success === false) {
        toast(response.data.message, {
          type: "warning",
          containerId: "toastLogin",
        });
      } else {
        const { message, token, role } = response.data;

        storeCookie("token", token);
        toast(message, { type: "success", containerId: "toastLogin" });

        setTimeout(() => {
          if (role === "ADMIN") {
            router.replace("karyawan/kereta");
          } else if (role === "CUSTOMER") {
            router.replace("pelanggan/jadwal");
          }
        }, 1000);
      }
    } catch (error: any) {
      console.error(error);
      toast(error.response?.data?.message || "Something went wrong", {
        containerId: "toastLogin",
        type: "error",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-200">
      <ToastContainer containerId="toastLogin" />

      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Selamat Datang 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Silakan login untuk melanjutkan
        </p>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Username
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 focus:outline-none"
              placeholder="Masukkan username"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 focus:outline-none"
              placeholder="Masukkan password"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Login
        </button>

        {/* Extra links */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a href="#" className="hover:text-blue-600 transition">
            Lupa password?
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Daftar akun
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
