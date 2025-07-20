import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { IMAGES } from "src/assets/images";
export default function AdvisorPreview() {
  return (
    <div className="flex ">
      <div className="relative flex-1/2">
        <img src={IMAGES.advisorBg} />
        <img src={IMAGES.advisor} className="absolute -top-16" />
      </div>
      <div className="flex-1/2 pl-10 pr-24 flex flex-col justify-center gap-4">
        <h2 className="text-primary text-4xl font-bold">Về CuongALab</h2>
        <p className="text-xl text-gray-500">
          CuongALab là một đội nhóm gồm các Lập trình viên hiện đang làm việc ở
          nhiều lĩnh vực khác nhau nhưng có chung niềm đam mê với giảng dạy và
          chia sẻ kiến thức
        </p>
        <p className="text-xl text-gray-500">
          CuongALab luôn cố gắng đổi mới, trau dồi kỹ năng, đón nhận đóng góp,
          khắc phục những điểm chưa tốt để mang đến cho các bạn học viên những
          khóa học lập trình với chất lượng cao nhất.
        </p>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-2.5 ">
            <CheckCircleTwoTone className="w-[20px]" />
            <span className="text-xl text-blue-900">
              Giảng viên giàu kinh nghiệm
            </span>
          </li>
          <li className="flex gap-2.5">
            <CheckCircleTwoTone />
            <span className="text-xl text-blue-900">
              Bài giảng và bài tập chất lượng
            </span>
          </li>
        </ul>
        <Button
          type="primary"
          style={{
            width: 250,
            height: 60,
            backgroundColor: "#00B4FF",
            border: "none",
            borderRadius: 50,
            fontSize: 18,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          Danh sách các khoá học
        </Button>
      </div>
    </div>
  );
}
