export const getPrice = (price?: number | string): string => {
  if (price === undefined || price === null) return "0đ";

  const value = Number(price);
  if (isNaN(value)) return "0đ";

  return value.toLocaleString("vi-VN") + "đ";
};
