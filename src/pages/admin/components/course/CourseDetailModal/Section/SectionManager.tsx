import { useState } from "react";
import { Collapse, Button, Space, Modal, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import SectionModal from "./SectionModal";
import LectureManager from "src/pages/admin/components/course/CourseDetailModal/Lecture/LectureManager";

import type { Section } from "src/types/section.type";
import {
  useCreateSection,
  useDeleteSection,
  useGetSectionsByCourse,
  useUpdateSection,
  useReorderSections,
} from "src/pages/admin/hooks/course/useSection.hooks";

const { Panel } = Collapse;
const { Text } = Typography;

interface SectionManagerProps {
  isViewMode: boolean;
  courseId: string;
}

export default function SectionManager({
  isViewMode,
  courseId,
}: SectionManagerProps) {
  const { data: sections = [], refetch } = useGetSectionsByCourse(
    courseId || ""
  );
  const createSectionMutation = useCreateSection();
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();
  const reorderSectionMutation = useReorderSections();

  const [sectionModal, setSectionModal] = useState<{
    isOpen: boolean;
    selectedSection?: Section;
  }>({ isOpen: false });

  /** ===== CRUD ===== */
  const handleAddSection = () => setSectionModal({ isOpen: true });

  const handleEditSection = (section: Section) =>
    setSectionModal({ isOpen: true, selectedSection: section });

  const handleDeleteSection = (id: string) => {
    Modal.confirm({
      title: "Delete Section?",
      content: "Are you sure you want to delete this section?",
      onOk: () => {
        deleteSectionMutation.mutate(id, {
          onSuccess: () => {
            refetch();
          },
        });
      },
    });
  };

  const handleSaveSection = (data: Section) => {
    if (sectionModal.selectedSection) {
      updateSectionMutation.mutate(
        { id: sectionModal.selectedSection.id, data },
        { onSuccess: refetch }
      );
    } else {
      createSectionMutation.mutate({ ...data, course_id: courseId });
    }
    setSectionModal({ isOpen: false });
  };

  /** ===== Drag & Drop reorder ===== */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.index === result.destination.index) return;

    const reordered: Section[] = Array.from(sections);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const newOrder = reordered.map((item, idx) => ({
      id: item.id,
      order: idx,
    }));

    reorderSectionMutation.mutate({ courseId, newOrder });
  };

  /** ===== Render ===== */
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-3">
        <Text strong>Sections & Lectures</Text>
        {!isViewMode && (
          <Button type="primary" onClick={handleAddSection}>
            + Add Section
          </Button>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {sections.map((section: Section, index: number) => {
                const letter = String.fromCharCode(65 + index);

                return (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(drag) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        style={{
                          background: "#FFF",
                          borderRadius: 6,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          ...drag.draggableProps.style,
                        }}
                      >
                        <Collapse
                          bordered={false}
                          expandIconPosition="start"
                          style={{ background: "transparent" }}
                        >
                          <Panel
                            key={section.id}
                            header={
                              <div
                                {...drag.dragHandleProps}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  cursor: "grab",
                                }}
                              >
                                <div>
                                  {letter}. {section.title}
                                  {/* (
                                  {section.total_lectures} lectures •{" "}
                                  {section.total_duration} minute) */}
                                </div>
                                {!isViewMode && (
                                  <Space>
                                    <Button
                                      type="text"
                                      icon={
                                        <EditOutlined
                                          style={{ color: "#1890ff" }}
                                        />
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditSection(section);
                                      }}
                                    />
                                    <Button
                                      type="text"
                                      icon={<DeleteOutlined />}
                                      danger
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSection(section.id);
                                      }}
                                    />
                                  </Space>
                                )}
                              </div>
                            }
                          >
                            <LectureManager
                              section={section}
                              isViewMode={isViewMode}
                            />
                          </Panel>
                        </Collapse>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <SectionModal
        isOpen={sectionModal.isOpen}
        selectedSection={sectionModal.selectedSection}
        onCancel={() => setSectionModal({ isOpen: false })}
        onSubmit={handleSaveSection}
      />
    </div>
  );
}
