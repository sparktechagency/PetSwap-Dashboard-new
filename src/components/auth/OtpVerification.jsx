import React, { useState } from "react";
import { Flex, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../redux/api/ApiSlice";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  // rtk query hooks
  const [verifyOtp] = useVerifyOtpMutation();
  // states
  const [otp, setOtp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await verifyOtp({ email, otp });
      console.log("response check of otp submit", response);

      if (response?.error?.status === 500) {
        return alert(response?.error?.data?.message);
      }

      const accessToken = response?.data?.data?.access_token;

      if (accessToken) {
        // Store the token in localStorage
        localStorage.setItem("authToken", accessToken);
        console.log("Token stored in localStorage:", accessToken);
        navigate("/new-password", { state: { email } });
      } else {
        alert(
          "OTP Verification Failed",
          "No token received. Please try again."
        );
      }
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-2 text-2xl font-work font-semibold">
            OTP Verification
          </h1>
          <p className={`text-subtitle text-base font-work font-normal`}>
            We just sent a verification code to <br />
            <b>{email}</b>
          </p>

          <form onSubmit={handleSubmit} className={`mt-4`}>
            <Flex gap="middle" align="flex-start" vertical>
              <h4 className="text-title text-base font-work font-bold">
                Enter the code
              </h4>
              <Input.OTP
                size="large"
                formatter={(str) => str.toUpperCase()}
                onChange={(text) => setOtp(text)}
              />
            </Flex>
            <button
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
              Continue
            </button>
            <p className="text-black mt-4 text-sm font-work font-normal text-center">
              Didn’t get OTP?{" "}
              <span className="text-primary cursor-pointer">Send Again</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
