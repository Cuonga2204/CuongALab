import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Collapse, Switch, Spin } from "antd";
import { mockLecture } from "src/mock/mockLectureVideo";
import { mockSections } from "src/mock/mockSection";
import { parseVtt } from "src/utils/parseVtt";
import type { TranscriptSegment } from "src/types/lecture.type";

const { Panel } = Collapse;
const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Lecture() {
  const { id, lectureId } = useParams();
  const navigate = useNavigate();

  const [showTranscript, setShowTranscript] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [loading, setLoading] = useState(false);

  const selected = useMemo(
    () => mockLecture.find((v) => v.id === lectureId),
    [lectureId]
  );

  const sections = useMemo(
    () =>
      mockSections
        .filter((s) => s.course_id === id)
        .sort((a, b) => a.position_in_course - b.position_in_course),
    [id]
  );

  // Theo dõi thời gian phát của video để highlight
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [lectureId]);

  // Load + parse VTT khi đổi lecture
  useEffect(() => {
    let canceled = false;
    async function load() {
      setSegments([]);
      if (!selected?.captions_url) return;
      setLoading(true);
      try {
        const res = await fetch(selected.captions_url);
        const text = await res.text();
        const segs = parseVtt(text);
        if (!canceled) setSegments(segs);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => {
      canceled = true;
    };
  }, [selected?.captions_url]);

  if (!selected) return <p className="p-10 text-center">Lecture not found</p>;

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const activeIndex = segments.findIndex(
    (s) => currentTime >= s.start && currentTime < s.end
  );

  return (
    <Layout>
      <Layout className="mt-16">
        <Content style={{ margin: 20, backgroundColor: "white", padding: 20 }}>
          <div className="h-[70vh]">
            <video
              ref={videoRef}
              src={selected.video_url}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>

          {/* Title + switch bên phải */}
          <div className="mt-5 flex items-center justify-between">
            <Title level={3} className="!mb-0">
              {selected.lecture_title}
            </Title>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Transcript</span>
              <Switch checked={showTranscript} onChange={setShowTranscript} />
            </div>
          </div>
        </Content>

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
              loading ? (
                <div className="flex items-center justify-center h-full">
                  <Spin />
                </div>
              ) : segments.length ? (
                <div className="space-y-2">
                  {segments.map((seg, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={`${seg.start}-${seg.end}-${i}`}
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = seg.start;
                            videoRef.current.play();
                          }
                        }}
                        className={`p-2 rounded cursor-pointer leading-6 ${
                          isActive
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {fmt(seg.start)} → {fmt(seg.end)}
                        </div>
                        <div className="whitespace-pre-wrap">{seg.text}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">
                  Chưa có phụ đề cho bài giảng này.
                </p>
              )
            ) : (
              <Collapse accordion bordered={false}>
                {sections.map((section) => {
                  const lectures = mockLecture
                    .filter((lv) => lv.section_id === section.id)
                    .sort(
                      (a, b) => a.position_in_section - b.position_in_section
                    );
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
            )}
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
