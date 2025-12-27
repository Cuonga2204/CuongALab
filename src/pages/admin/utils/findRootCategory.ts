import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

export function findRootCategoryId(
  tree: CategoryTreeItem[],
  categoryId: string
): string | null {
  for (const node of tree) {
    if (node.id === categoryId) return node.id;

    if (node.children.length) {
      const found = findRootCategoryId(node.children, categoryId);
      if (found) return node.id; // 👈 node hiện tại là root
    }
  }
  return null;
}
