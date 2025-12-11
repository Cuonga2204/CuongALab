import type { CommentItem } from "src/pages/user/Lecture/types/comment.types";

/**
 * Xây dựng cây comment:
 * - comment cha có parent_id = null
 * - comment con được thêm vào replies
 */
export const buildCommentTree = (comments: CommentItem[]) => {
  const map: Record<string, CommentItem> = {};
  const roots: CommentItem[] = [];

  // Clone + add replies
  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });

  // Build
  comments.forEach((c) => {
    if (c.parent_id) {
      map[c.parent_id]?.replies?.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
};
