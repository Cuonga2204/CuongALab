import { Modal, Input, Button, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type {
  ReviewQuestion,
  ReviewQuestionDraft,
} from "../../types/reviewForm.types";

interface Props {
  open: boolean;
  initial?: ReviewQuestion;
  onCancel: () => void;
  onSubmit: (q: ReviewQuestionDraft) => void;
}

export default function ReviewQuestionModal({
  open,
  initial,
  onCancel,
  onSubmit,
}: Props) {
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  useEffect(() => {
    if (open) {
      setLabel(initial?.label || "");
      setOptions(initial?.options?.length ? [...initial.options] : ["", ""]);
    }
  }, [open, initial]);

  return (
    <Modal
      open={open}
      title="Add Question"
      onCancel={onCancel}
      onOk={() =>
        onSubmit({
          label,
          options,
        })
      }
      okText="OK"
    >
      <Input
        placeholder="Question"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        {options.map((opt, idx) => (
          <Space key={idx} style={{ width: "100%" }}>
            <Input
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const clone = [...options];
                clone[idx] = e.target.value;
                setOptions(clone);
              }}
            />

            {options.length > 2 && (
              <Button
                icon={<DeleteOutlined />}
                onClick={() => setOptions(options.filter((_, i) => i !== idx))}
              />
            )}
          </Space>
        ))}

        <Button
          icon={<PlusOutlined />}
          onClick={() => setOptions([...options, ""])}
        >
          Add Option
        </Button>
      </Space>
    </Modal>
  );
}
