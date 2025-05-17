import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/api/ApiSlice";
import { IconEmail } from "../../assets/icons/Icons";

function ForgotPassword() {
  const navigate = useNavigate();

  // state
  const [email, setEmail] = useState("");

  // rtk query hooks
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await forgetPassword({ email });
      if(response?.error?.data?.status === false) return alert(response?.error?.data?.message?.email[0]);
      navigate("/otp-verification", { state: { email } });
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-2 text-2xl font-work font-semibold">
            Forget Password?
          </h1>
          <p className={`text-subtitle text-base font-work font-normal`}>
            Don't worry we are here to help you.
          </p>

          <form onSubmit={handleSubmit} className={`mt-4`}>
            <div className="flex flex-row px-4 bg-white items-center border border-90 rounded-2xl">
              <div dangerouslySetInnerHTML={{ __html: IconEmail }} />

              <input
                type="text"
                placeholder="Email"
                className={`focus:outline-none p-4 w-full`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
             {isLoading ? "Submitting..." : "submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
