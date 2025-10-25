import { Modal, Form, Input, Select, InputNumber, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import type { Course } from "src/types/course.type";
import { COURSE_CATEGORIES_OPTIONS } from "src/constants/course.constants";
import ImageUploader from "src/pages/admin/components/common/ImageUploader/ImageUploader";
import {
  CourseFormDataSchema,
  type CourseFormData,
} from "src/pages/admin/types/course.types";
import {
  useCreateCourse,
  useGetAllCourses,
} from "src/pages/admin/hooks/course/useCourse.hooks";

interface CourseModalProps {
  open: boolean;
  mode: "view" | "edit" | "create";
  course: Course | undefined;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void;
}

export default function CourseModal({
  open,
  mode,
  course,
  onClose,
}: CourseModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseFormDataSchema),
  });

  const { refetch } = useGetAllCourses();

  const isViewMode = mode === "view";
  const modalTitle =
    mode === "view"
      ? "Course Details"
      : mode === "edit"
      ? "Edit Course"
      : "Add New Course";

  useEffect(() => {
    if (open && course) {
      reset(course);
    } else if (open && !course) {
      reset({
        title: "",
        avatar: undefined,
        price_current: 0,
        name_teacher: "",
        overview: "",
        description: "",
        category: COURSE_CATEGORIES_OPTIONS[0].value,
      });
    }
  }, [open, course, reset]);

  const handleClose = () => {
    reset();
    refetch();
    onClose();
  };
  const createCourseMutation = useCreateCourse();

  const onFormSubmit = (data: CourseFormData) => {
    createCourseMutation.mutate(data);
    handleClose();
  };

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={handleClose}
      okText={isViewMode ? undefined : mode === "edit" ? "update" : "create"}
      cancelText={isViewMode ? "Close" : "Cancel"}
      onOk={handleSubmit(onFormSubmit)}
      width={900}
      centered
      okButtonProps={{
        style: isViewMode ? { display: "none" } : {},
        disabled: !isValid,
      }}
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
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

        {/* === Row 1: Title + Teacher === */}
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
                  <Input {...field} disabled={isViewMode} size="large" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Teacher Name"
              validateStatus={errors.name_teacher ? "error" : ""}
              help={errors.name_teacher?.message}
            >
              <Controller
                name="name_teacher"
                control={control}
                render={({ field }) => (
                  <Input {...field} disabled={isViewMode} size="large" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* === Row 2: Category + Price === */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Category"
              validateStatus={errors.category ? "error" : ""}
              help={errors.category?.message}
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    disabled={isViewMode}
                    size="large"
                    placeholder="Select a category"
                    options={COURSE_CATEGORIES_OPTIONS}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Current Price"
              validateStatus={errors.price_current ? "error" : ""}
              help={errors.price_current?.message}
            >
              <Controller
                name="price_current"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    disabled={isViewMode}
                    size="large"
                    min={0}
                    style={{ width: "100%" }}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* === Row 3: Overview + Description === */}
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
                  <Input.TextArea
                    {...field}
                    rows={3}
                    disabled={isViewMode}
                    size="large"
                  />
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
                  <Input.TextArea
                    {...field}
                    rows={3}
                    disabled={isViewMode}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
