// src/components/form/FormField.tsx
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Form, Input } from "antd";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "password";
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          {type === "password" ? (
            <Input.Password
              style={{ padding: 8 }}
              type={type}
              {...field}
              placeholder={placeholder}
            />
          ) : (
            <Input
              style={{ padding: 8 }}
              type={type}
              {...field}
              placeholder={placeholder}
            />
          )}
        </Form.Item>
      )}
    />
  );
}
