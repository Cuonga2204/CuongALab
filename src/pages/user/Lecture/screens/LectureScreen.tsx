// =====================================
// Lecture.tsx (FULL UPDATED VERSION)
// =====================================

import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Button, message } from "antd";

import { useGetLectureDetail } from "src/pages/admin/hooks/course/useLecture.hook";
import { useGetQuizByLecture } from "src/pages/admin/hooks/videoQuiz/useVideoQuiz.hooks";

import LectureDetailSectionList from "src/pages/user/Lecture/component/LectureDetailSectionList";

import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";

import { useUpdateLectureProgress } from "src/pages/user/Lecture/hooks/useLectureProgress.hook";
import { useAuthStore } from "src/store/authStore";

import type {
  VideoQuiz,
  VideoQuizOption,
} from "src/pages/admin/types/videoQuizz.types";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Lecture() {
  const { id: courseId, lectureId } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const updateProgress = useUpdateLectureProgress();
  const { user } = useAuthStore();

  const [currentQuiz, setCurrentQuiz] = useState<VideoQuiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<VideoQuizOption | null>(
    null
  );
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);

  const lastSentRef = useRef(0);

  const { data: lecture, isLoading } = useGetLectureDetail(lectureId || "");
  const { data: quizzes = [] } = useGetQuizByLecture(lectureId || "");

  const streamUrl = `${
    import.meta.env.VITE_API_URL
  }/lecture/stream/${lectureId}`;

  if (isLoading) return <Loader />;
  if (!lecture) return <DisplayLoadApi />;

  // =====================================================
  // VIDEO PROGRESS HANDLER (send every 10 seconds)
  // =====================================================
  const sendProgress = (current: number) => {
    const duration = Math.floor(videoRef.current?.duration || 1);
    const percentage = Math.round((current / duration) * 100);

    updateProgress.mutate({
      user_id: String(user?.id),
      course_id: String(courseId),
      section_id: lecture.section_id,
      lecture_id: lecture.id,
      watched_seconds: current,
      percentage,
    });
  };

  // =====================================================
  // SEND PROGRESS ON SEEKED
  // =====================================================
  const handleSeeked = () => {
    if (!videoRef.current) return;
    const current = Math.floor(videoRef.current.currentTime);
    sendProgress(current);
  };

  // =====================================================
  // MAIN TIME UPDATE HANDLER (every 10s)
  // =====================================================
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const current = Math.floor(video.currentTime);

    // If quiz is open → do nothing
    if (isOpenQuiz) return;

    // Check VideoQuiz
    const foundQuiz = quizzes.find((q) => q.time_in_seconds === current);
    if (foundQuiz) {
      video.pause();
      setCurrentQuiz(foundQuiz);
      setIsOpenQuiz(true);
      return;
    }

    // Send progress every 10 seconds
    if (current - lastSentRef.current >= 10) {
      lastSentRef.current = current;
      sendProgress(current);
    }
  };

  // =====================================================
  // QUIZ SUBMIT HANDLING
  // =====================================================
  const handleContinueVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 1;
      videoRef.current.play();
    }
  };

  const handleSubmitVideoQuiz = () => {
    if (!currentQuiz) return;

    if (selectedAnswer?.is_correct) {
      message.success("Correct Answer!");
      handleContinueVideo();
      setSelectedAnswer(null);
      setCurrentQuiz(null);
      setIsOpenQuiz(false);
    } else {
      message.warning("Sai rồi, hãy chọn lại đáp án đúng!");
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
          {/* ================= VIDEO PLAYER ================= */}
          <div className="relative h-[70vh]">
            <video
              ref={videoRef}
              src={streamUrl}
              controls
              onTimeUpdate={handleTimeUpdate}
              onSeeked={handleSeeked}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            {/* ================= VIDEO QUIZ POPUP ================= */}
            {isOpenQuiz && currentQuiz && (
              <div
                className="absolute inset-0 bg-black/60 flex justify-center items-center z-10"
                style={{ borderRadius: 8, backdropFilter: "blur(4px)" }}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-[85%] max-w-3xl text-center">
                  <h2 className="text-base font-bold mb-6">{`Question: ${currentQuiz.question}`}</h2>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    {currentQuiz.options.map((option, index) => (
                      <div
                        key={option.id}
                        onClick={() => setSelectedAnswer(option)}
                        className={`flex items-center gap-3 cursor-pointer px-4 py-3 border rounded-lg transition-all ${
                          selectedAnswer?.id === option.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-semibold text-blue-600">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="font-medium">{option.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3 mt-8">
                    <Button
                      onClick={() => {
                        setIsOpenQuiz(false);
                        setSelectedAnswer(null);
                        setCurrentQuiz(null);
                        handleContinueVideo();
                      }}
                    >
                      Bỏ qua
                    </Button>

                    <Button
                      type="primary"
                      disabled={!selectedAnswer}
                      onClick={handleSubmitVideoQuiz}
                    >
                      Xác nhận
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= VIDEO TITLE ================= */}
          <div className="mt-5 flex items-center justify-between">
            <Title level={3}>{lecture.lecture_title}</Title>
          </div>
        </Content>

        {/* ================= SIDEBAR ================= */}
        <Sider
          width={420}
          style={{
            background: "white",
            paddingTop: 24,
            marginTop: 20,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{ height: "calc(100vh - 120px)", overflow: "auto" }}
            className="px-4"
          >
            <LectureDetailSectionList courseId={courseId!} />
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
