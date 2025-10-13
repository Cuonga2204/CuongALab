import { Upload, Image, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getImageSrc } from "src/helpers/get-img-src.helpers";

interface ImageUploaderProps {
  value?: File | string;
  onChange?: (file: File) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  disabled,
}: ImageUploaderProps) {
  const handleBeforeUpload = (file: File) => {
    onChange?.(file);
    return false;
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Image
        src={getImageSrc(value)}
        alt="Preview"
        width={120}
        height={120}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />

      {!disabled && (
        <Upload
          accept="image/*"
          beforeUpload={handleBeforeUpload}
          showUploadList={false}
        >
          <Button type="text" icon={<UploadOutlined />}>
            Upload Image
          </Button>
        </Upload>
      )}
    </div>
  );
}
