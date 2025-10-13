import { Card, Row, Col, Typography, Space, List, Tag, Statistic } from "antd";
import {
  UserOutlined,
  BookOutlined,
  RiseOutlined,
  TrophyOutlined,
  StarFilled,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function DashboardScreen() {
  const stats = [
    {
      title: "Total Users",
      value: 2543,
      change: "+12%",
      icon: <UserOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      color: "#e6f7ff",
    },
    {
      title: "Active Courses",
      value: 48,
      change: "+8%",
      icon: <BookOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      color: "#f6ffed",
    },
    {
      title: "Total Revenue",
      value: 42890,
      prefix: "$",
      change: "+23%",
      icon: <RiseOutlined style={{ fontSize: 24, color: "#fa8c16" }} />,
      color: "#fff7e6",
    },
    {
      title: "Certifications",
      value: 1289,
      change: "+15%",
      icon: <TrophyOutlined style={{ fontSize: 24, color: "#eb2f96" }} />,
      color: "#fff0f6",
    },
  ];

  const activities = [
    { action: "New user registered", user: "John Doe", time: "2 minutes ago" },
    { action: "Course completed", user: "Jane Smith", time: "15 minutes ago" },
    { action: "New enrollment", user: "Mike Johnson", time: "1 hour ago" },
    { action: "Payment received", user: "Sarah Williams", time: "2 hours ago" },
  ];

  const topCourses = [
    { title: "Advanced React Development", students: 245, rating: 4.8 },
    { title: "Data Science with Python", students: 312, rating: 4.9 },
    { title: "Mobile App Development", students: 201, rating: 4.7 },
    { title: "UI/UX Design Fundamentals", students: 189, rating: 4.6 },
  ];

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 24 }}
    >
      <Space direction="vertical" size="small">
        <Title level={2} style={{ margin: 0 }}>
          Dashboard Overview
        </Title>
        <Paragraph style={{ margin: 0, color: "#8c8c8c" }}>
          Welcome back! Here's what's happening today.
        </Paragraph>
      </Space>

      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Space
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Space>
                  <Tag color="success">{stat.change}</Tag>
                </Space>
                <Space direction="vertical" size={0}>
                  <Text type="secondary">{stat.title}</Text>
                  <Statistic value={stat.value} prefix={stat.prefix} />
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity">
            <List
              dataSource={activities}
              renderItem={(activity) => (
                <List.Item>
                  <Space direction="vertical" size={0} style={{ flex: 1 }}>
                    <Text strong>{activity.action}</Text>
                    <Text type="secondary">{activity.user}</Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {activity.time}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Top Courses">
            <List
              dataSource={topCourses}
              renderItem={(course) => (
                <List.Item>
                  <Space direction="vertical" size={0} style={{ flex: 1 }}>
                    <Text strong>{course.title}</Text>
                    <Text type="secondary">
                      {course.students} students enrolled
                    </Text>
                  </Space>
                  <Space>
                    <StarFilled style={{ color: "#fadb14" }} />
                    <Text strong>{course.rating}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
