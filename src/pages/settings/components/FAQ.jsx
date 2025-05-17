import React, { useState } from "react";
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery } from "../../../redux/api/ApiSlice";
import { notification } from "antd";
import { IconTrash } from "../../../assets/icons/Icons";
import DeleteModal from "../../../components/DeleteModal";

function FAQ() {
  const [api, contextHolder] = notification.useNotification();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] = useState(false);
  const [faqId, setFaqId] = useState("");

  // rtk query hooks
  const [addFaq] = useAddFaqMutation();
  const { data: faqs } = useGetFaqQuery({});
  const [deleteFaq] = useDeleteFaqMutation();

  const addNewFaq = async (e) => {
    e.preventDefault();
    try {
      const response = await addFaq({ question, answer });
      if (response?.data?.status === true) {
        setQuestion("");
        setAnswer("");
        api.success({
          message: "FAQ added successfully",
          placement: "top",
        });
      } else {
        api.error({
          message: response?.data?.message,
          placement: "top",
        });
      }
      console.log("FAQ added successfully:", response);
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
  };

  console.log("faqs: ", faqs);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteFaq({ id: faqId });
      console.log("FAQ deleted successfully:", response);
      setIsDeleteCateModalVisible(false);
      api.success({
        message: "FAQ deleted successfully",
        placement: "top",
      });
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      api.error({
        message: err?.response?.data?.message,
        placement: "top",
      });
    }

  };

  return (
    <div className="bg-white p-4 rounded-2xl">
      {contextHolder}
      <div className="my-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-black text-2xl font-work font-semibold">
            Frequently Asked Questions
          </h1>
          <h4 className="text-gray100 text-sm font-work font-medium mt-1">
            Last updated on 5/12/2024
          </h4>
        </div>
        <div className="flex flex-row items-center gap-3 justify-between mt-4">
          <button
            onClick={addNewFaq}
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-primary bg-secondary border border-secondary flex flex-row items-center justify-center gap-2"
          >
            Add New
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.3335 15.834V7.83398H16.6668V15.834H24.6668V17.1673H16.6668V25.1673H15.3335V17.1673H7.3335V15.834H15.3335Z"
                fill="#064145"
                stroke="#064145"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="focus:outline-none p-4 w-full border border-90 rounded-2xl"
        />
        <textarea
          rows="5"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Auto size height based on content lines"
          className="focus:outline-none p-4 w-full border border-90 rounded-2xl"
        ></textarea>
      </div>

      {/* Displaying the list of FAQs */}
      <div className="mt-6">
        {faqs?.data?.map((faq, index) => (
          <div className={`flex-row flex items-center gap-2 gap-y-4 justify-between border-b border-b-gray-100 py-4`} key={index}>
            <div  className="">
              <h1 className="text-secondaryTitle text-lg font-work font-bold">
                {faq.question}
              </h1>
              <p className="text-subtitle text-base font-work font-normal">
                {faq.answer}
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: IconTrash }} onClick={() => {setIsDeleteCateModalVisible(true); setFaqId(faq.id)}}/>
          </div>
        ))}
      </div>
      <DeleteModal
        handleOk={handleDelete}
        isVisible={isDeleteCateModalVisible}
        handleCancel={() => setIsDeleteCateModalVisible(false)}
        title={"Are you sure want to delete this Faq?"}
      />
    </div>
  );
}

export default FAQ;
