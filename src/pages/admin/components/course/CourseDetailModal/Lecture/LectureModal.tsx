import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Lecture } from "src/types/lecture.type";
import VideoUploader from "src/pages/admin/components/common/VideoUploader/VideoUploader";

interface LectureModalProps {
  open: boolean;
  selectedLecture?: Lecture;
  onCancel: () => void;
  onSubmit: (data: Lecture) => void;
  mode: "create" | "edit" | "view";
}

export default function LectureModal({
  open,
  selectedLecture,
  onCancel,
  onSubmit,
  mode,
}: LectureModalProps) {
  const isViewMode = mode === "view";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Lecture>();

  useEffect(() => {
    if (selectedLecture) reset(selectedLecture);
    else reset({});
  }, [selectedLecture, reset]);

  const handleOk = handleSubmit((values) => {
    if (isViewMode) return onCancel();
    onSubmit(values);
  });

  const modalTitle =
    mode === "create"
      ? "Add Lecture"
      : mode === "edit"
      ? "Edit Lecture"
      : "Lecture Details";

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onCancel}
      onOk={!isViewMode ? handleOk : onCancel}
      okText={
        mode === "create" ? "Create" : mode === "edit" ? "Update" : "Close"
      }
      cancelButtonProps={{ style: isViewMode ? { display: "none" } : {} }}
      centered
      width={850}
    >
      <Form layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item
          label="Lecture Title"
          validateStatus={errors.lecture_title ? "error" : ""}
          help={errors.lecture_title?.message}
        >
          <Controller
            name="lecture_title"
            control={control}
            rules={{ required: "Please enter lecture title" }}
            render={({ field }) => (
              <Input
                {...field}
                readOnly={isViewMode}
                placeholder="e.g. 1. Introduction"
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Lecture Video">
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <VideoUploader
                value={field.value}
                onChange={field.onChange}
                disabled={isViewMode}
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
