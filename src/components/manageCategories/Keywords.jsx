import React, { useState } from "react";
import DeleteModal from "../DeleteModal";

function Keywords() {
  const [isDeleteKeywordModalVisible, setIsDeleteKeywordModalVisible] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleAddKeyword = () => {
    if (keyword.trim() !== "") {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleDeleteKeyword = () => {
    setIsDeleteKeywordModalVisible(false);
  };

  return (
    <>
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Keyword"
          className="w-full focus:outline-none"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleAddKeyword}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{keyword}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => handleRemoveKeyword(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
        onClick={() => alert("Update")}
      >
        Update
      </button>

      <div>
        <h2 className="text-black text-xl mt-3 font-semibold">Your Keywords</h2>

        <div className="flex flex-wrap gap-2">
          {["Keyword 1", "Keyword 2", "Keyword 3"].map((keyword, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-gray100 font-semibold">{keyword}</span>
              <button
                className="ml-2 bg-gray100 text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => {
                  setIsDeleteKeywordModalVisible(true);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal
        isVisible={isDeleteKeywordModalVisible}
        handleCancel={() => setIsDeleteKeywordModalVisible(false)}
        handleOk={handleDeleteKeyword}
        title={"Delete Keyword?"}
        subtitle={"Are you sure you want to delete this keyword?"}
      />
    </>
  );
}

export default Keywords;
