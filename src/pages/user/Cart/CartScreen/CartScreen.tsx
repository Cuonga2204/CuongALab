import { StarFilled, UserAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";
import {
  useGetUserCart,
  useRemoveFromCart,
} from "src/pages/user/Cart/hooks/useCart.hooks";
import { usePaymentCart } from "src/pages/user/Cart/hooks/usePayment.hooks";
import { useAuthStore } from "src/store/authStore";

export default function CartScreen() {
  const { user } = useAuthStore();

  // === API hooks ===
  const { data: cart, isLoading, isError } = useGetUserCart(user?.id || "");
  const removeFromCartMutation = useRemoveFromCart(user?.id || "");

  const paymentMutation = usePaymentCart();

  if (isLoading) return <Loader />;
  if (isError || !cart) return <DisplayLoadApi />;

  const handleRemove = (courseId: string) => {
    removeFromCartMutation.mutate(courseId);
  };

  // === Thanh toán ===
  const handleCheckout = () => {
    if (!cart?.id) return;
    paymentMutation.mutate({ cartId: cart.id });
  };

  const totalPrice = cart.totalPrice || 0;
  const totalQuantity = cart.totalQuantity || 0;

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <h2 className="text-4xl font-bold text-primary mb-8">Shopping Cart</h2>

      {totalQuantity === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          Your cart is empty 😢
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {/* === LEFT SIDE === */}
          <div className="col-span-2">
            <Flex justify="space-between" align="center" className="mb-4">
              <h2 className="text-xl font-semibold text-primary">
                {totalQuantity} Course{totalQuantity > 1 ? "s" : ""} in Cart
              </h2>
            </Flex>

            {cart.items.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between border-b border-gray-300 py-4"
              >
                <Flex gap="small">
                  <img
                    src={course.avatar}
                    alt={course.title}
                    className="w-40 h-24 rounded-md object-cover"
                  />
                  <div className="grid grid-cols-2 w-full">
                    <h2 className="col-span-2 text-primary font-bold">
                      {course.title}
                    </h2>

                    <Flex gap="middle" align="center">
                      <UserAddOutlined />
                      <span className="text-gray-600 text-sm">
                        Teacher: {course.name_teacher}
                      </span>
                    </Flex>

                    <Flex
                      gap="middle"
                      align="center"
                      className="text-gray-500 text-sm"
                    >
                      {course.total_hours} total hours • {course.total_lectures}{" "}
                      lectures
                    </Flex>

                    <Flex gap="middle" align="center">
                      <StarFilled style={{ color: "gold" }} />
                      <span className="text-yellow-500 text-sm">
                        {course.rating_average.toLocaleString()} ratings
                      </span>
                    </Flex>

                    <Flex gap="middle" align="center" className="mt-2 text-sm ">
                      <span
                        className="hover:underline cursor-pointer text-red-400 flex items-center gap-1"
                        onClick={() => handleRemove(course.id)}
                      >
                        <DeleteOutlined /> Remove
                      </span>
                      <span className="hover:underline cursor-pointer text-blue-400">
                        Move to Wishlist
                      </span>
                    </Flex>
                  </div>
                </Flex>

                <div className="text-right">
                  <p className="text-xl font-bold text-primary">
                    ₫{course.price_current.toLocaleString()}
                  </p>
                  <p className="line-through text-gray-400 text-sm">
                    ₫1.000.000
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* === RIGHT SIDE (SUMMARY) === */}
          <div className="flex flex-col gap-3 bg-white shadow-md p-6 h-fit sticky top-20 border-blue-300 rounded-lg border-2">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-3xl font-bold text-primary">
              ₫{totalPrice.toLocaleString()}
            </p>
            <p className="line-through text-gray-400 text-sm">
              ₫{totalPrice.toLocaleString()}
            </p>

            <Flex vertical gap="small">
              <Button
                type="primary"
                // loading={paymentCa.isPending}
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#00B4FF",
                  border: "none",
                  borderRadius: 50,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Proceed to Checkout →
              </Button>

              <Button
                type="primary"
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#00B4FF",
                  border: "none",
                  borderRadius: 40,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Apply Coupon
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
}
