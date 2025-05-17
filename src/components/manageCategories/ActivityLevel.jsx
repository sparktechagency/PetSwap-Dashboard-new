import React, { useState } from "react";
import DeleteModal from "../DeleteModal";

function ActivityLevel() {
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] =
    useState(false);
  const [activityLevel, setActivityLevel] = useState("");
  const [activityLevels, setActivityLevels] = useState([]);

  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };
  const handleRemoveActivityLevel = (index) => {
    setActivityLevels(activityLevels.filter((_, i) => i !== index));
  };
  const handleAddActivityLevel = () => {
    if (activityLevel.trim() !== "") {
      setActivityLevels([...activityLevels, activityLevel]);
      setActivityLevel("");
    }
  };

  const handleDeleteCategory = () => {
    setIsDeleteCateModalVisible(false);
  };
  return (
    <>
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Activity Level"
          className="w-full focus:outline-none"
          value={activityLevel}
          onChange={handleActivityLevelChange}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleAddActivityLevel}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activityLevels.map((activity, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{activity}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => handleRemoveActivityLevel(index)}
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
        <h2 className="text-black text-xl mt-3 font-semibold">
          Your Best Time to Visit
        </h2>

        <div className="flex flex-wrap gap-2">
          {["Level 1", "Level 2", "Level 3"].map((activity, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-gray100 font-semibold">{activity}</span>
              <button
                className="ml-2 bg-gray100 text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => {
                  setIsDeleteCateModalVisible(true);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal
        isVisible={isDeleteCateModalVisible}
        handleCancel={() => setIsDeleteCateModalVisible(false)}
        handleOk={handleDeleteCategory}
        title={"Delete Best Time to Visit?"}
        subtitle={"Are you sure you want to delete this best time to visit?"}
      />
    </>
  );
}

export default ActivityLevel;
