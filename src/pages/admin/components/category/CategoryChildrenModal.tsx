import { Modal, Typography, Button } from "antd";
import { useState } from "react";
import CategoryChildrenTree from "./CategoryChildrenTree";
import CategoryModal from "./CategoryModal";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

const { Text } = Typography;

interface Props {
  open: boolean;
  rootId: string;
  onClose: () => void;
}

export default function CategoryChildrenModal({
  open,
  rootId,
  onClose,
}: Props) {
  const [addParentId, setAddParentId] = useState<string | null>(null);

  const { data: tree = [] } = useGetCategoryTree();

  const root = tree.find((c) => c.id === rootId);

  if (!root) return null;

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title={`Manage category: ${root.name}`}
        width={1200}
        centered
        destroyOnClose
        maskClosable={false}
      >
        <Text type="secondary">Level {root.level} category</Text>

        <CategoryChildrenTree root={root} onAdd={(id) => setAddParentId(id)} />

        <Button
          type="dashed"
          style={{ marginTop: 16 }}
          onClick={() => setAddParentId(root.id)}
        >
          + Add sub-category
        </Button>
      </Modal>

      {addParentId && (
        <CategoryModal
          open
          parentId={addParentId}
          rootId={root.id} // ⭐ QUAN TRỌNG
          onClose={() => setAddParentId(null)}
        />
      )}
    </>
  );
}
