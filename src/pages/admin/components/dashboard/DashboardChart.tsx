import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getDashboardOverview } from "src/pages/admin/api/dashboard.api";

interface Props {
  from?: string;
  to?: string;
}

interface ChartPoint {
  date: string;
  revenue: number;
}

export default function DashboardChart({ from, to }: Props) {
  const [data, setData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    (async () => {
      const stats = await getDashboardOverview(from, to);
      // Tạo dữ liệu giả theo ngày (BE có thể trả dữ liệu thật sau)
      const chart: ChartPoint[] = [
        { date: "Day 1", revenue: stats.revenue * 0.2 },
        { date: "Day 10", revenue: stats.revenue * 0.5 },
        { date: "Day 20", revenue: stats.revenue * 0.8 },
        { date: "Day 30", revenue: stats.revenue },
      ];
      setData(chart);
    })();
  }, [from, to]);

  return (
    <LineChart width={900} height={350} data={data}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#1890ff"
        strokeWidth={3}
      />
    </LineChart>
  );
}
