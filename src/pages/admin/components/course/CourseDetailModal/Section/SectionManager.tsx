import { Collapse, Button, Space, Modal, Typography } from "antd";
import SectionModal from "./SectionModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import type { Section } from "src/types/section.type";
import {
  useCreateSection,
  useDeleteSection,
  useGetSectionsByCourse,
  useUpdateSection,
} from "src/pages/admin/hooks/course/useSection.hooks";
import { useState } from "react";
import LectureManager from "src/pages/admin/components/course/CourseDetailModal/Lecture/LectureManager";

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

  const [sectionModal, setSectionModal] = useState<{
    isOpen: boolean;
    selectedSection?: Section;
  }>({ isOpen: false });

  const handleAddSection = () => setSectionModal({ isOpen: true });

  const handleEditSection = (section: Section) =>
    setSectionModal({ isOpen: true, selectedSection: section });

  const handleDeleteSection = (id: string) => {
    Modal.confirm({
      title: "Delete Section?",
      content: "Are you sure you want to delete this section?",
      onOk: () => deleteSectionMutation.mutate(id),
    });
  };

  const handleSaveSection = (data: Section) => {
    if (sectionModal.selectedSection) {
      updateSectionMutation.mutate({
        id: sectionModal.selectedSection.id,
        data: data,
      });
    } else {
      createSectionMutation.mutate({
        ...data,
        course_id: courseId,
      });
    }
    refetch();
    setSectionModal({ isOpen: false });
  };

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

      <Collapse accordion>
        {sections.map((section: Section) => (
          <Panel
            key={section.id}
            header={`${section.title} (${section.total_lectures} lectures • ${section.total_duration} minute)`}
            extra={
              !isViewMode && (
                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined style={{ color: "#1890ff" }} />}
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
              )
            }
          >
            <LectureManager section={section} isViewMode={isViewMode} />
          </Panel>
        ))}
      </Collapse>

      <SectionModal
        isOpen={sectionModal.isOpen}
        selectedSection={sectionModal.selectedSection}
        onCancel={() => setSectionModal({ isOpen: false })}
        onSubmit={handleSaveSection}
      />
    </div>
  );
}
