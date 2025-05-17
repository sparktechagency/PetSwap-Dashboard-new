import React, { useState } from "react";
import DeleteModal from "../DeleteModal";

function BestTimeToVisit() {
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [bestTimeToVisits, setBestTimeToVisits] = useState([]);
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] =
    useState(false);
  const handleAddBestTimeToVisit = () => {
    if (bestTimeToVisit.trim() !== "") {
      setBestTimeToVisits([...bestTimeToVisits, bestTimeToVisit]);
      setBestTimeToVisit(""); // Reset the input field after adding
    }
  };
  const handleRemoveBestTimeToVisit = (index) => {
    setBestTimeToVisits(bestTimeToVisits.filter((_, i) => i !== index));
  };
  const handleBestTimeToVisitChange = (e) => {
    setBestTimeToVisit(e.target.value);
  };

  const handleDelete = () => {
    setIsDeleteCateModalVisible(false);
  };
  const handleCancel = () => {
    setIsDeleteCateModalVisible(false);
  };
  return (
    <>
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Best time to visit"
          className="w-full focus:outline-none"
          value={bestTimeToVisit}
          onChange={handleBestTimeToVisitChange}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleAddBestTimeToVisit}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {bestTimeToVisits.map((activity, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{activity}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => handleRemoveBestTimeToVisit(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
        onClick={() => console.log("Update")}
      >
        Update
      </button>

      <div>
        <h2 className="text-black text-xl mt-3 font-semibold">
          Your Best Time to Visit
        </h2>

        <div className="flex flex-wrap gap-2">
          {["Visit 1", "Visit 2", "Visit 3"].map((activity, index) => (
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
        handleOk={handleDelete}
        isVisible={isDeleteCateModalVisible}
        handleCancel={handleCancel}
        title={"Are you sure want to delete this visit time?"}
      />
    </>
  );
}

export default BestTimeToVisit;
