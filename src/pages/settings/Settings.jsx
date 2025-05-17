import React, { useState } from "react";
import PersonalInformation from "./components/PersonalInformation";
import FAQ from "./components/FAQ";
import TermsAndConditions from "./components/TermsAndConditions";
import LegalNotes from "./components/LegalNotes";
import OurPlatform from "./components/OurPlatform";
import HelpRequest from "./components/HelpRequest";

function Settings() {
  const [activeScreen, setActiveScreen] = useState(0);
  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-black text-2xl font-semibold font-work">
            Settings
          </h1>
          <p className="text-gray100 text-sm font-work mt-1 font-normal">
            Admin can change personal information, FAQ and terms & condition
          </p>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex flex-row items-center gap-4 mb-4">
        <span
          className={`${
            activeScreen === 0
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(0)}
        >
          Personal Information
        </span>
        <span
          className={`${
            activeScreen === 1
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(1)}
        >
          FAQ
        </span>

        <span
          className={`${
            activeScreen === 2
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(2)}
        >
          Terms & Conditions
        </span>

        <span
          className={`${
            activeScreen === 3
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(3)}
        >
          Legal notes
        </span>

        <span
          className={`${
            activeScreen === 4
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(4)}
        >
          Our platform
        </span>

        <span
          className={`${
            activeScreen === 5
              ? "text-primary font-semibold"
              : "text-[#949494] font-normal"
          } text-base font-work cursor-pointer`}
          onClick={() => setActiveScreen(5)}
        >
          Help request
        </span>
      </div>

      {activeScreen === 0 ? (
        <PersonalInformation />
      ) : activeScreen === 1 ? (
        <FAQ />
      ) : activeScreen === 2 ? (
        <TermsAndConditions />
      ) : activeScreen === 3 ? (
        <LegalNotes />
      ) : activeScreen === 4 ? (
        <OurPlatform />
      ) : activeScreen === 5 ? (
        <HelpRequest />
      ) : (
        <h1>No Screen Found!</h1>
      )}
    </div>
  );
}

export default Settings;
