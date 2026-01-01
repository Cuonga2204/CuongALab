import { Modal, Descriptions, Tag, Card } from "antd";
import type {
  CourseReviewItem,
  ReviewFormResponse,
} from "../../types/reviewForm.types";

interface Props {
  open: boolean;
  review: CourseReviewItem | null;
  reviewForm?: ReviewFormResponse;
  onClose: () => void;
}

export default function ReviewDetailModal({
  open,
  review,
  reviewForm,
  onClose,
}: Props) {
  if (!review) return null;

  const answerMap = Object.fromEntries(
    review.answers.map((a) => [a.question_id, a.value])
  );

  return (
    <Modal
      open={open}
      title="Review detail"
      onCancel={onClose}
      footer={null}
      width={750}
    >
      {/* ===== BASIC INFO ===== */}
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="User">{review.user.name}</Descriptions.Item>

        <Descriptions.Item label="Course">
          {review.course.title}
        </Descriptions.Item>

        <Descriptions.Item label="Rating">{review.rating}</Descriptions.Item>

        <Descriptions.Item label="Satisfaction">
          {review.satisfaction ? (
            <Tag color="green">Yes</Tag>
          ) : (
            <Tag color="red">No</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Comment">
          {review.comment || "-"}
        </Descriptions.Item>
      </Descriptions>

      {/* ===== CUSTOM QUESTIONS ===== */}
      <h4 style={{ marginTop: 24 }}>Custom question answers</h4>

      {reviewForm?.questions.map((q, index) => {
        const selectedValue = answerMap[q.id!];

        return (
          <Card
            key={q.id}
            style={{ marginBottom: 12 }}
            bodyStyle={{ padding: 12 }}
          >
            <strong>
              {index + 1}. {q.label}
            </strong>

            <div style={{ marginTop: 8 }}>
              {q.options.map((opt) => {
                const isSelected = opt === selectedValue;

                return (
                  <div
                    key={opt}
                    style={{
                      padding: "6px 10px",
                      marginBottom: 6,
                      borderRadius: 6,
                      border: "1px solid #d9d9d9",
                      background: isSelected ? "#f6ffed" : "#fff",
                      borderColor: isSelected ? "#52c41a" : "#d9d9d9",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    {opt}
                    {isSelected && (
                      <Tag color="green" style={{ marginLeft: 8 }}>
                        Selected
                      </Tag>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </Modal>
  );
}
