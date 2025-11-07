import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Switch, Button, message } from "antd";
import { useGetLectureDetail } from "src/pages/admin/hooks/course/useLecture.hook";
import { useGetQuizByLecture } from "src/pages/admin/hooks/videoQuiz/useVideoQuiz.hooks";
import LectureDetailSectionList from "src/pages/user/Lecture/component/LectureDetailSectionList";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import type {
  VideoQuiz,
  VideoQuizOption,
} from "src/pages/admin/types/videoQuizz.types";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Lecture() {
  const { id: courseId, lectureId } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showTranscript, setShowTranscript] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<VideoQuiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<VideoQuizOption | null>(
    null
  );
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);

  const { data: lecture, isLoading } = useGetLectureDetail(lectureId || "");
  const { data: quizzes = [] } = useGetQuizByLecture(lectureId || "");

  if (isLoading) return <Loader />;
  if (!lecture) return <DisplayLoadApi />;

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const currentTime = Math.floor(video.currentTime);

    if (isOpenQuiz) return;
    const foundQuiz = quizzes.find((q) => q.time_in_seconds === currentTime);
    if (foundQuiz) {
      video.pause();
      setCurrentQuiz(foundQuiz);
      setIsOpenQuiz(true);
    }
  };

  const handleContinuesVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 1;
      videoRef.current.play();
    }
  };

  const handleSubmit = () => {
    if (!currentQuiz) return;

    if (selectedAnswer?.is_correct) {
      message.success("Correct Answer !!");
      setIsOpenQuiz(false);
      setSelectedAnswer(null);
      setCurrentQuiz(null);
      handleContinuesVideo();
    } else {
      message.warning("❌ Sai rồi, hãy chọn lại đáp án đúng!");
    }
  };

  return (
    <Layout>
      <Layout className="mt-16">
        <Content
          style={{
            margin: 20,
            backgroundColor: "white",
            padding: 20,
            position: "relative",
          }}
        >
          <div className="relative h-[70vh]">
            <video
              ref={videoRef}
              src={lecture.video}
              controls
              onTimeUpdate={handleTimeUpdate}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            {isOpenQuiz && currentQuiz && (
              <div
                className="absolute inset-0 bg-black/60 flex justify-center items-center z-10"
                style={{ borderRadius: 8, backdropFilter: "blur(4px)" }}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-[85%] max-w-3xl text-center animate-fadeIn"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <h2 className="text-base font-bold mb-6 text-gray-800">
                    {`Question: ${currentQuiz.question}`}
                  </h2>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    {currentQuiz.options.map((option, index) => (
                      <div
                        key={option.id}
                        onClick={() => setSelectedAnswer(option)}
                        className={`flex items-center gap-3 cursor-pointer px-4 py-3 border rounded-lg transition-all duration-200 select-none ${
                          selectedAnswer?.id === option.id
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-semibold text-blue-600">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="font-medium text-base">
                          {option.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3 mt-8">
                    <Button
                      onClick={() => {
                        setIsOpenQuiz(false);
                        setSelectedAnswer(null);
                        setCurrentQuiz(null);
                        handleContinuesVideo();
                      }}
                      className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      Bỏ qua
                    </Button>

                    <Button
                      type="primary"
                      disabled={!selectedAnswer}
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-medium"
                    >
                      Xác nhận
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === TITLE + TRANSCRIPT SWITCH === */}
          <div className="mt-5 flex items-center justify-between">
            <Title level={3}>{lecture.lecture_title}</Title>
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
