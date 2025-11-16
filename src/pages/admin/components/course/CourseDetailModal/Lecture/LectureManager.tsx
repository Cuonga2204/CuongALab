import { useState } from "react";
import { Button, Space, Modal, Tooltip } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import LectureModal from "./LectureModal";
import type { Section } from "src/types/section.type";
import type { Lecture } from "src/types/lecture.type";
import {
  useCreateLecture,
  useDeleteLecture,
  useGetLecturesBySection,
  useUpdateLecture,
  useReorderLectures,
} from "src/pages/admin/hooks/course/useLecture.hook";
import { Loader } from "src/components/commons/Loader/Loader";

interface Props {
  section: Section;
  isViewMode: boolean;
}

export default function LectureManager({ section, isViewMode }: Props) {
  const { data: lectures = [], refetch } = useGetLecturesBySection(section.id);
  const { mutate: createLectureMutation, isPending: isCreating } =
    useCreateLecture();
  const { mutate: updateLectureMutation, isPending: isUpdating } =
    useUpdateLecture();
  const deleteLectureMutation = useDeleteLecture();
  const reorderLectureMutation = useReorderLectures();

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
      updateLectureMutation({
        id: lectureModal.selectedLecture.id,
        data,
      });
    } else if (lectureModal.mode === "create") {
      createLectureMutation({
        ...data,
        section_id: section.id,
      });
    }
    refetch();
    setLectureModal({ open: false, mode: "create" });
  };

  // 🧩 Handle reorder
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const reordered: Lecture[] = Array.from(lectures);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const newOrder = reordered.map((item, idx) => ({
      id: item.id,
      position_in_section: idx,
    }));

    reorderLectureMutation.mutate(
      { sectionId: section.id, newOrder },
      { onSuccess: refetch }
    );
  };
  if (isCreating || isUpdating) return <Loader />;

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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`lectures-${section.id}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lectures.map((lecture: Lecture, index: number) => (
                <Draggable
                  key={lecture.id}
                  draggableId={lecture.id}
                  index={index}
                >
                  {(drag) => (
                    <div
                      ref={drag.innerRef}
                      {...drag.draggableProps}
                      {...drag.dragHandleProps}
                      className="border border-dashed border-gray-300 p-3 mb-2 rounded-md bg-white"
                      style={{ ...drag.draggableProps.style }}
                    >
                      <Space
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div>
                          <strong>
                            {index + 1}. {lecture.lecture_title}
                          </strong>{" "}
                          <span className="text-xs text-gray-500">
                            {/* ({lecture.duration} minute) */}
                          </span>
                        </div>

                        <Space>
                          <Tooltip title="View">
                            <Button
                              type="text"
                              icon={
                                <EyeOutlined style={{ color: "#52c41a" }} />
                              }
                              onClick={() => handleViewLecture(lecture)}
                            />
                          </Tooltip>
                          {!isViewMode && (
                            <>
                              <Tooltip title="Edit">
                                <Button
                                  type="text"
                                  icon={
                                    <EditOutlined
                                      style={{ color: "#1890ff" }}
                                    />
                                  }
                                  onClick={() => handleEditLecture(lecture)}
                                />
                              </Tooltip>
                              <Tooltip title="Delete">
                                <Button
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  danger
                                  onClick={() =>
                                    handleDeleteLecture(lecture.id)
                                  }
                                />
                              </Tooltip>
                            </>
                          )}
                        </Space>
                      </Space>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
