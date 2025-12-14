import { Modal, Form, InputNumber, Input, Switch, DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";

import { useUpdatePricing } from "src/pages/admin/hooks/course/useCoursePricing.hooks";

import type {
  CourseShortInfo,
  CoursePricing,
  UpdatePricingPayload,
} from "src/pages/admin/types/pricing.types";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;

  course: CourseShortInfo;
  pricing: CoursePricing | null;
}

export default function PricingModal({
  open,
  onClose,
  course,
  pricing,
}: PricingModalProps) {
  const updateMutation = useUpdatePricing();

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<UpdatePricingPayload>({
      defaultValues: {
        id: pricing?.id,
        course_id: course.id,

        base_price: pricing?.base_price ?? course.price_old,
        sale_price: pricing?.sale_price ?? course.price_current,

        discount_percent: pricing?.discount_percent ?? 0,
        discount_tag: pricing?.discount_tag ?? "",

        is_discount_active: pricing?.is_discount_active ?? false,

        sale_start: pricing?.sale_start ?? null,
        sale_end: pricing?.sale_end ?? null,
      },
    });

  // Khi dữ liệu thay đổi → reset form
  useEffect(() => {
    reset({
      id: pricing?.id,
      course_id: course.id,

      base_price: pricing?.base_price ?? course.price_old,
      sale_price: pricing?.sale_price ?? course.price_current,

      discount_percent: pricing?.discount_percent ?? 0,
      discount_tag: pricing?.discount_tag ?? "",

      is_discount_active: pricing?.is_discount_active ?? false,

      sale_start: pricing?.sale_start ?? null,
      sale_end: pricing?.sale_end ?? null,
    });
  }, [pricing, course, reset]);

  // Auto calculate sale price
  const basePrice = watch("base_price");
  const discount = watch("discount_percent");

  useEffect(() => {
    if (basePrice > 0 && discount >= 0) {
      const sale = Math.floor(basePrice * (1 - discount / 100));
      setValue("sale_price", sale);
    }
  }, [basePrice, discount, setValue]);
  // Convert Dayjs → string before submit
  const submitForm = (data: UpdatePricingPayload) => {
    updateMutation.mutate(
      {
        ...data,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal
      title={`Edit Pricing — ${course.title}`}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(submitForm)}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Base Price">
          <Controller
            name="base_price"
            control={control}
            render={({ field }) => <InputNumber {...field} min={0} />}
          />
        </Form.Item>

        <Form.Item label="Sale Price (Auto)">
          <Controller
            name="sale_price"
            control={control}
            render={({ field }) => <InputNumber {...field} min={0} readOnly />}
          />
        </Form.Item>

        <Form.Item label="Discount %">
          <Controller
            name="discount_percent"
            control={control}
            render={({ field }) => <InputNumber {...field} min={0} max={90} />}
          />
        </Form.Item>

        <Form.Item label="Discount Tag">
          <Controller
            name="discount_tag"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Sale 20%, Black Friday..." />
            )}
          />
        </Form.Item>

        <Form.Item label="Activate Discount">
          <Controller
            name="is_discount_active"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} />
            )}
          />
        </Form.Item>

        {/* Sale Start */}
        <Form.Item label="Sale Start">
          <Controller
            name="sale_start"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(value) =>
                  field.onChange(value ? value.toISOString() : null)
                }
              />
            )}
          />
        </Form.Item>

        {/* Sale End */}
        <Form.Item label="Sale End">
          <Controller
            name="sale_end"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(value) =>
                  field.onChange(value ? value.toISOString() : null)
                }
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
