// src/utils/parseVtt.ts
import type { TranscriptSegment } from "src/types/lecture.type";

const timeToSeconds = (t: string) => {
  // "hh:mm:ss.mmm"
  const [hh, mm, rest] = t.split(":");
  const [ss, ms = "0"] = rest.split(".");
  return +hh * 3600 + +mm * 60 + +ss + (+ms || 0) / 1000;
};

export function parseVtt(vttText: string): TranscriptSegment[] {
  const lines = vttText.replace(/\r/g, "").split("\n");
  const segments: TranscriptSegment[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // match timing line: 00:00:00.000 --> 00:00:02.000
    if (
      /^\d{2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}\.\d{3}/.test(line)
    ) {
      const [startStr, endStr] = line
        .split("-->")
        .map((s) => s.trim().split(" ")[0]);
      const start = timeToSeconds(startStr);
      const end = timeToSeconds(endStr);

      // collect following text lines until blank
      const buf: string[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== "") {
        buf.push(lines[j]);
        j++;
      }
      segments.push({ start, end, text: buf.join(" ").trim() });
      i = j;
    }
  }
  return segments;
}
