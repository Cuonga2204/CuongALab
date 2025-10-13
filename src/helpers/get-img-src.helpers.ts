import { IMAGES } from "src/assets/images";

export const getImageSrc = (value?: File | string) => {
  if (!value) return IMAGES.defaultPlaceholder;

  if (value instanceof File) return URL.createObjectURL(value);

  if (typeof value === "string" && value.startsWith("http")) return value;

  return IMAGES.defaultPlaceholder;
};
