import React, { useState, useEffect, useRef, useCallback } from "react";
import JoditEditor from "jodit-react";
import { notification, Spin } from "antd";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";

const OurPlatform = () => {
  const editor = useRef(null);
  const [ourPlatformContent, setOurPlatformContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const { data: ourPlatformData, isLoading, isError, refetch } =
    useGetSettingsQuery({ param: "Our_Platform" });

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Sync fetched data into editor state
  useEffect(() => {
    if (ourPlatformData?.data?.data) {
      setOurPlatformContent(ourPlatformData.data.data);
      setInitialContent(ourPlatformData.data.data);
    }
  }, [ourPlatformData]);

  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  const handleEditorChange = useCallback(
    (newContent) => {
      if (newContent !== undefined && newContent !== null) {
        setOurPlatformContent(newContent);
      }
    },
    [setOurPlatformContent]
  );

  const handleUpdateOurPlatform = async (e) => {
    e.preventDefault();

    if (ourPlatformContent.trim() === initialContent.trim()) {
      api.info({
        message: "No changes detected.",
        placement: "top",
      });
      return;
    }

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
        setInitialContent(ourPlatformContent);
        refetch();
      } else {
        api.error({
          message: response?.data?.message || "Failed to update content",
          placement: "top",
        });
      }
    } catch (err) {
      console.error("Error updating Our Platform:", err);
      api.error({
        message: "An unexpected error occurred.",
        placement: "top",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load Our Platform content. Please try again later.
      </div>
    );
  }

  return (
    <div className="our-platform">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Our Platform
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your platform details.
      </p>

      <JoditEditor
        ref={editor}
        value={ourPlatformContent}
        config={editorConfig}
        onBlur={(newContent) => handleEditorChange(newContent)}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          disabled={isUpdating}
          className={`rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleUpdateOurPlatform}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>

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
