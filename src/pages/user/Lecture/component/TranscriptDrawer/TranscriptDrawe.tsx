// src/components/TranscriptDrawer.tsx
import { Input, List } from "antd";
import { useEffect, useMemo, useRef } from "react";
import type { TranscriptSegment } from "src/types/lecture.type";

export default function TranscriptDrawer({
  segments,
  currentTime,
  onSeek,
  search,
  onSearch,
}: {
  segments: TranscriptSegment[];
  currentTime: number;
  onSeek: (t: number) => void;
  search: string;
  onSearch: (v: string) => void;
}) {
  const filtered = useMemo(() => {
    if (!search.trim()) return segments;
    const k = search.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(k));
  }, [segments, search]);

  const activeIndex = useMemo(() => {
    const i = segments.findIndex(
      (s) => currentTime >= s.start && currentTime < s.end
    );
    return i;
  }, [segments, currentTime]);

  const activeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (activeRef.current)
      activeRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
  }, [activeIndex]);

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      <Input.Search
        placeholder="Tìm trong transcript…"
        allowClear
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        onSearch={onSearch}
        className="mb-3"
      />
      <List
        dataSource={filtered}
        renderItem={(seg, i) => {
          const isActive =
            i === activeIndex ||
            (filtered !== segments && seg === segments[activeIndex]);
          return (
            <List.Item style={{ padding: 0, border: "none", marginBottom: 8 }}>
              <div
                ref={isActive ? activeRef : undefined}
                onClick={() => onSeek(seg.start)}
                className={`p-2 rounded cursor-pointer leading-6 ${
                  isActive ? "bg-[#E5E1FA]" : "hover:bg-gray-50"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {fmt(seg.start)} → {fmt(seg.end)}
                </div>
                <div className="whitespace-pre-wrap">{seg.text}</div>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
