import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStudentStats } from "@/lib/queries";

export default function ActivityChart() {
  const { data: stats } = useStudentStats();

  const { weeklyActivity } = stats?.data || {};
  return (
    <div className="lg:col-span-2 bg-[#EAEDFA] border border-white rounded-[24px] p-8">
      <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivity || []}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#0a0e29", fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => [`${value ?? 0} min`, "Study Time"]}
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="minutes"
              fill="#2839A4"
              radius={[6, 6, 6, 6]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
