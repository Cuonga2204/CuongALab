import {
  Modal,
  Form,
  Input,
  Button,
  List,
  Tag,
  Popconfirm,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Lecture } from "src/types/lecture.type";
import VideoUploader from "src/pages/admin/components/common/VideoUploader/VideoUploader";
import {
  useCreateQuiz,
  useGetQuizByLecture,
  useDeleteQuiz,
} from "src/pages/admin/hooks/videoQuiz/useVideoQuiz.hooks";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { convertDayjsToSeconds } from "src/helpers/convert.helpers";

export default function LectureModal({
  open,
  selectedLecture,
  onCancel,
  onSubmit,
  mode,
}: {
  open: boolean;
  selectedLecture?: Lecture;
  onCancel: () => void;
  onSubmit: (data: Lecture) => void;
  mode: "create" | "edit" | "view";
}) {
  const isViewMode = mode === "view";
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizForm] = Form.useForm();

  // Hooks
  const createQuizMutation = useCreateQuiz();
  const deleteQuizMutation = useDeleteQuiz();
  const { data: quizzes = [], refetch } = useGetQuizByLecture(
    selectedLecture?.id || ""
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Lecture>();

  // Reset dữ liệu khi mở modal
  useEffect(() => {
    if (selectedLecture) reset(selectedLecture);
    else reset({});
  }, [selectedLecture, reset]);

  /** === Xử lý lưu Lecture === */
  const handleOk = handleSubmit((values) => {
    if (isViewMode) return onCancel();
    onSubmit(values);
  });

  /** === Thêm Quiz === */
  const handleAddQuiz = async () => {
    const values = await quizForm.validateFields();

    const time = values.time_in_seconds;
    const totalSeconds = convertDayjsToSeconds(time);

    await createQuizMutation.mutateAsync({
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      lecture_id: selectedLecture?.id!,
      ...values,
      time_in_seconds: totalSeconds,
    });

    quizForm.resetFields();
    setIsQuizModalOpen(false);
    refetch();
  };

  /** === Xóa Quiz === */
  const handleDeleteQuiz = async (id: string) => {
    await deleteQuizMutation.mutateAsync(id);
    refetch();
  };

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
        {/* Tiêu đề lecture */}
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

        {/* Video bài giảng */}
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

        {/* Danh sách quiz */}
        {/* Danh sách quiz */}
        {!isViewMode && selectedLecture && (
          <>
            <div className="flex justify-between items-center mt-6 mb-3">
              <h3 className="font-semibold text-lg text-primary">
                🧩 Quiz trong video
              </h3>
              <Button
                type="primary"
                onClick={() => setIsQuizModalOpen(true)}
                className="bg-blue-600"
              >
                + Thêm Quiz
              </Button>
            </div>

            <List
              bordered
              dataSource={quizzes}
              renderItem={(quiz) => (
                <List.Item
                  className="rounded-md bg-gray-50 p-4 shadow-sm hover:shadow-md transition-all"
                  actions={[
                    <Popconfirm
                      key="delete"
                      title="Bạn có chắc muốn xóa quiz này không?"
                      onConfirm={() => handleDeleteQuiz(quiz.id)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <div className="w-full">
                    <p className="font-semibold mb-1 text-gray-700">
                      ⏱ <Tag color="blue">{quiz.time_in_seconds}s</Tag>
                    </p>
                    <p className="text-gray-800 mb-2">
                      <span className="font-medium">Question: </span>{" "}
                      {quiz.question}
                    </p>
                    <div className="grid grid-cols-2 gap-1 ml-4 text-sm">
                      {quiz.options.map((opt, idx) => {
                        const label = ["A", "B", "C", "D"][idx] || "";
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-1 rounded ${
                              opt.is_correct ? "bg-green-50" : ""
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                opt.is_correct
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {label}:
                            </span>
                            <span
                              className={`${
                                opt.is_correct
                                  ? "text-green-600 font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {opt.text}
                            </span>
                            {opt.is_correct && (
                              <span className="text-green-500 ml-1">✔</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </>
        )}
      </Form>

      {/* Modal thêm quiz */}
      <Modal
        title="🧩 Thêm Quiz trong video"
        open={isQuizModalOpen}
        onCancel={() => setIsQuizModalOpen(false)}
        onOk={handleAddQuiz}
        okText="Lưu câu hỏi"
        centered
        width={650}
      >
        <Form form={quizForm} layout="vertical">
          {/* --- Giây xuất hiện --- */}
          <Form.Item
            label="⏱ Giây xuất hiện trong video"
            name="time_in_seconds"
            rules={[
              { required: true, message: "Vui lòng nhập giây xuất hiện" },
            ]}
          >
            <TimePicker
              format="HH:mm:ss"
              showNow={false}
              defaultValue={dayjs("11:00:00", "HH:mm:ss")}
            />
          </Form.Item>

          {/* --- Câu hỏi --- */}
          <Form.Item
            label="❓ Câu hỏi"
            name="question"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung câu hỏi" },
            ]}
          >
            <Input.TextArea rows={2} placeholder="Nhập nội dung câu hỏi..." />
          </Form.Item>

          {/* --- Danh sách đáp án --- */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-gray-700">Các lựa chọn:</h4>

            <div className="grid grid-cols-2 gap-3">
              {["A", "B", "C", "D"].map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-blue-600">{label}:</span>
                  <Form.Item
                    name={["options", i, "text"]}
                    rules={[{ required: true, message: "Nhập đáp án" }]}
                    noStyle
                  >
                    <Input placeholder={`Đáp án ${label}`} className="flex-1" />
                  </Form.Item>

                  <Form.Item
                    name={["options", i, "is_correct"]}
                    valuePropName="checked"
                    noStyle
                  >
                    <input
                      type="checkbox"
                      title="Đánh dấu nếu là đáp án đúng"
                      className="w-4 h-4 accent-green-600 cursor-pointer"
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ✅ Chọn một hoặc nhiều đáp án đúng
            </p>
          </div>
        </Form>
      </Modal>
    </Modal>
  );
}
