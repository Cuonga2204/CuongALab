import { Modal, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useCreateCategory } from "src/pages/admin/hooks/category/useCategory.hooks";
import type { CreateCategoryPayload } from "src/pages/admin/types/category.types";

const { Text } = Typography;

interface Props {
  open: boolean;
  parentId?: string;
  rootId?: string; // ⭐ thêm
  onClose: () => void;
}

export default function CategoryModal({
  open,
  parentId,
  onClose,
  rootId,
}: Props) {
  const [form] = Form.useForm<{ name: string }>();
  const createMutation = useCreateCategory();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const submit = (values: { name: string }) => {
    const payload: CreateCategoryPayload = {
      name: values.name.trim(),
      parent_id: parentId ?? null,
    };

    // ⭐ nếu là sub-category → bắt buộc gửi root_id
    if (parentId && rootId) {
      payload.root_id = rootId;
    }

    createMutation.mutate(payload);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      destroyOnClose
      getContainer={false} // 🔥🔥🔥 DÒNG QUAN TRỌNG NHẤT
      maskClosable={false}
      zIndex={2000}
    >
      <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item
          label={
            <Text>
              Category name <Text type="danger">*</Text>
            </Text>
          }
          name="name"
          rules={[
            { required: true, message: "Category name is required" },
            { min: 2, message: "At least 2 characters" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <div
          style={{
            padding: 12,
            background: "#fafafa",
            border: "1px dashed #d9d9d9",
            borderRadius: 6,
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            {parentId
              ? "This category will be created as a child category."
              : "This category will be created as a top-level category."}
          </Text>
        </div>
      </Form>
    </Modal>
  );
}
