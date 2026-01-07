import { Button, Empty, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { IMAGES } from "src/assets/images";

import CourseItem from "src/components/commons/Course/CourseItem";
import { useUserDetails } from "src/pages/admin/hooks/user/useUser.hooks";
import OnboardingModal from "src/pages/user/LandingPage/components/OnboardingModal";
import { useRecommendCourses } from "src/pages/user/LandingPage/hooks/useRecommendCourses";
import AdvisorPreview from "src/pages/user/LandingPage/AdvisorPreview";
import TestimonialSection from "src/pages/user/LandingPage/TestimonialSection";
import WhyChooseUsSection from "src/pages/user/LandingPage/WhyChooseUsSection";
import { useAuthStore } from "src/store/authStore";
import type { Course } from "src/types/course.type";
import { useFeaturedCourses } from "src/pages/admin/hooks/course/useCourse.hooks";

export default function LandingPage() {
  const { user } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  /* ================= USER DETAIL ================= */
  const { data: userDetail, refetch } = useUserDetails(user?.id);
  const hasOnboarding =
    !!userDetail?.learning_profile && userDetail?.has_onboarding;

  /* ================= FEATURED COURSES ================= */
  const { data: featuredCourses = [], isLoading: isLoadingFeatured } =
    useFeaturedCourses();

  /* ================= RECOMMEND COURSES ================= */
  const {
    data: recommendCourses = [],
    isLoading: isLoadingRecommend,
    isError: isErrorRecommend,
  } = useRecommendCourses(user?.id, hasOnboarding);

  /* ================= SHOW ONBOARDING ================= */
  useEffect(() => {
    if (user && userDetail && !hasOnboarding) {
      setShowOnboarding(true);
    }
  }, [user, userDetail, hasOnboarding]);

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative flex flex-col items-center">
        <img src={IMAGES.heroLandingPage} className="w-full" />

        <div className="mx-20 absolute top-1/8 w-full max-w-4xl flex flex-col items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-white text-center">
              CuongALab - Become A Better Developer
            </h1>

            <p className="text-[#e7e6ec] text-center text-[18px]">
              Chúng tôi cung cấp những khóa học chất lượng cao về lập trình giúp
              sinh viên IT phát triển kiến thức và sự nghiệp.
            </p>

            <Space className="flex justify-center" style={{ gap: 20 }}>
              <Button
                style={{
                  height: 60,
                  fontSize: 15,
                  fontWeight: 600,
                  background: "#00ADEF",
                  color: "white",
                }}
              >
                Các Khoá Học
              </Button>

              <Button style={{ height: 60, fontSize: 15, fontWeight: 600 }}>
                Zalo : 0335764028
              </Button>
            </Space>

            <img src={IMAGES.heroIntro} className="w-full" />
          </div>
        </div>
      </div>

      {/* ================= 🎯 RECOMMEND SECTION ================= */}
      <div className="bg-primary-background py-14">
        <div className="w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            🎯 Khóa học dành cho bạn
          </h2>

          <OnboardingModal
            open={showOnboarding}
            onSuccess={() => {
              setShowOnboarding(false);
              refetch();
            }}
          />

          {isLoadingRecommend && (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          )}

          {isErrorRecommend && (
            <Empty description="Không thể tải khóa học gợi ý" />
          )}

          {!hasOnboarding && (
            <Empty description="Hoàn thành onboarding để nhận gợi ý phù hợp" />
          )}

          {hasOnboarding && recommendCourses.length === 0 && (
            <Empty description="Chưa có khóa học phù hợp" />
          )}

          {hasOnboarding && recommendCourses.length > 0 && (
            <div className="grid grid-cols-4 gap-6">
              {recommendCourses.map((course: Course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= 🔥 FEATURED SECTION ================= */}
      <div className="bg-white py-14">
        <div className="w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            🔥 Khóa học nổi bật
          </h2>

          {isLoadingFeatured && (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          )}

          {!isLoadingFeatured && featuredCourses.length === 0 && (
            <Empty description="Chưa có khóa học nổi bật" />
          )}

          {!isLoadingFeatured && featuredCourses.length > 0 && (
            <div className="grid grid-cols-4 gap-6">
              {featuredCourses.map((course: Course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= OTHER SECTIONS ================= */}
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
