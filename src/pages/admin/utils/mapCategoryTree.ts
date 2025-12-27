import type { DataNode } from "antd/es/tree";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

export const mapCategoryTreeToSelect = (
  nodes: CategoryTreeItem[]
): DataNode[] => {
  return nodes.map((node) => ({
    title: node.name,
    value: node.id,
    key: node.id,
    disabled: node.children.length > 0,
    children: mapCategoryTreeToSelect(node.children),
  }));
};
