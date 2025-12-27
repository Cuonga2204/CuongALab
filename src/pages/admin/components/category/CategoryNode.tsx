import { Card, Space, Button, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";
import { useDeleteCategory } from "src/pages/admin/hooks/category/useCategory.hooks";

const { Text } = Typography;

interface Props {
  category: CategoryTreeItem;
  onAdd: (parentId: string) => void;
}

export default function CategoryNode({ category, onAdd }: Props) {
  const deleteMutation = useDeleteCategory();

  return (
    <Card
      size="small"
      style={{
        minWidth: 160,
        textAlign: "center",
        borderRadius: 8,
        background: "#f5f8ff",
        border: "1px solid #d6e4ff",
      }}
    >
      <Space>
        <Text strong>
          {category.name} (Level {category.level})
        </Text>

        {category.level < 4 && (
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onAdd(category.id)}
          />
        )}

        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteMutation.mutate(category.id)}
        />
      </Space>
    </Card>
  );
}
