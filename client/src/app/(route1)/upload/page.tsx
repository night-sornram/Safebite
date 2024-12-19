"use client";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Spin, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { createHistory } from "@/libs/createHistory";
import { useSession } from "next-auth/react";
import { getMe } from "@/libs/getMe";
import toast from "react-hot-toast";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="w-full"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);

    // **Change
    await getMe(session?.user.token as string)
      .then((res) => console.log(res))
      .then(() => {
        setFileList([]);
        toast.success("upload successfully.");
      })
      .catch((err) => {
        toast.error("upload failed.");
        console.error(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          const isValidType =
            file.type === "image/png" ||
            file.type === "image/svg+xml" ||
            file.type === "image/jpeg";
          if (!isValidType) {
            toast.error("You can only upload PNG, SVG, or JPG files!");
            return isValidType || Upload.LIST_IGNORE;
          }
          setFileList([...fileList, file]);

          return false;
        }}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 5 ? null : uploadButton}
      </Upload>
      <button
        onClick={handleUpload}
        disabled={fileList.length === 0 || uploading}
        style={{ marginTop: 16 }}
        className={`p-2 text-white rounded-lg bg-blue-500 flex items-center gap-2 ${
          uploading || fileList.length === 0 ? "opacity-50" : ""
        }`}
      >
        <LoadingOutlined style={{ display: uploading ? "block" : "none" }} />
        {uploading ? "Uploading" : "Start Upload"}
      </button>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default App;
