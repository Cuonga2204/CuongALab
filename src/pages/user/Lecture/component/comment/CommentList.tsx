import CommentNode from "src/pages/user/Lecture/component/comment/CommentNode";
import type { CommentItem } from "src/pages/user/Lecture/types/comment.types";

interface Props {
  comments: CommentItem[];
  isEnrolled: boolean;
}

export default function CommentList({ comments, isEnrolled }: Props) {
  return (
    <div>
      {comments.map((c) => (
        <CommentNode key={c.id} comment={c} isEnrolled={isEnrolled} />
      ))}
    </div>
  );
}
