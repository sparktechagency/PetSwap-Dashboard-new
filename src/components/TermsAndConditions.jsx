import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";

const TermsAndConditions = () => {
  
  const [termsContent, setTermsContent] = useState("");
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

  // Handle changes to the editor content
  const handleEditorChange = (newContent) => {
    setTermsContent(newContent);
  };

  // Simulate saving the updated terms (you can replace this with an API call)
  const handleSave = () => {
    // For demonstration, just log the updated content
    console.log("Updated Terms and Conditions:", termsContent);
    alert("Terms and Conditions saved!");
  };

  return (
    <div className="terms-and-conditions">
      <h1 className="text-black text-2xl font-work font-semibold">
        Terms and Conditions
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your terms and conditions.
      </p>

      {/* Jodit Editor */}
      <JoditEditor
        value={termsContent}
        config={editorConfig}
        onChange={handleEditorChange}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleSave}
        >
          Update
        </button>
      </div>

      {/* Display updated terms (optional) */}
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
