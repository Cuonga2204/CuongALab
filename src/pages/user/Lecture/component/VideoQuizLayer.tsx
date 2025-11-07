import { Button, Radio } from "antd";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

interface VideoQuizLayerProps {
  question: string;
  options: { text: string; is_correct: boolean }[];
  selected: string | null;
  onSelect: (val: string) => void;
  onSubmit: () => void;
}

export default function VideoQuizLayer({
  question,
  options,
  selected,
  onSelect,
  onSubmit,
}: VideoQuizLayerProps) {
  // === React Layer Portal ===
  const layerRoot = document.getElementById("video-quiz-layer-root");
  if (!layerRoot) return null;

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-[80%] max-w-xl text-center">
        <h3 className="text-xl font-bold mb-4">{question}</h3>

        <Radio.Group
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="flex flex-col gap-2 mb-4 text-left"
        >
          {options.map((opt, i) => (
            <Radio key={i} value={opt.text}>
              {String.fromCharCode(65 + i)}. {opt.text}
            </Radio>
          ))}
        </Radio.Group>

        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!selected}
          onClick={onSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </motion.div>,
    layerRoot
  );
}
