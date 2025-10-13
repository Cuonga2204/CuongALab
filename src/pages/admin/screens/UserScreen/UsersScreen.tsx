import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Avatar,
  Tooltip,
  Input,
  Select,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { User } from "src/pages/admin/types/user.types";
import { mockUsers } from "src/pages/admin/data/mockData";
import UserModal from "src/pages/admin/components/user/UserModal";

const { Title, Paragraph } = Typography;

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const sortOptions = [
    { value: "name", label: "Sort by Name" },
    { value: "email", label: "Sort by Email" },
    { value: "role", label: "Sort by Role" },
    { value: "status", label: "Sort by Status" },
  ];

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof User].toString();
      const bValue = b[sortBy as keyof User].toString();
      return aValue.localeCompare(bValue);
    });

  const handleView = (user: User) => {
    setSelectedUser(user);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${user.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: () => {
        setUsers(users.filter((u) => u.id !== user.id));
      },
    });
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (modalMode === "create") {
      const newUser: User = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    } else if (modalMode === "edit" && selectedUser) {
      setUsers(
        users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
      );
    }
    setModalOpen(false);
  };

  const columns: ColumnsType<User> = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space>
          <Avatar
            style={{
              background: "linear-gradient(135deg, #1890ff 0%, #13c2c2 100%)",
            }}
          >
            <UserOutlined />
          </Avatar>
          <Typography.Text strong>{name}</Typography.Text>
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "success" : "default"}>{status}</Tag>
      ),
    },
    { title: "Created", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_: any, record: User) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 24 }}
    >
      {/* Header */}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space direction="vertical" size={0}>
          <Title level={2} style={{ margin: 0 }}>
            Users Management
          </Title>
          <Paragraph style={{ margin: 0, color: "#8c8c8c" }}>
            Manage and monitor all user accounts
          </Paragraph>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          size="large"
        >
          Add New User
        </Button>
      </Space>

      {/* Search + Sort */}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: 200 }}
          options={sortOptions}
        />
      </Space>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal */}
      <UserModal
        open={modalOpen}
        mode={modalMode}
        user={selectedUser}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Space>
  );
}
