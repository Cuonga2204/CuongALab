import { Card, Row, Col, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ReviewQuestion } from "../../types/reviewForm.types";

interface Props {
  index: number;
  question: ReviewQuestion;
  onEdit?: () => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G"];

export default function ReviewQuestionCard({
  index,
  question,
  onEdit,
  onDelete,
  readOnly = false,
}: Props) {
  if (!question || !question.options) return null;

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 10,
      }}
      bodyStyle={{ padding: 16 }}
    >
      {/* ===== HEADER ===== */}
      <Row justify="space-between" align="middle">
        <Col>
          <strong>
            {index}. {question.label}
          </strong>
        </Col>

        {!readOnly && (
          <Col>
            <Space>
              <EditOutlined style={{ cursor: "pointer" }} onClick={onEdit} />
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
                onClick={onDelete}
              />
            </Space>
          </Col>
        )}
      </Row>

      {/* ===== OPTIONS ===== */}
      <Row gutter={[16, 12]} style={{ marginTop: 12 }}>
        {question.options.map((opt, idx) => (
          <Col span={12} key={idx}>
            <Space>
              <Tag>{OPTION_LABELS[idx]}</Tag>
              <span>{opt}</span>
            </Space>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
