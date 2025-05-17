// import { Alert } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/ApiSlice";
import {
  IconCloseEye,
  IconLock,
  IconOpenEye,
  IconUser,
} from "../../assets/icons/Icons";

function Login() {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // rtk query hooks
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    try {
      const response = await login({ email, password });
      const token = response?.data?.data?.access_token;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        alert("Login Failed", "No token received. Please try again.");
      }
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-8 text-center text-4xl font-work font-semibold">
            Welcome Back!
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="flex flex-row px-4 mb-3 bg-white items-center border border-gray-300 rounded-2xl">
              <div dangerouslySetInnerHTML={{ __html: IconUser }} />
              <input
                type="text"
                placeholder="Email"
                className="focus:outline-none p-4 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Confirm Password */}
            <div className="flex flex-row px-4 bg-white items-center border border-gray-300 rounded-2xl">
              <div dangerouslySetInnerHTML={{ __html: IconLock }} />

              <input
                type={!showConfirmPassword ? "text" : "password"}
                placeholder="Password"
                className="focus:outline-none p-4 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showConfirmPassword ? (
                <div
                  dangerouslySetInnerHTML={{ __html: IconCloseEye }}
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: IconOpenEye }}
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>

            <button
              // onClick={handleLogin}
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
              Login
            </button>
            <div className={`flex flex-row justify-end`}>
              <Link
                to={"/forgot-password"}
                className={`text-primary underline cursor-pointer text-sm font-work font-semibold mt-4`}
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
