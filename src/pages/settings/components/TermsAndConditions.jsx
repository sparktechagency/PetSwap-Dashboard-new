import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/api/ApiSlice";
import { notification } from "antd";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [termsContent, setTermsContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const editorConfig = {
    readonly: false,
    toolbarSticky: true,
    height: 400,
  };

  useEffect(() => {
    const fetchTerms = () => {
      const initialTerms =
        "<h2>Terms and Conditions</h2><p>Your terms and conditions content goes here...</p>";
      setTermsContent(initialTerms);
    };

    fetchTerms();
  }, []);

  // Handle changes to the editor content properly
  const handleEditorChange = (newContent) => {
    if (newContent) {
      setTermsContent(newContent);
    }
  };

  // rtk query hooks
  const [updateSettings] = useUpdateSettingsMutation();
  const { data: termsConditionData } = useGetSettingsQuery({
    param: "Terms_and_Conditions",
  });

  const handleUpdateTermsConditions = async (e) => {
    e.preventDefault();
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
    <div className="terms-and-conditions">
      {contextHolder}
      <h1 className="text-black text-2xl font-work font-semibold">
        Terms and Conditions
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your terms and conditions.
      </p>

      {/* Jodit Editor */}
      <JoditEditor
        ref={editor}
        value={termsConditionData?.data?.data}
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
        <div dangerouslySetInnerHTML={{ __html: termsContent }} />
      </div>
    </div>
  );
};

export default TermsAndConditions;
