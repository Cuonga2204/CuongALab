import { StarFilled, UserAddOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { mockCart } from "src/mock/mockCart";
import { mockCourses } from "src/mock/mockCourses";

export default function Cart() {
  const cartItems = mockCart.map((cart) => {
    const course = mockCourses.find((course) => course.id === cart.course_id);
    return { ...cart, course };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.course?.price_current || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <h2 className="text-4xl font-bold text-primary mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            {cartItems.length} Course in Cart
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-300 py-4"
            >
              <Flex gap="small">
                <div>
                  <img
                    src={item.course?.avatar}
                    alt={item.course?.title}
                    className="w-40 h-24 rounded-md object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 w-full">
                  <h2 className="col-span-2 text-primary font-bold">
                    {item.course?.title}{" "}
                  </h2>
                  <Flex gap="middle" align="center">
                    <UserAddOutlined />
                    <span className="text-gray-600 text-sm">
                      Teacher : {item.course?.name_teacher}
                    </span>
                  </Flex>
                  <Flex
                    gap="middle"
                    align="center"
                    className="text-gray-500 text-sm"
                  >
                    {item.course?.total_hours} total hours •{" "}
                    {item.course?.total_lectures} lectures
                  </Flex>
                  <Flex gap="middle" align="center">
                    <StarFilled style={{ color: "gold" }} />
                    <span className="text-yellow-500 text-sm">
                      {item.course?.rating_average.toLocaleString()} ratings
                    </span>
                  </Flex>

                  <Flex gap="middle" align="center" className="mt-2 text-sm ">
                    <span className="hover:underline cursor-pointer text-red-400">
                      Remove
                    </span>
                    <span className="hover:underline cursor-pointer text-blue-300">
                      Move to Wishlist
                    </span>
                  </Flex>
                </div>
              </Flex>

              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  ₫{item.course?.price_current.toLocaleString()}
                </p>
                <p className="line-through text-gray-400 text-sm">
                  ₫{item.course?.price_old.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 bg-white shadow-md p-6 h-fit sticky top-20 border-blue-300 rounded-lg border-2">
          <h3 className="text-xl font-bold ">Total:</h3>
          <p className="text-3xl font-bold text-primary">
            ₫{totalPrice.toLocaleString()}
          </p>
          <p className="line-through text-gray-400 text-sm">
            ₫
            {cartItems
              .reduce((sum, item) => sum + (item.course?.price_old || 0), 0)
              .toLocaleString()}
          </p>
          <Flex vertical gap="small">
            <Button
              type="primary"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#00B4FF",
                border: "none",
                borderRadius: 50,
                fontSize: 16,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              Apply Coupon
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}
