// src/pages/admin/components/common/VideoUploader/VideoUploader.tsx
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { videoStyles } from "src/pages/admin/components/common/VideoUploader/VideoUploader.styles";

interface VideoUploaderProps {
  value?: File | string;
  onChange?: (file: File) => void;
  disabled?: boolean;
}

export default function VideoUploader({
  value,
  onChange,
  disabled,
}: VideoUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof value === "string") {
      setPreviewUrl(value);
    }
  }, [value]);

  const handleBeforeUpload = (file: File) => {
    onChange?.(file);
    return false;
  };

  return (
    <div style={videoStyles.container}>
      {previewUrl ? (
        <video src={previewUrl} controls style={videoStyles.video} />
      ) : (
        <div style={videoStyles.placeholder}>No video selected</div>
      )}

      {!disabled && (
        <Upload
          accept="video/*"
          beforeUpload={handleBeforeUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        </Upload>
      )}
    </div>
  );
}
