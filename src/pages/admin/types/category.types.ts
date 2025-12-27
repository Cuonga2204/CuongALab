export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  root_id: string;
  level: number;
}

export interface CategoryTreeItem extends Category {
  children: CategoryTreeItem[];
}

export interface CreateCategoryPayload {
  name: string;
  parent_id: string | null;
  root_id?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  is_active?: boolean;
}
