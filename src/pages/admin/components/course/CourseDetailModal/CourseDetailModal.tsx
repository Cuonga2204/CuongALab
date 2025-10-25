import { Modal, Form, Input, Select, InputNumber, Row, Col } from "antd";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { COURSE_CATEGORIES_OPTIONS } from "src/constants/course.constants";
import ImageUploader from "src/pages/admin/components/common/ImageUploader/ImageUploader";
import {
  CourseFormDataSchema,
  type CourseFormData,
} from "src/pages/admin/types/course.types";
import {
  useGetAllCourses,
  useUpdateCourse,
} from "src/pages/admin/hooks/course/useCourse.hooks";
import SectionManager from "./Section/SectionManager";
import type { Course } from "src/types/course.type";

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
  // === react-hook-form ===
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseFormDataSchema),
  });

  const isViewMode = mode === "view";
  const modalTitle = isViewMode ? "Course Details" : "Edit Course";

  const updateCourseMutation = useUpdateCourse();
  const { refetch } = useGetAllCourses();

  useEffect(() => {
    if (open && course) {
      reset(course);
    }
  }, [open, course, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = (data: CourseFormData) => {
    if (!course) return;
    updateCourseMutation.mutate({ id: course.id, data });
    refetch();
    handleClose();
  };

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit(onFormSubmit)}
      okText={isViewMode ? undefined : "Update Course"}
      cancelText={isViewMode ? "Close" : "Cancel"}
      width={950}
      centered
      okButtonProps={{
        style: isViewMode ? { display: "none" } : {},
      }}
    >
      {/* === COURSE FORM === */}
      <Form layout="vertical" style={{ marginTop: 16 }}>
        {/* === Avatar Upload === */}
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
                  <Input {...field} readOnly={isViewMode} size="large" />
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
                  <Input {...field} readOnly={isViewMode} size="large" />
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
                    open={isViewMode ? false : undefined}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* === SECTION & LECTURE MANAGER === */}
      {course && (
        <SectionManager isViewMode={isViewMode} courseId={course.id} />
      )}
    </Modal>
  );
}
