import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  DatePicker,
  Select,
  Space,
  Spin,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import type { RevenueStats } from "src/pages/admin/types/dashboard.types";
import { useDashboardStats } from "src/pages/admin/hooks/dashboard/useDashboardStats.hook";
import DashboardChart from "src/pages/admin/components/dashboard/DashboardChart";
import DashboardColumnChart from "src/pages/admin/components/dashboard/DashboardColumnChart";

const { Title, Text } = Typography;

export default function DashboardScreen() {
  const [filterType, setFilterType] = useState<"month" | "range">("month");
  const [month, setMonth] = useState(dayjs());
  const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  const from =
    filterType === "month"
      ? month.startOf("month").format("YYYY-MM-DD")
      : range
      ? range[0].format("YYYY-MM-DD")
      : undefined;

  const to =
    filterType === "month"
      ? month.endOf("month").format("YYYY-MM-DD")
      : range
      ? range[1].format("YYYY-MM-DD")
      : undefined;

  const { data, isLoading } = useDashboardStats(from, to);

  const stats: RevenueStats | undefined = data;
  console.log(`stats`, stats);
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* TITLE */}
      <Title level={2} style={{ margin: 0 }}>
        Dashboard Overview
      </Title>

      {/* FILTER BAR */}
      <Card>
        <Space size="large" wrap>
          <Select
            value={filterType}
            onChange={(v) => setFilterType(v)}
            style={{ width: 180 }}
            options={[
              { value: "month", label: "Filter by Month" },
              { value: "range", label: "Filter by Date Range" },
            ]}
          />

          {filterType === "month" ? (
            <DatePicker
              picker="month"
              value={month}
              onChange={(v) => v && setMonth(v)}
            />
          ) : (
            <DatePicker.RangePicker
              value={range}
              onChange={(v) => setRange(v)}
            />
          )}
        </Space>
      </Card>

      {/* LOADING */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      )}

      {/* STAT CARDS */}
      {!isLoading && stats && (
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Space direction="vertical">
                <Text>Total Revenue</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.revenue.toLocaleString()}₫
                </Title>
                <DollarOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space direction="vertical">
                <Text>Courses Sold</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.courseSold}
                </Title>
                <ShoppingCartOutlined
                  style={{ fontSize: 32, color: "#1890ff" }}
                />
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space direction="vertical">
                <Text>Order </Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.totalTransactions}
                </Title>
                <CheckCircleOutlined
                  style={{ fontSize: 32, color: "#52c41a" }}
                />
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space direction="vertical">
                <Text>New Users</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.newUsers}
                </Title>
                <UserAddOutlined style={{ fontSize: 32, color: "#fa8c16" }} />
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Revenue Chart (Monthly)">
        <DashboardChart from={from} to={to} />
      </Card>

      {stats?.courseRevenue && (
        <DashboardColumnChart data={stats.courseRevenue} />
      )}
    </Space>
  );
}
