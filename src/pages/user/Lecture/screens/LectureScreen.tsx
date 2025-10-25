import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Switch } from "antd";
import { useGetLectureDetail } from "src/pages/admin/hooks/course/useLecture.hook";
import LectureDetailSectionList from "src/pages/user/Lecture/component/LectureDetailSectionList";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Lecture() {
  const { id: courseId, lectureId } = useParams();

  const [showTranscript, setShowTranscript] = useState(false);

  /** === Gọi API === */
  const { data: lecture, isLoading: loadingLecture } = useGetLectureDetail(
    lectureId || ""
  );

  if (loadingLecture) return <Loader />;

  if (!lecture) return <DisplayLoadApi />;

  return (
    <Layout>
      <Layout className="mt-16">
        {/* === VIDEO CONTENT === */}
        <Content style={{ margin: 20, backgroundColor: "white", padding: 20 }}>
          <div className="h-[70vh]">
            <video
              src={lecture.video}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>

          {/* === TITLE + TRANSCRIPT SWITCH === */}
          <div className="mt-5 flex items-center justify-between">
            <Title level={3} className="!mb-0">
              {lecture.lecture_title}
            </Title>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Transcript</span>
              <Switch checked={showTranscript} onChange={setShowTranscript} />
            </div>
          </div>
        </Content>

        {/* === SIDEBAR === */}
        <Sider
          width={420}
          style={{
            background: "white",
            paddingTop: 24,
            marginTop: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 120px)",
            overflow: "hidden",
          }}
        >
          <Title className="px-4 !mb-3" level={5}>
            {showTranscript ? "Transcript" : "Danh sách bài giảng"}
          </Title>

          <div style={{ flex: 1, overflow: "auto" }} className="px-4">
            {showTranscript ? (
              <div className="text-gray-500 text-sm p-2">
                <p>Transcript sẽ hiển thị ở đây (đang phát triển...)</p>
              </div>
            ) : (
              <LectureDetailSectionList courseId={courseId!} />
            )}
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
