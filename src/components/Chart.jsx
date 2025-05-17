import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetStaticsQuery } from "../redux/api/ApiSlice";

const Chart = ({ activeStatics, data }) => {
  // rtk query hooks
  const { data: statics } = useGetStaticsQuery({ filter: activeStatics });
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={statics?.data || data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={
              activeStatics === "active_user" ? "Active Users" : "Total Revenue"
            }
            stroke="#064145"
            fill="#06414599"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
