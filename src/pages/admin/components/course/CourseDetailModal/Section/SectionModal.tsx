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
    if (selectedSection) form.setFieldsValue(selectedSection);
    else form.resetFields();
  }, [selectedSection, form]);

  const handleOk = () => {
    form.validateFields().then(onSubmit);
  };

  return (
    <Modal
      title={selectedSection ? "Edit Section" : "Add Section"}
      open={isOpen}
      onCancel={onCancel}
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
