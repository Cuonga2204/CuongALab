export type TranscriptSegment = { start: number; end: number; text: string };
export interface Lecture {
  id: string;
  section_id: string;
  video_url: string;
  lecture_title: string;
  position_in_section: number;
  duration: number;
  lesson: string[];
  transcript: string;
  captions_url?: string;
}
