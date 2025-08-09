import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Collapse } from "antd";
import { mockLecture } from "src/mock/mockLectureVideo";
import { mockSections } from "src/mock/mockSection";
const { Panel } = Collapse;
const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Lecture() {
  const { id, lectureId } = useParams(); // :id là courseId
  const navigate = useNavigate();

  const selected = mockLecture.find((v) => v.id === lectureId);
  if (!selected) return <p className="p-10 text-center">Lecture not found</p>;

  const sections = mockSections
    .filter((s) => s.course_id === id)
    .sort((a, b) => a.position_in_course - b.position_in_course);

  return (
    <Layout>
      <Layout className="mt-16">
        <Content style={{ margin: 20, backgroundColor: "white", padding: 20 }}>
          <div className="h[75%]">
            <video
              src={selected.video_url}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            >
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
            <Title className="mt-5" level={3}>
              {" "}
              {selected.lecture_title}
            </Title>
          </div>
        </Content>

        <Sider
          width={400}
          style={{
            background: "white",
            paddingTop: "24px",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Title className="px-4" level={5}>
            Danh sách bài giảng
          </Title>
          <Collapse accordion bordered={false}>
            {sections.map((section) => {
              const lectures = mockLecture
                .filter((lv) => lv.section_id === section.id)
                .sort((a, b) => a.position_in_section - b.position_in_section);

              return (
                <Panel header={section.title} key={section.id}>
                  <div className="flex flex-col gap-2">
                    {lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        onClick={() =>
                          navigate(`/course/${id}/lecture/${lecture.id}`)
                        }
                        className={`p-2 rounded cursor-pointer text-sm hover:bg-blue-50 ${
                          lecture.id === lectureId
                            ? "bg-blue-100 font-semibold"
                            : "bg-white"
                        }`}
                      >
                        {lecture.lecture_title}
                      </div>
                    ))}
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </Sider>
      </Layout>
    </Layout>
  );
}
