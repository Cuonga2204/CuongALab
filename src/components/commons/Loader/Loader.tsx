import { Spin } from "antd";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" tip="Loading courses..." />
    </div>
  );
};
