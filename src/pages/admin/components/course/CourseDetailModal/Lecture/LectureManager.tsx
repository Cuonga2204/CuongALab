import { useState } from "react";
import { Button, Space, Modal, Tooltip } from "antd";
import LectureModal from "./LectureModal";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Section } from "src/types/section.type";
import type { Lecture } from "src/types/lecture.type";
import {
  useCreateLecture,
  useDeleteLecture,
  useGetLecturesBySection,
  useUpdateLecture,
} from "src/pages/admin/hooks/course/useLecture.hook";

interface Props {
  section: Section;
  isViewMode: boolean;
}

export default function LectureManager({ section, isViewMode }: Props) {
  const { data: lectures = [], refetch } = useGetLecturesBySection(section.id);
  const createLectureMutation = useCreateLecture();
  const updateLectureMutation = useUpdateLecture();
  const deleteLectureMutation = useDeleteLecture();

  const [lectureModal, setLectureModal] = useState<{
    open: boolean;
    selectedLecture?: Lecture;
    mode: "create" | "edit" | "view";
  }>({ open: false, mode: "create" });

  const handleAddLecture = () =>
    setLectureModal({ open: true, mode: "create" });

  const handleViewLecture = (lecture: Lecture) =>
    setLectureModal({ open: true, selectedLecture: lecture, mode: "view" });

  const handleEditLecture = (lecture: Lecture) =>
    setLectureModal({ open: true, selectedLecture: lecture, mode: "edit" });

  const handleDeleteLecture = (id: string) => {
    Modal.confirm({
      title: "Delete Lecture?",
      content: "Are you sure you want to delete this lecture?",
      onOk: () => deleteLectureMutation.mutate(id),
    });
  };

  const handleSaveLecture = (data: Lecture) => {
    if (lectureModal.mode === "edit" && lectureModal.selectedLecture) {
      updateLectureMutation.mutate({
        id: lectureModal.selectedLecture.id,
        data,
      });
    } else if (lectureModal.mode === "create") {
      createLectureMutation.mutate({
        ...data,
        section_id: section.id,
      });
    }
    refetch();
    setLectureModal({ open: false, mode: "create" });
  };

  return (
    <div>
      {!isViewMode && (
        <Button
          type="dashed"
          size="small"
          onClick={handleAddLecture}
          className="mb-3"
        >
          + Add Lecture
        </Button>
      )}

      {lectures.map((lecture: Lecture) => (
        <div
          key={lecture.id}
          className="border border-dashed border-gray-300 p-3 mb-2 rounded-md"
        >
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <strong>{lecture.lecture_title}</strong>{" "}
              <span className="text-xs text-gray-500">
                ({lecture.duration} minute)
              </span>
            </div>

            <Space>
              <Tooltip title="View">
                <Button
                  type="text"
                  icon={<EyeOutlined style={{ color: "#52c41a" }} />}
                  onClick={() => handleViewLecture(lecture)}
                />
              </Tooltip>

              {!isViewMode && (
                <>
                  <Tooltip title="Edit">
                    <Button
                      type="text"
                      icon={<EditOutlined style={{ color: "#1890ff" }} />}
                      onClick={() => handleEditLecture(lecture)}
                    />
                  </Tooltip>

                  <Tooltip title="Delete">
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDeleteLecture(lecture.id)}
                    />
                  </Tooltip>
                </>
              )}
            </Space>
          </Space>
        </div>
      ))}

      <LectureModal
        open={lectureModal.open}
        selectedLecture={lectureModal.selectedLecture}
        mode={lectureModal.mode}
        onCancel={() => setLectureModal({ open: false, mode: "create" })}
        onSubmit={handleSaveLecture}
      />
    </div>
  );
}
