import { Modal, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { CreateQuestionBankPayload } from "src/pages/admin/types/question-bank.types";
import { useCreateBank } from "src/pages/admin/hooks/questionbank/useQuestionBank.hooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
});

export default function QuestionBankModal({ open, onClose }: Props) {
  const createMutation = useCreateBank();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionBankPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const submit = (data: CreateQuestionBankPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal
      title="Create Question Form"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(submit)}
    >
      <Form layout="vertical">
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input {...field} placeholder="Form title" />
            )}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={3}
                placeholder="Description (optional)"
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
