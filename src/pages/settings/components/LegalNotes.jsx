import React, { useState, useEffect, useRef, useCallback } from "react";
import JoditEditor from "jodit-react";
import { notification, Spin } from "antd";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";

const LegalNotes = () => {
  const editor = useRef(null);
  const [legalNotesContent, setLegalNotesContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  // API Hooks
  const { data: legalNotesData, isLoading, isError, refetch } =
    useGetSettingsQuery({ param: "Legal_Notes" });

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load fetched data into state when available
  useEffect(() => {
    if (legalNotesData?.data?.data) {
      setLegalNotesContent(legalNotesData.data.data);
      setInitialContent(legalNotesData.data.data);
    }
  }, [legalNotesData]);

  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  // Handle content change from editor (onBlur for controlled update)
  const handleEditorChange = useCallback(
    (newContent) => {
      if (newContent !== undefined && newContent !== null) {
        setLegalNotesContent(newContent);
      }
    },
    [setLegalNotesContent]
  );

  const handleUpdateLegalNotes = async (e) => {
    e.preventDefault();

    if (legalNotesContent.trim() === initialContent.trim()) {
      api.info({
        message: "No changes detected.",
        placement: "top",
      });
      return;
    }

    try {
      const response = await updateSettings({
        data: legalNotesContent,
        param: "Legal_Notes",
      });

      if (response?.data?.status === true) {
        api.success({
          message: "Legal Notes updated successfully",
          placement: "top",
        });
        setInitialContent(legalNotesContent); // Sync state after update
        refetch();
      } else {
        api.error({
          message: response?.data?.message || "Failed to update content",
          placement: "top",
        });
      }
    } catch (err) {
      console.error("Error updating Legal Notes:", err);
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
        Failed to load Legal Notes. Please try again later.
      </div>
    );
  }

  return (
    <div className="legal-notes">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Legal Notes
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your legal notes.
      </p>

      <JoditEditor
        ref={editor}
        value={legalNotesContent}
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
          onClick={handleUpdateLegalNotes}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 className="text-black text-2xl font-work font-semibold mb-6">
          Preview Updated Content:
        </h3>
        <div dangerouslySetInnerHTML={{ __html: legalNotesContent }} />
      </div>
    </div>
  );
};

export default LegalNotes;
