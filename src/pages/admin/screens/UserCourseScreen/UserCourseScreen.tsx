import { useState, useMemo } from "react";
import { Card, Table, Input, Pagination } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";

import type { User } from "src/types/auth.type";

import CourseProgressModal from "src/pages/admin/components/userCourse/CourseProgressModal";
import UserCourseDetailModal from "src/pages/admin/components/userCourse/UserCourseDetailModal";

import { useGetUsers } from "src/pages/admin/hooks/user/useUser.hooks";
import {
  useGetCoursesByUser,
  useGetLectureProgress,
} from "src/pages/admin/hooks/userCourse/useUserCourse.hooks";

/* ======================================================================
    MAIN ADMIN SCREEN — USER COURSE MANAGEMENT
====================================================================== */
export default function UserCourseScreen() {
  /* ----------------------- PAGINATION ----------------------- */
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data } = useGetUsers(page, limit);

  /* ============================================================
      Convert API trả về UserFormData → User chuẩn
      (vì UserFormData.avatar là File | string)
  ============================================================ */
  const users: User[] = (data?.users ?? []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: typeof u.avatar === "string" ? u.avatar : undefined,
    phone: u.phone ? Number(u.phone) : undefined,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));

  const total = data?.total ?? 0;

  /* ----------------------- STATE ----------------------- */
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  /* Lấy danh sách tất cả khóa người dùng đã mua */
  const { data: userCourses = [] } = useGetCoursesByUser(
    selectedUser?.id ?? ""
  );

  /* Lấy lecture progress khi chọn 1 khóa */
  const { data: lectureProgress = [] } = useGetLectureProgress(
    selectedUser?.id ?? "",
    selectedCourseId ?? ""
  );

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  /* ----------------------- SEARCH FILTER ----------------------- */
  const filteredUsers = useMemo(() => {
    const lower = search?.toLowerCase();

    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lower) ||
        u.email?.toLowerCase().includes(lower)
    );
  }, [users, search]);

  /* ----------------------- TABLE COLUMNS ----------------------- */
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 80,
      render: (v: string | undefined) => (
        <img
          src={v || "/default-avatar.png"}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      width: 120,
      render: (record: User) => (
        <EyeOutlined
          style={{ fontSize: 20, cursor: "pointer" }}
          onClick={() => {
            setSelectedUser(record);
            setCourseModalOpen(true);
          }}
        />
      ),
    },
  ];

  /* ======================================================================
      RENDER
  ====================================================================== */
  return (
    <div>
      <h2>User Course Progress</h2>

      {/* SEARCH */}
      <div className="flex justify-end mb-3">
        <Input
          placeholder="Search user..."
          prefix={<SearchOutlined />}
          style={{ width: 260 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <Table<User>
          dataSource={filteredUsers}
          columns={columns}
          rowKey={(u) => u.id}
          pagination={false}
        />

        {/* PAGINATION */}
        <div className="flex justify-center mt-4">
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={(p) => setPage(p)}
          />
        </div>
      </Card>

      {/* MODAL: USER → LIST COURSES */}
      {courseModalOpen && selectedUser && (
        <UserCourseDetailModal
          open={courseModalOpen}
          onClose={() => setCourseModalOpen(false)}
          courses={userCourses}
          userId={selectedUser.id}
          onSelectCourse={(courseId) => {
            setSelectedCourseId(courseId);
            setProgressModalOpen(true);
          }}
        />
      )}

      {/* MODAL: COURSE → LECTURE PROGRESS */}
      {progressModalOpen && selectedCourseId && (
        <CourseProgressModal
          open={progressModalOpen}
          onClose={() => setProgressModalOpen(false)}
          progress={lectureProgress}
        />
      )}
    </div>
  );
}
