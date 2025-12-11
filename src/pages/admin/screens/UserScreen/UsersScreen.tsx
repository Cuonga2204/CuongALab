import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Avatar,
  Input,
  Select,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

import UserModal from "src/pages/admin/components/user/UserModal";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "src/pages/admin/hooks/user/useUser.hooks";
import type { UserFormData } from "src/pages/admin/types/user.types";
import { Loader } from "src/components/commons/Loader/Loader";

const { Title, Paragraph } = Typography;

export default function UsersScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageUrl = Number(searchParams.get("page") || 1);

  const [page, setPage] = useState(pageUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "role">("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);

  const { data: usersRes, isLoading } = useGetUsers(page, 10);
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  // Sync URL
  useEffect(() => {
    if (page > 1) {
      setSearchParams({ page: page.toString(), limit: "10" });
    } else {
      setSearchParams({});
    }
  }, [page]);

  const users = usersRes?.users ?? [];

  const filteredUsers = users
    .filter((user: UserFormData) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[sortBy]?.toString().localeCompare(b[sortBy]));

  const openModal = (
    user: UserFormData | null,
    mode: "view" | "edit" | "create"
  ) => {
    setSelectedUser(user);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleSubmit = (data: UserFormData) => {
    if (modalMode === "edit" && selectedUser) {
      updateUserMutation.mutate({ id: selectedUser.id, data });
    }
    setModalOpen(false);
  };

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: UserFormData) => (
        <Space>
          <Avatar src={String(record.avatar)} />
          <Typography.Text strong>{record.name}</Typography.Text>
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: UserFormData) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => openModal(record, "view")}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openModal(record, "edit")}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              Modal.confirm({
                title: "Delete User",
                onOk: () => deleteUserMutation.mutate(record.id),
              })
            }
          />
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
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Space direction="vertical" size={0}>
          <Title level={2}>Users Management</Title>
          <Paragraph style={{ color: "#999" }}>Manage user accounts</Paragraph>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal(null, "create")}
        >
          Add New User
        </Button>
      </Space>

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
          onChange={(v) => setSortBy(v)}
          options={[
            { value: "name", label: "Sort by Name" },
            { value: "email", label: "Sort by Email" },
            { value: "role", label: "Sort by Role" },
          ]}
          style={{ width: 200 }}
        />
      </Space>

      <Card>
        {isLoading ||
        deleteUserMutation.isPending ||
        updateUserMutation.isPending ? (
          <Loader />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: page,
              total: usersRes?.total ?? 0,
              pageSize: 10,
              onChange: (p) => setPage(p),
            }}
          />
        )}
      </Card>

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
