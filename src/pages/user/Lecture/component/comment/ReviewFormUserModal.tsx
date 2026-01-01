import {
  Modal,
  Form,
  Rate,
  Radio,
  Input,
  Button,
  Space,
  Typography,
} from "antd";
import { useEffect } from "react";

import {
  useGetReviewForm,
  useSubmitCourseReview,
} from "src/pages/admin/hooks/reviewForm/useReviewForm.hooks";

import type { ReviewQuestion } from "src/pages/admin/types/reviewForm.types";

const { TextArea } = Input;
const { Title } = Typography;

interface Props {
  open: boolean;
  courseId: string;
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface ReviewSubmitPayload {
  rating: number;
  satisfaction: boolean;
  comment: string;
  answers: Record<string, string>;
}

export default function ReviewFormUserModal({
  open,
  courseId,
  userId,
  onClose,
  onSuccess,
}: Props) {
  const [form] = Form.useForm<ReviewSubmitPayload>();

  const { data: reviewForm } = useGetReviewForm();
  const submitMutation = useSubmitCourseReview(courseId);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const onFinish = (values: ReviewSubmitPayload) => {
    submitMutation.mutate(
      {
        courseId,
        userId,
        payload: {
          rating: values.rating,
          satisfaction: values.satisfaction,
          comment: values.comment,
          answers: Object.entries(values.answers || {}).map(
            ([questionId, value]) => ({
              question_id: questionId, // ✅ ĐÚNG BE
              value, // ✅ ĐÚNG BE
            })
          ),
        },
      },
      {
        onSuccess: () => {
          onSuccess();
          form.resetFields();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      title="Đánh giá khóa học"
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* ===== DEFAULT QUESTIONS ===== */}
        <Title level={5}>Đánh giá chung</Title>

        <Form.Item
          label="⭐ Mức độ hài lòng (1–5)"
          name="rating"
          rules={[{ required: true, message: "Vui lòng chọn rating" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="🙂 Bạn có hài lòng với khóa học không?"
          name="satisfaction"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={true}>Có</Radio>
            <Radio value={false}>Không</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="📝 Nhận xét"
          name="comment"
          rules={[{ required: true, message: "Vui lòng nhập nhận xét" }]}
        >
          <TextArea rows={4} placeholder="Chia sẻ cảm nhận của bạn..." />
        </Form.Item>

        {/* ===== CUSTOM QUESTIONS ===== */}
        {reviewForm && reviewForm.questions.length > 0 && (
          <>
            <Title level={5} style={{ marginTop: 24 }}>
              Câu hỏi thêm
            </Title>

            {reviewForm.questions.map((q: ReviewQuestion) => (
              <Form.Item
                key={q.id}
                label={q.label}
                name={["answers", q.id!]}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    {q.options.map((opt) => (
                      <Radio key={opt} value={opt}>
                        {opt}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            ))}
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
