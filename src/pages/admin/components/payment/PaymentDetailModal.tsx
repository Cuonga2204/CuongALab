import { Modal, Descriptions } from "antd";
import { useGetPaymentDetail } from "src/pages/admin/hooks/payment/usePayment.hooks";

export default function PaymentDetailModal({
  open,
  id,
  onClose,
}: {
  open: boolean;
  id: string;
  onClose: () => void;
}) {
  const { data } = useGetPaymentDetail(id);

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Payment Detail">
      <Descriptions column={1}>
        <Descriptions.Item label="Order ID">{data?.order_id}</Descriptions.Item>
        <Descriptions.Item label="CourseId">
          {data?.paymentCourse?.id}
        </Descriptions.Item>
        <Descriptions.Item label="User">
          {data?.paymentUser?.name} ({data?.paymentUser?.email})
        </Descriptions.Item>
        <Descriptions.Item label="UserId">
          {data?.paymentUser?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          {data?.amount.toLocaleString()}đ
        </Descriptions.Item>
        <Descriptions.Item label="Type">{data?.type}</Descriptions.Item>
        <Descriptions.Item label="Status">{data?.status}</Descriptions.Item>
        <Descriptions.Item label="Created">
          {new Date(data?.createdAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
