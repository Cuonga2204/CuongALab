import { Button, Table, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";

import {
  useGetCategoryTree,
  useDeleteCategory,
} from "src/pages/admin/hooks/category/useCategory.hooks";

import type { CategoryTreeItem } from "src/pages/admin/types/category.types";
import CategoryChildrenModal from "src/pages/admin/components/category/CategoryChildrenModal";
import CategoryModal from "src/pages/admin/components/category/CategoryModal";

const { Title } = Typography;

export default function CategoryScreen() {
  const { data = [] } = useGetCategoryTree();
  const deleteMutation = useDeleteCategory();

  const [selected, setSelected] = useState<CategoryTreeItem | null>(null);
  const [openCreateRoot, setOpenCreateRoot] = useState(false);

  const columns: ColumnsType<CategoryTreeItem> = [
    {
      title: "Category name",
      dataIndex: "name",
    },
    {
      title: "Category level 1 ID",
      dataIndex: "id",
    },
    {
      title: "Level",
      render: () => "Level 1",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => setSelected(record)}>Manage</Button>
          <Button danger onClick={() => deleteMutation.mutate(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* HEADER */}
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Category Management
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreateRoot(true)}
        >
          Add Root Category
        </Button>
      </Space>

      {/* TABLE LEVEL 1 */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      {/* MODAL TREE */}
      {selected && (
        <CategoryChildrenModal
          open={!!selected}
          rootId={selected.id}
          onClose={() => setSelected(null)} // OK, giữ nguyên
        />
      )}

      {/* CREATE ROOT CATEGORY */}
      <CategoryModal
        open={openCreateRoot}
        parentId={undefined}
        onClose={() => setOpenCreateRoot(false)}
      />
    </>
  );
}
