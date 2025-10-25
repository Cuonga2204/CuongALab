import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <CloseCircleOutlined style={{ fontSize: 80, color: "red" }} />
      <h1 className="text-3xl font-semibold mt-4 text-red-600">
        Thanh toán thất bại 😢
      </h1>
      <Button
        style={{ width: 200, marginTop: 20 }}
        type="primary"
        onClick={() => navigate("/cart")}
      >
        Quay về giỏ hàng
      </Button>
    </div>
  );
}
