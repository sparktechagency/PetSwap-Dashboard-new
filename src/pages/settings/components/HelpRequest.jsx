import React, { useState } from "react";
import { IconView } from "../../../assets/icons/Icons";
import { Modal, notification } from "antd";
import {
  useAnswerHelpRequestMutation,
  useHelpRequestQuery,
} from "../../../redux/api/ApiSlice";
import { convertToCustomFormat } from "../../../utils/functions/functions";

function HelpRequest() {
  const [viewModal, setViewModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [answer, setAnswer] = useState("");
  const [api, contextHolder] = notification.useNotification();

  // rtk query hooks
  const { data: helpRequests } = useHelpRequestQuery({});
  const [answerHelpRequest, { isLoading: isAnswering }] =
    useAnswerHelpRequestMutation();

  const handleSumbitAnswer = async (e) => {
    e.preventDefault();
    try {
      const response = await answerHelpRequest({
        data: { answer, _method: "PUT" },
        id: modalData?.id,
      });
      setViewModal(false);
      if (response?.data?.status === true) {
        api.success({
          message: "Answer submitted successfully",
          placement: "top",
        });
        setAnswer("");
      } else {
        api.error({
          message: response?.data?.message,
          placement: "top",
        });
      }

      console.log("response of answer help request: ", response);
    } catch (err) {
      console.log("Error details:", err);
    }
  };

  console.log("modal data: ", modalData);

  return (
    <div>
      {contextHolder}
      <table className="table-auto w-full">
        <thead className="bg-gray90 rounded-xl">
          <tr className="h-12">
            <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
              Name
            </th>
            <th className="text-left text-gray300 text-xs font-work font-medium">
              Email
            </th>
            <th className="text-left text-gray300 text-xs font-work font-medium">
              Subject
            </th>
            <th className="text-left text-gray300 text-xs font-work font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {helpRequests?.data?.data?.map((item, index) => (
            <tr
              className="border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer"
              key={index}
            >
              <td className="pl-4 flex flex-row items-center gap-2">
                <div className="py-2">
                  <img
                    src={
                      item?.user?.avatar ||
                      `https://i.pravatar.cc/150?img=${index}`
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <h1 className={`text-title text-sm font-work font-normal`}>
                    {item?.user?.name || "N/A"}
                  </h1>
                  <h1
                    className={`text-[#475467] text-sm font-work font-normal`}
                  >
                    {item?.user?.email || "N/A"}
                  </h1>
                </div>
              </td>
              <td>{convertToCustomFormat(item?.created_at) || "N/A"}</td>
              <td>{item?.subject || "N/A"}</td>
              <td>
                <div className="flex flex-row items-center justify-centergap-2">
                  <div
                    className="cursor-pointer px-2"
                    onClick={() => {
                      setViewModal(true);
                      setModalData(item);
                    }}
                    dangerouslySetInnerHTML={{ __html: IconView }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={viewModal} onCancel={() => setViewModal(false)}>
        <h1 className="text-primary text-xl font-work font-semibold">
          Request Details
        </h1>

        <div className="mt-4 flex flex-col gap-y-4">
          <div>
            <h1 className="text-title text-base font-work font-semibold">
              Subject
            </h1>
            <h1 className="text-title text-base font-work font-normal">
              {modalData?.subject || "N/A"}
            </h1>
          </div>
          <div>
            <h1 className="text-title text-base font-work font-semibold">
              Description
            </h1>
            <h1 className="text-title text-base font-work font-normal">
              {modalData?.description || "N/A"}
            </h1>
          </div>
          <div className="flex flex-row px-4 bg-white items-center border border-90 rounded-2xl">
            <input
              type="text"
              placeholder="Answer"
              className={`focus:outline-none p-4 w-full`}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button
            className="rounded-xl py-3 mt-2 cursor-pointer text-center font-work bg-primary text-white text-sm font-bold w-full"
            onClick={handleSumbitAnswer}
          >
            {isAnswering ? "Sending..." : "Send"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default HelpRequest;
