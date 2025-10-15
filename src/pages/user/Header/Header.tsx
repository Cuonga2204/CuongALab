import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Flex, Input, Space } from "antd";
import { IMAGES } from "src/assets/images";
import { NavLink, Link } from "react-router-dom";

export default function UserHeader() {
  return (
    <div
      style={{
        backgroundColor: "#0a033c",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 24px",
        position: "fixed",
        width: "100%",
        zIndex: 100,
      }}
    >
      {/* ===== Logo ===== */}
      <Link
        to="/"
        style={{ width: 160, display: "flex", alignItems: "center" }}
      >
        <img
          src={IMAGES.logo}
          alt="Logo"
          style={{ height: 60, marginRight: 8, cursor: "pointer" }}
        />
      </Link>

      {/* ===== Search + Nav ===== */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          maxWidth: 1000,
        }}
      >
        {/* --- Search box --- */}
        <Input
          placeholder="Search for anything"
          prefix={<SearchOutlined />}
          style={{
            width: 350,
            height: 35,
            borderRadius: 6,
          }}
        />

        {/* --- Navigation Links --- */}
        <Space
          size={40}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {[
            { label: "Home", path: "/" },
            { label: "Courses", path: "/courses" },
            { label: "My Favorite", path: "/favorites" },
            { label: "My Courses", path: "/my-courses" },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#00ADEF" : "#fff",
                fontWeight: 400, // fix text bold issue
                textDecoration: "none",
                transition: "color 0.3s ease",
              })}
              className="hover:text-[#00ADEF]"
            >
              {label}
            </NavLink>
          ))}
        </Space>
      </Flex>

      {/* ===== Icons ===== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          width: 160,
          justifyContent: "flex-end",
        }}
      >
        <Link to="/cart">
          <Badge count={0} showZero>
            <ShoppingCartOutlined
              style={{ fontSize: 20, color: "white", cursor: "pointer" }}
            />
          </Badge>
        </Link>

        <BellOutlined
          style={{ fontSize: 20, color: "white", cursor: "pointer" }}
        />
        <UserOutlined
          style={{ fontSize: 20, color: "white", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
