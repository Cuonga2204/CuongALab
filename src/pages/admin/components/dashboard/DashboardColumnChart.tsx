import { Bar } from "react-chartjs-2";
import { Card } from "antd";

interface Props {
  data: { courseTitle: string; revenue: number }[];
}

export default function DashboardColumnChart({ data }: Props) {
  const labels = data.map((item) => item.courseTitle);
  const values = data.map((item) => item.revenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue per Course (₫)",
        data: values,
        backgroundColor: "rgba(24, 144, 255, 0.6)",
        borderColor: "rgba(24, 144, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value.toLocaleString() + "₫",
        },
      },
    },
  };

  return (
    <Card title="Revenue per Course">
      <Bar data={chartData} options={options} />
    </Card>
  );
}
