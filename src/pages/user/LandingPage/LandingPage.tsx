import { Button, Space } from "antd";
import { IMAGES } from "src/assets/images";

import CourseItem from "src/components/commons/Course/CourseItem";
import { mockCourses } from "src/mock/mockCourses";
import AdvisorPreview from "src/pages/user/LandingPage/AdvisorPreview";
import TestimonialSection from "src/pages/user/LandingPage/TestimonialSection";
import WhyChooseUsSection from "src/pages/user/LandingPage/WhyChooseUsSection";
export default function LandingPage() {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <img
          src={IMAGES.heroLandingPage}
          className="w-full flex justify-center"
        />
        <div className="mx-20 absolute top-1/8 w-full max-w-4xl flex flex-col items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold mb-4 text-white text-center">
              {" "}
              CuongALab - Become A Better Developer
            </h1>
            <p className="text-[#e7e6ec] text-center text-[18px]">
              Chúng tôi cung cấp những khóa học chất lượng cao về lập trình với
              mục tiêu lớn nhất là giúp các bạn sinh viên IT phát triển kiến
              thức, sự nghiệp !
            </p>
            <Space
              size={[8, 0]}
              className="flex justify-center"
              style={{ gap: 20 }}
            >
              <Button
                className="transition-all duration-300 hover:-translate-y-1 bg-primary"
                style={{
                  maxWidth: 150,
                  height: 60,
                  fontSize: 15,
                  fontWeight: 600,
                  background: "#00ADEF",
                  color: "white",
                  border: "none",
                }}
              >
                Các Khoá Học
              </Button>

              <Button
                className="
             transition-all duration-300 hover:-translate-y-1"
                style={{
                  height: 60,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Zalo : 0335764028
              </Button>
            </Space>
            <div className="w-full">
              <img src={IMAGES.heroIntro} className="object-cover w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-background py-10">
        <div className="w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Khóa Học Tại CuongALab
          </h2>

          <div className="grid grid-cols-4 gap-6 px-5">
            {mockCourses.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-20">
        <AdvisorPreview />
      </div>
      <div className="pt-20">
        <TestimonialSection />
      </div>
      <div className="pt-20">
        <WhyChooseUsSection />
      </div>
    </>
  );
}
