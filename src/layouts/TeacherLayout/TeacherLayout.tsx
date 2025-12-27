import { useState } from "react";
import { Layout, Menu, Input, Select, Space, Typography, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { TEACHER_MENU_ITEMS } from "src/layouts/TeacherLayout/constants/menu-item.constants";
import { useLogout } from "src/pages/other/auth/hooks/useLogout.hook";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface TeacherLayoutProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: { value: string; label: string }[];
}

export default function TeacherLayout({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
}: TeacherLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

  const currentPage = location.pathname.split("/")[2] || "dashboard";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ================= SIDEBAR ================= */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column", // ⭐ QUAN TRỌNG
        }}
      >
        {/* ===== LOGO + COLLAPSE ===== */}
        <Space
          direction="vertical"
          align="center"
          style={{
            width: "100%",
            padding: collapsed ? "16px 8px" : "24px 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {!collapsed && (
            <Title
              level={4}
              style={{
                margin: 0,
                background: "linear-gradient(135deg, #1890ff 0%, #13c2c2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Teacher
            </Title>
          )}

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: collapsed ? "auto" : "100%" }}
          />
        </Space>

        {/* ===== MENU (chiếm hết chiều cao còn lại) ===== */}
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          items={TEACHER_MENU_ITEMS}
          onClick={({ key }) =>
            navigate(`/teacher/${key === "dashboard" ? "" : key}`)
          }
          style={{
            borderRight: 0,
            marginTop: 8,
            flex: 1, // ⭐ đẩy logout xuống đáy
          }}
        />

        {/* ===== LOGOUT (DƯỚI CÙNG SIDEBAR) ===== */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button
            danger
            type="text"
            icon={<LogoutOutlined />}
            block={!collapsed}
            style={{
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onClick={logout}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </Sider>

      {/* ================= MAIN CONTENT ================= */}
      <Layout>
        {(searchTerm !== undefined || sortBy !== undefined) && (
          <Header
            style={{
              padding: "16px 24px",
              background: "#fff",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            {onSearchChange && (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ maxWidth: 400, flex: 1 }}
                size="large"
              />
            )}

            {onSortChange && sortOptions && (
              <Space>
                <SortAscendingOutlined style={{ color: "#8c8c8c" }} />
                <Select
                  value={sortBy}
                  onChange={onSortChange}
                  options={sortOptions}
                  style={{ minWidth: 200 }}
                  size="large"
                />
              </Space>
            )}
          </Header>
        )}

        <Content
          style={{
            margin: 0,
            padding: "24px",
            background: "#f5f5f5",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
