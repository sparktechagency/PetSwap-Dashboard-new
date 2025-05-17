import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";
import { notification } from "antd";

const OurPlatform = () => {
  const editor = useRef(null);
  const [ourPlatformContent, setOurPlatformContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  useEffect(() => {
    const fetchTerms = () => {
      const initialTerms =
        "<h2>Our Platform</h2><p>Your our platform content goes here...</p>";
      setOurPlatformContent(initialTerms);
    };

    fetchTerms();
  }, []);

  // Handle changes to the editor content properly
  const handleEditorChange = (newContent) => {
    if (newContent) {
      setOurPlatformContent(newContent);
    }
  };

  // rtk query hooks
  const [updateSettings] = useUpdateSettingsMutation();
  const { data: ourPlatformData } = useGetSettingsQuery({
    param: "Our_Platform",
  });

  const handleUpdateOurPlatform = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSettings({
        data: ourPlatformContent,
        param: "Our_Platform",
      });
      if (response?.data?.status === true) {
        api.success({
          message: "Our Platform updated successfully",
          placement: "top",
        });
      } else {
        api.error({
          message: response?.data?.message,
          placement: "top",
        });
      }
    } catch (err) {
      console.error("Error updating Our Platform:", err);
    }
  };

  return (
    <div className="our-platform">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Our Platform
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your platform details.
      </p>

      {/* Jodit Editor */}
      <JoditEditor
        ref={editor}
        value={ourPlatformContent}
        config={editorConfig}
        onBlur={(newContent) => handleEditorChange(newContent)}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleUpdateOurPlatform}
        >
          Update
        </button>
      </div>

      {/* Display updated terms */}
      <div style={{ marginTop: "30px" }}>
        <h3 className="text-black text-2xl font-work font-semibold mb-6">
          Preview Updated Content:
        </h3>
        <div dangerouslySetInnerHTML={{ __html: ourPlatformContent }} />
      </div>
    </div>
  );
};

export default OurPlatform;
