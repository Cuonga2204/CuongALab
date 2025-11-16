import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import type { Section } from "src/types/section.type";

interface SectionModalProps {
  isOpen: boolean;
  selectedSection?: Section;
  onCancel: () => void;
  onSubmit: (data: Section) => void;
}

export default function SectionModal({
  isOpen,
  selectedSection,
  onCancel,
  onSubmit,
}: SectionModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (selectedSection) form.setFieldsValue(selectedSection);
      else form.resetFields();
    } else {
      form.resetFields();
    }
  }, [isOpen, selectedSection, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  return (
    <Modal
      title={selectedSection ? "Edit Section" : "Add Section"}
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
