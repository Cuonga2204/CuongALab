import { useSearchParams, useNavigate } from "react-router-dom";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import { Button } from "src/components/commons/Button/Button";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <CheckCircleOutlined style={{ fontSize: 80, color: "#4CAF50" }} />
      <h1 className="text-3xl font-semibold mt-4 text-primary">
        Thanh toán thành công 🎉
      </h1>
      <p className="text-gray-600 mt-2">
        Mã đơn hàng của bạn: <strong>{orderId}</strong>
      </p>

      <Button
        style={{ width: 200, marginTop: 20 }}
        type="primary"
        onClick={() => navigate("/")}
      >
        Quay về trang chủ
      </Button>
    </div>
  );
}
