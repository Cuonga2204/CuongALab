import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  MoneyCollectOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

export const ADMIN_MENU_ITEMS = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "users",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "courses",
    icon: <BookOutlined />,
    label: "Courses",
  },
  {
    key: "payments",
    icon: <MoneyCollectOutlined />,
    label: "Payments",
  },
  {
    key: "course-pricing",
    icon: <PercentageOutlined />,
    label: "Course Pricing",
  },
];
