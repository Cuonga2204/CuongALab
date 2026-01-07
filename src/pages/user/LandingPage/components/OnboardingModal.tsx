import { Modal, Tag, Button, Input } from "antd";
import { useState } from "react";
import axiosClient from "src/api/axiosClient";
import { useAuthStore } from "src/store/authStore";

const { TextArea } = Input;

interface Props {
  open: boolean;
  onSuccess: () => void;
}

/* ===== OPTIONS ===== */
const GOAL_OPTIONS = [
  { label: "💼 Xin việc", value: "get_job" },
  { label: "🚀 Thăng tiến", value: "career_up" },
  { label: "🌱 Học từ đầu", value: "learn_basic" },
  { label: "🎯 Nâng cao kỹ năng", value: "improve_skill" },
  { label: "🔄 Chuyển ngành", value: "career_change" },
  { label: "💡 Đam mê / Sở thích", value: "interest" },
];

const LEVEL_OPTIONS = [
  { label: "🐣 Mới bắt đầu", value: "beginner" },
  { label: "🌱 Biết cơ bản", value: "basic" },
  { label: "🌿 Đã làm project", value: "intermediate" },
  { label: "🌳 Đã đi làm", value: "advanced" },
];

const INTEREST_OPTIONS = [
  { label: "🌐 Web Development", value: "web" },
  { label: "🎨 Frontend", value: "frontend" },
  { label: "🖥 Backend", value: "backend" },
  { label: "🔧 Fullstack", value: "fullstack" },
  { label: "🤖 AI / Machine Learning", value: "ai" },
  { label: "📊 Data", value: "data" },
  { label: "📱 Mobile App", value: "mobile" },
];

export default function OnboardingModal({ open, onSuccess }: Props) {
  const [goals, setGoals] = useState<string[]>([]);
  const [level, setLevel] = useState<string>();
  const [interests, setInterests] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const { user } = useAuthStore();

  /* ===== TOGGLE TAG ===== */
  const toggleMulti = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (list.includes(value)) {
      setList(list.filter((i) => i !== value));
    } else {
      setList([...list, value]);
    }
  };

  /* ===== SUBMIT ===== */
  const submit = async () => {
    await axiosClient.post("/user/onboarding", {
      userId: user?.id,
      goals,
      level,
      raw_interests: interests,
      description,
    });

    onSuccess();
  };

  return (
    <Modal
      open={open}
      footer={null}
      title="👋 Giới thiệu nhanh về bạn"
      width={600}
      destroyOnClose
    >
      {/* ===== GOALS ===== */}
      <div className="mb-6">
        <p className="font-semibold mb-2">🎯 Bạn học vì điều gì?</p>
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((g) => (
            <Tag.CheckableTag
              key={g.value}
              checked={goals.includes(g.value)}
              onChange={() => toggleMulti(g.value, goals, setGoals)}
            >
              {g.label}
            </Tag.CheckableTag>
          ))}
        </div>
      </div>

      {/* ===== LEVEL ===== */}
      <div className="mb-6">
        <p className="font-semibold mb-2">📊 Trình độ hiện tại của bạn</p>
        <div className="flex flex-wrap gap-2">
          {LEVEL_OPTIONS.map((l) => (
            <Button
              key={l.value}
              type={level === l.value ? "primary" : "default"}
              onClick={() => setLevel(l.value)}
            >
              {l.label}
            </Button>
          ))}
        </div>
      </div>

      {/* ===== INTERESTS ===== */}
      <div className="mb-6">
        <p className="font-semibold mb-2">📚 Lĩnh vực bạn quan tâm</p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((i) => (
            <Tag.CheckableTag
              key={i.value}
              checked={interests.includes(i.value)}
              onChange={() => toggleMulti(i.value, interests, setInterests)}
            >
              {i.label}
            </Tag.CheckableTag>
          ))}
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="mb-6">
        <p className="font-semibold mb-2">
          ✍️ Mô tả ngắn mục tiêu học tập (không bắt buộc)
        </p>
        <TextArea
          rows={3}
          placeholder="Ví dụ: Mình muốn trở thành frontend developer và xin thực tập"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ===== SUBMIT BUTTON ===== */}
      <Button
        type="primary"
        block
        size="large"
        disabled={!goals.length || !level || !interests.length}
        onClick={submit}
      >
        Tiếp tục
      </Button>
    </Modal>
  );
}
