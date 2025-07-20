import { IMAGES } from "src/assets/images";

export default function Footer() {
  return (
    <footer className="bg-[#eaf6fc] pt-10 pb-6 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            CuongALab - Become A Better Developer
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>TP. Hà Nội </span>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <a
                href="cuonga2242002@gmail.com.com"
                className="hover:text-blue-700"
              >
                cuongalab@gmail.com.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-4">Về CuongALab</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-700">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Điều khoản dịch vụ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Hướng dẫn thanh toán
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Thông Tin CuongALab
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-700">
                Đăng ký giảng viên
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Danh sách khóa học
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Góc chia sẻ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Fanpage Facebook
          </h3>
          <div className="overflow-hidden rounded-md shadow-md">
            <a href="https://www.facebook.com/aosycuong.2024">
              <img src={IMAGES.fanPage} alt="" className="w-72" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
