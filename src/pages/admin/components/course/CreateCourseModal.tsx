import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  TreeSelect,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUploader from "src/pages/admin/components/common/ImageUploader/ImageUploader";

import {
  CourseCreateFormDataSchema,
  type CourseCreateFormData,
} from "src/pages/admin/types/course.types";

import type { User } from "src/types/user.type";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

import { useCreateCourse } from "src/pages/admin/hooks/course/useCourse.hooks";
import { useGetTeachers } from "src/pages/admin/hooks/user/useUser.hooks";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

import { ROLE_USER } from "src/constants/auth.constants";
import { useAuthStore } from "src/store/authStore";

import { mapCategoryTreeToSelect } from "src/pages/admin/utils/mapCategoryTree";

const { Text } = Typography;

interface CreateCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCourseModal({
  open,
  onClose,
}: CreateCourseModalProps) {
  /* ================= FORM ================= */
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CourseCreateFormData>({
    resolver: zodResolver(CourseCreateFormDataSchema),
  });

  /* ================= AUTH ================= */
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;

  /* ================= DATA ================= */
  const createCourseMutation = useCreateCourse();
  const { data: teachers = [], isLoading: loadingTeachers } = useGetTeachers();

  const { data: categoryTree = [] } = useGetCategoryTree();

  /* ================= ROOT CATEGORY ================= */
  const [rootCategoryId, setRootCategoryId] = useState<string>("");

  const selectedRoot: CategoryTreeItem | undefined = categoryTree.find(
    (c) => c.id === rootCategoryId
  );

  /* ================= INIT ================= */
  useEffect(() => {
    if (!open) return;

    reset({
      title: "",
      avatar: undefined,
      teacher_id: isTeacher ? user!.id : "",
      category_id: "",
      overview: "",
      description: "",
    });

    setRootCategoryId("");
  }, [open, reset, isTeacher, user]);

  const handleClose = () => {
    reset();
    setRootCategoryId("");
    onClose();
  };

  /* ================= SUBMIT ================= */
  const onSubmit = (data: CourseCreateFormData) => {
    createCourseMutation.mutate(data, {
      onSuccess: handleClose,
    });
  };

  /* ================= RENDER ================= */
  return (
    <Modal
      title="Add New Course"
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit(onSubmit)}
      okText="Create Course"
      width={950}
      centered
      okButtonProps={{ disabled: !isValid }}
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        {/* ===== AVATAR ===== */}
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <ImageUploader value={field.value} onChange={field.onChange} />
          )}
        />

        {/* ===== TITLE + TEACHER ===== */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              validateStatus={errors.title ? "error" : ""}
              help={errors.title?.message}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input {...field} size="large" />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Teacher"
              validateStatus={errors.teacher_id ? "error" : ""}
              help={errors.teacher_id?.message}
            >
              <Controller
                name="teacher_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    disabled={isTeacher}
                    loading={loadingTeachers}
                    options={
                      isTeacher
                        ? [{ label: user?.name, value: user?.id }]
                        : teachers.map((t: User) => ({
                            label: t.name,
                            value: t.id,
                          }))
                    }
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* ===== ROOT CATEGORY ID ===== */}
        <Form.Item label="Root Category ID">
          <Input
            placeholder="Enter Level 1 category ID"
            value={rootCategoryId}
            onChange={(e) => {
              setRootCategoryId(e.target.value.trim());
              setValue("category_id", "");
            }}
          />
        </Form.Item>

        {rootCategoryId && !selectedRoot && (
          <Text type="danger">Root category not found</Text>
        )}

        {/* ===== SUB CATEGORY TREE ===== */}
        {selectedRoot && (
          <Form.Item
            label="Category"
            validateStatus={errors.category_id ? "error" : ""}
            help={errors.category_id?.message}
          >
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <TreeSelect
                  {...field}
                  treeData={mapCategoryTreeToSelect([selectedRoot])}
                  placeholder="Select sub category"
                  treeDefaultExpandAll
                  showSearch
                  treeLine
                  allowClear
                  style={{ width: "100%" }}
                />
              )}
            />
          </Form.Item>
        )}

        {/* ===== OVERVIEW + DESCRIPTION ===== */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Overview"
              validateStatus={errors.overview ? "error" : ""}
              help={errors.overview?.message}
            >
              <Controller
                name="overview"
                control={control}
                render={({ field }) => <Input.TextArea {...field} rows={3} />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Description"
              validateStatus={errors.description ? "error" : ""}
              help={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Input.TextArea {...field} rows={3} />}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
