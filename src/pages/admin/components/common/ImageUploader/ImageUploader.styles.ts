import clsx from "clsx";

export const styles = {
  container: clsx("flex", "items-center", "gap-4", "mb-6", "cursor-pointer"),

  image: clsx("rounded-md", "border", "border-gray-200", "object-cover"),

  placeholder: clsx(
    "flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "border",
    "border-dashed",
    "border-gray-300",
    "bg-gray-50",
    "text-gray-400"
  ),

  uploadButton: clsx(
    "ant-btn",
    "ant-btn-default",
    "flex",
    "items-center",
    "gap-1",
    "hover:border-primary",
    "hover:text-primary",
    "transition-all",
    "duration-200"
  ),
};
