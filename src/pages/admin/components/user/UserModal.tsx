import { Modal, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

import ImageUploader from "src/pages/admin/components/common/ImageUploader/ImageUploader";
import type { UserFormData } from "src/pages/admin/types/user.types";

interface UserModalProps {
  open: boolean;
  mode: "view" | "edit" | "create";
  user: UserFormData | null;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

export default function UserModal({
  open,
  mode,
  user,
  onClose,
  onSubmit,
}: UserModalProps) {
  const isViewMode = mode === "view";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  useEffect(() => {
    if (open && user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone?.toString() ?? "",
        avatar: user.avatar ?? undefined,
      });
    } else if (open) {
      reset({
        name: "",
        email: "",
        role: "user",
        phone: "",
        avatar: undefined,
      });
    }
  }, [open, user, reset]);

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      title={
        mode === "view"
          ? "User Details"
          : mode === "edit"
          ? "Edit User"
          : "Create User"
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      okText={isViewMode ? undefined : mode === "edit" ? "Update" : "Create"}
      cancelText={isViewMode ? "Close" : "Cancel"}
      width={600}
      centered
      okButtonProps={{ style: isViewMode ? { display: "none" } : {} }}
    >
      <Form layout="vertical" style={{ marginTop: 24 }}>
        {/* Avatar Upload */}
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value}
              onChange={field.onChange}
              disabled={isViewMode}
            />
          )}
        />

        {/* Name */}
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} disabled={isViewMode} size="large" />
            )}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} disabled={isViewMode} size="large" />
            )}
          />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label="Role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role?.message}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                size="large"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "teacher", label: "Teacher" },
                  { value: "user", label: "User" },
                ]}
              />
            )}
          />
        </Form.Item>

        {/* Phone */}
        <Form.Item label="Phone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} disabled={isViewMode} size="large" />
            )}
          />
        </Form.Item>

        {user?.createdAt && (
          <Form.Item label="Created At">
            <Input
              value={new Date(user.createdAt).toLocaleString()}
              disabled
              size="large"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
