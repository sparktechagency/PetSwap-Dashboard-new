import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";
import { notification } from "antd";

const LegalNotes = () => {
  const editor = useRef(null);
  const [legalNotesContent, setLegalNotesContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  useEffect(() => {
    const fetchTerms = () => {
      const initialTerms =
        "<h2>Legal Notes</h2><p>Your legal notes content goes here...</p>";
      setLegalNotesContent(initialTerms);
    };

    fetchTerms();
  }, []);

  // Handle changes to the editor content properly
  const handleEditorChange = (newContent) => {
    if (newContent) {
      setLegalNotesContent(newContent);
    }
  };

  // Simulate saving the updated terms
  const handleSave = () => {
    console.log("Updated Legal Notes:", legalNotesContent);
    alert("Legal Notes saved!");
  };

  // rtk query hooks
  const [updateSettings] = useUpdateSettingsMutation();
  const { data: legalNotesData } = useGetSettingsQuery({
    param: "Legal_Notes",
  });

  const handleUpdateTermsConditions = async (e) => {
    e.preventDefault();
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
      } else {
        api.error({
          message: response?.data?.message,
          placement: "top",
        });
      }
    } catch (err) {
      console.error("Error updating Terms and Conditions:", err);
    }
  };

  return (
    <div className="legal-notes">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Legal Notes
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your legal notes.
      </p>

      {/* Jodit Editor */}
      <JoditEditor
        ref={editor}
        value={legalNotesData?.data?.data}
        config={editorConfig}
        onBlur={(newContent) => handleEditorChange(newContent)}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleUpdateTermsConditions}
        >
          Update
        </button>
      </div>

      {/* Display updated terms */}
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
