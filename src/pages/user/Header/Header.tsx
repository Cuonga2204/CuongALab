import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Input, Space } from "antd";
import { IMAGES } from "../../../assets/images";
import { Link } from "react-router-dom";
export default function UserHeader() {
  return (
    <div className="flex py-1.5 px-10 items-center justify-between bg-[#0a033c] h-17 fixed w-full z-100">
      <Link to="/">
        <img
          src={IMAGES.logo}
          alt="Logo"
          style={{ height: 60, marginRight: 8, cursor: "pointer" }}
        />
      </Link>

      <Input
        placeholder="Search for anything"
        prefix={<SearchOutlined />}
        style={{ width: 350, height: 35 }}
      />

      <Space size={40}>
        <div className="cursor-pointer text-white font-semibold hover:text-[#00ADEF] transition-colors duration-300">
          Home
        </div>
        <Link
          to="/course"
          className="cursor-pointer text-white  font-semibold hover:text-[#00ADEF] transition-colors duration-300"
        >
          Courses
        </Link>
        <div className="cursor-pointer text-white  font-semibold hover:text-[#00ADEF] transition-colors duration-300">
          My favorite
        </div>
        <div className="cursor-pointer text-white  font-semibold hover:text-[#00ADEF] transition-colors duration-300">
          My Courses
        </div>
      </Space>

      <div className="flex gap-8">
        <Badge count={0} showZero>
          <ShoppingCartOutlined
            style={{ fontSize: 20, color: "white", cursor: "pointer" }}
          />
        </Badge>
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
