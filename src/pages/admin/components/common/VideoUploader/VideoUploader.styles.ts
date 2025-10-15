// src/pages/admin/components/common/VideoUploader/styles.ts
export const videoStyles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    marginTop: "8px",
  },
  video: {
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ddd",
    maxHeight: 400,
    background: "#000",
  },
  placeholder: {
    width: "100%",
    height: 180,
    background: "#f5f5f5",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
    fontSize: 14,
  },
};
