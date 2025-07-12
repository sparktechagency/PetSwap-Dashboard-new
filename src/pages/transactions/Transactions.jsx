import React, { useState } from "react";
import { DatePicker } from "antd";
import { useGetTransactionsQuery } from "../../redux/api/ApiSlice";
import { formattedDate } from "../../utils/functions/functions";
import { SearchOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
function Transactions() {
  // states
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // rtk query hooks
  const { data: transactions } = useGetTransactionsQuery({
    page: activePage,
    search: searchText,
  });
  console.log("trancsactions", transactions);

  console.log("active page: ", activePage);

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div>
        {/* <div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="text-black text-2xl font-semibold font-work">
                Overview
              </h1>
              <p className="text-gray100 text-sm font-work mt-1 font-normal">
                Activities summary at a glance
              </p>
            </div>

            <div>
              <div className="flex flex-row justify-end">
                <Select
                  className="mb-3"
                  defaultValue="weekly"
                  value={filteredStatics}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChangeStatics}
                  options={[
                    {
                      value: "weekly",
                      label: "Weekly",
                    },
                    {
                      value: "monthly",
                      label: "Monthly",
                    },
                    {
                      value: "yearly",
                      label: "Yearly",
                    },
                    {
                      value: "custom",
                      label: "Custom",
                    },
                  ]}
                />
              </div>
              <div>
                {filteredStatics === "custom" && (
                  <RangePicker
                    style={{ width: 300 }}
                    format="YYYY-MM-DD"
                    onPanelChange={onPanelChange}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1 border border-gray200 rounded-2xl p-4">
              <div dangerouslySetInnerHTML={{ __html: IconPaypal }} />
              <div className="flex flex-row items-end gap-2 mt-2">
                <h1 className="text-title text-4xl font-work font-bold">37k</h1>
                <div dangerouslySetInnerHTML={{ __html: IconIncreasingData }} />
              </div>
              <div className="my-2">
                <h3 className="text-title text-sm font-work font-semibold">
                  Transactions
                </h3>
                <p className="text-gray100 text-sm font-work font-normal">
                  39k Increased that last 7 days
                </p>
              </div>
            </div>
            <div className="flex-1 border border-gray200 rounded-2xl p-4">
              <div dangerouslySetInnerHTML={{ __html: IconRaisingRevenues }} />
              <div className="flex flex-row items-end gap-2 mt-2">
                <h1 className="text-title text-4xl font-work font-bold">24k</h1>
                <div dangerouslySetInnerHTML={{ __html: IconIncreasingData }} />
              </div>
              <div className="my-2">
                <h3 className="text-black text-sm font-work font-semibold">
                  Revenues
                </h3>
                <p className="text-gray100 text-sm font-work font-normal">
                  1.5k Increased than last 7 days
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          <h1 className="text-black text-2xl font-semibold font-work mb-1">
            Transactions
          </h1>
          <p className="text-sm text-gray70 mb-4">
            Overall details of transactions
          </p>
          <div
            className={`border border-90 px-4 mb-6 py-4 rounded-xl flex flex-row items-center gap-2`}
          >
            <SearchOutlined color="#24272B" />
            <input
              type="text"
              name=""
              id=""
              className=" focus:outline-none w-full"
              placeholder="Search transactions..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div>
            <table className="table-auto w-full">
              <thead className="bg-gray90 rounded-xl">
                <tr className="h-12">
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    User
                  </th>
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    Date
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Name
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Email
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Purchased Product
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Amount
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.data?.data?.map((item, index) => (
                  <tr
                    className="border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer"
                    key={index}
                  >
                    <td>
                      <div className="py-2">
                        <img
                          src={
                            item?.buyer?.avatar ||
                            `https://i.pravatar.cc/150?img=${index}`
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                    </td>

                    <td className="pl-4 flex flex-row items-center gap-2 py-4">
                      <h1
                        className={`text-title text-sm font-work font-normal`}
                      >
                        {formattedDate(item?.created_at) || "N/A"}
                      </h1>
                    </td>
                    <td>
                      <h1
                        className={`text-title text-sm font-work font-normal`}
                      >
                        {item?.buyer?.name || "N/A"}
                      </h1>
                    </td>
                    <td>
                      <h1
                        className={`text-title text-sm font-work font-normal`}
                      >
                        {item?.buyer?.email || "N/A"}
                      </h1>
                    </td>

                    <td>{item?.product?.title || "N/A"}</td>
                    <td>
                      $
                      {Number(
                        item?.amount +
                          item?.buyer_protection_fee +
                          item?.platform_fee
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className={`${
                          item?.status === "Canceled"
                            ? "bg-[#F3F0F0]"
                            : item?.status === "Approved"
                            ? "bg-[#E0F7F1]"
                            : item?.status === "Pending"
                            ? "bg-[#FFF9DB]"
                            : item?.status === "On Process"
                            ? "bg-[#DCEEFF]"
                            : item?.status === "Received"
                            ? "bg-[#F1E6FF]"
                            : item?.status === "Completed"
                            ? "bg-[#DFF8E1]"
                            : item?.status === "Failed"
                            ? "bg-[#FFE9E9]"
                            : ""
                        } px-2 py-1 rounded-xl`}
                      >
                        {item?.status || "N/A"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`mt-8 flex-row flex items-center justify-between`}>
              <div>
                <h1 className={`text-black text-sm font-nunito font-bold`}>
                  page {transactions?.data?.current_page} of{" "}
                  {Math.floor(transactions?.data?.total / 10) + 1}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-3">
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    1 === transactions?.data?.current_page
                      ? "opacity-50 cursor-not-allowed "
                      : ""
                  }`}
                  disabled={
                    1 === transactions?.data?.current_page ? true : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(transactions?.data?.current_page - 1);
                  }}
                >
                  Previous
                </button>
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    Math.floor(transactions?.data?.total_product / 2) + 1 ===
                      transactions?.data?.current_page ||
                    transactions?.data?.total_product <= 10
                      ? "opacity-50 cursor-not-allowed "
                      : ""
                  }`}
                  disabled={
                    Math.floor(transactions?.data?.total_product / 2) + 1 ===
                      transactions?.data?.current_page ||
                    transactions?.data?.total_product <= 10
                      ? true
                      : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(transactions?.data?.current_page + 1);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
