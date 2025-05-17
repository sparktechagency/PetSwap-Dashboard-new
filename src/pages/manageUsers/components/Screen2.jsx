import React, { useEffect, useState } from "react";
import {
  IconLeftArrow,
  IconProduct,
  IconSells,
} from "../../../assets/icons/Icons";
import { useGlobalContext } from "../../../utils/contextApi/GlobalContext";
import user from "../../../assets/images/user.png";
import {
  useGetUserInfoQuery,
  useGetUserProductStaticsQuery,
} from "../../../redux/api/ApiSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select } from "antd";

function Screen2({ userId }) {
  const { setActiveScreen } = useGlobalContext();

  // states
  const [activePage, setActivePage] = useState(1);
  const [filteredStatics, setFilteredStatics] = useState("weekly");

  // handlers
  const handleChange = (value) => {
    setFilteredStatics(value);
  };

  // rtk query hooks
  const { data: userInfo } = useGetUserInfoQuery({
    id: userId,
    page: activePage,
  });
  const { data: productsStatics } = useGetUserProductStaticsQuery({
    id: userId,
    filter: filteredStatics,
  });

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => setActiveScreen(0)}
          >
            <div dangerouslySetInnerHTML={{ __html: IconLeftArrow }} />
            <h1 className="text-black text-2xl font-semibold font-work">
              Manage Users
            </h1>
          </div>
          <p className="text-gray-500 text-sm font-work mt-1 font-normal w-full">
            Admin with access to this workspace can promote or demote users to
            maintain business insights.
          </p>
        </div>
      </div>

      <div className="mt-12">
        {/* Product Details */}
        <div className="flex flex-row items-center w-full gap-4 mt-6">
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="flex flex-col items-center mb-4 w-full">
              <img
                src={userInfo?.data?.user?.avatar || user}
                alt="User Name"
                className="h-20 w-20 rounded-full"
              />
              <h1 className="text-primary text-2xl font-semibold font-work">
                {userInfo?.data?.user?.name || "N/A"}
              </h1>
              <p className="text-title text-sm font-work font-semibold w-full text-center">
                Location: {userInfo?.data?.user?.address || "N/A"}
              </p>
              <p className="text-title text-sm font-work font-normal w-full text-center">
                {userInfo?.data?.user?.email || "N/A"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-1/2 border border-[#E7E7E7] p-2 rounded-lg">
                <div className="flex flex-row items-center">
                  <div
                    className="bg-[#F6F6F6] p-2 rounded"
                    dangerouslySetInnerHTML={{ __html: IconProduct }}
                  />
                </div>
                <h1 className="text-title text-sm font-semibold mt-2">
                  Products
                </h1>
                <h1 className="text-title text-2xl font-work font-semibold">
                  {userInfo?.data?.total_product || 0}
                </h1>
              </div>
              <div className="w-1/2 border border-[#E7E7E7] p-2 rounded-lg">
                <div className="flex flex-row items-center">
                  <div
                    className="bg-[#F6F6F6] p-2 rounded"
                    dangerouslySetInnerHTML={{ __html: IconSells }}
                  />
                </div>
                <h1 className="text-title text-sm font-semibold mt-2">Sells</h1>
                <h1 className="text-title text-2xl font-work font-semibold">
                  $ {userInfo?.data?.total_sell || 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 items-center">
            <div>
              <div>
                <div className="flex flex-row justify-end">
                  <Select
                    className="mb-3"
                    defaultValue="weekly"
                    value={filteredStatics}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
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
                    ]}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={productsStatics?.data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={
                      filteredStatics === "monthly"
                        ? "month"
                        : filteredStatics === "weekly"
                        ? "week_day"
                        : filteredStatics === "yearly"
                        ? "year"
                        : "week_day"
                    }
                  />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Total Revenue"
                    stroke="#064145"
                    fill="#06414599"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Products Listing */}

        <div className="mt-6">
          <h1 className="text-title text-2xl font-work font-semibold">
            Products
          </h1>

          <div className="mt-3">
            <table className="table-auto w-full mt-3">
              <thead className="bg-gray90 rounded-xl">
                <tr className="h-12">
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    Product Name
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Price
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody>
                {userInfo?.data?.products?.data?.map((item, index) => (
                  <tr
                    className="border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer"
                    key={index}
                  >
                    <td className="pl-4 flex flex-row items-center gap-2">
                      <div className="py-2">
                        <img
                          src={
                            item?.images[0] ||
                            `https://i.pravatar.cc/150?img=${index}`
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <h1
                          className={`text-title text-sm font-work font-normal`}
                        >
                          {item?.title || "N/A"}
                        </h1>
                      </div>
                    </td>
                    <td>${item?.price || 0}</td>
                    <td>
                      <div className="flex flex-row items-center justify-centergap-2">
                        <h3>{item?.condition || "N/A"}</h3>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`mt-8 flex-row flex items-center justify-between`}>
              <div>
                <h1 className={`text-black text-sm font-nunito font-bold`}>
                  page {userInfo?.data?.products?.current_page} of{" "}
                  {userInfo?.data?.products?.last_page}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-3">
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    1 === userInfo?.data?.products?.current_page
                      ? "opacity-50 cursor-not-allowed "
                      : ""
                  }`}
                  disabled={
                    1 === userInfo?.data?.products?.current_page ? true : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(userInfo?.data?.products?.current_page - 1);
                  }}
                >
                  Previous
                </button>
                <button
                  className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer ${
                    userInfo?.data?.products?.current_page ===
                    userInfo?.data?.products?.last_page
                      ? "opacity-50 cursor-not-allowed "
                      : ""
                  }`}
                  disabled={
                    userInfo?.data?.products?.current_page ===
                    userInfo?.data?.products?.last_page
                      ? true
                      : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(userInfo?.data?.products?.current_page + 1);
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

export default Screen2;
