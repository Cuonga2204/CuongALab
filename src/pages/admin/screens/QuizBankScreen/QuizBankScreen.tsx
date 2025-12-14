import { Button, Card, Table, Space, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import type { QuestionBank } from "../../types/question-bank.types";
import {
  useDeleteBank,
  useGetAllQuestionBanks,
} from "../../hooks/questionbank/useQuestionBank.hooks";
import QuestionBankModal from "../../components/QuestionBank/QuestionBankModal";
import QuestionBankDetailModal from "../../components/QuestionBank/QuestionBankDetailModal";

export default function QuizBankScreen() {
  const { data: banks = [] } = useGetAllQuestionBanks();
  const deleteMutation = useDeleteBank();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 240,
      render: (v: string) => (
        <span style={{ fontFamily: "monospace" }}>{v}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Course ID",
      render: (bank: QuestionBank) => {
        const c = bank.course_id;

        return typeof c === "string" ? (
          <span style={{ fontFamily: "monospace" }}>{c}</span>
        ) : c ? (
          <span style={{ fontFamily: "monospace" }}>{c.id}</span>
        ) : (
          <span style={{ color: "#999" }}>-</span>
        );
      },
    },

    // COURSE NAME COLUMN
    {
      title: "Course Name",
      render: (bank: QuestionBank) => {
        const c = bank.course_id;

        return typeof c === "object" && c !== null ? (
          <strong>{c.title}</strong>
        ) : (
          <span style={{ color: "#999" }}>None</span>
        );
      },
    },

    {
      title: "Questions",
      render: (bank: QuestionBank) => bank.questions.length,
    },
    {
      title: "Actions",
      render: (bank: QuestionBank) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditingId(bank.id)}
          />

          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() =>
              Modal.confirm({
                title: "Delete this form?",
                onOk: () => deleteMutation.mutate(bank.id),
              })
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2>Quiz Bank</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          Add Form
        </Button>
      </div>

      <Card>
        <Table<QuestionBank>
          dataSource={banks}
          columns={columns}
          rowKey={(b) => b.id}
        />
      </Card>

      {createOpen && (
        <QuestionBankModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {editingId && (
        <QuestionBankDetailModal
          formId={editingId}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
