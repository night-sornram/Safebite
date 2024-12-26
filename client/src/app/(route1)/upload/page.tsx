"use client";
import { useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
  XOutlined,
} from "@ant-design/icons";
import { Card, Image, Rate, Spin, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { createHistory } from "@/libs/createHistory";
import { useSession } from "next-auth/react";
import { getMe } from "@/libs/getMe";
import toast from "react-hot-toast";
import { prediction } from "@/libs/prediction";
import { LuMapPin } from "react-icons/lu";

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
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [foodResponse, setFoodResponse] = useState<Food | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const { data: session } = useSession();
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const list = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        const base64String = (file.preview as string)?.split(",")[1];
        setImage(file.preview as string);
        return base64String;
      })
    );
    setBase64Files(list);
  };

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
    await prediction(session?.user.user_id as string, base64Files[0], ["fish"])
      .then(async (res: Food) => {
        console.log(res);
        setFoodResponse(res);
        await createHistory(
          session?.user.token as string,
          image,
          res.food,
          res.allergy_info.join(", "),
          "This food is safe for you.",
          res.warning
        );
      })
      .then(() => {
        setFileList([]);
        setBase64Files([]);
        toast.success("upload successfully.");
        setUploaded(true);
      })
      .catch((err) => {
        toast.error("upload failed.");
        console.error(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };
  return !uploaded ? (
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
        {fileList.length > 0 ? null : uploadButton}
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
  ) : (
    <div className="flex flex-col w-full h-full relative transition-transform animate-fadeIn duration-200">
      <div className="flex items-center gap-6 h-1/2">
        <div>
          <Image
            src={image}
            alt="upload"
            width={300}
            height={300}
            className="h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center text-3xl font-semibold text-white p-2 bg-secondary-main rounded-lg">
            <h1>{foodResponse?.food}</h1>
          </div>
          <div className="flex  gap-2 text-xl w-40 font-semibold p-2 bg-secondary-card rounded-lg">
            <h1>Safe to bite</h1>
            {foodResponse?.warning ? (
              <CloseOutlined color="red" />
            ) : (
              <CheckOutlined color="green" />
            )}
          </div>
          <div className="flex flex-col gap-2 p-2 ">
            <h1 className="text-xl font-semibold">Ingredients:</h1>
            <div className="flex flex-wrap gap-2">
              {foodResponse?.allergy_info.map((allergy, index) => (
                <div
                  key={index}
                  className="py-1 px-2 items-center justify-center text-white font-semibold bg-primary-purple rounded-lg"
                >
                  <p>{allergy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {foodResponse?.suggestion && (
        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-xl font-semibold">Suggestions:</h1>
          <div className="flex overflow-auto  gap-2">
            {foodResponse.suggestion.menu.map((suggestion, index) => (
              <div
                key={index}
                className="overflow-hidden flex-none bg-white shadow-lg rounded-lg flex"
              >
                <div className="relative">
                  <Image
                    preview={false}
                    src={image}
                    width={300}
                    height={200}
                    alt={suggestion.dish}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {foodResponse?.suggestion.name}
                    </h2>
                    <h3 className="text-lg text-white/90">{suggestion.dish}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Rate
                      disabled
                      defaultValue={5}
                      className="text-yellow-400 text-sm"
                    />
                    <span className="text-gray-500">(5/5)</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <LuMapPin className="w-4 h-4" />
                    <span className="text-sm">Bangkok, Thailand</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold">
                      Price:{" "}
                      <span className="text-primary">${suggestion.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-2 py-1 font-semibold rounded-l-full bg-secondary-input text-primary-purple">
                      Details
                    </button>
                    <button className="px-2 py-1 font-semibold rounded-r-full bg-primary-purple text-white">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setUploaded(false);
          setFoodResponse(null);
        }}
        className="absolute top-0 right-0 rounded-full px-2 py-1 bg-white hover:bg-gray-100"
      >
        <CloseOutlined />
      </button>
    </div>
  );
};

export default App;
