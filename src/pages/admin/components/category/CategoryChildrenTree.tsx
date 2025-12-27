import CategoryNode from "./CategoryNode";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

interface Props {
  root: CategoryTreeItem; // 👈 ROOT LEVEL 1
  onAdd: (parentId: string) => void;
}

export default function CategoryChildrenTree({ root, onAdd }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ===== ROOT NODE (LEVEL 1) ===== */}
      <CategoryNode category={root} onAdd={onAdd} />

      {/* LINE DOWN FROM ROOT */}
      {root.children.length > 0 && (
        <div
          style={{
            width: 2,
            height: 24,
            background: "#d9d9d9",
            margin: "12px 0",
          }}
        />
      )}

      {/* ===== LEVEL 2 NODES (HORIZONTAL) ===== */}
      {root.children.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {root.children.map((child) => (
            <TreeBranch key={child.id} node={child} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   TREE BRANCH (LEVEL 2+)
===================================================== */
function TreeBranch({
  node,
  onAdd,
}: {
  node: CategoryTreeItem;
  onAdd: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* NODE */}
      <CategoryNode category={node} onAdd={onAdd} />

      {/* LINE DOWN */}
      {node.children.length > 0 && (
        <div
          style={{
            width: 2,
            height: 20,
            background: "#d9d9d9",
            margin: "8px 0",
          }}
        />
      )}

      {/* CHILDREN (RECURSIVE) */}
      {node.children.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {node.children.map((child) => (
            <TreeBranch key={child.id} node={child} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
}
