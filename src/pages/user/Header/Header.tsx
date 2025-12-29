import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Flex, Input, Menu, Space } from "antd";
import { IMAGES } from "src/assets/images";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useGetUserCart } from "src/pages/user/Cart/hooks/useCart.hooks";
import { useAuthStore } from "src/store/authStore";
import { useLogout } from "src/pages/other/auth/hooks/useLogout.hook";
import { MyCoursesPathsEnum } from "src/pages/user/MyCourses/constants/user-courses.paths";
import { useState } from "react";

export default function UserHeader() {
  const { user } = useAuthStore();
  const { data } = useGetUserCart(user?.id || "");
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    navigate(`/courses?q=${encodeURIComponent(value)}`);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "profile") navigate("/profile");
    if (key === "logout") {
      logout();
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "profile",
          label: "Profile",
        },
        {
          key: "logout",
          label: "Logout",
          danger: true,
        },
      ]}
    />
  );
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
        style={{ flex: 1, paddingLeft: 20, paddingRight: 20, maxWidth: 1000 }}
      >
        <Input.Search
          placeholder="Search for anything"
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
          allowClear
          onClear={() => {
            setKeyword("");
            navigate("/courses"); // ⭐ FIX: xoá param q
          }}
          style={{ width: 350, height: 35, borderRadius: 6 }}
        />

        <Space size={40} style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "Home", path: "/" },
            { label: "Courses", path: "/courses" },
            { label: "My Favorite", path: "/favorite-course" },
            { label: "My Courses", path: MyCoursesPathsEnum.MY_COURSES },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#00ADEF" : "#fff",
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
          <Badge count={data?.totalQuantity} showZero>
            <ShoppingCartOutlined
              style={{ fontSize: 20, color: "white", cursor: "pointer" }}
            />
          </Badge>
        </Link>

        <BellOutlined style={{ fontSize: 20, color: "white" }} />
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <UserOutlined
            style={{ fontSize: 20, color: "white", cursor: "pointer" }}
          />
        </Dropdown>
      </div>
    </div>
  );
}
