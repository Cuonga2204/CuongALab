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
import SectionManager from "./Section/SectionManager";

import {
  CourseFormDataSchema,
  type CourseFormData,
} from "src/pages/admin/types/course.types";

import type { Course } from "src/types/course.type";
import type { User } from "src/types/user.type";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

import { useUpdateCourse } from "src/pages/admin/hooks/course/useCourse.hooks";
import { useGetTeachers } from "src/pages/admin/hooks/user/useUser.hooks";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

import { ROLE_USER } from "src/constants/auth.constants";
import { useAuthStore } from "src/store/authStore";
import { mapCategoryTreeToSelect } from "src/pages/admin/utils/mapCategoryTree";
import { findRootCategoryId } from "src/pages/admin/utils/findRootCategory";

const { Text } = Typography;

interface CourseDetailModalProps {
  open: boolean;
  mode: "view" | "edit";
  course?: CourseFormData | Course;
  onClose: () => void;
}

export default function CourseDetailModal({
  open,
  mode,
  course,
  onClose,
}: CourseDetailModalProps) {
  /* =========================================================
     FORM
  ========================================================= */
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseFormDataSchema),
  });

  const isViewMode = mode === "view";
  const modalTitle = isViewMode ? "Course Details" : "Edit Course";

  /* =========================================================
     AUTH
  ========================================================= */
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;

  /* =========================================================
     DATA
  ========================================================= */
  const updateCourseMutation = useUpdateCourse();
  const { data: teachers = [], isLoading: loadingTeachers } = useGetTeachers();
  console.log(teachers);

  const { data: categoryTree = [] } = useGetCategoryTree();

  /* =========================================================
     ROOT CATEGORY STATE
  ========================================================= */
  const [rootCategoryId, setRootCategoryId] = useState<string>("");

  const selectedRoot: CategoryTreeItem | undefined = categoryTree.find(
    (c) => c.id === rootCategoryId
  );

  /* =========================================================
     INIT FORM
  ========================================================= */
  useEffect(() => {
    if (!open || !course || !categoryTree.length) return;

    reset(course);

    const courseCategoryId = (course as Course).category?.id;
    if (!courseCategoryId) return;

    const rootId = findRootCategoryId(categoryTree, courseCategoryId);
    if (!rootId) return;

    // 1️⃣ set root trước
    setRootCategoryId(rootId);

    // 2️⃣ set lại category_id sau khi root tồn tại
    setTimeout(() => {
      setValue("category_id", courseCategoryId, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }, 0);
  }, [open, course, categoryTree, reset, setValue]);

  const handleClose = () => {
    reset();
    setRootCategoryId("");
    onClose();
  };

  const onSubmit = (data: CourseFormData) => {
    if (!course) return;
    updateCourseMutation.mutate({
      id: (course as Course).id,
      data,
    });
    handleClose();
  };

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit(onSubmit)}
      okText={isViewMode ? undefined : "Update Course"}
      cancelText={isViewMode ? "Close" : "Cancel"}
      width={950}
      centered
      okButtonProps={{
        style: isViewMode ? { display: "none" } : {},
      }}
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        {/* ================= AVATAR ================= */}
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value}
              onChange={field.onChange}
              disabled={isViewMode}
            />
          )}
        />

        {/* ================= TITLE + TEACHER ================= */}
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
                render={({ field }) => (
                  <Input {...field} size="large" readOnly={isViewMode} />
                )}
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
                    disabled={isTeacher || isViewMode}
                    loading={loadingTeachers}
                    value={isTeacher ? user?.id : field.value}
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

        {/* ================= ROOT CATEGORY ID ================= */}
        <Form.Item label="Root Category ID">
          <Input
            placeholder="Enter Level 1 category ID (e.g. FE)"
            value={rootCategoryId}
            onChange={(e) => setRootCategoryId(e.target.value.trim())}
            disabled={isViewMode}
          />
        </Form.Item>

        {rootCategoryId && !selectedRoot && (
          <Text type="danger">Root category not found</Text>
        )}

        {/* ================= SUB CATEGORY TREE ================= */}
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
                  disabled={isViewMode}
                  style={{ width: "100%" }}
                />
              )}
            />
          </Form.Item>
        )}

        {/* ================= OVERVIEW + DESCRIPTION ================= */}
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
                render={({ field }) => (
                  <Input.TextArea {...field} rows={3} readOnly={isViewMode} />
                )}
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
                render={({ field }) => (
                  <Input.TextArea {...field} rows={3} readOnly={isViewMode} />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* ================= SECTION MANAGER ================= */}
      {course && (
        <SectionManager
          isViewMode={isViewMode}
          courseId={(course as Course).id}
        />
      )}
    </Modal>
  );
}
