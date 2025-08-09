import {
  BulbOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Rate, Collapse } from "antd";
import { useParams } from "react-router-dom";
import { IMAGES } from "src/assets/images";
import { mockCourses } from "src/mock/mockCourses";
import { mockLecture } from "src/mock/mockLectureVideo";
import { mockSections } from "src/mock/mockSection";

const { Panel } = Collapse;

export default function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id);

  if (!course) return <p className="text-center mt-10">Course not found</p>;

  const sections = mockSections
    .filter((s) => s.course_id === id)
    .sort((a, b) => a.position_in_course - b.position_in_course);

  return (
    <div className="bg-[#f8f9fa] min-h-screen relative">
      <div className="relative w-full h-[400px]">
        <img
          className="absolute w-full h-full object-cover"
          src={IMAGES.backgroundDetail}
          alt=""
        />
      </div>

      <div className="absolute z-10 w-6xl left-1/2 -translate-x-1/2 p-5 py-20 top-14 flex justify-between">
        <div className="max-w-6xl flex flex-col gap-3">
          <p className="text-sm text-gray-400">
            Development &gt; Web Devel opment &gt; React
          </p>

          <h1 className="text-3xl font-bold">{course.title}</h1>

          <p className="text-lg mt-2 max-w-3xl">{course.overview}</p>

          <div className="flex items-center gap-3 mt-3">
            <span>rating :</span>
            <span className="text-yellow-400 font-bold text-lg">
              {course.rating_average}
            </span>
            <Rate disabled defaultValue={4} />
            <span className="text-gray-300 text-sm">
              ({course.student_count.toLocaleString()} students)
            </span>
          </div>

          <p className="text-sm mt-2">
            Teacher : <span>{course.name_teacher}</span>
          </p>
          <p className="text-sm text-gray-400">
            Last updated 12/2024 • English [Auto]
          </p>
        </div>
        <div className="flex-shrink-0 w-[400px]">
          <img
            className="w-full h-full rounded-md shadow-lg object-cover"
            src={IMAGES.courseItem}
            alt="Course preview"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mt-10 px-4 py-20">
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Tổng quan khóa học
            </h2>
            <p className="mb-3 text-gray-700">{course.description}</p>

            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <ReadOutlined
                  style={{ color: "#3b82f6" }}
                  className="text-blue-500"
                />
                <span>
                  {course.total_lectures} bài giảng • {course.total_hours} giờ
                  học
                </span>
              </li>
              <li className="flex items-center gap-2">
                <VideoCameraOutlined style={{ color: "#8b5cf6" }} />
                <span>Hình thức học: Qua video</span>
              </li>
              <li className="flex items-center gap-2">
                <BulbOutlined style={{ color: "#facc15" }} />
                <span>Yêu cầu: Kiến thức cơ bản về lập trình</span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Lộ trình khóa học
            </h2>

            <Collapse accordion>
              {sections.map((section) => {
                const lectures = mockLecture
                  .filter((lv) => lv.section_id === section.id)
                  .sort(
                    (a, b) => a.position_in_section - b.position_in_section
                  );

                return (
                  <Panel
                    key={section.id}
                    header={`${section.title} (${section.total_lectures} bài • ${section.total_duration} phút)`}
                    className=""
                  >
                    {lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="border border-dashed border-gray-300 p-4 m-2.5 rounded-md3 cursor-pointer"
                      >
                        <h4 className="font-semibold text-[#00ADEF] flex items-center gap-2">
                          ▶ {lecture.lecture_title}
                          <span className="text-xs text-gray-500">
                            ({lecture.duration} phút)
                          </span>
                        </h4>

                        <ul className="mt-2 pl-6 list-decimal text-gray-700 space-y-1">
                          {lecture.lesson.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 h-fit sticky top-20">
          <img
            src={IMAGES.courseItem}
            alt={course.title}
            className="rounded-md mb-4"
          />
          <p className="text-2xl font-bold text-primary">
            ₫{course.price_current.toLocaleString()}
          </p>
          <p className="line-through text-gray-400 text-sm">
            ₫{course.price_old.toLocaleString()}
          </p>

          <Button
            type="primary"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Đăng Ký Học
          </Button>
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p className="flex items-center gap-2">
              <VideoCameraOutlined style={{ color: "#8b5cf6" }} />
              <span>Hình thức học: Qua video</span>
            </p>
            <p className="flex items-center gap-2">
              <ClockCircleOutlined style={{ color: "#8b5cf6" }} />
              Giờ học: 50 giờ
            </p>
            <p className="flex items-center gap-2">
              <ReadOutlined style={{ color: "#f97316" }} />
              {course.total_lectures} bài giảng
            </p>
            <p className="flex items-center gap-2">
              <UserOutlined style={{ color: "#16a34a" }} />
              Giảng viên: {course.name_teacher}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
