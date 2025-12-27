import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  MoneyCollectOutlined,
  PercentageOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
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
    key: "categories",
    icon: <AppstoreOutlined />,
    label: "Categories",
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
  {
    key: "quiz-bank",
    icon: <DatabaseOutlined />,
    label: "Quiz Bank",
  },
  {
    key: "user-courses",
    icon: <ShoppingOutlined />,
    label: "User Course Management",
  },
];
