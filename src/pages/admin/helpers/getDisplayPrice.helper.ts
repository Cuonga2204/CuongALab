import type { CoursePricing } from "../types/pricing.types";

export function getDisplayPrice(pricing?: CoursePricing) {
  if (!pricing) return null;

  if (pricing.is_discount_active) {
    return {
      final: pricing.sale_price,
      original: pricing.base_price,
      percent: pricing.discount_percent,
    };
  }

  return {
    final: pricing.base_price,
    original: null,
    percent: 0,
  };
}
