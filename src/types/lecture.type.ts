export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface Lecture {
  id: string;
  section_id: string;
  video: File;
  lecture_title: string;
  duration: number;
  lesson: string[];
  transcript: string;
  captions_url?: string;
}
export interface LectureResponse {
  id: string;
  section_id: string;
  video: string;
  lecture_title: string;
  duration: number;
  lesson: string[];
  transcript: string;
  captions_url?: string;
}
