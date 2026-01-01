import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col } from "antd";
import type { CourseReviewItem } from "src/pages/admin/types/reviewForm.types";

interface Props {
  reviews: CourseReviewItem[];
}

export default function CourseReviewCharts({ reviews }: Props) {
  const ratingData = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: reviews.filter((x) => x.rating === r).length,
  }));

  const satisfactionData = [
    {
      name: "Satisfied",
      value: reviews.filter((x) => x.satisfaction).length,
    },
    {
      name: "Not satisfied",
      value: reviews.filter((x) => !x.satisfaction).length,
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Rating distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Satisfaction">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={satisfactionData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                <Cell fill="#52c41a" />
                <Cell fill="#ff4d4f" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
}
