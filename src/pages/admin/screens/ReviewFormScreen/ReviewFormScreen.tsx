import { Typography, Button, Divider } from "antd";
import { useState } from "react";

import {
  useGetReviewForm,
  useUpdateReviewForm,
} from "../../hooks/reviewForm/useReviewForm.hooks";

import ReviewFormModal from "../../components/ReviewForm/ReviewFormModal";

import type { ReviewQuestion } from "../../types/reviewForm.types";
import CourseReviewTable from "src/pages/admin/components/ReviewForm/CourseReviewTable";

const { Title } = Typography;

export default function ReviewFormScreen() {
  const { data } = useGetReviewForm();
  const updateMutation = useUpdateReviewForm();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* ================= CONFIG FORM ================= */}
      <Title level={3}>Course Review Form</Title>

      <Button type="primary" onClick={() => setOpen(true)}>
        Configure review form
      </Button>

      <ReviewFormModal
        open={open}
        initialQuestions={data?.questions || []}
        onClose={() => setOpen(false)}
        onSave={(questions: ReviewQuestion[]) => {
          updateMutation.mutate(questions);
          setOpen(false);
        }}
      />

      <Divider />

      {/* ================= USER REVIEWS ================= */}
      <Title level={4}>User Reviews</Title>

      <CourseReviewTable />
    </div>
  );
}
