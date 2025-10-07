import { Button as ButtonAtnd } from "antd";
import type { ButtonProps as ButtonAtndProps } from "antd";

export interface ButtonProps extends ButtonAtndProps {
  fullWidth?: boolean;
}

export function Button({ fullWidth = true, children, ...props }: ButtonProps) {
  return (
    <ButtonAtnd
      {...props}
      block={fullWidth}
      style={{
        padding: 18,
        fontSize: 15,
        ...(props.style || {}),
      }}
    >
      {children}
    </ButtonAtnd>
  );
}
