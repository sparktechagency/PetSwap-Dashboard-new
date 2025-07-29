import React, { useState, useEffect, useRef, useCallback } from "react";
import JoditEditor from "jodit-react";
import { notification, Spin } from "antd";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [termsContent, setTermsContent] = useState("");
  const [initialContent, setInitialContent] = useState(""); // For change detection
  const [api, contextHolder] = notification.useNotification();

  // API Hooks
  const { data: termsConditionData, isLoading, isError, refetch } =
    useGetSettingsQuery({ param: "Terms_and_Conditions" });

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load fetched data into editor once available
  useEffect(() => {
    if (termsConditionData?.data?.data) {
      setTermsContent(termsConditionData.data.data);
      setInitialContent(termsConditionData.data.data);
    }
  }, [termsConditionData]);

  // Editor config
  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  // Debounced editor change handler
  const handleEditorChange = useCallback(
    (newContent) => {
      if (newContent !== undefined && newContent !== null) {
        setTermsContent(newContent);
      }
    },
    [setTermsContent]
  );

  const handleUpdateTermsConditions = async (e) => {
    e.preventDefault();

    if (termsContent.trim() === initialContent.trim()) {
      api.info({
        message: "No changes detected.",
        placement: "top",
      });
      return;
    }

    try {
      const response = await updateSettings({
        data: termsContent,
        param: "Terms_and_Conditions",
      });

      if (response?.data?.status === true) {
        api.success({
          message: "Terms and Conditions updated successfully",
          placement: "top",
        });
        setInitialContent(termsContent); // Sync initialContent after update
        refetch();
      } else {
        api.error({
          message: response?.data?.message || "Failed to update content",
          placement: "top",
        });
      }
    } catch (err) {
      console.error("Error updating Terms and Conditions:", err);
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
        Failed to load Terms and Conditions. Please try again later.
      </div>
    );
  }

  return (
    <div className="terms-and-conditions">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Terms and Conditions
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your terms and conditions.
      </p>

      <JoditEditor
        ref={editor}
        value={termsContent}
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
          onClick={handleUpdateTermsConditions}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 className="text-black text-2xl font-work font-semibold mb-6">
          Preview Updated Content:
        </h3>
        <div dangerouslySetInnerHTML={{ __html: termsContent }} />
      </div>
    </div>
  );
};

export default TermsAndConditions;
