import { IMAGES } from "src/assets/images";

const reasons = [
  {
    icon: IMAGES.awardBadge,
    title: "Chất lượng cao",
    desc: "Nội dung của khóa học được đầu tư cả về chất và lượng, giáo viên có kinh nghiệm và cực kỳ tâm huyết với công việc giảng dạy.",
  },
  {
    icon: IMAGES.codingMonitor,
    title: "Cung cấp nhiều kỹ năng quan trọng",
    desc: "Khóa học cung cấp kỹ thuật lập trình, tư duy logic, cách giải quyết bài toán, thuật toán… Những kỹ năng sẽ theo bạn mãi trong học tập và công việc sau này.",
  },
  {
    icon: IMAGES.developer,
    title: "Bước chuẩn bị vững chắc của một lập trình viên",
    desc: "Kỹ thuật lập trình là kỹ năng đầu tiên cần phải học khi bạn muốn trở thành một lập trình viên, việc học tốt kỹ thuật lập trình sẽ là bước đệm vững chắc cho sự nghiệp của bạn.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <div className="bg-primary-background py-20">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Tại sao bạn nên học với CuongALab
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center">
          <img src={IMAGES.heroIntro2} alt="why-choose" className="w-80 " />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-6">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="shrink-0 w-20 h-20 flex items-center justify-center bg-blue-50 rounded-lg ">
                  <img src={item.icon} alt={item.title} className="w-12" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
