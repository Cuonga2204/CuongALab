import { Modal, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import type { User } from "src/pages/admin/types/user.types";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  open: boolean;
  mode: "view" | "edit" | "create";
  user: User | null;
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || undefined,
  });

  useEffect(() => {
    if (open && user) {
      reset(user);
    } else if (open && !user) {
      reset({ name: "", email: "", role: "", status: "" });
    }
  }, [open, user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = (data: UserFormData) => {
    onSubmit(data);
    reset();
  };

  const isViewMode = mode === "view";
  const title =
    mode === "view"
      ? "User Details"
      : mode === "edit"
      ? "Edit User"
      : "Add New User";

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit(onFormSubmit)}
      okText={isViewMode ? undefined : mode === "edit" ? "update" : "create"}
      cancelText={isViewMode ? "Close" : "Cancel"}
      width={600}
      centered
      okButtonProps={{ style: isViewMode ? { display: "none" } : {} }}
    >
      <Form layout="vertical" style={{ marginTop: 24 }}>
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

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                disabled={isViewMode}
                size="large"
              />
            )}
          />
        </Form.Item>

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
                placeholder="Select a role"
                options={[
                  { value: "Administrator", label: "Administrator" },
                  { value: "Instructor", label: "Instructor" },
                  { value: "Student", label: "Student" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                size="large"
                placeholder="Select a status"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            )}
          />
        </Form.Item>

        {user?.createdAt && (
          <Form.Item label="Created At">
            <Input value={user.createdAt} disabled size="large" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
